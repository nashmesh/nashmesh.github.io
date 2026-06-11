<h1 class="page-title-with-logo"><img src="../../static/images/meshcore-logo.png" class="page-title-logo" alt="MeshCore">MeshCore</h1>

## Quick Setup

<div class="content-section content-section--a">
<h4>Companion</h4>

<div class="fc-step"><span class="fc-step-num">1</span><span>Flash firmware using the <a href="https://flasher.meshcore.io">MeshCore Web Flasher</a>.</span></div>
<div class="fc-step"><span class="fc-step-num">2</span><span>Open Settings → Radio → pick the <strong>USA/Canada</strong> preset, then confirm these values:</span></div>

<div class="fc-settings-list" style="margin:0.3rem 0 0.5rem">
  <div class="fc-setting"><span class="fc-setting-label">Frequency</span><span class="fc-setting-value">910.525 MHz</span></div>
  <div class="fc-setting"><span class="fc-setting-label">Bandwidth</span><span class="fc-setting-value">62.5 kHz</span></div>
  <div class="fc-setting"><span class="fc-setting-label">Spreading Factor</span><span class="fc-setting-value">7</span></div>
  <div class="fc-setting fc-setting--last"><span class="fc-setting-label">Coding Rate</span><span class="fc-setting-value">5</span></div>
</div>

<div class="fc-step"><span class="fc-step-num">3</span><span>Settings → Experimental → Default Path Hash Size → <strong>2-Byte</strong>.</span></div>
<div class="fc-step"><span class="fc-step-num">4</span><span>Send an advert to announce yourself to the mesh.</span></div>
</div>

<div class="content-section content-section--a" style="margin-top:0.5rem">
<h4>Repeater</h4>

<div class="fc-step"><span class="fc-step-num">1</span><span>Flash firmware using the <a href="https://flasher.meshcore.io">MeshCore Web Flasher</a>. For OTA updates, download the <strong>un-merged</strong> <code>.bin</code>.</span></div>
<div class="fc-step"><span class="fc-step-num">2</span><span>Set radio and reboot:</span></div>
<div class="copyable-code" style="margin:0.2rem 0 0.2rem"><pre><code>set radio 910.525,62.5,7,5</code></pre></div>
<div class="copyable-code" style="margin:0 0 0.5rem"><pre><code>reboot</code></pre></div>
<div class="fc-step"><span class="fc-step-num">3</span><span>Routing and reliability:</span></div>
<div class="copyable-code" style="margin:0.2rem 0 0.2rem"><pre><code>set path.hash.mode 1</code></pre></div>
<div class="copyable-code" style="margin:0 0 0.2rem"><pre><code>set loop.detect moderate</code></pre></div>
<div class="copyable-code" style="margin:0 0 0.2rem"><pre><code>set multi.acks 1</code></pre></div>
<div class="copyable-code" style="margin:0 0 0.2rem"><pre><code>set rxdelay 3</code></pre></div>
<div class="copyable-code" style="margin:0 0 0.5rem"><pre><code>set agc.reset.interval 4</code></pre></div>
<div class="fc-step"><span class="fc-step-num">4</span><span>TX delay — set both values for your neighbor count, check with <code>neighbors</code>:</span></div>
<table class="fc-table">
  <thead><tr><th>Neighbors</th><th>txdelay</th><th>direct.txdelay</th></tr></thead>
  <tbody>
    <tr><td>0 – 1</td><td>0.3</td><td>0.1</td></tr>
    <tr><td>2 – 4</td><td>0.5</td><td>0.3</td></tr>
    <tr><td>5 – 9</td><td>1</td><td>0.5</td></tr>
    <tr><td>10 – 14</td><td>1.5</td><td>1</td></tr>
    <tr><td>15 +</td><td>2</td><td>2</td></tr>
  </tbody>
</table>
<div class="copyable-code" style="margin:0.3rem 0 0.2rem"><pre><code>set txdelay &lt;value&gt;</code></pre></div>
<div class="copyable-code" style="margin:0 0 0.5rem"><pre><code>set direct.txdelay &lt;value&gt;</code></pre></div>
<div class="fc-step"><span class="fc-step-num">5</span><span>Advert intervals (zero-hop 60 min, flood 3 h):</span></div>
<div class="copyable-code" style="margin:0.2rem 0 0.2rem"><pre><code>set advert.interval 3600</code></pre></div>
<div class="copyable-code" style="margin:0 0 0.5rem"><pre><code>set flood.advert.interval 10800</code></pre></div>
<div class="fc-step"><span class="fc-step-num">6</span><span>Set your contact info so other operators can reach you:</span></div>
<div class="copyable-code" style="margin:0.2rem 0 0"><pre><code>set owner.info N0CALL | contact | site name</code></pre></div>
</div>

---

## Guide

<p style="font-size:0.85em;color:#76869a;margin:0 0 1rem">Want the full reference in print? <a href="#field-cards">Download the Field Cards PDF ↓</a></p>

### Radio Settings

<div class="fc-card-header">
  <div class="fc-badges">
    <span class="fc-badge fc-badge--green">PRESET <strong>USA/Canada</strong></span>
    <span class="fc-badge">FREQ <strong>910.525 MHz</strong></span>
    <span class="fc-badge">BW <strong>62.5 kHz</strong></span>
    <span class="fc-badge">SF <strong>7</strong></span>
    <span class="fc-badge">CR <strong>5</strong></span>
    <span class="fc-badge">RULE <strong>must match the mesh</strong></span>
  </div>
</div>

<div class="content-section content-section--b">
  <div class="fc-steps-grid">
    <div class="fc-steps-col">
      <h4>Companion app</h4>
      <div class="fc-step"><span class="fc-step-num">1</span><span>Pick the <strong>USA/Canada</strong> preset — it loads the right band plan.</span></div>
      <div class="fc-step"><span class="fc-step-num">2</span><span>Confirm frequency <strong>910.525</strong>, bandwidth <strong>62.5</strong>, SF <strong>7</strong>, CR <strong>5</strong>.</span></div>
      <div class="fc-step"><span class="fc-step-num">3</span><span>Same values on <strong>every</strong> device — companion and repeater alike.</span></div>
    </div>
    <div class="fc-steps-col">
      <h4>Repeater (CLI)</h4>
      <div class="fc-step"><span class="fc-step-num">1</span><span>Set all four radio params in one command, then reboot to apply.</span></div>
      <div class="copyable-code" style="margin-top:0.5rem"><pre><code>set radio 910.525,62.5,7,5</code></pre></div>
      <div class="copyable-code"><pre><code>reboot</code></pre></div>
      <div class="copyable-code"><pre><code>get radio</code></pre></div>
    </div>
  </div>
  <p>Frequency, bandwidth and spreading factor together define a LoRa <strong>channel</strong>. If even one differs from the rest of the mesh, your transmissions are unreadable — you'll hear nothing and no one hears you.</p>
  <div class="fc-diagram">
    <svg viewBox="0 0 820 150" role="img" style="width:100%;display:block">
      <g font-family="'Fira Mono',monospace" font-size="14">
        <text x="20" y="24" fill="#37e08a" font-weight="700">MATCH → linked</text>
        <g fill="#0c1118" stroke="#37e08a" stroke-width="2"><circle cx="115" cy="74" r="21"/><circle cx="300" cy="74" r="21"/></g>
        <circle cx="115" cy="74" r="3.6" fill="#37e08a"/><circle cx="300" cy="74" r="3.6" fill="#37e08a"/>
        <line x1="138" y1="74" x2="277" y2="74" stroke="#37e08a" stroke-width="2.6"/>
        <g stroke="#37e08a" stroke-width="1.6" opacity=".55" fill="none"><path d="M192 60 q15 -11 30 0"/><path d="M192 88 q15 11 30 0"/></g>
        <text x="115" y="113" text-anchor="middle" fill="#9bf0c4" font-size="15" font-weight="700">910.525</text>
        <text x="300" y="113" text-anchor="middle" fill="#9bf0c4" font-size="15" font-weight="700">910.525</text>
        <text x="115" y="133" text-anchor="middle" fill="#6f8a7e" font-size="12.5">62.5 · SF7</text>
        <text x="300" y="133" text-anchor="middle" fill="#6f8a7e" font-size="12.5">62.5 · SF7</text>
        <line x1="410" y1="14" x2="410" y2="140" stroke="#1f2a37"/>
        <text x="442" y="24" fill="#ff6678" font-weight="700">MISMATCH → silence</text>
        <g fill="#0c1118" stroke="#2c3a4d" stroke-width="2"><circle cx="540" cy="74" r="21"/><circle cx="740" cy="74" r="21"/></g>
        <circle cx="540" cy="74" r="3.6" fill="#6b7785"/><circle cx="740" cy="74" r="3.6" fill="#ff6678"/>
        <line x1="563" y1="74" x2="717" y2="74" stroke="#ff4d63" stroke-width="2.2" stroke-dasharray="3,7"/>
        <text x="640" y="82" text-anchor="middle" fill="#ff6678" font-size="23" font-weight="700">✕</text>
        <text x="540" y="113" text-anchor="middle" fill="#c9d6e3" font-size="15" font-weight="700">910.525</text>
        <text x="740" y="113" text-anchor="middle" fill="#ff9aa6" font-size="15" font-weight="700">915.0</text>
        <text x="540" y="133" text-anchor="middle" fill="#6b7785" font-size="12.5">62.5 · SF7</text>
        <text x="740" y="133" text-anchor="middle" fill="#ff8593" font-size="12.5">62.5 · SF7</text>
      </g>
      <g class="nm-fx nm-anim-layer">
        <circle class="nm-fx nm-ping" cx="115" cy="74" r="21" fill="none" stroke="#37e08a" stroke-width="1.8">
          <animate attributeName="r" values="21;51" dur="2.6s" begin="-0.0s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.2 0 0.4 1"/>
          <animate attributeName="opacity" values="0.55;0" dur="2.6s" begin="-0.0s" repeatCount="indefinite"/>
        </circle>
        <circle class="nm-fx nm-ping" cx="115" cy="74" r="21" fill="none" stroke="#37e08a" stroke-width="1.8">
          <animate attributeName="r" values="21;51" dur="2.6s" begin="-1.3s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.2 0 0.4 1"/>
          <animate attributeName="opacity" values="0.55;0" dur="2.6s" begin="-1.3s" repeatCount="indefinite"/>
        </circle>
        <circle class="nm-fx nm-pkt" r="3.2" fill="#37e08a" opacity="0.95">
          <animateMotion dur="2.2s" begin="-0.0s" repeatCount="indefinite" calcMode="linear" path="M138 74 L277 74"/>
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.14;0.86;1" dur="2.2s" begin="-0.0s" repeatCount="indefinite"/>
        </circle>
        <circle class="nm-fx nm-pkt" r="3.2" fill="#37e08a" opacity="0.95">
          <animateMotion dur="2.2s" begin="-1.1s" repeatCount="indefinite" calcMode="linear" path="M138 74 L277 74"/>
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.14;0.86;1" dur="2.2s" begin="-1.1s" repeatCount="indefinite"/>
        </circle>
      </g>
    </svg>
    <p class="fc-caption">Same frequency / bandwidth / spreading factor = a link. Any mismatch = mutual silence.</p>
  </div>
