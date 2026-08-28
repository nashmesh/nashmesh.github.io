---
template: map_fullscreen.html
---
<div id="map-top-bar">
  <div class="map-control-group map-role-group">
    <button class="map-filter-btn map-role-btn active" data-role="all">All Roles</button>
    <button class="map-filter-btn map-role-btn" data-role="router" title="Routers & Repeaters" aria-label="Routers & Repeaters"><svg class="map-role-glyph" viewBox="0 0 20 20" aria-hidden="true"><polygon points="10,3.5 16.5,16.5 3.5,16.5" fill="currentColor"/></svg></button>
    <button class="map-filter-btn map-role-btn" data-role="client" title="Clients" aria-label="Clients"><svg class="map-role-glyph" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="6" fill="currentColor"/></svg></button>
    <button class="map-filter-btn map-role-btn" data-role="server" title="Servers & Bases" aria-label="Servers & Bases"><svg class="map-role-glyph" viewBox="0 0 20 20" aria-hidden="true"><polygon points="10,2.5 17.5,10 10,17.5 2.5,10" fill="currentColor"/></svg></button>
  </div>
  <div class="map-stats map-top-stats">
    <div class="map-stat-card">
      <span class="map-stat-value" id="stat-total">—</span>
      <span class="map-stat-label">Total</span>
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
      <small>Data from <a href="https://analyzer.nashme.sh">MeshCore Analyzer</a></small>
    </div>
  </div>
</div>

<div id="map-controls">
  <button id="map-controls-toggle" type="button" title="Map controls" aria-label="Toggle map controls" aria-expanded="false">
    <svg viewBox="0 0 20 20" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
      <line x1="3" y1="6.5" x2="17" y2="6.5"/><circle cx="8" cy="6.5" r="2.3" fill="currentColor" stroke="none"/>
      <line x1="3" y1="13.5" x2="17" y2="13.5"/><circle cx="13" cy="13.5" r="2.3" fill="currentColor" stroke="none"/>
    </svg>
  </button>
  <div id="map-utility-panel">
    <div class="map-utility-controls">
      <label class="map-utility-row" id="map-cluster-btn">
        <span class="map-utility-label">Cluster</span>
        <span class="map-utility-switch active">
          <span class="map-utility-thumb"></span>
        </span>
      </label>
      <label class="map-utility-row" for="map-layer-select">
        <span class="map-utility-label">Base map</span>
        <select class="map-utility-select" id="map-layer-select">
          <option value="Dark">Dark</option>
          <option value="Light">Light</option>
          <option value="Standard">Standard</option>
          <option value="Satellite">Satellite</option>
        </select>
      </label>

    </div>
  </div>
</div>

<div id="potato-map-canvas"></div>
<p id="potato-map-status"></p>
