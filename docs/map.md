# Node Map

Live map of active NashMesh nodes in the Middle Tennessee area. Data is pulled from [Potato Map](https://potato.nashme.sh) and refreshes on page load.

<div class="map-controls">
  <button class="map-filter-btn active" data-filter="all"><span class="map-filter-dot map-filter-dot-all"></span>All</button>
  <button class="map-filter-btn map-filter-meshtastic" data-filter="meshtastic"><img src="../static/images/meshtastic-logo.svg" class="map-filter-logo" alt=""><span class="map-filter-dot map-filter-dot-meshtastic"></span>Meshtastic</button>
  <button class="map-filter-btn map-filter-meshcore" data-filter="meshcore"><img src="../static/images/meshcore-logo.png" class="map-filter-logo" alt=""><span class="map-filter-dot map-filter-dot-meshcore"></span>MeshCore</button>
</div>

<div id="potato-map-canvas" style="width: 100%; height: 65vh; z-index: 1; border-radius: 6px; margin-top: 1rem;"></div>

<p id="potato-map-status" style="font-size: 0.85rem; opacity: 0.6; margin-top: 0.5rem;"></p>

<div id="node-list-container">
  <input id="node-search" type="text" placeholder="Search nodes…" autocomplete="off">
  <ul id="node-list"></ul>
</div>

