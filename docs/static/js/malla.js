let mallaURL = "https://malla.nashme.sh";

async function fetchInfrastructureNodesByRegion() {
    const response = await fetch(`${mallaURL}/api/infrastructure-nodes/by-region`);
    if (!response.ok) throw new Error(`Failed to load infrastructure nodes by region`);

    const data = await response.json();
    return data['data'];
}

async function fetchNodePageInformation() {
    const dayInHours = 24;
    const numOfDays = 5;
    const maxHours = dayInHours * numOfDays;
    const maxSnr = -50;

    return await fetchNetworkGraph(maxHours, maxSnr);
}

async function fetchDataForId(id) {
    const response = await fetch(`${mallaURL}/api/node/${id}/info`);
    if (!response.ok) throw new Error(`Failed to load ID ${id}`);

    const data = await response.json();

    let dateString = data.node.last_packet_str;

    if (!dateString.endsWith('Z') && !dateString.includes('+')) {
        dateString += 'Z';
    }

    const lastUpdate = new Date(dateString);
    const timeAgo = convertTimestampToText(lastUpdate);
    const node = data['node'];

    return { ...node, timeAgo: timeAgo, timeSinceLastUpdate: new Date().getTime() - lastUpdate.getTime() };
}

async function fetchNetworkGraph(hours = '24', min_snr = '-20') {
    const response = await fetch(`${mallaURL}/api/high-connections?hours=${hours}&min_snr=${min_snr}`);
    if (!response.ok) throw new Error(`Failed to load network graph`);
    const data = await response.json();
    let nodes = data['nodes'];

    nodes = nodes.filter((node) => node['node']?.region === 'Middle');

    // set to descending order based on the connections column
    nodes.sort((a, b) => b.connections - a.connections);

    return nodes;
}

function convertTimestampToText(time) {
    if (!time) {
        return 'Unknown';
    }

    let dateString = time;
    if (!dateString.endsWith('Z') && !dateString.includes('+')) {
        dateString += 'Z';
    }

    const lastUpdate = new Date(dateString);
    const now = new Date();

    const diffMs = now - lastUpdate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    let timeAgo;
    if (diffMins < 1) {
        timeAgo = 'just now';
    } else if (diffMins < 60) {
        timeAgo = `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
        timeAgo = `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
        timeAgo = `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }

    return timeAgo;
}

async function buildNodesInformation(nodes) {
    let $nodesTable = $('#nodes-table');
    let tableBody = document.getElementById("nodes-table-body");
    if (tableBody === null) return;

    let totalPacketCount = 0;
    try {
        tableBody.innerHTML = '';

        nodes.forEach((item, index) => {
            let row = document.createElement("tr");

            // adjust color of row if infra node
            if (item.node?.is_infrastructure_node === 1) {
                row.style.backgroundColor = 'steelblue';
            }

            // table rows
            let nodeName = document.createElement("td");
            let numConnections = document.createElement("td");
            let packetCount = document.createElement("td");
            packetCount.setAttribute('id', 'node-packet-count-column');

            let averageSnr = document.createElement("td");
            averageSnr.setAttribute('id', 'node-avg-snr-column');

            let lastSeen = document.createElement("td");
            lastSeen.setAttribute('id', 'node-last-seen-column');

            // malla link for node
            let link = document.createElement('a');
            link.href = `https://malla.nashme.sh/node/${item.id}`;
            link.innerText = item.name;
            nodeName.appendChild(link);

            // add data for additional columns
            numConnections.innerText = item.connections;
            packetCount.innerText = item.packet_count;
            averageSnr.innerText = item.avg_snr ? `${item.avg_snr}dB` : 'Unknown';
            lastSeen.innerText = convertTimestampToText(item.node?.last_packet_str);

            totalPacketCount +=  item.packet_count;

            row.append(nodeName);
            row.append(numConnections);
            row.append(packetCount);
            row.append(averageSnr);
            row.append(lastSeen);
            tableBody.appendChild(row);
        });
        $nodesTable.fadeIn(500).removeAttr('hidden');

        let $totalNodesStatistic = $("#nodes-online-statistic");
        $totalNodesStatistic.text(nodes.length);

        let $totalPacketsStatistic = $("#total-packets-statistic");
        $totalPacketsStatistic.text(totalPacketCount.toLocaleString());
    } catch (err) {
        console.log(err);
        $nodesTable.html = `${err}`;
    }
}