</div>

---

### Frequency

<div class="fc-card-header">
  <div class="fc-badges">
    <span class="fc-badge fc-badge--green">NASHMESH <strong>910.525 MHz</strong></span>
    <span class="fc-badge">BAND <strong>US 902–928</strong></span>
    <span class="fc-badge">RULE <strong>must match exactly</strong></span>
    <span class="fc-badge">REBOOT <strong>to apply</strong></span>
  </div>
</div>

<div class="content-section content-section--b">
  <p>Frequency is the center of your radio channel — the precise point in the band where every transmission happens. Two radios on different frequencies are like two people on different stations: each is talking, neither hears the other. It's the <strong>first</strong> thing that has to match across the mesh.</p>
  <div class="fc-diagram">
    <svg viewBox="0 0 820 120" role="img" style="width:100%;display:block">
      <g font-family="'Fira Mono',monospace" font-size="14.5">
        <text x="14" y="16" fill="#c6e96b" font-weight="700">US ISM band · 902 – 928 MHz</text>
        <line x1="20" y1="64" x2="660" y2="64" stroke="#3a4757" stroke-width="2"/>
        <line x1="20" y1="58" x2="20" y2="70" stroke="#5a6b7d"/><text x="20" y="90" fill="#76869a" font-size="12">902</text>
        <line x1="660" y1="58" x2="660" y2="70" stroke="#5a6b7d"/><text x="660" y="90" fill="#76869a" font-size="12">928</text>
        <line x1="250" y1="54" x2="250" y2="64" stroke="#a3e635" stroke-width="2.5"/>
        <circle cx="250" cy="54" r="6.5" fill="#a3e635" stroke="#fff" stroke-width="1.5"/>
        <text x="250" y="44" text-anchor="middle" fill="#c6e96b" font-weight="700" font-size="15">910.525</text>
        <text x="250" y="106" text-anchor="middle" fill="#8aa83a" font-size="12.5">the NashMesh channel — everyone tunes here</text>
        <circle cx="730" cy="44" r="18" fill="#0c1118" stroke="#ff4d63" stroke-dasharray="3,4"/><text x="730" y="49" text-anchor="middle" fill="#ff8593" font-size="12">915?</text>
        <text x="730" y="78" text-anchor="middle" fill="#ff6678" font-size="11">wrong freq</text><text x="730" y="92" text-anchor="middle" fill="#ff6678" font-size="11">= unheard</text>
      </g>
      <g class="nm-fx nm-anim-layer">
        <circle class="nm-fx nm-ping" cx="250" cy="54" r="7" fill="none" stroke="#a3e635" stroke-width="1.8">
          <animate attributeName="r" values="7;37" dur="2.4s" begin="-0.0s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.2 0 0.4 1"/>
          <animate attributeName="opacity" values="0.55;0" dur="2.4s" begin="-0.0s" repeatCount="indefinite"/>
        </circle>
        <circle class="nm-fx nm-ping" cx="250" cy="54" r="7" fill="none" stroke="#a3e635" stroke-width="1.8">
          <animate attributeName="r" values="7;37" dur="2.4s" begin="-1.2s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.2 0 0.4 1"/>
          <animate attributeName="opacity" values="0.55;0" dur="2.4s" begin="-1.2s" repeatCount="indefinite"/>
        </circle>
        <circle class="nm-fx" cx="730" cy="44" r="18" fill="none" stroke="#ff4d63" stroke-dasharray="3,4">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="1.8s" repeatCount="indefinite"/>
        </circle>
      </g>
    </svg>
    <p class="fc-caption">Frequency is the exact point in the band where all transmissions happen. A node elsewhere is on a different station.</p>
  </div>
  <p>Every node — companion or repeater — uses <strong>910.525 MHz</strong>, inside the US 902–928 MHz ISM band that the USA/Canada preset selects. Load the preset first; it puts you in the right band, then confirm the exact frequency.</p>
</div>

---

### Bandwidth

<div class="fc-card-header">
  <div class="fc-badges">
    <span class="fc-badge fc-badge--green">NASHMESH <strong>62.5 kHz</strong></span>
    <span class="fc-badge">DIAL <strong>62.5 → 500 kHz</strong></span>
    <span class="fc-badge">NARROW <strong>= reach, slow</strong></span>
    <span class="fc-badge">MATCH <strong>network-wide</strong></span>
  </div>
</div>

<div class="content-section content-section--b">
  <p>A <strong>narrow</strong> bandwidth concentrates the signal's energy into less spectrum, so the receiver hears it more easily — more range and sensitivity — but the data rate drops and packets take longer. A <strong>wide</strong> bandwidth spreads energy out: faster data, but shorter reach and it scoops up more background noise.</p>
  <div class="fc-diagram">
    <svg viewBox="0 0 820 190" role="img" style="width:100%;display:block">
      <g font-family="'Fira Mono',monospace" font-size="13.0">
        <text x="20" y="22" fill="#7df0e0" font-weight="700">62.5 kHz — narrow</text>
        <path d="M40 150 C120 150 120 50 160 50 C200 50 200 150 280 150" fill="none" stroke="#2dd4bf" stroke-width="2.5"/>
        <line x1="40" y1="150" x2="280" y2="150" stroke="#2c3a4d"/>
        <text x="40" y="172" fill="#5e8a82">energy concentrated → sensitive · slower</text>
        <line x1="410" y1="20" x2="410" y2="170" stroke="#1f2a37"/>
        <text x="440" y="22" fill="#9aa7b6" font-weight="700">500 kHz — wide</text>
        <path d="M440 150 C520 150 520 95 600 95 C680 95 680 150 760 150" fill="none" stroke="#6f8db0" stroke-width="2.5"/>
        <line x1="440" y1="150" x2="760" y2="150" stroke="#2c3a4d"/>
        <text x="440" y="172" fill="#5e6b7d">energy spread → faster · shorter · noisier</text>
      </g>
      <g class="nm-fx nm-anim-layer">
        <circle class="nm-fx nm-pkt" r="3.6" fill="#2dd4bf" opacity="0.95">
          <animateMotion dur="4.33s" begin="-0.47s" repeatCount="indefinite" calcMode="linear" path="M40 150 C120 150 120 50 160 50 C200 50 200 150 280 150"/>
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.14;0.86;1" dur="4.33s" begin="-0.47s" repeatCount="indefinite"/>
        </circle>
        <circle class="nm-fx nm-pkt" r="3.6" fill="#6f8db0" opacity="0.95">
          <animateMotion dur="4.4s" begin="-0.2s" repeatCount="indefinite" calcMode="linear" path="M440 150 C520 150 520 95 600 95 C680 95 680 150 760 150"/>
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.14;0.86;1" dur="4.4s" begin="-0.2s" repeatCount="indefinite"/>
        </circle>
      </g>
    </svg>
    <p class="fc-caption">Narrow bandwidth packs the signal into less spectrum — easier to hear, but slower.</p>
  </div>
  <div class="fc-levels">
    <div class="fc-level fc-level--rec">
      <div class="fc-level-pick">★ NASHMESH</div>
      <div class="fc-level-name">62.5</div>
      <div class="fc-level-tag">kHz · narrow</div>
      <div class="fc-level-rows">
        <div class="fc-level-row"><span>reach</span><strong>longest</strong></div>
        <div class="fc-level-row"><span>speed</span><strong>slowest</strong></div>
        <div class="fc-level-row"><span>noise caught</span><strong>least</strong></div>
      </div>
      <p class="fc-level-note">Maximum sensitivity. Paired with fast SF7 for a reach/airtime balance.</p>
    </div>
    <div class="fc-level">
      <div class="fc-level-name" style="color:#76869a">125 / 250</div>
      <div class="fc-level-tag">kHz · mid</div>
      <div class="fc-level-rows">
        <div class="fc-level-row"><span>reach</span><strong>medium</strong></div>
        <div class="fc-level-row"><span>speed</span><strong>faster</strong></div>
        <div class="fc-level-row"><span>noise caught</span><strong>more</strong></div>
      </div>
      <p class="fc-level-note">Common defaults on other meshes; quicker but less sensitive.</p>
    </div>
    <div class="fc-level">
      <div class="fc-level-name" style="color:#7fb0d8">500</div>
      <div class="fc-level-tag">kHz · wide</div>
      <div class="fc-level-rows">
        <div class="fc-level-row"><span>reach</span><strong>shortest</strong></div>
        <div class="fc-level-row"><span>speed</span><strong>fastest</strong></div>
        <div class="fc-level-row"><span>noise caught</span><strong>most</strong></div>
      </div>
      <p class="fc-level-note">High throughput, but pulls in more interference. Not used here.</p>
    </div>
  </div>
</div>


---

### Spreading Factor

<div class="fc-card-header">
  <div class="fc-badges">
    <span class="fc-badge fc-badge--green">NASHMESH <strong>SF7</strong></span>
    <span class="fc-badge">DIAL <strong>SF7 → SF12</strong></span>
    <span class="fc-badge">RULE <strong>each +1 ≈ 2× airtime</strong></span>
    <span class="fc-badge">MATCH <strong>network-wide</strong></span>
  </div>
</div>

