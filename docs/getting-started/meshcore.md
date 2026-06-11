<h1 class="page-title-with-logo"><img src="../../static/images/meshcore-logo.png" class="page-title-logo" alt="MeshCore">MeshCore</h1>

<div class="content-section content-section--b">

<div class="fc-card-header">
  <h2 class="fc-card-title">Radio Settings</h2>
  <div class="fc-badges">
    <span class="fc-badge fc-badge--green">PRESET <strong>USA/Canada</strong></span>
    <span class="fc-badge">FREQ <strong>910.525 MHz</strong></span>
    <span class="fc-badge">BW <strong>62.5 kHz</strong></span>
    <span class="fc-badge">SF <strong>7</strong></span>
    <span class="fc-badge">CR <strong>5</strong></span>
    <span class="fc-badge">RULE <strong>must match the mesh</strong></span>
  </div>
</div>

<div class="fc-section">
  <div class="fc-sech"><div class="fc-num">1</div><div><h3>How to set it</h3><p class="fc-sech-sub">Load the preset, confirm the values, reboot.</p></div></div>
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
      <div class="copyable-code" style="margin-top:0.5rem">
        <pre><code>set radio 910.525,62.5,7,5
reboot
get radio  # verify</code></pre>
      </div>
    </div>
  </div>
</div>

<div class="fc-section fc-section--last">
  <div class="fc-sech"><div class="fc-num">2</div><div><h3>Why it must match</h3><p class="fc-sech-sub">Get one value wrong and the mesh can't hear you.</p></div></div>
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
  <div class="fc-callout">
    <div class="fc-callout-ic">!</div>
    <div>
      <strong>This is your address, not a tuning knob</strong>
      <p>Frequency, bandwidth and spreading factor together define the channel the whole mesh agrees on. Changing any of them on your node alone doesn't "improve" anything — it just removes you from the conversation. Match the network exactly, every time.</p>
    </div>
  </div>
</div>

</div>
