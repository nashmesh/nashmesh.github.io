---
template: map_fullscreen.html
---
<div id="map-top-bar">
  <div class="map-control-group">
    <button class="map-filter-btn active" data-filter="all"><span class="map-filter-dot map-filter-dot-all"></span>All</button>
    <button class="map-filter-btn map-filter-meshtastic" data-filter="meshtastic"><img src="../static/images/meshtastic-logo.svg" class="map-filter-logo" alt="Meshtastic"><span class="map-filter-dot map-filter-dot-meshtastic"></span></button>
    <button class="map-filter-btn map-filter-meshcore" data-filter="meshcore"><img src="../static/images/meshcore-logo.png" class="map-filter-logo" alt="MeshCore"><span class="map-filter-dot map-filter-dot-meshcore"></span></button>
  </div>
  <div class="map-stats map-top-stats">
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
  <div class="map-action-group">
    <button id="map-center-btn" class="map-refresh-btn">⊕ Center</button>
    <button id="map-refresh-btn" class="map-refresh-btn" disabled>↻ Refresh</button>
  </div>
</div>

<div id="map-side-panel">
  <div id="map-panel-toggle" role="button" aria-label="Toggle node list"></div>
  <div class="map-panel-inner">
    <div class="map-panel-header">
      <span class="map-panel-title">Nodes</span>
      <button id="map-panel-close" aria-label="Close">✕</button>
    </div>

    <div class="node-list-controls">
      <input id="node-search" type="text" placeholder="Search nodes…" autocomplete="off">
      <div class="node-sort-bar">
        <button class="node-sort-btn active" data-sort="lastseen">Recent</button>
        <button class="node-sort-btn" data-sort="alpha">A–Z</button>
      </div>
    </div>
    <ul id="node-list"></ul>

    <div class="map-panel-footer">
      <small>Data from <a href="https://potato.nashme.sh">Potato</a></small>
    </div>
  </div>
</div>

<div id="map-utility-panel">
  <div id="map-utility-handle" title="Drag to move">Map Controls</div>
  <div class="map-utility-controls">
    <label class="map-utility-row" id="map-cluster-btn">
      <span class="map-utility-label">Cluster</span>
      <span class="map-utility-switch active">
        <span class="map-utility-thumb"></span>
      </span>
    </label>
  </div>
</div>

<div id="potato-map-canvas"></div>
<p id="potato-map-status"></p>