<div class="content-section content-section--b">
  <p>A higher SF stretches every symbol over more time, so a receiver can pull a weaker signal out of the noise — that's the extra range. The price: the packet occupies the air far longer (<strong>every step up roughly doubles airtime</strong>) and the data rate drops. Lower SF is the reverse — quick, light on the channel, shorter reach.</p>
  <div class="fc-diagram">
    <svg viewBox="0 0 820 200" role="img" style="width:100%;display:block">
      <defs>
        <linearGradient id="sf-grad" x1="0" x2="1">
          <stop offset="0" stop-color="#ff9f43"/>
          <stop offset="1" stop-color="#5b7fa8"/>
        </linearGradient>
      </defs>
      <g font-family="'Fira Mono',monospace" font-size="13.0">
        <text x="20" y="24" fill="#ffbf80" font-weight="700">SF7 — short symbols</text>
        <g stroke="#ff9f43" stroke-width="2" fill="none">
          <path d="M40 90 L70 60 L70 90 L100 60 L100 90 L130 60 L130 90 L160 60 L160 90 L190 60 L190 90"/>
        </g>
        <text x="40" y="112" fill="#6f5a44">fast · cheap airtime · shorter reach</text>
        <line x1="410" y1="20" x2="410" y2="180" stroke="#1f2a37"/>
        <text x="440" y="24" fill="#7fb0d8" font-weight="700">SF12 — stretched symbols</text>
        <g stroke="#5b7fa8" stroke-width="2" fill="none">
          <path d="M440 90 L520 60 L520 90 L600 60 L600 90 L680 60 L680 90 L760 60 L760 90"/>
        </g>
        <text x="440" y="112" fill="#5b6b7d">slow · heavy airtime · longest reach</text>
        <text x="20" y="150" fill="#76869a">RANGE &amp; AIRTIME →</text>
        <rect x="20" y="160" width="780" height="10" rx="5" fill="url(#sf-grad)"/>
        <g font-size="11.8" fill="#9aa7b6" text-anchor="middle">
          <circle cx="40" cy="165" r="6" fill="#ff9f43" stroke="#fff" stroke-width="1.5"/>
          <text x="40" y="190" fill="#ffbf80" font-weight="700">SF7</text>
          <text x="270" y="190">SF9</text><circle cx="270" cy="165" r="3" fill="#9aa7b6"/>
          <text x="780" y="190">SF12</text><circle cx="780" cy="165" r="3" fill="#9aa7b6"/>
        </g>
      </g>
      <g class="nm-fx nm-anim-layer">
        <circle class="nm-fx nm-pkt" r="3.6" fill="#ff9f43" opacity="0.95">
          <animateMotion dur="2.55s" begin="-2.01s" repeatCount="indefinite" calcMode="linear" path="M40 90 L70 60 L70 90 L100 60 L100 90 L130 60 L130 90 L160 60 L160 90 L190 60 L190 90"/>
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.14;0.86;1" dur="2.55s" begin="-2.01s" repeatCount="indefinite"/>
        </circle>
        <circle class="nm-fx nm-pkt" r="3.6" fill="#5b7fa8" opacity="0.95">
          <animateMotion dur="4.4s" begin="-0.73s" repeatCount="indefinite" calcMode="linear" path="M440 90 L520 60 L520 90 L600 60 L600 90 L680 60 L680 90 L760 60 L760 90"/>
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.14;0.86;1" dur="4.4s" begin="-0.73s" repeatCount="indefinite"/>
        </circle>
      </g>
    </svg>
    <p class="fc-caption">Each step up the dial roughly doubles time-on-air. NashMesh sits at the fast end: SF7.</p>
  </div>
  <div class="fc-levels">
    <div class="fc-level fc-level--rec">
      <div class="fc-level-pick">★ NASHMESH</div>
      <div class="fc-level-name">SF7</div>
      <div class="fc-level-tag">fast end</div>
      <div class="fc-level-rows">
        <div class="fc-level-row"><span>reach</span><strong>shorter</strong></div>
        <div class="fc-level-row"><span>airtime</span><strong>lowest</strong></div>
        <div class="fc-level-row"><span>speed</span><strong>fastest</strong></div>
      </div>
      <p class="fc-level-note">Brief packets, channel stays open. Repeater density supplies the distance.</p>
    </div>
    <div class="fc-level">
      <div class="fc-level-name" style="color:#76869a">SF9</div>
      <div class="fc-level-tag">middle</div>
      <div class="fc-level-rows">
        <div class="fc-level-row"><span>reach</span><strong>medium</strong></div>
        <div class="fc-level-row"><span>airtime</span><strong>~4× SF7</strong></div>
        <div class="fc-level-row"><span>speed</span><strong>medium</strong></div>
      </div>
      <p class="fc-level-note">A compromise some sparse rural meshes use. Heavier on the air.</p>
    </div>
    <div class="fc-level">
      <div class="fc-level-name" style="color:#7fb0d8">SF12</div>
      <div class="fc-level-tag">max range</div>
      <div class="fc-level-rows">
        <div class="fc-level-row"><span>reach</span><strong>longest</strong></div>
        <div class="fc-level-row"><span>airtime</span><strong>~30× SF7</strong></div>
        <div class="fc-level-row"><span>speed</span><strong>slowest</strong></div>
      </div>
      <p class="fc-level-note">One slow packet can hog the channel. Wrong choice for a dense metro.</p>
    </div>
  </div>
  <div class="fc-callout">
    <div class="fc-callout-ic">!</div>
    <div>
      <strong>SF is part of the channel, not a personal range boost</strong>
      <p>It's tempting to read "higher SF = more range" and turn it up. But SF must match across the mesh — raise it alone and you simply vanish from the network. Distance is the repeaters' job; your job is short, cheap packets.</p>
    </div>
  </div>
</div>

---

### Coding Rate

<div class="fc-card-header">
  <div class="fc-badges">
    <span class="fc-badge fc-badge--green">DEFAULT <strong>CR5 (4/5)</strong></span>
    <span class="fc-badge">DIAL <strong>4/5 → 4/8</strong></span>
    <span class="fc-badge">EFFECT <strong>airtime vs armor</strong></span>
    <span class="fc-badge fc-badge--green">PER-PACKET <strong>· mixable</strong></span>
  </div>
</div>

<div class="content-section content-section--b">
  <p>LoRa adds redundant bits so a receiver can rebuild a packet that arrived partly garbled. Coding rate sets how much: <strong>CR5 (4/5)</strong> adds the least — one parity block per four data blocks — so packets are short and fast but tolerate the least corruption. <strong>CR8 (4/8)</strong> adds the most: tough against interference, but each packet takes far longer on the air.</p>
  <div class="fc-diagram">
    <svg viewBox="0 0 820 190" role="img" style="width:100%;display:block">
      <g font-family="'Fira Mono',monospace" font-size="13.0">
        <text x="14" y="20" fill="#76869a">each packet = 4 data blocks + error-correction blocks</text>
        <text x="14" y="52" fill="#8fd0ff" font-weight="700">CR5 (4/5)</text>
        <rect x="150" y="38" width="22" height="22" rx="3" fill="#16314f" stroke="#3a6ea5"/><rect x="176" y="38" width="22" height="22" rx="3" fill="#16314f" stroke="#3a6ea5"/><rect x="202" y="38" width="22" height="22" rx="3" fill="#16314f" stroke="#3a6ea5"/><rect x="228" y="38" width="22" height="22" rx="3" fill="#16314f" stroke="#3a6ea5"/>
        <rect x="254" y="38" width="22" height="22" rx="3" fill="rgba(78,168,255,.18)" stroke="#4ea8ff"/>
        <text x="312" y="52" fill="#5e7187">+1 · lightest, fastest</text>
        <text x="14" y="92" fill="#9aa7b6" font-weight="700">CR6 (4/6)</text>
        <rect x="150" y="78" width="22" height="22" rx="3" fill="#16314f" stroke="#3a6ea5"/><rect x="176" y="78" width="22" height="22" rx="3" fill="#16314f" stroke="#3a6ea5"/><rect x="202" y="78" width="22" height="22" rx="3" fill="#16314f" stroke="#3a6ea5"/><rect x="228" y="78" width="22" height="22" rx="3" fill="#16314f" stroke="#3a6ea5"/>
        <rect x="254" y="78" width="22" height="22" rx="3" fill="rgba(78,168,255,.18)" stroke="#6f8db0"/><rect x="280" y="78" width="22" height="22" rx="3" fill="rgba(78,168,255,.18)" stroke="#6f8db0"/>
        <text x="338" y="92" fill="#5e7187">+2</text>
        <text x="14" y="132" fill="#9aa7b6" font-weight="700">CR7 (4/7)</text>
        <rect x="150" y="118" width="22" height="22" rx="3" fill="#16314f" stroke="#3a6ea5"/><rect x="176" y="118" width="22" height="22" rx="3" fill="#16314f" stroke="#3a6ea5"/><rect x="202" y="118" width="22" height="22" rx="3" fill="#16314f" stroke="#3a6ea5"/><rect x="228" y="118" width="22" height="22" rx="3" fill="#16314f" stroke="#3a6ea5"/>
        <rect x="254" y="118" width="22" height="22" rx="3" fill="rgba(78,168,255,.18)" stroke="#6f8db0"/><rect x="280" y="118" width="22" height="22" rx="3" fill="rgba(78,168,255,.18)" stroke="#6f8db0"/><rect x="306" y="118" width="22" height="22" rx="3" fill="rgba(78,168,255,.18)" stroke="#6f8db0"/>
        <text x="364" y="132" fill="#5e7187">+3</text>
        <text x="14" y="172" fill="#cdb3ff" font-weight="700">CR8 (4/8)</text>
        <rect x="150" y="158" width="22" height="22" rx="3" fill="#16314f" stroke="#3a6ea5"/><rect x="176" y="158" width="22" height="22" rx="3" fill="#16314f" stroke="#3a6ea5"/><rect x="202" y="158" width="22" height="22" rx="3" fill="#16314f" stroke="#3a6ea5"/><rect x="228" y="158" width="22" height="22" rx="3" fill="#16314f" stroke="#3a6ea5"/>
        <rect x="254" y="158" width="22" height="22" rx="3" fill="rgba(78,168,255,.18)" stroke="#9d7bff"/><rect x="280" y="158" width="22" height="22" rx="3" fill="rgba(78,168,255,.18)" stroke="#9d7bff"/><rect x="306" y="158" width="22" height="22" rx="3" fill="rgba(78,168,255,.18)" stroke="#9d7bff"/><rect x="332" y="158" width="22" height="22" rx="3" fill="rgba(78,168,255,.18)" stroke="#9d7bff"/>
        <text x="390" y="172" fill="#5e7187">+4 · heaviest, toughest</text>
      </g>
    </svg>
    <p class="fc-caption">More parity = more interference survived, but every extra block is more time on the air.</p>
  </div>
  <div class="fc-levels">
    <div class="fc-level fc-level--rec">
      <div class="fc-level-pick">★ DEFAULT</div>
      <div class="fc-level-name">CR5</div>
      <div class="fc-level-tag">4 / 5</div>
      <div class="fc-level-rows">
        <div class="fc-level-row"><span>overhead</span><strong>+25%</strong></div>
        <div class="fc-level-row"><span>airtime</span><strong>lowest</strong></div>
        <div class="fc-level-row"><span>resilience</span><strong>basic</strong></div>
      </div>
      <p class="fc-level-note">NashMesh default now that most links are reliable.</p>
    </div>
    <div class="fc-level">
      <div class="fc-level-name" style="color:#76869a">CR6–7</div>
      <div class="fc-level-tag">4/6 – 4/7</div>
      <div class="fc-level-rows">
        <div class="fc-level-row"><span>overhead</span><strong>+50–75%</strong></div>
        <div class="fc-level-row"><span>airtime</span><strong>higher</strong></div>
        <div class="fc-level-row"><span>resilience</span><strong>more</strong></div>
      </div>
      <p class="fc-level-note">Middle ground for moderately noisy links.</p>
    </div>
    <div class="fc-level">
      <div class="fc-level-name" style="color:#cdb3ff">CR8</div>
      <div class="fc-level-tag">4 / 8</div>
      <div class="fc-level-rows">
        <div class="fc-level-row"><span>overhead</span><strong>+100%</strong></div>
        <div class="fc-level-row"><span>airtime</span><strong>highest</strong></div>
        <div class="fc-level-row"><span>resilience</span><strong>max</strong></div>
      </div>
      <p class="fc-level-note">For a marginal far node hardening its hop to the relay.</p>
    </div>
  </div>
  <div class="fc-callout">
    <div class="fc-callout-ic">!</div>
    <div>
      <strong>Coding rate is per-packet — mixing is fine</strong>
      <p>Unlike frequency, bandwidth and spreading factor, CR rides inside each packet's header. Any receiver reads it and adapts, so a CR8 node and a CR5 node hear each other perfectly. Default to CR5; leave a marginal far node on CR8 until its link firms up.</p>
    </div>
  </div>
