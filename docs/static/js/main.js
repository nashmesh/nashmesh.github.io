const url = "https://malla.tnmesh.org";

async function fetchLocations() {
    const response = await fetch(`${url}/api/locations`);
    if (!response.ok) throw new Error(`Failed to load locations`);

    const data = await response.json();

    return data['locations'];
}

document$.subscribe(() => {
    let baseLayer = L.tileLayer(
        'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
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
                color: 'blue',
                fillColor: '#4adec5b9',
                fillOpacity: 1
            }

            if (location.is_infrastructure_node !== null) {
                config = {
                    color: 'red',
                    fillColor: '#ff1515b9',
                    fillOpacity: 1
                }
            }

            nodeLayerMap.addLayer(
                L.circle([location['latitude'], location['longitude']], circleSize, config).bindPopup(location['display_name'])
            )
        })

        // nodeLayerMap.addTo(map);

        // nodes.forEach((location) => {
        //     L.circle([location['latitude'], location['longitude']], circleSize).bindPopup(location['display_name']).addTo(map)
        // })

        L.heatLayer(
            locations.map(function (location) {
                return [location['latitude'], location['longitude'], location['age_hours'] / 10];
            }),
            {
                radius: 10,

            }
        ).addTo(map)

        map.on('zoomend', function (event) {
            if (map.getZoom() < 10) {
                map.removeLayer(nodeLayerMap);
            } else {
                map.addLayer(nodeLayerMap);
            }
        })
    });
});
