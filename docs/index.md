---
template: base_no_sidebar.html
---

<img src="static/images/main.jpg" class="hp-hero-img" alt="NashMesh network">

<div id="banner-container"></div>

<div class="hp-hero">
  <p class="hp-tagline">Our mission is to provide a reliable mesh network along with resources, guidance, and support for anyone who would like to use the network.</p>
  <div class="hp-ctas">
    <a href="/getting-started/meshcore/" class="hp-cta hp-cta-primary">Get Started</a>
    <a href="https://discord.gg/sSS8gEpuh8" class="hp-cta hp-cta-secondary" target="_blank" rel="noopener">Join Discord</a>
  </div>
</div>

<div class="hp-about">
  <p>NashMesh uses <a href="https://meshcore.io" target="_blank" rel="noopener"><img src="static/images/meshcore-logo.png" class="hp-inline-logo" alt=""> MeshCore</a> as its official platform. MeshCore is an open-source, decentralized mesh network built on LoRa radios, designed for long-range communication without relying on traditional infrastructure. Each node relays messages for others, extending range and resilience with no internet required. <a href="/getting-started/platforms/">Learn more</a></p>
</div>

<div class="hp-map-section">
  <div class="hp-map-header">
    <div class="hp-section-title">Network Coverage</div>
    <div class="hp-section-sub">Active nodes reported in the last 4 days. Zoom in to explore. <a href="/map/">View the full network map</a></div>
  </div>
  <div id="homepage-map-canvas" style="width: 100%; height: 55vh; z-index: 1; border-radius: 6px"></div>
</div>

<div class="hp-community">
  <div class="hp-community-col">
    <div class="hp-community-title">Recent Posts</div>
    <div id="hp-posts"></div>
    <a href="/posts/" class="hp-community-more">All posts →</a>
  </div>
  <div class="hp-community-col">
    <div class="hp-community-title">Meetups</div>
    <div id="hp-meetups"></div>
  </div>
</div>

<script>window.NASHME_POSTS = {{ recent_posts_json() }}; window.NASHME_MEETUPS = {{ recent_meetups_json() }};</script>
