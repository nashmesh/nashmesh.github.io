(function () {
    var canvas = document.getElementById('node-map-canvas');
    var status = document.getElementById('node-map-status');
    if (!canvas || canvas._leaflet_id) return; // guard against double-init

    function timeAgo(isoString) {
        if (!isoString) return 'Unknown';
        var diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
        if (diff < 60) return diff + 's ago';
        if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
        if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
        return Math.floor(diff / 86400) + 'd ago';
    }

    var map = L.map('node-map-canvas', {
        center: [36.167567, -86.785401],
        zoom: 9,
        maxZoom: 16
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18
    }).addTo(map);

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
                    plotted++;
                });

                if (status) status.textContent = plotted + ' nodes plotted.';
            })
            .catch(function (err) {
                if (status) status.textContent = 'Failed to load node data.';
                console.error('node-map:', err);
            });
    });
})();
