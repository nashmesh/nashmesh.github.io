const url = "https://malla.staging.tnmesh.org";

async function fetchInfrastructureNodesByRegion() {
    const response = await fetch(`${url}/api/infrastructure-nodes/by-region`);
    if (!response.ok) throw new Error(`Failed to load infrastructure nodes by region`);

    const data = await response.json();
    return data['data'];
}

async function fetchLocations() {
    const response = await fetch(`${url}/api/locations?region=Middle`);
    if (!response.ok) throw new Error(`Failed to load locations`);

    const data = await response.json();

    return data['locations'];
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

async function fetchNetworkGraph() {
    const response = await fetch(`${url}/api/traceroute/graph?hours=24&min_snr=-20`);
    if (!response.ok) throw new Error(`Failed to load network graph`);
    const data = await response.json();
    const nodes = data['nodes']

    // set to descending order based on the connections column
    nodes.sort((a, b) => b.connections - a.connections);

    return nodes;
}

function convertTimestampToText(time) {
    const lastUpdate = new Date(time);
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

async function buildHighSNRNodeConnectionsTable() {
    const container = document.getElementById("table-high-snr-node-connections");
    if (!container) return;

    container.innerHTML = "<em>Loading…</em>";

    try {
        const results = await fetchNetworkGraph();

        let html = `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Connections</th>
                    <th>Packet Count</th>
                    <th>Average SNR</th>
                    <th>Last Seen</th>
                </tr>
            </thead>
            <tbody>
        `;

        results.forEach((item, index) => {
            html += `
            <tr>
                <td><a href="https://malla.tnmesh.org/node/${item.id}">${item.name}</a></td>
                <td>${item.connections}</td>
                <td>${item.packet_count}</td>
                <td>${item.avg_snr ? `${item.avg_snr}dB` : 'Unknown'}</td>
                <td>${convertTimestampToText(item.last_seen * 1000)}</td>
            </tr>
        `;
        });

        html += `
            </tbody>
        </table>
    `;

        container.innerHTML = html;
    } catch (err) {
        container.innerHTML = `<p style="color:red;">${err}</p>`;
    }
}

async function buildInfrastructureNodesTable(index, nodes) {
    const container = document.getElementById(`table-infrastructure-node-status-${index}`);
    if (!container) return;

    container.innerHTML = "<em>Loading…</em>";

    try {
        if (nodes.length === 0) {
            container.innerHTML = "<em>Empty</em>";
            return;
        }

        nodes.sort((a, b) => a.last_packet_time_diff - b.last_packet_time_diff)

        let html = `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Last Seen</th>
                    <th>24hr Packet Count</th>
                </tr>
            </thead>
            <tbody>
        `;

        nodes.forEach((item, index) => {
            let status = '✅';
            // 12 hours without being seen
            if (item.last_packet_time_diff > 60 * 60 * 12) {
                status = '❌';
            // 6 hours without being seen
            } else if(item.last_packet_time_diff > 60 * 60 * 6) {
                status = '⚠️';
            }

            html += `
            <tr>
                <td><a href="https://malla.tnmesh.org/node/${item.node_id}">${item.long_name} (${item.short_name})</a></td>
                <td>${item.role}</td>
                <td>${status} ${convertTimestampToText(item.last_packet_time * 1000)}</td>
                <td>${item.packet_count_24h}</td>
            </tr>
        `;
        });

        html += `
            </tbody>
        </table>
        `;

        container.innerHTML = html;

    } catch (err) {
        container.innerHTML = `<p style="color:red;">${err}</p>`;
    }
}


document$.subscribe(() => {
    buildHighSNRNodeConnectionsTable();

    fetchInfrastructureNodesByRegion().then((data) => {
        const keys = Object.keys(data).concat(['Middle'])

        keys.forEach((key) => {
            const nodes = data[key] ?? [];

            buildInfrastructureNodesTable(key.toLowerCase(), nodes);
        });
    });

let baseLayer = L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '...',
        maxZoom: 13
    }
    );

    let map = new L.Map('map-canvas', {
        center: new L.LatLng(35.90370, -86.59960),
        zoom: 9,
        maxZoom: 11,
        layers: [baseLayer]
    });

    fetchLocations().then((locations) => {
        const nodeLayerMap = L.layerGroup();
        const circleSize = 400;

        locations.forEach((location) => {
            let config = {
                color: '#67EA94',
                fillColor: '#67EA9488',
                fillOpacity: 1
            }

            if (location.is_infrastructure_node !== null) {
                config['red'] = 'red';
                config['fillColor'] = '#ff1515b9';
                config['fillOpacity'] = 1;
            }

            nodeLayerMap.addLayer(
                L.circle([location['latitude'], location['longitude']], circleSize, config).bindPopup(location['display_name'])
            )
        })

        const heatLayer = L.heatLayer(
            locations.map(function (location) {
                return [location['latitude'], location['longitude'], location['age_hours'] / 10];
            }),
            {
                radius: 15,

            }
        ).addTo(map)

        map.on('zoomend', function (event) {
            if (map.getZoom() < 10) {
                map.addLayer(heatLayer);
                map.removeLayer(nodeLayerMap);
            } else {
                map.addLayer(nodeLayerMap);
                map.removeLayer(heatLayer);
            }
        })
    });
});
