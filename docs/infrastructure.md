---
title: Infrastructure Status
description: Live health and performance status for NashMesh's core infrastructure repeaters.
template: base_no_sidebar.html
---
# Infrastructure Status

Live health and performance data for NashMesh's core infrastructure repeaters, pulled directly from the [MeshCore Analyzer](https://analyzer.nashme.sh).

<div class="infra-summary" id="infra-summary">
  <div class="infra-summary-card">
    <span class="infra-summary-value" id="infra-stat-total">—</span>
    <span class="infra-summary-label">Nodes</span>
  </div>
  <div class="infra-summary-card">
    <span class="infra-summary-value infra-summary-value--good" id="infra-stat-online">—</span>
    <span class="infra-summary-label">Online</span>
  </div>
  <div class="infra-summary-card">
    <span class="infra-summary-value" id="infra-stat-relays">—</span>
    <span class="infra-summary-label">Relays (24h)</span>
  </div>
</div>

<div class="infra-map-wrap">
  <div class="infra-map-scanlines"></div>
  <div class="infra-map-label">// NETWORK TRACKING //</div>
  <div id="infra-map"></div>
</div>

<p class="infra-status-msg" id="infra-status-msg">Loading infrastructure health data…</p>

<div class="infra-grid" id="infra-grid"></div>

<p class="infra-footnote">Refreshed automatically every 2 minutes.</p>