function buildMap(nodes) {
    if (document.getElementById('homepage-map-canvas') === null) return;

    let baseLayer = L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '...',
            maxZoom: 13
        }
    );

    let map = new L.Map('homepage-map-canvas', {
        center: new L.LatLng(36.167567024460766, -86.78540125568028),
        zoom: 9,
        maxZoom: 14,
        layers: [baseLayer]
    });

    const nodeLayerMap = L.layerGroup();
    const circleSize = 400;

    nodes.forEach((node) => {
        const location = node['location'];

        if (location !== undefined) {
            const color = node.isMeshcore ? '#4da6ff' : '#67ea94';
            const fillColor = node.isMeshcore ? '#4da6ff88' : '#67ea9488';
            nodeLayerMap.addLayer(
                L.circle([location['latitude'], location['longitude']], circleSize, {
                    color,
                    fillColor,
                    fillOpacity: 0.9,
                    weight: 2
                }).bindPopup(node['name'])
            );
        }
    });

    // Legend
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'homepage-map-legend');
        div.innerHTML =
            '<span class="hml-item"><span class="hml-dot hml-meshtastic"></span>Meshtastic</span>' +
            '<span class="hml-item"><span class="hml-dot hml-meshcore"></span>MeshCore</span>';
        return div;
    };
    legend.addTo(map);

    const heatLayer = new HeatmapOverlay({
        radius: 45,
        useLocalExtrema: true,
        maxOpacity: 0.7,
        latField: 'latitude',
        lngField: 'longitude',
        valueField: 'connections'
    })

    const scaler = 100;
    heatLayer.setData({
        data: nodes.map((node) => {
            const location = node['location'];

            if (location === undefined) {
                return null;
            }

            return {
                latitude: location['latitude'],
                longitude: location['longitude'],
                connections: node['connections'] * scaler
            }
        }).filter((result) => result !== null)
    })

    map.addLayer(heatLayer);

    map.on('zoomend', function (event) {
        if (map.getZoom() < 11) {
            map.removeLayer(nodeLayerMap);
        } else {
            map.addLayer(nodeLayerMap);
        }
    })
}

function buildNodesMap(nodes) {
    if (document.getElementById('node-map-canvas') === null) return;

    let baseLayer = L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '...',
            maxZoom: 13
        }
    );

    let map = new L.Map('node-map-canvas', {
        center: new L.LatLng(36.167567024460766, -86.78540125568028),
        zoom: 9,
        maxZoom: 14,
        layers: [baseLayer]
    });

    const nodeLayerMap = L.layerGroup();

    nodes.forEach((node) => {
        const location = node['location'];
        if (location === undefined) return;

        const isInfra = node.node?.is_infrastructure_node === 1;
        const color = isInfra ? '#ff4444' : '#67ea94';
        const fillColor = isInfra ? '#ff444488' : '#67ea9488';

        nodeLayerMap.addLayer(
            L.circleMarker([location['latitude'], location['longitude']], {
                radius: 7,
                color: color,
                fillColor: fillColor,
                fillOpacity: 0.9,
                weight: 2
            }).bindPopup(node['name'])
        );
    });

    map.addLayer(nodeLayerMap);
}

function handleNodePageResizing() {
    const $nodesTable = $("#nodes-table");
    if (!$nodesTable) return;

    const $nodesTableHead = $nodesTable.find("thead");
    const $nodesTableBody = $nodesTable.find("tbody#nodes-table-body");
    const $spanResizeInformation = $("span#resize-information");
    if (window.outerWidth < 500) {
        $nodesTableHead.find("#node-packet-count-column").attr('hidden', true);
        $nodesTableHead.find("#node-avg-snr-column").attr('hidden', true);

        $nodesTableBody.find('td#node-packet-count-column').attr('hidden', true);
        $nodesTableBody.find('td#node-avg-snr-column').attr('hidden', true);

        let message = "⚠️ Rotate your device to view additional table columns.";
        $spanResizeInformation.text(message);
    } else {
        $nodesTableHead.find("#node-packet-count-column").attr('hidden', false);
        $nodesTableHead.find("#node-avg-snr-column").attr('hidden', false);

        $nodesTableBody.find('td#node-packet-count-column').attr('hidden', false);
        $nodesTableBody.find('td#node-avg-snr-column').attr('hidden', false);

        $spanResizeInformation.text(null);
    }
}

async function fetchPotatoNodes() {
    const fourDaysMs = 4 * 24 * 60 * 60 * 1000;
    const response = await fetch('https://potato.nashme.sh/api/nodes?limit=10000');
    if (!response.ok) throw new Error('Failed to load potato nodes');
    const nodes = await response.json();
    return nodes
        .filter((n) => n.latitude && n.longitude)
        .filter((n) => !n.last_seen_iso || (Date.now() - new Date(n.last_seen_iso).getTime()) <= fourDaysMs)
        .map((n) => ({
            name: n.long_name || n.short_name || n.node_id || 'Unknown',
            connections: n.snr != null ? Math.max(n.snr + 20, 1) : 1,
            isMeshcore: n.protocol && n.protocol.toLowerCase().includes('meshcore'),
            location: { latitude: n.latitude, longitude: n.longitude }
        }));
}

document.addEventListener("DOMContentLoaded", function () {
    // Homepage map — fed from Potato (last 4 days only)
    if (document.getElementById('homepage-map-canvas')) {
        fetchPotatoNodes().then((nodes) => {
            buildMap(nodes);
        }).catch((err) => console.error('potato:', err));
    }

    // Nodes page — fed from Malla
    if (document.getElementById('node-map-canvas') || document.getElementById('nodes-table-body')) {
        fetchNodePageInformation().then((nodes) => {
            buildNodesInformation(nodes);
            buildNodesMap(nodes);
            handleNodePageResizing();
        });
    }

    $(window).on('resize', function () {
        handleNodePageResizing();
    });
});
