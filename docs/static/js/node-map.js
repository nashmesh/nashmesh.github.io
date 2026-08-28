(function () {
    var canvas = document.getElementById('potato-map-canvas');
    var status = document.getElementById('potato-map-status');
    if (!canvas || canvas._leaflet_id) return; // guard against double-init

    function timeAgo(isoString) {
        if (!isoString) return 'Unknown';
        var diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
        if (diff < 60) return diff + 's ago';
        if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
        if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
        return Math.floor(diff / 86400) + 'd ago';
    }

    var defaultCenter = [36.167567, -86.785401];
    var defaultZoom = 9;

    var map = L.map('potato-map-canvas', {
        center: defaultCenter,
        zoom: defaultZoom,
        maxZoom: 16,
        zoomControl: false
    });

    var osmAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    var cartoAttr = osmAttr + ' &copy; <a href="https://carto.com/attributions">CARTO</a>';
    var baseLayers = {
        'Standard': L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19, attribution: osmAttr
        }),
        'Dark': L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=__CARTO_API_KEY__', {
            maxZoom: 20, subdomains: 'abcd', attribution: cartoAttr
        }),
        'Light': L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=__CARTO_API_KEY__', {
            maxZoom: 20, subdomains: 'abcd', attribution: cartoAttr
        }),
        'Satellite': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 19, attribution: 'Tiles &copy; <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics'
        })
    };

    // Restore the visitor's last-used base layer (default to Dark to match
    // the site's dark UI now that tiles are no longer CSS-inverted).
    var savedLayer = null;
    try { savedLayer = localStorage.getItem('nashmesh-map-layer'); } catch (e) {}
    var currentBaseName = baseLayers[savedLayer] ? savedLayer : 'Dark';
    var currentBase = baseLayers[currentBaseName];
    currentBase.addTo(map);

    // Base-map selector lives in the Map Controls panel.
    var layerSelect = document.getElementById('map-layer-select');
    if (layerSelect) {
        layerSelect.value = currentBaseName;
        layerSelect.addEventListener('change', function () {
            var next = baseLayers[layerSelect.value];
            if (!next || next === currentBase) return;
            map.removeLayer(currentBase);
            currentBase = next;
            currentBase.addTo(map);
            try { localStorage.setItem('nashmesh-map-layer', layerSelect.value); } catch (e) {}
        });
    }

    // ── Node glyphs: colour encodes protocol, shape encodes role ──────
    function nodeRoleShape(role) {
        var r = (role || '').toUpperCase();
        if (r.indexOf('ROUTER') !== -1 || r.indexOf('REPEATER') !== -1) return 'router';
        if (r.indexOf('SERVER') !== -1 || r.indexOf('BASE') !== -1) return 'server';
        return 'client';
    }

    function nodeGlyphSvg(shape, fill) {
        var g;
        if (shape === 'router') g = '<polygon points="10,3.5 16.5,16.5 3.5,16.5"';
        else if (shape === 'server') g = '<polygon points="10,2.5 17.5,10 10,17.5 2.5,10"';
        else g = '<circle cx="10" cy="10" r="5.6"';
        return '<svg viewBox="0 0 20 20" width="20" height="20" xmlns="http://www.w3.org/2000/svg">' +
            g + ' fill="' + fill + '" stroke="#ffffff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
    }

    function buildNodeIcon(role) {
        return L.divIcon({
            className: 'node-glyph-icon',
            html: nodeGlyphSvg(nodeRoleShape(role), '#4da6ff'),
            iconSize: [20, 20],
            iconAnchor: [10, 10],
            popupAnchor: [0, -11]
        });
    }


    // zoom added after legend so it renders above it in the bottom-right stack
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    var mapLegend = L.control({ position: 'bottomleft' });
    mapLegend.onAdd = function () {
        var div = L.DomUtil.create('div', 'map-corner-legend');
        div.innerHTML =
            '<div class="mcl-section">' +
                '<div class="mcl-title">Role</div>' +
                '<div class="mcl-row"><svg class="mcl-glyph" viewBox="0 0 20 20" aria-hidden="true"><polygon points="10,3.5 16.5,16.5 3.5,16.5" fill="currentColor"/></svg>Router / Repeater</div>' +
                '<div class="mcl-row"><svg class="mcl-glyph" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="5.6" fill="currentColor"/></svg>Client</div>' +
                '<div class="mcl-row"><svg class="mcl-glyph" viewBox="0 0 20 20" aria-hidden="true"><polygon points="10,2.5 17.5,10 10,17.5 2.5,10" fill="currentColor"/></svg>Server / Base</div>' +
            '</div>';
        L.DomEvent.disableClickPropagation(div);
        return div;
    };
    mapLegend.addTo(map);

    var clusterGroup = L.markerClusterGroup({
        maxClusterRadius: 50,
        disableClusteringAtZoom: 13,
        spiderfyOnMaxZoom: true,
        spiderfyDistanceMultiplier: 1.5,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true
    });
    clusterGroup.addTo(map);

    var clusterTip = L.tooltip({ sticky: false, className: 'node-hover-tooltip', offset: [0, -8] });

    clusterGroup.on('clustermouseover', function (e) {
        var children = e.layer.getAllChildMarkers();
        var limit = 10;
        var lines = children.slice(0, limit).map(function (m) {
            var n = m._nodeData || {};
            var name = n.name || '?';
            var logo = '../static/images/meshcore-logo.png';
            var role = n.role ? '<span class="nht-role">' + n.role.replace(/_/g, ' ') + '</span>' : '';
            return '<span class="nht-header"><img src="' + logo + '" class="nht-logo" alt=""><span class="nht-name">' + name + '</span>' + role + '</span>';
        });
        if (children.length > limit) {
            lines.push('<span class="nht-more">+' + (children.length - limit) + ' more</span>');
        }
        clusterTip
            .setContent('<div class="node-hover-tip">' + lines.join('') + '</div>')
            .setLatLng(e.layer.getLatLng())
            .addTo(map);
    });

    clusterGroup.on('clustermouseout', function () {
        clusterTip.remove();
    });

    // ── Panel toggle ──────────────────────────────────────────
    var panel = document.getElementById('map-side-panel');
    var toggleBtn = document.getElementById('map-panel-toggle');
    var closeBtn = document.getElementById('map-panel-close');

    function openPanel() {
        if (panel) panel.classList.add('open');
        if (toggleBtn) toggleBtn.classList.add('panel-open');
        map.invalidateSize();
    }

    function closePanel() {
        if (panel) panel.classList.remove('open');
        if (toggleBtn) toggleBtn.classList.remove('panel-open');
        map.invalidateSize();
    }

    if (toggleBtn) toggleBtn.addEventListener('click', function () {
        panel && panel.classList.contains('open') ? closePanel() : openPanel();
    });

    if (closeBtn) closeBtn.addEventListener('click', closePanel);

    // ── Markers + filter ─────────────────────────────────────
    var markers = [];
    var allNodes = [];
    var activeRole = 'all';
    var activeSort = 'lastseen';
    var clusteringEnabled = true;

    function sortNodes() {
        if (activeSort === 'lastseen') {
            allNodes.sort(function (a, b) {
                var at = a.node.last_heard ? new Date(a.node.last_heard).getTime() : 0;
                var bt = b.node.last_heard ? new Date(b.node.last_heard).getTime() : 0;
                return bt - at;
            });
        } else {
            allNodes.sort(function (a, b) {
                var an = a.node.name || '';
                var bn = b.node.name || '';
                return an.localeCompare(bn);
            });
        }
    }

    function applyFilter() {
        var q = (document.getElementById('node-search') || {}).value || '';
        q = q.toLowerCase();

        allNodes.forEach(function (item) {
            var roleMatch = activeRole === 'all' || item.roleShape === activeRole;
            var name = (item.node.name || '').toLowerCase();
            var searchMatch = !q || name.indexOf(q) !== -1;
            var visible = roleMatch && searchMatch;

            if (visible) {
                if (clusteringEnabled) {
                    if (!clusterGroup.hasLayer(item.marker)) {
                        if (map.hasLayer(item.marker)) map.removeLayer(item.marker);
                        clusterGroup.addLayer(item.marker);
                    }
                } else {
                    if (clusterGroup.hasLayer(item.marker)) clusterGroup.removeLayer(item.marker);
                    if (!map.hasLayer(item.marker)) item.marker.addTo(map);
                }
            } else {
                if (clusterGroup.hasLayer(item.marker)) clusterGroup.removeLayer(item.marker);
                if (map.hasLayer(item.marker)) map.removeLayer(item.marker);
            }

            if (item.listEl) {
                item.listEl.style.display = visible ? '' : 'none';
            }
        });
    }

    function renderList() {
        var list = document.getElementById('node-list');
        if (!list) return;
        list.innerHTML = '';
        allNodes.forEach(function (item) {
            var li = document.createElement('li');
            li.className = 'node-list-item node-list-meshcore';
            var logoSrc = '../static/images/meshcore-logo.png';
            var lastSeen = item.node.last_heard ? timeAgo(item.node.last_heard) : '';
            var role = item.node.role ? item.node.role.replace(/_/g, ' ') : '';
            li.innerHTML = '<img src="' + logoSrc + '" class="node-list-logo" alt="">' +
                '<span class="node-list-info">' +
                  '<span class="node-list-name">' + item.node.name + '</span>' +
                  (role ? '<span class="node-list-role">' + role + '</span>' : '') +
                '</span>' +
                '<span class="node-list-meta">' +
                (lastSeen ? '<span class="node-list-lastseen">' + lastSeen + '</span>' : '') +
                '</span>';
            li.addEventListener('click', function () {
                map.setView([item.node.lat, item.node.lon], 13);
                clusterGroup.zoomToShowLayer(item.marker, function () {
                    item.marker.openPopup();
                });
            });
            list.appendChild(li);
            item.listEl = li;
        });
    }

    var searchInput = document.getElementById('node-search');
    if (searchInput) {
        searchInput.addEventListener('input', function () { applyFilter(); });
    }

    document.querySelectorAll('.map-role-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.map-role-btn').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            activeRole = btn.getAttribute('data-role');
            applyFilter();
        });
    });

    document.querySelectorAll('.node-sort-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.node-sort-btn').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            activeSort = btn.getAttribute('data-sort');
            sortNodes();
            renderList();
            applyFilter();
        });
    });

    // ── Map controls: icon toggles the panel (closed by default) ──
    var controlsWrap = document.getElementById('map-controls');
    var controlsToggle = document.getElementById('map-controls-toggle');
    if (controlsWrap && controlsToggle) {
        controlsToggle.addEventListener('click', function () {
            var open = controlsWrap.classList.toggle('open');
            controlsToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    var clusterBtn = document.getElementById('map-cluster-btn');
    if (clusterBtn) {
        var clusterSwitch = clusterBtn.querySelector('.map-utility-switch');
        clusterBtn.addEventListener('click', function () {
            clusteringEnabled = !clusteringEnabled;
            if (clusterSwitch) clusterSwitch.classList.toggle('active', clusteringEnabled);
            if (clusteringEnabled) {
                if (!map.hasLayer(clusterGroup)) clusterGroup.addTo(map);
            } else {
                if (map.hasLayer(clusterGroup)) map.removeLayer(clusterGroup);
            }
            applyFilter();
        });
    }

    var centerBtn = document.getElementById('map-center-btn');
    if (centerBtn) {
        centerBtn.addEventListener('click', function () {
            map.setView(defaultCenter, defaultZoom);
        });
    }

    var lastRefresh = 0;
    var cooldownMs = 15000;
    var refreshBtn = document.getElementById('map-refresh-btn');

    var analyzerNodesUrl = 'https://analyzer.nashme.sh/api/nodes?limit=50000&lastHeard=5d';

    function loadNodes() {
        if (status) status.textContent = 'Loading…';

        clusterGroup.clearLayers();
        markers.length = 0;
        allNodes.length = 0;

        fetch(analyzerNodesUrl)
            .then(function (r) { return r.json(); })
            .then(function (data) {
                var nodes = data.nodes || [];
                var plotted = 0;

                var fourDaysMs = 4 * 24 * 60 * 60 * 1000;
                nodes.forEach(function (node) {
                    if (!node.lat || !node.lon) return;
                    if (node.last_heard && (Date.now() - new Date(node.last_heard).getTime()) > fourDaysMs) return;

                    var marker = L.marker([node.lat, node.lon], {
                        icon: buildNodeIcon(node.role)
                    });

                    var popupLogo = '../static/images/meshcore-logo.png';
                    var popupContent =
                        '<div class="node-popup">' +
                        '<span class="nht-header"><img src="' + popupLogo + '" class="nht-logo" alt=""><span class="nht-name">' + node.name + '</span></span>' +
                        (node.role ? '<span class="nht-role">' + node.role.replace(/_/g, ' ') + '</span>' : '') +
                        (node.last_heard ? '<span class="nht-time">Last seen ' + timeAgo(node.last_heard) + '</span>' : '') +
                        '</div>';

                    marker.bindPopup(popupContent);
                    marker._nodeData = node;
                    var tipLogo = '../static/images/meshcore-logo.png';
                    marker.bindTooltip(
                        '<div class="node-hover-tip">' +
                        '<span class="nht-header"><img src="' + tipLogo + '" class="nht-logo" alt=""><span class="nht-name">' + node.name + '</span></span>' +
                        (node.role ? '<span class="nht-role">' + node.role.replace(/_/g, ' ') + '</span>' : '') +
                        (node.last_heard ? '<span class="nht-time">' + timeAgo(node.last_heard) + '</span>' : '') +
                        '</div>',
                        { sticky: true, offset: [10, 0], className: 'node-hover-tooltip' }
                    );
                    marker.on('tooltipopen', function () {
                        if (marker.isPopupOpen()) marker.closeTooltip();
                    });
                    clusterGroup.addLayer(marker);
                    markers.push(marker);
                    allNodes.push({ node: node, marker: marker, roleShape: nodeRoleShape(node.role) });
                    plotted++;
                });

                sortNodes();
                renderList();
                applyFilter();
                if (status) status.textContent = plotted + ' nodes plotted.';

                // start polling after initial load
                if (!window._nodeMapPollInterval) {
                    window._nodeMapPollInterval = setInterval(pollNodes, 120000);
                }

                var elTotal = document.getElementById('stat-total');
                if (elTotal) elTotal.textContent = nodes.length;
            })
            .catch(function (err) {
                if (status) status.textContent = 'Failed to load node data.';
                console.error('node-map:', err);
            });
    }

    function pollNodes() {
        fetch(analyzerNodesUrl)
            .then(function (r) { return r.json(); })
            .then(function (data) {
                var nodes = data.nodes || [];
                var anyUpdated = false;
                nodes.forEach(function (updated) {
                    if (!updated.public_key || !updated.last_heard) return;
                    var item = null;
                    for (var i = 0; i < allNodes.length; i++) {
                        if (allNodes[i].node.public_key === updated.public_key) {
                            item = allNodes[i];
                            break;
                        }
                    }
                    if (!item) return;
                    if (item.node.last_heard === updated.last_heard) return;
                    item.node.last_heard = updated.last_heard;
                    var popup = item.marker.getPopup();
                    if (popup) {
                        popup.setContent(popup.getContent().replace(
                            /Last seen [^<]*/,
                            'Last seen ' + timeAgo(updated.last_heard)
                        ));
                    }
                    anyUpdated = true;
                });
                if (anyUpdated) {
                    sortNodes();
                    renderList();
                    applyFilter();
                }

                // refresh all displayed timestamps regardless of poll results
                allNodes.forEach(function (item) {
                    if (!item.node.last_heard || !item.listEl) return;
                    var el = item.listEl.querySelector('.node-list-lastseen');
                    if (el) el.textContent = timeAgo(item.node.last_heard);
                });
            })
            .catch(function (err) { console.error('node-map poll:', err); });
    }

    function startCooldown() {
        if (!refreshBtn) return;
        lastRefresh = Date.now();
        refreshBtn.disabled = true;
        var interval = setInterval(function () {
            var remaining = Math.ceil((cooldownMs - (Date.now() - lastRefresh)) / 1000);
            if (remaining <= 0) {
                clearInterval(interval);
                refreshBtn.disabled = false;
                refreshBtn.textContent = '↻ Refresh';
            } else {
                refreshBtn.textContent = '↻ ' + remaining + 's';
            }
        }, 250);
    }

    if (refreshBtn) {
        refreshBtn.addEventListener('click', function () {
            if (Date.now() - lastRefresh < cooldownMs) return;
            loadNodes();
            startCooldown();
        });
    }

    var mapReady = false;

    function onFirstReady() {
        if (mapReady) return;
        mapReady = true;
        map.invalidateSize({ animate: false });
        map.setView(defaultCenter, defaultZoom);
        loadNodes();
        startCooldown();
    }

    if (typeof ResizeObserver !== 'undefined') {
        new ResizeObserver(function (entries) {
            var rect = entries[0].contentRect;
            if (rect.width > 0 && rect.height > 0) {
                if (!mapReady) {
                    onFirstReady();
                } else {
                    map.invalidateSize({ animate: false });
                }
            }
        }).observe(canvas);
    } else {
        window.addEventListener('resize', function () { map.invalidateSize(); });

        map.whenReady(onFirstReady);
    }
})();

// ── Homepage mini-map ──────────────────────────────────────────────────────
(function () {
    if (typeof L === 'undefined') return;
    var canvas = document.getElementById('homepage-map-canvas');
    if (!canvas || canvas._leaflet_id) return;

    function timeAgo(isoString) {
        if (!isoString) return 'Unknown';
        var diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
        if (diff < 60) return diff + 's ago';
        if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
        if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
        return Math.floor(diff / 86400) + 'd ago';
    }

    function nodeRoleShape(role) {
        var r = (role || '').toUpperCase();
        if (r.indexOf('ROUTER') !== -1 || r.indexOf('REPEATER') !== -1) return 'router';
        if (r.indexOf('SERVER') !== -1 || r.indexOf('BASE') !== -1) return 'server';
        return 'client';
    }

    function nodeGlyphSvg(shape, fill) {
        var g;
        if (shape === 'router') g = '<polygon points="10,3.5 16.5,16.5 3.5,16.5"';
        else if (shape === 'server') g = '<polygon points="10,2.5 17.5,10 10,17.5 2.5,10"';
        else g = '<circle cx="10" cy="10" r="5.6"';
        return '<svg viewBox="0 0 20 20" width="20" height="20" xmlns="http://www.w3.org/2000/svg">' +
            g + ' fill="' + fill + '" stroke="#ffffff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
    }

    function buildNodeIcon(role) {
        return L.divIcon({
            className: 'node-glyph-icon',
            html: nodeGlyphSvg(nodeRoleShape(role), '#4da6ff'),
            iconSize: [20, 20],
            iconAnchor: [10, 10],
            popupAnchor: [0, -11]
        });
    }

    var osmAttr = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
    var cartoAttr = osmAttr + ' &copy; <a href="https://carto.com/attributions">CARTO</a>';
    var baseLayers = {
        'Dark': L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=__CARTO_API_KEY__', {
            maxZoom: 20, subdomains: 'abcd', attribution: cartoAttr
        }),
        'Light': L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=__CARTO_API_KEY__', {
            maxZoom: 20, subdomains: 'abcd', attribution: cartoAttr
        })
    };

    function layerNameForTheme(theme) {
        return (theme === 'light' || theme === 'retro') ? 'Light' : 'Dark';
    }

    var defaultCenter = [36.167567, -86.785401];
    var defaultZoom = 9;

    var map = L.map('homepage-map-canvas', {
        center: defaultCenter,
        zoom: defaultZoom,
        maxZoom: 16
    });

    var currentBaseName = layerNameForTheme(document.body.getAttribute('data-theme') || 'dark');
    var currentBase = baseLayers[currentBaseName];
    currentBase.addTo(map);

    new MutationObserver(function () {
        var newName = layerNameForTheme(document.body.getAttribute('data-theme'));
        if (newName === currentBaseName) return;
        map.removeLayer(currentBase);
        currentBaseName = newName;
        currentBase = baseLayers[currentBaseName];
        currentBase.addTo(map);
    }).observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });

    var recenterBtn = L.control({ position: 'topleft' });
    recenterBtn.onAdd = function () {
        var btn = L.DomUtil.create('button', 'leaflet-bar leaflet-control hp-recenter-btn');
        btn.title = 'Re-center map';
        btn.innerHTML = '<svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="10" r="3"/><line x1="10" y1="2" x2="10" y2="5"/><line x1="10" y1="15" x2="10" y2="18"/><line x1="2" y1="10" x2="5" y2="10"/><line x1="15" y1="10" x2="18" y2="10"/></svg>';
        L.DomEvent.on(btn, 'click', function (e) {
            L.DomEvent.stopPropagation(e);
            map.setView(defaultCenter, defaultZoom);
        });
        return btn;
    };
    recenterBtn.addTo(map);

    var hpLegend = L.control({ position: 'bottomleft' });
    hpLegend.onAdd = function () {
        var div = L.DomUtil.create('div', 'map-corner-legend');
        div.innerHTML =
            '<div class="mcl-section">' +
                '<div class="mcl-title">Role</div>' +
                '<div class="mcl-row"><svg class="mcl-glyph" viewBox="0 0 20 20" aria-hidden="true"><polygon points="10,3.5 16.5,16.5 3.5,16.5" fill="currentColor"/></svg>Router / Repeater</div>' +
                '<div class="mcl-row"><svg class="mcl-glyph" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="5.6" fill="currentColor"/></svg>Client</div>' +
                '<div class="mcl-row"><svg class="mcl-glyph" viewBox="0 0 20 20" aria-hidden="true"><polygon points="10,2.5 17.5,10 10,17.5 2.5,10" fill="currentColor"/></svg>Server / Base</div>' +
            '</div>';
        L.DomEvent.disableClickPropagation(div);
        return div;
    };
    hpLegend.addTo(map);

    var fourDaysMs = 4 * 24 * 60 * 60 * 1000;
    fetch('https://analyzer.nashme.sh/api/nodes?limit=50000&lastHeard=5d')
        .then(function (r) { return r.json(); })
        .then(function (data) {
            (data.nodes || []).forEach(function (node) {
                if (!node.lat || !node.lon) return;
                if (node.last_heard && (Date.now() - new Date(node.last_heard).getTime()) > fourDaysMs) return;
                var popupLogo = '/static/images/meshcore-logo.png';
                var marker = L.marker([node.lat, node.lon], {
                    icon: buildNodeIcon(node.role)
                });
                marker.bindPopup(
                    '<div class="node-popup">' +
                    '<span class="nht-header"><img src="' + popupLogo + '" class="nht-logo" alt=""><span class="nht-name">' +
                    node.name + '</span></span>' +
                    (node.role ? '<span class="nht-role">' + node.role.replace(/_/g, ' ') + '</span>' : '') +
                    (node.last_heard ? '<span class="nht-time">Last seen ' + timeAgo(node.last_heard) + '</span>' : '') +
                    '</div>'
                );
                marker.addTo(map);
            });
        })
        .catch(function (err) { console.error('homepage-map:', err); });

    if (typeof ResizeObserver !== 'undefined') {
        new ResizeObserver(function (entries) {
            var rect = entries[0].contentRect;
            if (rect.width > 0 && rect.height > 0) map.invalidateSize({ animate: false });
        }).observe(canvas);
    } else {
        window.addEventListener('resize', function () { map.invalidateSize(); });
    }
})();
