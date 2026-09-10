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

<div class="hp-neighbors">
  <div class="hp-section-title">Neighboring Mesh Communities</div>
  <div class="hp-section-sub">We&rsquo;re not the only community out here doing great things. Check out these other cool mesh communities that might be in your area!</div>
  <svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
    <symbol id="hp-icon-globe" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 0 1 5.08 16zm2.95-8H5.08a7.987 7.987 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></symbol>
    <symbol id="hp-icon-discord" viewBox="0 0 24 24"><path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.197.373.291a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.892.076.076 0 0 0-.041.107c.36.698.772 1.363 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.673-3.549-13.66a.06.06 0 0 0-.031-.028ZM8.02 15.33c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.332-.955 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.332-.946 2.418-2.157 2.418Z"/></symbol>
  </svg>
  <div class="hp-cards">
    <div class="hp-card">
      <img src="static/images/communities/tennmesh-on-dark.svg" class="hp-card-logo hp-card-logo-on-dark" alt="">
      <img src="static/images/communities/tennmesh-on-light.svg" class="hp-card-logo hp-card-logo-on-light" alt="">
      <div class="hp-card-body">
        <div class="hp-card-title">TennMesh</div>
        <div class="hp-card-desc">Statewide across Tennessee, on MeshCore.</div>
        <div class="hp-card-links">
        <a href="https://tennmesh.com" class="hp-card-link hp-card-link-site" target="_blank" rel="noopener"><svg class="hp-card-icon" aria-hidden="true"><use href="#hp-icon-globe"></use></svg>tennmesh.com</a>
        <a href="https://discord.gg/XGhftQw9Mt" class="hp-card-link hp-card-link-discord" target="_blank" rel="noopener"><svg class="hp-card-icon" aria-hidden="true"><use href="#hp-icon-discord"></use></svg>Discord</a>
        </div>
      </div>
    </div>
    <div class="hp-card">
      <img src="static/images/communities/ucmesh.svg" class="hp-card-logo" alt="">
      <div class="hp-card-body">
        <div class="hp-card-title">UCMesh</div>
        <div class="hp-card-desc">The 14 counties of Tennessee's Upper Cumberland, on MeshCore.</div>
        <div class="hp-card-links">
        <a href="https://ucme.sh" class="hp-card-link hp-card-link-site" target="_blank" rel="noopener"><svg class="hp-card-icon" aria-hidden="true"><use href="#hp-icon-globe"></use></svg>ucme.sh</a>
        </div>
      </div>
    </div>
    <div class="hp-card">
      <img src="static/images/communities/chattamesh.png" class="hp-card-logo" alt="">
      <div class="hp-card-body">
        <div class="hp-card-title">ChattaMesh</div>
        <div class="hp-card-desc">Chattanooga and the surrounding region, on MeshCore.</div>
        <div class="hp-card-links">
        <a href="https://chattame.sh" class="hp-card-link hp-card-link-site" target="_blank" rel="noopener"><svg class="hp-card-icon" aria-hidden="true"><use href="#hp-icon-globe"></use></svg>chattame.sh</a>
        <a href="https://discord.gg/XF354A3e9m" class="hp-card-link hp-card-link-discord" target="_blank" rel="noopener"><svg class="hp-card-icon" aria-hidden="true"><use href="#hp-icon-discord"></use></svg>Discord</a>
        </div>
      </div>
    </div>
    <div class="hp-card">
      <img src="static/images/communities/mtnmesh.svg" class="hp-card-logo" alt="">
      <div class="hp-card-body">
        <div class="hp-card-title">Mountain Mesh</div>
        <div class="hp-card-desc">The southern Appalachian Mountains, on MeshCore and Meshtastic.</div>
        <div class="hp-card-links">
        <a href="https://mtnme.sh" class="hp-card-link hp-card-link-site" target="_blank" rel="noopener"><svg class="hp-card-icon" aria-hidden="true"><use href="#hp-icon-globe"></use></svg>mtnme.sh</a>
        <a href="https://discord.gg/4WN32RHGSs" class="hp-card-link hp-card-link-discord" target="_blank" rel="noopener"><svg class="hp-card-icon" aria-hidden="true"><use href="#hp-icon-discord"></use></svg>Discord</a>
        </div>
      </div>
    </div>
  </div>
</div>

<script>window.NASHME_POSTS = {{ recent_posts_json() }}; window.NASHME_MEETUPS = {{ recent_meetups_json() }};</script>
