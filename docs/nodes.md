---
template: base_no_sidebar.html
---
# Nodes
<div style="padding: 10px">
<div id="node-map-canvas" style="width: 100%; height: 40vh"></div>
</div>

Below are nodes that have an average SNR of ≥ -50dB or more (over a 5 day period). Data for this table is pulled from [here](https://malla.nashme.sh/traceroute-graph).

Infrastructure nodes are shaded as <span style="color: steelblue">blue</span>.

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
        <!-- Loading -->
    </tbody>
</table>