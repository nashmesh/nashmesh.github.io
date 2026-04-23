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

    // Move node list into sidebar on desktop, leave in content on mobile
    var nodeListContainer = document.getElementById('node-list-container');
    var sidebar = document.querySelector('.sidebar.navbar-collapse');
    if (nodeListContainer && sidebar && window.innerWidth >= 768) {
        sidebar.appendChild(nodeListContainer);
    }

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

    function renderList(filter) {
        var list = document.getElementById('node-list');
        if (!list) return;
        var q = (filter || '').toLowerCase();
        list.innerHTML = '';
        allNodes.forEach(function (item) {
            var name = (item.node.long_name || item.node.short_name || item.node.node_id || '').toLowerCase();
            if (q && name.indexOf(q) === -1) return;
            var li = document.createElement('li');
            li.className = 'node-list-item node-list-' + (item.isMeshcore ? 'meshcore' : 'meshtastic');
            li.innerHTML = '<span class="node-list-dot"></span><span class="node-list-name">' +
                (item.node.long_name || item.node.short_name || item.node.node_id) + '</span>' +
                '<span class="node-list-sub">' + (item.node.protocol || '') + '</span>';
            li.addEventListener('click', function () {
                map.setView([item.node.latitude, item.node.longitude], 13);
                item.marker.openPopup();
            });
            list.appendChild(li);
        });
    }

    var searchInput = document.getElementById('node-search');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            renderList(this.value);
        });
    }

    map.whenReady(function () {
        map.invalidateSize();

        fetch('https://potato.nashme.sh/api/nodes')
            .then(function (r) { return r.json(); })
            .then(function (nodes) {
                var plotted = 0;

                nodes.forEach(function (node) {
                    if (!node.latitude || !node.longitude) return;

                    var isMeshcore = node.protocol && node.protocol.toLowerCase().includes('meshcore');
                    var color = isMeshcore ? '#ff8c42' : '#4da6ff';
                    var fillColor = isMeshcore ? '#ff8c4288' : '#4da6ff88';

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

                renderList('');
                if (status) status.textContent = plotted + ' nodes plotted.';
            })
            .catch(function (err) {
                if (status) status.textContent = 'Failed to load node data.';
                console.error('node-map:', err);
            });
    });
})();