</div>

---

### Airtime

<div class="fc-card-header">
  <div class="fc-badges">
    <span class="fc-badge fc-badge--green">TYPE <strong>shared resource</strong></span>
    <span class="fc-badge">RULE <strong>one TX at a time</strong></span>
    <span class="fc-badge">DRIVER <strong>SF · BW · CR · size</strong></span>
    <span class="fc-badge">FLOOD <strong>cost × nodes</strong></span>
  </div>
</div>

<div class="content-section content-section--b">
  <p>Every node on NashMesh shares <strong>one</strong> frequency, and radios can't talk over each other. So airtime — how long each packet occupies the channel — is a finite, shared budget. When too many packets compete for the same moment, they <strong>collide and are lost</strong>, and the whole mesh slows down.</p>
  <div class="fc-diagram">
    <svg viewBox="0 0 820 100" role="img" style="width:100%;display:block">
      <g font-family="'Fira Mono',monospace" font-size="14">
        <text x="14" y="20" fill="#76869a">one channel · one transmitter at a time · time is the shared budget →</text>
        <rect x="14" y="30" width="792" height="36" rx="6" fill="#0c1118" stroke="#243349"/>
        <rect x="18" y="34" width="120" height="28" rx="4" fill="rgba(255,122,89,.35)" stroke="#ff7a59"/><text x="78" y="53" text-anchor="middle" fill="#ffcab9" font-size="13">packet</text>
        <rect x="142" y="34" width="70" height="28" rx="4" fill="rgba(255,122,89,.25)" stroke="#ff7a59"/>
        <rect x="216" y="34" width="150" height="28" rx="4" fill="rgba(255,122,89,.35)" stroke="#ff7a59"/><text x="291" y="53" text-anchor="middle" fill="#ffcab9" font-size="10.5">long packet (high SF/CR)</text>
        <rect x="370" y="34" width="60" height="28" rx="4" fill="rgba(255,122,89,.25)" stroke="#ff7a59"/>
        <rect x="470" y="34" width="80" height="28" rx="4" fill="rgba(255,77,99,.4)" stroke="#ff4d63"/>
        <rect x="500" y="34" width="80" height="28" rx="4" fill="rgba(255,77,99,.4)" stroke="#ff4d63"/>
        <rect x="600" y="34" width="60" height="28" rx="4" fill="rgba(255,122,89,.2)" stroke="#5a4036"/>
        <text x="720" y="53" text-anchor="middle" fill="#6b7785" font-size="13">…full?</text>
        <text x="540" y="88" text-anchor="middle" fill="#ff6678" font-size="13">overlap = COLLISION, both lost</text>
      </g>
    </svg>
    <p class="fc-caption">Every transmission claims a slice of the same timeline. Fill it up and packets collide.</p>
  </div>
  <div class="fc-settings-list" style="margin-top:0.75rem">
    <div class="fc-setting"><span class="fc-setting-label">Spreading factor <span style="color:#4a586a">(biggest lever)</span></span><span class="fc-setting-value" style="color:#ff7a59">each +1 ≈ 2×</span></div>
    <div class="fc-setting"><span class="fc-setting-label">Narrow bandwidth</span><span class="fc-setting-value" style="color:#ffb38a">halving BW ≈ 2×</span></div>
    <div class="fc-setting"><span class="fc-setting-label">Heavier coding rate (CR8 vs CR5)</span><span class="fc-setting-value" style="color:#ffb38a">≈ 1.6×</span></div>
    <div class="fc-setting"><span class="fc-setting-label">Bigger payload</span><span class="fc-setting-value" style="color:#ffb38a">linear</span></div>
    <div class="fc-setting fc-setting--last"><span class="fc-setting-label">Re-flooding (every repeater repeats it)</span><span class="fc-setting-value" style="color:#ff7a59">× nodes that hear it</span></div>
  </div>
  <div class="fc-callout" style="margin-top:0.75rem">
    <div class="fc-callout-ic">!</div>
    <div>
      <strong>Airtime is the budget every other setting spends</strong>
      <p>SF, bandwidth, coding rate, advert interval, hop count, loop detection — every one of them is ultimately a decision about how much of the shared timeline you consume. A flood mesh repeats each packet across many nodes, so the cost multiplies. Keep packets short and adverts sane, and the whole network stays fast for everyone.</p>
    </div>
  </div>
</div>

---

### Duty Cycle

<div class="fc-card-header">
  <div class="fc-badges">
    <span class="fc-badge fc-badge--green">FIRMWARE DEFAULT <strong>50%</strong></span>
    <span class="fc-badge">RANGE <strong>1–100%</strong></span>
    <span class="fc-badge">US <strong>no legal limit</strong></span>
    <span class="fc-badge">EU <strong>often 1–10%</strong></span>
  </div>
</div>

<div class="content-section content-section--b">
  <p>Duty cycle is the share of time a radio may spend transmitting. After each transmission the firmware holds the radio silent so its long-run on-air time stays under the cap. In the US 902–928 MHz band there's no fixed limit, so the firmware default of 50% is fine and we don't change it.</p>
</div>

---

### Advert Intervals

<div class="fc-card-header">
  <div class="fc-badges">
    <span class="fc-badge fc-badge--green">ZERO-HOP <strong>60 min</strong></span>
    <span class="fc-badge fc-badge--green">FLOOD <strong>3 h</strong></span>
    <span class="fc-badge">FLOOD range <strong>3–168 h</strong></span>
    <span class="fc-badge">COST <strong>mesh-wide airtime</strong></span>
  </div>
</div>

<div class="content-section content-section--b">
  <p>A <strong>zero-hop</strong> advert reaches only nodes in direct range — a quiet local hello. A <strong>flood</strong> advert is rebroadcast by every repeater that hears it, propagating across the entire mesh so far-off nodes learn a route to you.</p>
  <div class="fc-diagram">
    <svg viewBox="0 0 820 196" role="img" style="width:100%;display:block">
      <defs><marker id="ai-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#43c4f0"/></marker></defs>
      <g font-family="'Fira Mono',monospace" font-size="14">
        <text x="20" y="22" fill="#9fe2fb" font-weight="700">ZERO-HOP — heard locally only</text>
        <circle cx="150" cy="104" r="22" fill="rgba(67,196,240,.18)" stroke="#43c4f0" stroke-width="2"/><text x="150" y="109" text-anchor="middle" fill="#9fe2fb" font-size="12">YOU</text>
        <circle cx="150" cy="104" r="44" fill="none" stroke="#43c4f0" stroke-width="1.5" opacity=".5"/>
        <circle cx="150" cy="104" r="66" fill="none" stroke="#2c3a4d" stroke-width="1.3" stroke-dasharray="3,5"/>
        <g fill="#0c1118" stroke="#3a6b80" stroke-width="1.5"><circle cx="120" cy="62" r="10"/><circle cx="206" cy="92" r="10"/><circle cx="120" cy="150" r="10"/></g>
        <text x="150" y="188" text-anchor="middle" fill="#6f93a0" font-size="12.5">direct neighbours only · cheap</text>
        <line x1="410" y1="18" x2="410" y2="182" stroke="#1f2a37"/>
        <text x="440" y="22" fill="#9fe2fb" font-weight="700">FLOOD — repeated mesh-wide</text>
        <circle cx="492" cy="104" r="20" fill="rgba(67,196,240,.18)" stroke="#43c4f0" stroke-width="2"/><text x="492" y="109" text-anchor="middle" fill="#9fe2fb" font-size="12">YOU</text>
        <g fill="#0c1118" stroke="#43c4f0" stroke-width="1.5"><circle cx="596" cy="66" r="12"/><circle cx="600" cy="148" r="12"/><circle cx="694" cy="48" r="10"/><circle cx="712" cy="104" r="10"/><circle cx="700" cy="160" r="10"/><circle cx="776" cy="86" r="9"/><circle cx="778" cy="140" r="9"/></g>
        <g stroke="#43c4f0" stroke-width="1.5" opacity=".85"><line x1="514" y1="96" x2="579" y2="72" marker-end="url(#ai-arrow)"/><line x1="513" y1="113" x2="583" y2="141" marker-end="url(#ai-arrow)"/><line x1="611" y1="63" x2="678" y2="51" marker-end="url(#ai-arrow)"/><line x1="610" y1="71" x2="697" y2="99" marker-end="url(#ai-arrow)"/><line x1="615" y1="150" x2="684" y2="158" marker-end="url(#ai-arrow)"/><line x1="615" y1="147" x2="763" y2="141" marker-end="url(#ai-arrow)"/><line x1="725" y1="100" x2="762" y2="90" marker-end="url(#ai-arrow)"/></g>
        <text x="612" y="188" text-anchor="middle" fill="#6f93a0" font-size="12.5">every repeater rebroadcasts it · cost multiplies</text>
      </g>
      <g class="nm-fx nm-anim-layer">
        <circle class="nm-fx nm-ping" cx="150" cy="104" r="22" fill="none" stroke="#43c4f0" stroke-width="1.8"><animate attributeName="r" values="22;52" dur="2.6s" begin="-0.0s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.2 0 0.4 1"/><animate attributeName="opacity" values="0.55;0" dur="2.6s" begin="-0.0s" repeatCount="indefinite"/></circle>
        <circle class="nm-fx nm-ping" cx="150" cy="104" r="22" fill="none" stroke="#43c4f0" stroke-width="1.8"><animate attributeName="r" values="22;52" dur="2.6s" begin="-1.3s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.2 0 0.4 1"/><animate attributeName="opacity" values="0.55;0" dur="2.6s" begin="-1.3s" repeatCount="indefinite"/></circle>
        <circle class="nm-fx nm-ping" cx="492" cy="104" r="20" fill="none" stroke="#43c4f0" stroke-width="1.8"><animate attributeName="r" values="20;50" dur="2.6s" begin="-0.0s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.2 0 0.4 1"/><animate attributeName="opacity" values="0.55;0" dur="2.6s" begin="-0.0s" repeatCount="indefinite"/></circle>
        <circle class="nm-fx nm-pkt" r="3.2" fill="#43c4f0" opacity="0.95"><animateMotion dur="1.4s" begin="-0.68s" repeatCount="indefinite" calcMode="linear" path="M514 96 L579 72"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.14;0.86;1" dur="1.4s" begin="-0.68s" repeatCount="indefinite"/></circle>
        <circle class="nm-fx nm-pkt" r="3.2" fill="#43c4f0" opacity="0.95"><animateMotion dur="1.4s" begin="-1.05s" repeatCount="indefinite" calcMode="linear" path="M513 113 L583 141"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.14;0.86;1" dur="1.4s" begin="-1.05s" repeatCount="indefinite"/></circle>
        <circle class="nm-fx nm-pkt" r="3.2" fill="#43c4f0" opacity="0.95"><animateMotion dur="1.4s" begin="-0.02s" repeatCount="indefinite" calcMode="linear" path="M611 63 L678 51"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.14;0.86;1" dur="1.4s" begin="-0.02s" repeatCount="indefinite"/></circle>
        <circle class="nm-fx nm-pkt" r="3.2" fill="#43c4f0" opacity="0.95"><animateMotion dur="2.12s" begin="-0.13s" repeatCount="indefinite" calcMode="linear" path="M615 147 L763 141"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.14;0.86;1" dur="2.12s" begin="-0.13s" repeatCount="indefinite"/></circle>
      </g>
    </svg>
    <p class="fc-caption">Zero-hop is a quiet local "I'm here." A flood advert propagates across the entire mesh — powerful, and expensive.</p>
  </div>
  <div class="fc-settings-list" style="margin-top:0.75rem">
    <div class="fc-setting"><span class="fc-setting-label">Zero-Hop <span style="color:#4a586a">set advert.interval</span></span><span class="fc-setting-value" style="color:#37e08a">60 min</span></div>
    <div class="fc-setting fc-setting--last"><span class="fc-setting-label">Flood <span style="color:#4a586a">set flood.advert.interval</span></span><span class="fc-setting-value" style="color:#37e08a">3 h</span></div>
  </div>
  <p style="font-size:0.85em;color:#76869a;margin-top:0.5rem">3 h is the firmware minimum — chosen while the mesh is still growing so new nodes discover routes fast. As density increases, raise the flood interval to reclaim airtime.</p>
