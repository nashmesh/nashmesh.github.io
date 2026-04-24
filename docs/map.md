---
template: base_no_sidebar.html
---
<!--
# Node Map

Map of active NashMesh nodes. Data is pulled from [Potato Map](https://potato.nashme.sh). Only nodes seen within the last 4 days are shown. -->

<div class="map-toolbar">
  <div class="map-controls">
    <button class="map-filter-btn active" data-filter="all"><span class="map-filter-dot map-filter-dot-all"></span>All</button>
    <button class="map-filter-btn map-filter-meshtastic" data-filter="meshtastic"><img src="../static/images/meshtastic-logo.svg" class="map-filter-logo" alt=""><span class="map-filter-dot map-filter-dot-meshtastic"></span>Meshtastic</button>
    <button class="map-filter-btn map-filter-meshcore" data-filter="meshcore"><img src="../static/images/meshcore-logo.png" class="map-filter-logo" alt=""><span class="map-filter-dot map-filter-dot-meshcore"></span>MeshCore</button>
    <button id="map-refresh-btn" class="map-refresh-btn" disabled>↻ Refresh</button>
  </div>
  <div class="map-stats">
    <div class="map-stat-card">
      <span class="map-stat-value" id="stat-total">—</span>
      <span class="map-stat-label">Total</span>
    </div>
    <div class="map-stat-card">
      <span class="map-stat-value map-stat-meshtastic" id="stat-meshtastic">—</span>
      <span class="map-stat-label">Meshtastic</span>
    </div>
    <div class="map-stat-card">
      <span class="map-stat-value map-stat-meshcore" id="stat-meshcore">—</span>
      <span class="map-stat-label">MeshCore</span>
    </div>
  </div>
</div>

<div class="map-layout">
  <div id="node-list-container">
    <input id="node-search" type="text" placeholder="Search nodes…" autocomplete="off">
    <div class="node-sort-bar">
      <button class="node-sort-btn active" data-sort="lastseen">Recent</button>
      <button class="node-sort-btn" data-sort="alpha">A–Z</button>
    </div>
    <ul id="node-list"></ul>
  </div>
  <div class="map-canvas-wrap">
    <div id="potato-map-canvas"></div>
    <p id="potato-map-status"></p><small>Data provided by <a href="https://potato.nasme.sh">Potato</a></small>
  </div>
</div>
