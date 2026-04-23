# Node Map

Live map of active NashMesh nodes in the Middle Tennessee area. Data is pulled from [Potato Map](https://potato.nashme.sh) and refreshes on page load.

<div class="map-legend">
  <span class="map-legend-item map-legend-meshtastic">Meshtastic</span>
  <span class="map-legend-item map-legend-meshcore">MeshCore</span>
</div>

<div id="potato-map-canvas" style="width: 100%; height: 65vh; z-index: 1; border-radius: 6px; margin-top: 1rem;"></div>

<p id="potato-map-status" style="font-size: 0.85rem; opacity: 0.6; margin-top: 0.5rem;"></p>

<div id="node-list-container">
  <input id="node-search" type="text" placeholder="Search nodes…" autocomplete="off">
  <ul id="node-list"></ul>
</div>