</div>

---

### Discovery & Adverts

<div class="fc-card-header">
  <div class="fc-badges">
    <span class="fc-badge">ADVERT <strong>name · pos · key</strong></span>
    <span class="fc-badge fc-badge--green">SIGNED <strong>anti-spoof</strong></span>
    <span class="fc-badge">CLIENTS <strong>on demand</strong></span>
    <span class="fc-badge">REPEATERS <strong>~12 h flood</strong></span>
  </div>
</div>

<div class="content-section content-section--b">
  <p>A new MeshCore mesh feels dead — by design. Nodes stay quiet; until two have each received the other's <strong>advert</strong>, they won't appear in each other's contacts, even on the same channel. An advert is a signed broadcast of your <strong>name, position, and public key</strong> — the handshake that makes private messaging possible.</p>
  <div class="fc-diagram">
    <svg viewBox="0 0 820 140" role="img" style="width:100%;display:block">
      <g font-family="'Fira Mono',monospace" font-size="13.0">
        <text x="30" y="22" fill="#ff7a8a" font-size="13.5" font-weight="700">same channel, no advert → invisible</text>
        <circle cx="110" cy="80" r="20" fill="#0c1118" stroke="#5a6573" stroke-width="2.3"/><text x="110" y="85" text-anchor="middle" fill="#9aa7b6" font-size="12.5">YOU</text>
        <circle cx="310" cy="80" r="20" fill="#0c1118" stroke="#5a6573" stroke-width="2.3"/><text x="310" y="85" text-anchor="middle" fill="#9aa7b6" font-size="12.5">NODE</text>
        <line x1="134" y1="80" x2="286" y2="80" stroke="#5a6573" stroke-width="1.6" stroke-dasharray="4,5"/>
        <text x="212" y="75" text-anchor="middle" fill="#ff7a8a" font-size="15.3" font-weight="700">✕</text>
        <text x="212" y="126" text-anchor="middle" fill="#7d8794" font-size="12.5">not in each other's contacts</text>
        <line x1="400" y1="20" x2="400" y2="130" stroke="#1f2733"/>
        <text x="490" y="22" fill="#60a5fa" font-size="13.5" font-weight="700">after an advert → keys traded</text>
        <circle cx="490" cy="80" r="20" fill="#0c1118" stroke="#60a5fa" stroke-width="2.3"/><text x="490" y="85" text-anchor="middle" fill="#bcd7ff" font-size="12.5">YOU</text>
        <circle cx="720" cy="80" r="20" fill="#0c1118" stroke="#60a5fa" stroke-width="2.3"/><text x="720" y="85" text-anchor="middle" fill="#bcd7ff" font-size="12.5">NODE</text>
        <line x1="514" y1="80" x2="696" y2="80" stroke="#60a5fa" stroke-width="2.2"/>
        <text x="610" y="126" text-anchor="middle" fill="#7d8794" font-size="12.5">in contacts · DMs now possible</text>
      </g>
      <g class="nm-fx nm-anim-layer">
        <circle class="nm-fx nm-pkt" r="3.2" fill="#60a5fa" opacity="0.95"><animateMotion dur="2.46s" begin="-2.13s" repeatCount="indefinite" calcMode="linear" path="M514 80 L696 80"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.14;0.86;1" dur="2.46s" begin="-2.13s" repeatCount="indefinite"/></circle>
      </g>
    </svg>
    <p class="fc-caption">On the same channel you can both use Public — but DMs need a traded advert first.</p>
  </div>
</div>

---

### Path Hash Mode

<div class="fc-card-header">
  <div class="fc-badges">
    <span class="fc-badge fc-badge--green">RECOMMENDED <strong>2-byte</strong></span>
    <span class="fc-badge">DEFAULT <strong>0 (1-byte)</strong></span>
    <span class="fc-badge">NEEDS <strong>firmware 1.14+</strong></span>
    <span class="fc-badge">PAIRS <strong>loop detection</strong></span>
  </div>
</div>

<div class="content-section content-section--b">
  <p>With a one-byte path ID there are only <strong>256</strong> possible values. On a mesh of hundreds of nodes, two repeaters inevitably share one — which muddies path diagnostics and triggers <strong>false loop-detection hits</strong>. Two-byte IDs (65,536) make collisions vanish.</p>
  <div class="fc-diagram">
    <svg viewBox="0 0 820 122" role="img" style="width:100%;display:block">
      <defs>
        <marker id="ph-red" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#ff4d63"/></marker>
        <marker id="ph-cyan" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#22d3ee"/></marker>
      </defs>
      <g font-family="'Fira Mono',monospace" font-size="13">
        <text x="6" y="15" fill="#76869a" font-size="12.5">1-byte path ID → only 256 possible slots. With hundreds of nodes, two land on the same one.</text>
        <circle cx="58" cy="46" r="14" fill="rgba(34,211,238,.16)" stroke="#22d3ee" stroke-width="1.8"/><text x="58" y="51" text-anchor="middle" fill="#9af0fb" font-size="12">A</text>
        <circle cx="58" cy="82" r="14" fill="rgba(255,77,99,.16)" stroke="#ff4d63" stroke-width="1.8"/><text x="58" y="87" text-anchor="middle" fill="#ffb3bd" font-size="12">B</text>
        <line x1="75" y1="49" x2="186" y2="62" stroke="#22d3ee" stroke-width="1.8" marker-end="url(#ph-cyan)"/>
        <line x1="75" y1="79" x2="186" y2="70" stroke="#ff4d63" stroke-width="1.8" marker-end="url(#ph-red)"/>
        <rect x="192" y="46" width="54" height="40" rx="6" fill="rgba(255,182,39,.16)" stroke="#ffb627" stroke-width="1.9"/><text x="219" y="72" text-anchor="middle" fill="#ffd27a" font-weight="700" font-size="18">A4</text>
        <line x1="252" y1="66" x2="404" y2="66" stroke="#ff4d63" stroke-width="2.2" marker-end="url(#ph-red)"/>
        <text x="430" y="60" fill="#ff6678" font-weight="700" font-size="15.5">same hash ID → collision</text>
        <text x="430" y="84" fill="#8895a8" font-size="12.5">muddies path tracing · false loop-detection hits</text>
        <text x="6" y="117" fill="#4a586a" font-size="12">2-byte = 65,536 slots → collisions effectively gone, routing stays clean.</text>
      </g>
      <g class="nm-fx nm-anim-layer">
        <circle class="nm-fx nm-ping" cx="58" cy="46" r="14" fill="none" stroke="#22d3ee" stroke-width="1.8"><animate attributeName="r" values="14;44" dur="2.6s" begin="-0.0s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.2 0 0.4 1"/><animate attributeName="opacity" values="0.55;0" dur="2.6s" begin="-0.0s" repeatCount="indefinite"/></circle>
        <circle class="nm-fx nm-ping" cx="58" cy="82" r="14" fill="none" stroke="#ff4d63" stroke-width="1.8"><animate attributeName="r" values="14;44" dur="2.6s" begin="-0.0s" repeatCount="indefinite" calcMode="spline" keyTimes="0;1" keySplines="0.2 0 0.4 1"/><animate attributeName="opacity" values="0.55;0" dur="2.6s" begin="-0.0s" repeatCount="indefinite"/></circle>
        <circle class="nm-fx nm-pkt" r="3.2" fill="#ff4d63" opacity="0.95"><animateMotion dur="2.17s" begin="-1.89s" repeatCount="indefinite" calcMode="linear" path="M252 66 L404 66"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.14;0.86;1" dur="2.17s" begin="-1.89s" repeatCount="indefinite"/></circle>
      </g>
    </svg>
    <p class="fc-caption">Two different repeaters sharing one 1-byte ID confuse routing and trip loop detection.</p>
  </div>
  <div class="fc-levels">
    <div class="fc-level">
      <div class="fc-level-name" style="color:#76869a">Mode 0</div>
      <div class="fc-level-tag">1-byte</div>
      <div class="fc-level-rows">
        <div class="fc-level-row"><span>unique IDs</span><strong>256</strong></div>
        <div class="fc-level-row"><span>max hops</span><strong>64</strong></div>
        <div class="fc-level-row"><span>collisions</span><strong>likely</strong></div>
      </div>
      <p class="fc-level-note">Legacy/universal. Fine for tiny meshes; collides on a big one.</p>
    </div>
    <div class="fc-level fc-level--rec">
      <div class="fc-level-pick">★ RECOMMENDED</div>
      <div class="fc-level-name">Mode 1</div>
      <div class="fc-level-tag">2-byte</div>
      <div class="fc-level-rows">
        <div class="fc-level-row"><span>unique IDs</span><strong>65,536</strong></div>
        <div class="fc-level-row"><span>max hops</span><strong>32</strong></div>
        <div class="fc-level-row"><span>collisions</span><strong>rare</strong></div>
      </div>
      <p class="fc-level-note">Clean routing &amp; reliable loop detection. Needs firmware 1.14+.</p>
    </div>
    <div class="fc-level">
      <div class="fc-level-name" style="color:#9af0fb">Mode 2</div>
      <div class="fc-level-tag">3-byte</div>
      <div class="fc-level-rows">
        <div class="fc-level-row"><span>unique IDs</span><strong>16.7 M</strong></div>
        <div class="fc-level-row"><span>max hops</span><strong>21</strong></div>
        <div class="fc-level-row"><span>collisions</span><strong>none</strong></div>
      </div>
      <p class="fc-level-note">Some run 3-byte — the 21-hop cap keeps floods more local.</p>
    </div>
  </div>
  <p style="font-size:0.85em;color:#76869a;margin:0.6rem 0 0.3rem"><strong>Companion:</strong> Gear → Experimental Settings → Default Path Hash Size → 2-Byte</p>
  <p style="font-size:0.85em;color:#76869a;margin:0 0 0.5rem"><strong>Repeater (CLI):</strong></p>
  <div class="copyable-code"><pre><code>set path.hash.mode 1</code></pre></div>
  <div class="copyable-code"><pre><code>get path.hash.mode  # 0=1B · 1=2B · 2=3B</code></pre></div>
