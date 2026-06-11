<h1 class="page-title-with-logo"><img src="../../static/images/meshcore-logo.png" class="page-title-logo" alt="MeshCore">MeshCore</h1>

## Radio Settings

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
  <div class="fc-callout">
    <div class="fc-callout-ic">!</div>
    <div>
      <strong>This is your address, not a tuning knob</strong>
      <p>Frequency, bandwidth and spreading factor together define the channel the whole mesh agrees on. Changing any of them on your node alone doesn't "improve" anything — it just removes you from the conversation. Match the network exactly, every time.</p>
    </div>
  </div>
</div>

---

## Frequency

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

## Bandwidth

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

## Spreading Factor

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
