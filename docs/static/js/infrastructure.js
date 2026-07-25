(function () {
    var grid = document.getElementById('infra-grid');
    if (!grid || grid._infraInit) return;
    grid._infraInit = true;

    var statusMsg = document.getElementById('infra-status-msg');
    var elTotal = document.getElementById('infra-stat-total');
    var elOnline = document.getElementById('infra-stat-online');
    var elScore = document.getElementById('infra-stat-score');
    var elRelays = document.getElementById('infra-stat-relays');

    var GRADE_RANK = { A: 0, B: 1, C: 2, D: 3, F: 4 };
    var API_URL = 'https://analyzer.nashme.sh/api/nodes/infrastructure';

    var map = null;
    var mapMarkers = [];

    function initMap() {
        var mapEl = document.getElementById('infra-map');
        if (!mapEl || typeof L === 'undefined' || mapEl._leaflet_id) return;

        map = L.map('infra-map', {
            center: [36.167567, -86.785401],
            zoom: 9,
            scrollWheelZoom: false,
            zoomControl: false
        });

        L.control.zoom({ position: 'bottomright' }).addTo(map);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 16,
            subdomains: 'abcd',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }).addTo(map);
    }

    function blipIcon(status) {
        return L.divIcon({
            className: 'infra-map-blip infra-map-blip--' + status.key,
            html: '<span class="infra-map-blip-ring"></span><span class="infra-map-blip-dot"></span>',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });
    }

    function renderMap(nodes) {
        if (!map) return;

        map.invalidateSize();

        mapMarkers.forEach(function (m) { map.removeLayer(m); });
        mapMarkers = [];

        var bounds = [];
        nodes.forEach(function (node) {
            if (typeof node.lat !== 'number' || typeof node.lon !== 'number') return;
            var status = statusFor(node);
            var marker = L.marker([node.lat, node.lon], { icon: blipIcon(status) });
            marker.bindPopup(
                '<div class="infra-map-popup">' +
                    '<strong>' + node.name + '</strong><br>' +
                    status.label + ' &middot; Grade ' + (node.usefulness_grade || '—') +
                    '<br><a href="https://analyzer.nashme.sh/#/nodes/' + encodeURIComponent(node.public_key) +
                    '" target="_blank" rel="noopener">View in Analyzer ↗</a>' +
                '</div>'
            );
            marker.addTo(map);
            mapMarkers.push(marker);
            bounds.push([node.lat, node.lon]);
        });

        if (bounds.length) map.fitBounds(bounds, { padding: [30, 30], maxZoom: 11 });
    }

    function timeAgo(isoString) {
        if (!isoString) return 'Never';
        var diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
        if (diff < 0) diff = 0;
        if (diff < 60) return diff + 's ago';
        if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
        if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
        return Math.floor(diff / 86400) + 'd ago';
    }

    function pct(value) {
        if (value === null || value === undefined || isNaN(value)) return '—';
        return Math.round(value * 100) + '%';
    }

    function statusFor(node) {
        if (!node.relay_active) return { key: 'offline', label: 'Offline' };
        var minsSinceRelayed = (Date.now() - new Date(node.last_relayed).getTime()) / 60000;
        if (minsSinceRelayed > 60) return { key: 'stale', label: 'Stale' };
        return { key: 'online', label: 'Online' };
    }

    function metricRow(label, value) {
        return '<div class="infra-metric"><span class="infra-metric-label">' + label +
            '</span><span class="infra-metric-value">' + value + '</span></div>';
    }

    function buildCard(node) {
        var status = statusFor(node);
        var grade = node.usefulness_grade || '—';

        var card = document.createElement('a');
        card.className = 'infra-card infra-card--' + status.key;
        card.href = 'https://analyzer.nashme.sh/#/nodes/' + encodeURIComponent(node.public_key);
        card.target = '_blank';
        card.rel = 'noopener';

        var metrics =
            metricRow('Usefulness', pct(node.usefulness_score)) +
            metricRow('Coverage', pct(node.coverage_score)) +
            metricRow('Relays (1h)', (node.relay_count_1h || 0).toLocaleString()) +
            metricRow('Relays (24h)', (node.relay_count_24h || 0).toLocaleString());

        card.innerHTML =
            '<div class="infra-card-header">' +
                '<span class="infra-status-dot infra-status-dot--' + status.key + '" title="' + status.label + '"></span>' +
                '<span class="infra-card-name">' + node.name + '</span>' +
                '<span class="infra-grade infra-grade--' + grade.toLowerCase() + '">' + grade + '</span>' +
            '</div>' +
            '<div class="infra-card-sub">' +
                '<span class="infra-card-role">' + (node.role || 'node') + '</span>' +
                '<span class="infra-card-heard">Last relayed ' + timeAgo(node.last_relayed) + '</span>' +
            '</div>' +
            '<div class="infra-card-metrics">' + metrics + '</div>';

        return card;
    }

    function render(nodes) {
        grid.innerHTML = '';
        renderMap(nodes);

        nodes.sort(function (a, b) {
            var sa = statusFor(a).key === 'online' ? 0 : 1;
            var sb = statusFor(b).key === 'online' ? 0 : 1;
            if (sa !== sb) return sa - sb;
            var ga = GRADE_RANK[a.usefulness_grade] !== undefined ? GRADE_RANK[a.usefulness_grade] : 99;
            var gb = GRADE_RANK[b.usefulness_grade] !== undefined ? GRADE_RANK[b.usefulness_grade] : 99;
            if (ga !== gb) return ga - gb;
            return (b.usefulness_score || 0) - (a.usefulness_score || 0);
        });

        nodes.forEach(function (node) {
            grid.appendChild(buildCard(node));
        });

        var online = nodes.filter(function (n) { return statusFor(n).key === 'online'; }).length;
        var totalRelays24h = nodes.reduce(function (sum, n) { return sum + (n.relay_count_24h || 0); }, 0);
        var avgScore = nodes.length
            ? nodes.reduce(function (sum, n) { return sum + (n.usefulness_score || 0); }, 0) / nodes.length
            : 0;

        if (elTotal) elTotal.textContent = nodes.length;
        if (elOnline) elOnline.textContent = online + ' / ' + nodes.length;
        if (elScore) elScore.textContent = pct(avgScore);
        if (elRelays) elRelays.textContent = totalRelays24h.toLocaleString();

        if (statusMsg) {
            statusMsg.textContent = nodes.length
                ? 'Showing ' + nodes.length + ' infrastructure node' + (nodes.length === 1 ? '' : 's') + '.'
                : 'No infrastructure nodes reported.';
        }
    }

    function loadNodes() {
        fetch(API_URL)
            .then(function (r) { return r.json(); })
            .then(function (data) {
                render((data && data.nodes) || []);
            })
            .catch(function (err) {
                if (statusMsg) statusMsg.textContent = 'Failed to load infrastructure data.';
                console.error('infrastructure:', err);
            });
    }

    initMap();
    loadNodes();
    setInterval(loadNodes, 120000);
})();