</div>

---

### Loop Detection

<div class="fc-card-header">
  <div class="fc-badges">
    <span class="fc-badge fc-badge--green">NASHMESH <strong>moderate</strong></span>
    <span class="fc-badge">DEFAULT <strong>off</strong></span>
    <span class="fc-badge">PAIRS <strong>path hash mode</strong></span>
    <span class="fc-badge">NEEDS <strong>firmware 1.14+</strong></span>
  </div>
</div>

<div class="content-section content-section--b">
  <p>Every repeater that hears a flood packet rebroadcasts it. If a faulty node keeps changing its path ID or a packet loops, the mesh can amplify it into a storm. Loop detection stops a healthy repeater from being an amplifier — it checks whether its own ID already appears in the path, and if so, drops the packet.</p>
  <div class="fc-levels" style="grid-template-columns:repeat(4,1fr)">
    <div class="fc-level" style="opacity:0.6">
      <div class="fc-level-name" style="color:#4a586a">Off</div>
      <div class="fc-level-tag">default</div>
      <div class="fc-level-rows">
        <div class="fc-level-row"><span>checking</span><strong>none</strong></div>
      </div>
      <p class="fc-level-note">Relies only on the dedup cache.</p>
    </div>
    <div class="fc-level">
      <div class="fc-level-name" class="fc-cat-label">Minimal</div>
      <div class="fc-level-tag">very lax</div>
      <div class="fc-level-rows">
        <div class="fc-level-row"><span>1-byte</span><strong>4+ hits</strong></div>
        <div class="fc-level-row"><span>2-byte</span><strong>2+ hits</strong></div>
      </div>
      <p class="fc-level-note">Rarely fires on a hop-limited mesh.</p>
    </div>
    <div class="fc-level fc-level--rec">
      <div class="fc-level-pick">★ NASHMESH</div>
      <div class="fc-level-name">Moderate</div>
      <div class="fc-level-tag">balanced</div>
      <div class="fc-level-rows">
        <div class="fc-level-row"><span>1-byte</span><strong>2+ hits</strong></div>
        <div class="fc-level-row"><span>2-byte</span><strong>1+ hit</strong></div>
      </div>
      <p class="fc-level-note">Catches real loops; false-positive risk stays low.</p>
    </div>
    <div class="fc-level">
      <div class="fc-level-name" style="color:#ff6678">Strict</div>
      <div class="fc-level-tag">aggressive</div>
      <div class="fc-level-rows">
        <div class="fc-level-row"><span>1-byte</span><strong>1+ hit</strong></div>
        <div class="fc-level-row"><span>2-byte</span><strong>1+ hit</strong></div>
      </div>
      <p class="fc-level-note">Risky on 1-byte paths — prefix collisions cause false drops.</p>
    </div>
  </div>
  <div class="copyable-code" style="margin-top:0.75rem"><pre><code>set loop.detect moderate</code></pre></div>
  <div class="copyable-code"><pre><code>get loop.detect  # verify</code></pre></div>
</div>

---

### Multi-Acks

<div class="fc-card-header">
  <div class="fc-badges">
    <span class="fc-badge fc-badge--green">NASHMESH <strong>1 (on)</strong></span>
    <span class="fc-badge">DEFAULT <strong>0 (off)</strong></span>
    <span class="fc-badge">HELPS <strong>remote admin</strong></span>
    <span class="fc-badge">COST <strong>tiny</strong></span>
  </div>
</div>

<div class="content-section content-section--b">
  <p>When you send a command to a repeater remotely, the node acts on it and sends back an ACK. Over several hops, that single confirmation can die on the return path — leaving you unsure whether to resend. Multi-acks sends <strong>two confirmations instead of one</strong>, which dramatically increases the chance at least one arrives.</p>
  <div class="copyable-code"><pre><code>set multi.acks 1</code></pre></div>
  <div class="copyable-code"><pre><code>get multi.acks  # 0 = off · 1 = on</code></pre></div>
</div>

---

### RX Delay

<div class="fc-card-header">
  <div class="fc-badges">
    <span class="fc-badge fc-badge--green">NASHMESH <strong>3</strong></span>
    <span class="fc-badge">DEFAULT <strong>0</strong></span>
    <span class="fc-badge">STATUS <strong>experimental</strong></span>
    <span class="fc-badge">EFFECT <strong>prefers clean paths</strong></span>
  </div>
</div>

<div class="content-section content-section--b">
  <p>In a flood, every repeater that hears a packet rebroadcasts it — including nodes that barely caught it. Those weak-signal repeats spend airtime and add congestion without improving delivery. RX delay adds a short processing delay scaled to signal quality: <strong>strong-signal copies are handled immediately; weak ones wait</strong>. By the time a weak copy would be processed, the packet has usually already propagated and it's dropped as a duplicate.</p>
  <div class="copyable-code"><pre><code>set rxdelay 3</code></pre></div>
  <div class="copyable-code"><pre><code>get rxdelay  # experimental · range 0–20</code></pre></div>
</div>

---

### TX Delay

<div class="fc-card-header">
  <div class="fc-badges">
    <span class="fc-badge fc-badge--green">TUNED BY <strong>neighbor count</strong></span>
    <span class="fc-badge">DEFAULT <strong>0.5 / 0.2</strong></span>
    <span class="fc-badge">RANGE <strong>0–2</strong></span>
    <span class="fc-badge">SCOPE <strong>flood + direct</strong></span>
  </div>
</div>

<div class="content-section content-section--b">
  <p>When multiple repeaters hear the same flood packet and rebroadcast it at the same instant, their signals <strong>collide and the packet is lost</strong>. TX delay staggers when each repeater fires by adding a random wait window — the more neighbors competing, the wider the window needs to be.</p>
  <div class="fc-diagram">
    <svg viewBox="0 0 820 118" role="img" style="width:100%;display:block">
      <g font-family="'Fira Mono',monospace" font-size="14">
        <text x="190" y="22" text-anchor="middle" fill="#ff8585" font-weight="700">no spacing → fire together</text>
        <g stroke="#ff4d63" stroke-width="2.4"><line x1="120" y1="42" x2="120" y2="96"/><line x1="124" y1="42" x2="124" y2="96"/><line x1="190" y1="42" x2="190" y2="96"/><line x1="194" y1="42" x2="194" y2="96"/><line x1="260" y1="42" x2="260" y2="96"/><line x1="264" y1="42" x2="264" y2="96"/></g>
        <text x="345" y="74" text-anchor="middle" fill="#ff6678" font-weight="700">✕ collision</text>
        <line x1="410" y1="14" x2="410" y2="104" stroke="#1f2a37"/>
        <text x="610" y="22" text-anchor="middle" fill="#bfa8ff" font-weight="700">txdelay → random window</text>
        <g stroke="#9d7bff" stroke-width="2.4"><line x1="470" y1="42" x2="470" y2="96"/><line x1="474" y1="42" x2="474" y2="96"/><line x1="575" y1="42" x2="575" y2="96"/><line x1="579" y1="42" x2="579" y2="96"/><line x1="675" y1="42" x2="675" y2="96"/><line x1="679" y1="42" x2="679" y2="96"/></g>
        <line x1="470" y1="106" x2="690" y2="106" stroke="#3a4757"/>
        <text x="740" y="74" text-anchor="middle" fill="#bfa8ff" font-weight="700">✓ clear</text>
      </g>
      <g class="nm-fx nm-anim-layer">
        <rect class="nm-fx" x="108" y="38" width="168" height="62" rx="6" fill="#ff4d63" opacity="0"><animate attributeName="opacity" values="0;0.22;0" keyTimes="0;0.12;0.5" dur="2.4s" repeatCount="indefinite"/></rect>
        <rect class="nm-fx" x="464" y="40" width="16" height="58" rx="3" fill="#9d7bff" opacity="0"><animate attributeName="opacity" values="0;0.5;0" keyTimes="0;0.1;0.4" dur="2.4s" begin="-0.0s" repeatCount="indefinite"/></rect>
        <rect class="nm-fx" x="569" y="40" width="16" height="58" rx="3" fill="#9d7bff" opacity="0"><animate attributeName="opacity" values="0;0.5;0" keyTimes="0;0.1;0.4" dur="2.4s" begin="-0.5s" repeatCount="indefinite"/></rect>
        <rect class="nm-fx" x="669" y="40" width="16" height="58" rx="3" fill="#9d7bff" opacity="0"><animate attributeName="opacity" values="0;0.5;0" keyTimes="0;0.1;0.4" dur="2.4s" begin="-1.0s" repeatCount="indefinite"/></rect>
      </g>
    </svg>
    <p class="fc-caption">Each repeater waits a random slice before repeating. More neighbors competing = wider window needed.</p>
  </div>
  <table class="fc-table">
  <thead><tr><th>Neighbors</th><th>txdelay</th><th>direct.txdelay</th></tr></thead>
  <tbody>
    <tr><td>0 – 1</td><td>0.3</td><td>0.1</td></tr>
    <tr><td>2 – 4</td><td>0.5</td><td>0.3</td></tr>
    <tr><td>5 – 9</td><td>1</td><td>0.5</td></tr>
    <tr><td>10 – 14</td><td>1.5</td><td>1</td></tr>
    <tr><td>15 +</td><td>2</td><td>2</td></tr>
  </tbody>
