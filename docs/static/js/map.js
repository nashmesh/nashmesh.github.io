const url = "https://malla.tnmesh.org";

async function fetchLocations() {
    const response = await fetch(`${url}/api/locations?region=Middle`);
    if (!response.ok) throw new Error(`Failed to load locations`);

    const data = await response.json();

    return data['locations'];
}

document$.subscribe(() => {
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
                return [location['latitude'], location['longitude'], location['age_hours'] / 2];
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
