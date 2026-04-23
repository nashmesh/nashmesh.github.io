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

    // Move node list between sidebar (desktop) and content (mobile) on load and resize
    var nodeListContainer = document.getElementById('node-list-container');
    var sidebar = document.querySelector('.sidebar.navbar-collapse');
    var contentAnchor = document.getElementById('potato-map-status');

    function placeNodeList() {
        if (!nodeListContainer || !sidebar || !contentAnchor) return;
        if (window.innerWidth >= 768) {
            if (nodeListContainer.parentNode !== sidebar) {
                sidebar.appendChild(nodeListContainer);
            }
        } else {
            if (nodeListContainer.parentNode !== contentAnchor.parentNode) {
                contentAnchor.parentNode.insertBefore(nodeListContainer, contentAnchor.nextSibling);
            }
        }
    }

    placeNodeList();

    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(placeNodeList, 100);
    });

    var map = L.map('potato-map-canvas', {
        center: [36.167567, -86.785401],
        zoom: 9,
        maxZoom: 16
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18
    }).addTo(map);

    var markers = [];
    var allNodes = [];
    var activeFilter = 'all';

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
            li.innerHTML = '<img src="' + logoSrc + '" class="node-list-logo" alt="">' +
                '<span class="node-list-name">' +
                (item.node.long_name || item.node.short_name || item.node.node_id) + '</span>' +
                '<span class="node-list-sub">' + (item.node.protocol || '') + '</span>';
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
        searchInput.addEventListener('input', function () {
            applyFilter();
        });
    }

    document.querySelectorAll('.map-filter-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.map-filter-btn').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            activeFilter = btn.getAttribute('data-filter');
            applyFilter();
        });
    });

    map.whenReady(function () {
        map.invalidateSize();

        fetch('https://potato.nashme.sh/api/nodes')
            .then(function (r) { return r.json(); })
            .then(function (nodes) {
                var plotted = 0;

                nodes.forEach(function (node) {
                    if (!node.latitude || !node.longitude) return;

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

                // Sort alphabetically
                allNodes.sort(function (a, b) {
                    var an = a.node.long_name || a.node.short_name || '';
                    var bn = b.node.long_name || b.node.short_name || '';
                    return an.localeCompare(bn);
                });

                renderList();
                applyFilter();
                if (status) status.textContent = plotted + ' nodes plotted.';

                var meshcoreCount = allNodes.filter(function (n) { return n.isMeshcore; }).length;
                var meshtasticCount = allNodes.length - meshcoreCount;
                var elTotal = document.getElementById('stat-total');
                var elMeshtastic = document.getElementById('stat-meshtastic');
                var elMeshcore = document.getElementById('stat-meshcore');
                if (elTotal) elTotal.textContent = allNodes.length;
                if (elMeshtastic) elMeshtastic.textContent = meshtasticCount;
                if (elMeshcore) elMeshcore.textContent = meshcoreCount;
            })
            .catch(function (err) {
                if (status) status.textContent = 'Failed to load node data.';
                console.error('node-map:', err);
            });
    });
})();