</table>
  <p style="font-size:0.82em;color:#76869a;margin:0.4rem 0 0.5rem">Check your count with the <code>neighbors</code> command, and revisit these as the node sees more over time.</p>
  <div class="copyable-code"><pre><code>set txdelay 0.5</code></pre></div>
  <div class="copyable-code"><pre><code>set direct.txdelay 0.3</code></pre></div>
</div>

---

### AGC Reset Interval

<div class="fc-card-header">
  <div class="fc-badges">
    <span class="fc-badge fc-badge--green">NASHMESH <strong>4 sec</strong></span>
    <span class="fc-badge">DEFAULT <strong>0 (off)</strong></span>
    <span class="fc-badge">STEP <strong>multiples of 4</strong></span>
    <span class="fc-badge">FOR <strong>elevated nodes</strong></span>
  </div>
</div>

<div class="content-section content-section--b">
  <p>The SX1262 radio's automatic gain control can get stuck when hit by a strong out-of-band signal — a broadcast tower, a cell site, a nearby handheld. When it does, the noise floor pins at −120 dBm and the repeater goes deaf to weak signals until power-cycled. On an unattended hilltop node, that's a dead repeater nobody notices. Setting an interval makes the firmware reset the AGC on a timer so it recovers on its own — no reboot, no climb.</p>
  <div class="copyable-code"><pre><code>set agc.reset.interval 4</code></pre></div>
  <div class="copyable-code"><pre><code>get agc.reset.interval  # seconds · 0 = off</code></pre></div>
</div>

---

### Reading Your Signal

<div class="fc-card-header">
  <div class="fc-badges">
    <span class="fc-badge fc-badge--green">SOURCE <strong>stats-radio / app</strong></span>
    <span class="fc-badge">UNITS <strong>dBm · dB</strong></span>
    <span class="fc-badge fc-badge--green">KEY METRIC <strong>SNR</strong></span>
    <span class="fc-badge">LoRa <strong>decodes below noise</strong></span>
  </div>
</div>

<div class="content-section content-section--b">
  <p><strong>RSSI</strong> is how strong the incoming signal is. The <strong>noise floor</strong> is the ambient RF racket your receiver sits in. <strong>SNR</strong> is how far the signal stands above that noise — roughly RSSI minus the noise floor — and it's the single best gauge of link quality.</p>
  <div class="fc-settings-list" style="margin-top:0.5rem">
    <div class="fc-setting" style="font-size:0.78em"><span class="fc-setting-label" style="color:#9bdcfb;font-weight:700">Metric</span><span style="flex:1;text-align:right;font-family:var(--md-code-font-family);font-size:0.9em;color:#5fd6a0">Good</span><span style="flex:1;text-align:right;font-family:var(--md-code-font-family);font-size:0.9em;color:#e3c069">OK / edge</span><span style="flex:1;text-align:right;font-family:var(--md-code-font-family);font-size:0.9em;color:#ff7a8a">Problem</span></div>
    <div class="fc-setting"><span class="fc-setting-label">RSSI (dBm)</span><span style="flex:1;text-align:right;font-family:var(--md-code-font-family);font-size:0.85em;color:#5fd6a0">≳ −100</span><span style="flex:1;text-align:right;font-family:var(--md-code-font-family);font-size:0.85em;color:#e3c069">−100 to −118</span><span style="flex:1;text-align:right;font-family:var(--md-code-font-family);font-size:0.85em;color:#ff7a8a">≲ −120</span></div>
    <div class="fc-setting"><span class="fc-setting-label">SNR (dB)</span><span style="flex:1;text-align:right;font-family:var(--md-code-font-family);font-size:0.85em;color:#5fd6a0">≥ 0</span><span style="flex:1;text-align:right;font-family:var(--md-code-font-family);font-size:0.85em;color:#e3c069">0 to −7 *</span><span style="flex:1;text-align:right;font-family:var(--md-code-font-family);font-size:0.85em;color:#ff7a8a">&lt; −7.5 *</span></div>
    <div class="fc-setting fc-setting--last"><span class="fc-setting-label">Noise floor (dBm)</span><span style="flex:1;text-align:right;font-family:var(--md-code-font-family);font-size:0.85em;color:#5fd6a0">≤ −120</span><span style="flex:1;text-align:right;font-family:var(--md-code-font-family);font-size:0.85em;color:#e3c069">−120 to −110</span><span style="flex:1;text-align:right;font-family:var(--md-code-font-family);font-size:0.85em;color:#ff7a8a">≳ −105</span></div>
  </div>
  <p style="font-size:0.82em;color:#76869a;margin:0.4rem 0 0.5rem">* LoRa decodes <strong>below</strong> the noise floor — negative SNR still works. At NashMesh's SF7 the limit is about −7.5 dB.</p>
  <div class="copyable-code"><pre><code>stats-radio  # noise floor · last RSSI/SNR</code></pre></div>
  <div class="copyable-code"><pre><code>neighbors    # who you hear, with SNR</code></pre></div>
  <div class="fc-callout">
    <div class="fc-callout-ic">!</div>
    <div>
      <strong>Watch SNR, not RSSI</strong>
      <p>RSSI alone can fool you — a strong signal in a noisy spot still decodes badly. SNR already folds signal and noise together, so it's the truest read on link health. A negative SNR isn't automatically broken — LoRa can still pull signal out from under the noise, especially at higher spreading factors.</p>
    </div>
  </div>
</div>

---

### Access & Admin

<div class="fc-card-header">
  <div class="fc-badges">
    <span class="fc-badge fc-badge--green">ADMIN <strong>full control</strong></span>
    <span class="fc-badge">GUEST <strong>read-only</strong></span>
    <span class="fc-badge">DEFAULT <strong>password = "password"</strong></span>
    <span class="fc-badge">REACH <strong>BLE / mesh</strong></span>
  </div>
</div>

<div class="content-section content-section--b">
  <p>Every repeater ships with the admin door unlocked: the default admin password is the literal word <code>password</code>, and it's publicly known. Until you change it, anyone can reconfigure your node. A separate guest password controls read-only access — leave it blank and anyone can read your node's info without logging in.</p>
  <p>The companion app's Remote Management reaches a node two ways: over Bluetooth when you're beside it, or across the mesh over LoRa when you're not — routed through your companion node, no internet involved.</p>
</div>

---

### Owner Info

<div class="fc-card-header">
  <div class="fc-badges">
    <span class="fc-badge fc-badge--green">COMMAND <strong>set owner.info</strong></span>
    <span class="fc-badge">FIRMWARE <strong>1.12+</strong></span>
    <span class="fc-badge">VISIBLE <strong>when guest blank</strong></span>
    <span class="fc-badge">TIP <strong>call sign + contact</strong></span>
  </div>
</div>

<div class="content-section content-section--b">
  <p>Your repeater is unattended and probably somewhere annoying to reach. When it misbehaves, other operators can see which node is the problem but have no way to reach you — unless your contact is on the node itself. Owner info is that note, readable by anyone who can log in as a guest (which is everyone when the guest password is blank).</p>
  <p style="font-size:0.85em;color:#76869a">Keep it brief: call sign or name, a contact method, and maybe a site name. The <code>|</code> character becomes a line break.</p>
  <div class="copyable-code"><pre><code>set owner.info N0CALL | n0call@example.com | Site Name</code></pre></div>
</div>

---

### Direct Messages

<div class="fc-card-header">
  <div class="fc-badges">
    <span class="fc-badge fc-badge--green">PRIVATE <strong>1-to-1</strong></span>
    <span class="fc-badge fc-badge--green">END-TO-END <strong>encrypted</strong></span>
    <span class="fc-badge">ROUTING <strong>flood then follow path</strong></span>
    <span class="fc-badge">REQUIRES <strong>traded advert</strong></span>
  </div>
</div>

<div class="content-section content-section--b">
  <p>A MeshCore DM is encrypted to <strong>one contact's public key</strong> — only they can read it. The first DM floods the mesh so it can reach the recipient regardless of where they are; once a route is established, subsequent messages follow that path. Two nodes can't DM each other until each has received the other's advert (the key exchange — see Discovery &amp; Adverts).</p>
</div>

---

### Channels

<div class="fc-card-header">
  <div class="fc-badges">
    <span class="fc-badge fc-badge--green">TYPE <strong>group · shared key</strong></span>
    <span class="fc-badge">ROUTING <strong>flood · no ACK</strong></span>
    <span class="fc-badge">NASHMESH <strong>#tn-* · #bna-*</strong></span>
    <span class="fc-badge">PRIVATE <strong>own PSK</strong></span>
  </div>
</div>

<div class="content-section content-section--b">
  <p>A channel is a group room secured by one symmetric key (AES) that every member shares. Anyone with the key reads and sends; anyone without it just hears noise. Unlike a DM, a channel message is a flood — it spreads across every repeater with no delivery confirmation.</p>
  <div class="fc-settings-list" style="margin-top:0.5rem">
    <div class="fc-setting"><span class="fc-setting-label fc-cat-label">Regional</span><span class="fc-setting-value"></span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>#tn-middle</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">all of Middle Tennessee</span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>#tn-davidson</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">your county — #tn-&lt;county&gt; for any nearby one</span></div>
    <div class="fc-setting"><span class="fc-setting-label fc-cat-label">Topic</span><span class="fc-setting-value"></span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>#tenntalk</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">statewide general chatter</span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>#ham</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">amateur radio operators</span></div>
    <div class="fc-setting"><span class="fc-setting-label fc-cat-label">Bots &amp; testing</span><span class="fc-setting-value"></span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>#bna-wx</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">weather chatter + NashMesh wx bot</span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>#bna-bot · #bot</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">automated traffic from bots</span></div>
    <div class="fc-setting fc-setting--last"><span class="fc-setting-label"><code>#test</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">human-to-human "can you hear me?" checks</span></div>
  </div>
</div>

---

### Weather Bot

<div class="fc-card-header">
  <div class="fc-badges">
    <span class="fc-badge fc-badge--green">HOME <strong>Nashville</strong></span>
    <span class="fc-badge">US wx</span>
    <span class="fc-badge">WORLD gwx</span>
    <span class="fc-badge">ON <strong>#bna-wx</strong></span>
  </div>
