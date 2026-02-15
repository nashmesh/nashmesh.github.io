const url = "https://malla.tnmesh.org";

async function fetchInfrastructureNodesByRegion() {
    const response = await fetch(`${url}/api/infrastructure-nodes/by-region`);
    if (!response.ok) throw new Error(`Failed to load infrastructure nodes by region`);

    const data = await response.json();
    return data['data'];
}

async function fetchLocations() {
    return await fetchNetworkGraph(24 * 5, -50);
}

async function fetchDataForId(id) {
    const response = await fetch(`${url}/api/node/${id}/info`);
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
    const response = await fetch(`${url}/api/high-connections?hours=${hours}&min_snr=${min_snr}`);
    if (!response.ok) throw new Error(`Failed to load network graph`);
    const data = await response.json();
    const nodes = data['nodes']

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
            let config = {
                color: '#67EA94',
                fillColor: '#67EA9488',
                fillOpacity: 100
            }

            nodeLayerMap.addLayer(
                L.circle([location['latitude'], location['longitude']], circleSize, config).bindPopup(node['name'])
            )
        }
    })

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

        if (location !== undefined) {
            let config = {}

            if (node.node?.is_infrastructure_node === 1) {
                config['icon'] = L.icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                });
                config['zIndexOffset'] = 1000;

            }

            nodeLayerMap.addLayer(
                L.marker([location['latitude'], location['longitude']], config).bindPopup(node['name'])
            )
        }
    })

    map.addLayer(nodeLayerMap);
}

function handleNodePageResizing() {
    const $nodesTable = $("#nodes-table");
    if (!$nodesTable) return;

    const $nodesTableHead = $nodesTable.find("thead");
    const $nodesTableBody = $nodesTable.find("tbody#nodes-table-body");
    const $spanResizeInformation = $("span#resize-information");
    if (window.innerWidth < 500) {
        $nodesTableHead.find("#node-packet-count-column").attr('hidden', true);
        $nodesTableHead.find("#node-avg-snr-column").attr('hidden', true);

        $nodesTableBody.find('td#node-packet-count-column').attr('hidden', true);
        $nodesTableBody.find('td#node-avg-snr-column').attr('hidden', true);

        $spanResizeInformation.text("⚠️ Rotate your device to view additional table columns.");
    } else {
        $nodesTableHead.find("#node-packet-count-column").attr('hidden', false);
        $nodesTableHead.find("#node-avg-snr-column").attr('hidden', false);

        $nodesTableBody.find('td#node-packet-count-column').attr('hidden', false);
        $nodesTableBody.find('td#node-avg-snr-column').attr('hidden', false);

        $spanResizeInformation.text(null);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Fetch node information from Malla
    fetchLocations().then((nodes) => {
        buildMap(nodes);
        buildNodesInformation(nodes);
        buildNodesMap(nodes);
        handleNodePageResizing();
    });

    $(window).on('resize', function () {
        handleNodePageResizing();
    });
});
