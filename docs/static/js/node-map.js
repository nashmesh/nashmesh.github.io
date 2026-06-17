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
        maxZoom: 16
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18
    }).addTo(map);

    var legend = L.control({ position: 'bottomright' });
    legend.onAdd = function () {
        var div = L.DomUtil.create('div', 'homepage-map-legend');
        div.innerHTML =
            '<span class="hml-item"><span class="hml-dot hml-meshtastic"></span>Meshtastic</span>' +
            '<span class="hml-item"><span class="hml-dot hml-meshcore"></span>MeshCore</span>';
        return div;
    };
    legend.addTo(map);

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
    var activeFilter = 'all';
    var activeSort = 'lastseen';

    function sortNodes() {
        if (activeSort === 'lastseen') {
            allNodes.sort(function (a, b) {
                var at = a.node.last_seen_iso ? new Date(a.node.last_seen_iso).getTime() : 0;
                var bt = b.node.last_seen_iso ? new Date(b.node.last_seen_iso).getTime() : 0;
                return bt - at;
            });
        } else {
            allNodes.sort(function (a, b) {
                var an = a.node.long_name || a.node.short_name || '';
                var bn = b.node.long_name || b.node.short_name || '';
                return an.localeCompare(bn);
            });
        }
    }

    function applyFilter() {
        var q = (document.getElementById('node-search') || {}).value || '';
        q = q.toLowerCase();

        allNodes.forEach(function (item) {
            var protocolMatch = activeFilter === 'all' ||
                (activeFilter === 'meshcore' && item.isMeshcore) ||
                (activeFilter === 'meshtastic' && !item.isMeshcore);
            var name = (item.node.long_name || item.node.short_name || item.node.node_id || '').toLowerCase();
            var searchMatch = !q || name.indexOf(q) !== -1;
            var visible = protocolMatch && searchMatch;

            if (visible) {
                if (!map.hasLayer(item.marker)) item.marker.addTo(map);
            } else {
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
            li.className = 'node-list-item node-list-' + (item.isMeshcore ? 'meshcore' : 'meshtastic');
            var logoSrc = item.isMeshcore
                ? '../static/images/meshcore-logo.png'
                : '../static/images/meshtastic-logo.svg';
            var lastSeen = item.node.last_seen_iso ? timeAgo(item.node.last_seen_iso) : '';
            var role = item.node.role ? item.node.role.replace(/_/g, ' ') : '';
            li.innerHTML = '<img src="' + logoSrc + '" class="node-list-logo" alt="">' +
                '<span class="node-list-info">' +
                  '<span class="node-list-name">' + (item.node.long_name || item.node.short_name || item.node.node_id) + '</span>' +
                  (role ? '<span class="node-list-role">' + role + '</span>' : '') +
                '</span>' +
                '<span class="node-list-meta">' +
                (lastSeen ? '<span class="node-list-lastseen">' + lastSeen + '</span>' : '') +
                '</span>';
            li.addEventListener('click', function () {
                map.setView([item.node.latitude, item.node.longitude], 13);
                item.marker.openPopup();
            });
            list.appendChild(li);
            item.listEl = li;
        });
    }

    var searchInput = document.getElementById('node-search');
    if (searchInput) {
        searchInput.addEventListener('input', function () { applyFilter(); });
    }

    document.querySelectorAll('.map-filter-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.map-filter-btn').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            activeFilter = btn.getAttribute('data-filter');
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

    var centerBtn = document.getElementById('map-center-btn');
    if (centerBtn) {
        centerBtn.addEventListener('click', function () {
            map.setView(defaultCenter, defaultZoom);
        });
    }

    var lastRefresh = 0;
    var cooldownMs = 15000;
    var refreshBtn = document.getElementById('map-refresh-btn');

    function loadNodes() {
        if (status) status.textContent = 'Loading…';

        markers.forEach(function (m) { map.removeLayer(m); });
        markers.length = 0;
        allNodes.length = 0;

        fetch('https://potato.nashme.sh/api/nodes?limit=10000')
            .then(function (r) { return r.json(); })
            .then(function (nodes) {
                var plotted = 0;
                var totalMeshcore = nodes.filter(function (n) {
                    return n.protocol && n.protocol.toLowerCase().includes('meshcore');
                }).length;
                var totalMeshtastic = nodes.length - totalMeshcore;

                var fourDaysMs = 4 * 24 * 60 * 60 * 1000;
                nodes.forEach(function (node) {
                    if (!node.latitude || !node.longitude) return;
                    if (node.last_seen_iso && (Date.now() - new Date(node.last_seen_iso).getTime()) > fourDaysMs) return;

                    var isMeshcore = node.protocol && node.protocol.toLowerCase().includes('meshcore');
                    var color = isMeshcore ? '#4da6ff' : '#67ea94';
                    var fillColor = isMeshcore ? '#4da6ff88' : '#67ea9488';

                    var marker = L.circleMarker([node.latitude, node.longitude], {
                        radius: 7,
                        color: color,
                        fillColor: fillColor,
                        fillOpacity: 0.9,
                        weight: 2
                    });

                    var popupLines = [
                        '<strong>' + (node.long_name || node.short_name || node.node_id) + '</strong>',
                        node.short_name ? '<span>' + node.short_name + '</span>' : '',
                        '<span>Protocol: ' + (node.protocol || 'unknown') + '</span>',
                        node.hw_model ? '<span>Hardware: ' + node.hw_model + '</span>' : '',
                        node.role ? '<span>Role: ' + node.role + '</span>' : '',
                        node.last_seen_iso ? '<span>Last seen: ' + timeAgo(node.last_seen_iso) + '</span>' : ''
                    ].filter(Boolean).join('<br>');

                    marker.bindPopup('<div class="node-popup">' + popupLines + '</div>');
                    marker.addTo(map);
                    markers.push(marker);
                    allNodes.push({ node: node, marker: marker, isMeshcore: isMeshcore });
                    plotted++;
                });

                sortNodes();
                renderList();
                applyFilter();
                if (status) status.textContent = plotted + ' nodes plotted.';

                var elTotal = document.getElementById('stat-total');
                var elMeshtastic = document.getElementById('stat-meshtastic');
                var elMeshcore = document.getElementById('stat-meshcore');
                if (elTotal) elTotal.textContent = nodes.length;
                if (elMeshtastic) elMeshtastic.textContent = totalMeshtastic;
                if (elMeshcore) elMeshcore.textContent = totalMeshcore;
            })
            .catch(function (err) {
                if (status) status.textContent = 'Failed to load node data.';
                console.error('node-map:', err);
            });
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

    map.whenReady(function () {
        map.invalidateSize();
        loadNodes();
        startCooldown();
    });
})();