</div>

<div class="content-section content-section--b">
  <p>Message any of these on <strong>#bna-wx</strong>. <code>wx</code> uses NOAA (US only); <code>gwx</code> uses Open-Meteo (worldwide). Leave off a place and it defaults to Nashville.</p>
  <div class="fc-settings-list" style="margin-top:0.5rem">
    <div class="fc-setting"><span class="fc-setting-label fc-cat-label">US weather (wx)</span><span class="fc-setting-value"></span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>wx</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">Nashville forecast (bot's home)</span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>wx franklin, tn</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">city, state</span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>wx 37130</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">ZIP code</span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>wx nashville tomorrow</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">tomorrow's forecast</span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>wx nashville 3d</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">3-day (also 5d, 7d)</span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>wx nashville hourly</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">hourly forecast</span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>wx 37130 alerts</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">active weather alerts</span></div>
    <div class="fc-setting"><span class="fc-setting-label fc-cat-label">Worldwide (gwx)</span><span class="fc-setting-value"></span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>gwx tokyo</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">city lookup</span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>gwx paris, france</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">city, country</span></div>
    <div class="fc-setting"><span class="fc-setting-label fc-cat-label">Precipitation nowcast</span><span class="fc-setting-value"></span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>rain</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">rain at home · rain 37130 for a place</span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>snow</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">snow depth · snow denver for a place</span></div>
    <div class="fc-setting"><span class="fc-setting-label fc-cat-label">Ham &amp; solar extras</span><span class="fc-setting-value"></span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>aurora</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">aurora / KP-index forecast</span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>hfcond</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">HF band propagation</span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>solar</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">solar conditions + HF band status</span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>aqi nashville</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">air quality index</span></div>
    <div class="fc-setting fc-setting--last"><span class="fc-setting-label"><code>satpass iss</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">satellite pass predictions</span></div>
  </div>
</div>

---

### Test Bot

<div class="fc-card-header">
  <div class="fc-badges">
    <span class="fc-badge fc-badge--green">CHECK <strong>test · ping</strong></span>
    <span class="fc-badge fc-badge--green">PATHS <strong>tracer · path</strong></span>
    <span class="fc-badge">ON <strong>#bot · #bna-bot</strong></span>
    <span class="fc-badge">IDS <strong>2-char hex</strong></span>
  </div>
</div>

<div class="content-section content-section--b">
  <p>Reachability and routing checks. Message a command on <strong>#bot</strong> or <strong>#bna-bot</strong> and BNABot answers with connection info, decoded paths, and network lookups.</p>
  <div class="fc-settings-list" style="margin-top:0.5rem">
    <div class="fc-setting"><span class="fc-setting-label fc-cat-label">Core checks</span><span class="fc-setting-value"></span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>test</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">confirms bot got your message; reports direct/routed, SNR, path</span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>ping</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">simplest liveness check → Pong!</span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>help</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">lists all commands · help &lt;cmd&gt; for details</span></div>
    <div class="fc-setting"><span class="fc-setting-label fc-cat-label">Path &amp; link diagnostics</span><span class="fc-setting-value"></span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>path</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">decode and show the full routing path your message took</span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>tracer 01,7a,55</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">round-trip trace; bot hears the reply (use this one)</span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>trace 01,7a,55</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">one-direction trace; return may not be heard</span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>multitest</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">listens 6 s and collects every unique path — how many routes are live</span></div>
    <div class="fc-setting"><span class="fc-setting-label fc-cat-label">Network utility</span><span class="fc-setting-value"></span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>prefix 1A</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">look up repeaters by their 2-char prefix</span></div>
    <div class="fc-setting"><span class="fc-setting-label"><code>stats</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">bot usage over the last 24 h</span></div>
    <div class="fc-setting fc-setting--last"><span class="fc-setting-label"><code>channels</code></span><span class="fc-setting-value" style="font-weight:400;color:#76869a">list / inspect hashtag channels on the network</span></div>
  </div>
</div>

---

### Flashing Over the Air (OTA)

<div class="content-section content-section--b">
  <p>OTA flashing lets you update a repeater wirelessly without a USB cable. The device creates a temporary Wi-Fi access point and serves a browser-based update page.</p>

  <div class="fc-callout">
    <div class="fc-callout-ic">!</div>
    <div>
      <strong>Supported node types</strong>
      <p>OTA updates are only supported on <strong>Room Server/Repeater</strong> and <strong>Repeater</strong> nodes. Companion nodes must be flashed via USB.</p>
    </div>
  </div>

  <div class="fc-callout" style="margin-top:0.5rem">
    <div class="fc-callout-ic">!</div>
    <div>
      <strong>nRF52 devices — Bluetooth OTA only</strong>
      <p>If your device uses an <strong>nRF52</strong> chip, Wi-Fi OTA is not supported. Use <a href="https://apps.apple.com/us/app/nrf-device-firmware-update/id1624454660">nRF Device Firmware Update</a> (iOS) or <a href="https://github.com/nordicsemi/Android-nRF-Connect">nRF Connect</a> (Android) with the firmware <code>.zip</code> file instead of the <code>.bin</code>.</p>
    </div>
  </div>

  <div class="fc-callout" style="margin-top:0.5rem">
    <div class="fc-callout-ic">!</div>
    <div>
      <strong>Always use the un-merged <code>.bin</code> for OTA</strong>
      <p>The <strong>un-merged</strong> <code>.bin</code> updates only the firmware and preserves your settings. The <strong>merged</strong> <code>.bin</code> fully erases the device — only use it for a clean start.</p>
    </div>
  </div>

  <div class="fc-step" style="margin-top:0.75rem"><span class="fc-step-num">1</span><span>From the companion app, log into the node and run:</span></div>
  <div class="copyable-code" style="margin:0.2rem 0 0.5rem"><pre><code>start ota</code></pre></div>
  <p style="font-size:0.85em;color:#76869a;margin:0 0 0.5rem">The device will create a Wi-Fi access point named <strong>MeshCore-OTA</strong>.</p>

  <div class="fc-step"><span class="fc-step-num">2</span><span>Connect your computer to the <strong>MeshCore-OTA</strong> network, then open a browser and navigate to:</span></div>
  <div class="copyable-code" style="margin:0.2rem 0 0.5rem"><pre><code>http://192.168.4.1/update</code></pre></div>
  <p style="font-size:0.85em;color:#76869a;margin:0 0 0.5rem">Upload the un-merged <code>.bin</code> and wait for the upload to fully complete before navigating away.</p>

  <div class="fc-step"><span class="fc-step-num">3</span><span>Reconnect to the node in the companion app and confirm the firmware version:</span></div>
  <div class="copyable-code" style="margin:0.2rem 0 0"><pre><code>version</code></pre></div>
</div>

---

### Troubleshooting

<div class="fc-card-header">
  <div class="fc-badges">
    <span class="fc-badge fc-badge--green">START <strong>radio match</strong></span>
    <span class="fc-badge">THEN <strong>discovery</strong></span>
    <span class="fc-badge">THEN <strong>signal</strong></span>
    <span class="fc-badge">LAST <strong>deafness</strong></span>
  </div>
</div>

<div class="content-section content-section--b">
  <p>Work down the list. Stop at the first thing that's wrong.</p>
  <div class="fc-settings-list" style="margin-top:0.5rem">
    <div class="fc-setting"><span class="fc-setting-label"><strong>1</strong> Same channel?</span><span class="fc-setting-value" style="font-weight:400;color:#76869a">freq · BW · SF · preset identical to the mesh</span></div>
    <div class="fc-setting"><span class="fc-setting-label"><strong>2</strong> Traded adverts?</span><span class="fc-setting-value" style="font-weight:400;color:#76869a">you only see nodes you've swapped keys with — send a zero-hop advert</span></div>
    <div class="fc-setting"><span class="fc-setting-label"><strong>3</strong> Signal above the floor?</span><span class="fc-setting-value" style="font-weight:400;color:#76869a">RSSI / SNR healthy — if weak: height, antenna, clear the path</span></div>
    <div class="fc-setting"><span class="fc-setting-label"><strong>4</strong> Radio gone deaf?</span><span class="fc-setting-value" style="font-weight:400;color:#76869a">noise floor pinned at −120 dBm — AGC reset or reboot</span></div>
    <div class="fc-setting fc-setting--last"><span class="fc-setting-label"><strong>5</strong> One-way link?</span><span class="fc-setting-value" style="font-weight:400;color:#76869a">they hear you but you don't — check your RX: antenna, coax, local interference</span></div>
  </div>
  <div class="fc-settings-list" style="margin-top:0.75rem">
    <div class="fc-setting" style="font-size:0.78em"><span class="fc-setting-label" style="color:#9bdcfb;font-weight:700">Symptom</span><span class="fc-setting-value" style="color:#9bdcfb">First move</span></div>
    <div class="fc-setting"><span class="fc-setting-label">No one hears me</span><span class="fc-setting-value" style="font-weight:400;color:#76869a">confirm preset / radio params match exactly</span></div>
    <div class="fc-setting"><span class="fc-setting-label">Contacts list is empty</span><span class="fc-setting-value" style="font-weight:400;color:#76869a">send an advert — the mesh is quiet by design</span></div>
    <div class="fc-setting"><span class="fc-setting-label">Heard, but barely</span><span class="fc-setting-value" style="font-weight:400;color:#76869a">raise the antenna before anything else — height beats power</span></div>
    <div class="fc-setting"><span class="fc-setting-label">Was fine, now deaf</span><span class="fc-setting-value" style="font-weight:400;color:#76869a">reboot or AGC reset; suspect a pinned noise floor</span></div>
    <div class="fc-setting fc-setting--last"><span class="fc-setting-label">They hear me, I don't</span><span class="fc-setting-value" style="font-weight:400;color:#76869a">the problem is on your receive side</span></div>
  </div>
  <div class="fc-callout">
    <div class="fc-callout-ic">!</div>
    <div>
      <strong>Re-send an advert after any move</strong>
      <p>After changing location, antenna, or any radio setting, fire a zero-hop advert so neighbours re-learn your path. A stale route is one of the most common reasons a node is heard but messages don't get through.</p>
    </div>
  </div>
</div>

---

### Field Cards

<div class="content-section content-section--b">
  <p>The NashMesh Field Cards are a 25-card reference deck covering every setting on this page — what it does, why NashMesh uses the value it does, and the exact commands to set it. Thanks to KA4RLW for putting them together.</p>
  <a href="https://nashme.sh/static/docs/nashmesh_field_cards.pdf" class="fc-download-btn" download>Download Field Cards PDF</a>
</div>
