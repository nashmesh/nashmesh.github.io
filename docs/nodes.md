---
template: base_no_sidebar.html
---
# Nodes
<div style="padding: 10px">
    <div id="node-map-canvas" style="width: 100%; height: 40vh">
        Loading Map...
    </div>
</div>

<div style="padding: 10px">
    <div class="stats-container">
        <div class="stat-card">
            <div class="stat-label">Active Nodes Online</div>
            <span id="nodes-online-statistic" class="stat-value">Loading...</span>
        </div>
        <div class="stat-card">
            <div class="stat-label">Packets Seen</div>
            <span id="total-packets-statistic" class="stat-value">Loading...</span>
        </div>
    </div>
</div>

Nodes displayed have an average SNR of ≥ -50dB or more over a 5 day period. Data for this table is pulled from [here](https://malla.nashme.sh/traceroute-graph).

Infrastructure nodes are shaded as <span style="color: steelblue">blue</span> on the table and <span style="color: red">red</span> on the map.

<table id="nodes-table" hidden>
    <thead>
        <tr>
            <th>Name</th>
            <th>Connections</th>
            <th>Packet Count</th>
            <th>Average SNR</th>
            <th>Last Seen</th>
        </tr>
    </thead>
    <tbody id="nodes-table-body">
        Loading Table...
    </tbody>
</table>