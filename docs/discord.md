<h1 class="page-title-with-logo"><img src="../static/images/discord.png" class="page-title-logo" alt="Discord">Discord</h1>

Check out our <a href="https://discord.gg/sSS8gEpuh8">Discord server</a> if you ever need help, want to meet new folks, or just want to talk anything radio. We also annnounce upcoming meetings and share information about upcoming deployments.

# MQTT Logging Channels

MQTT messages are logged to Discord based on firmware and channel. If the sending node is linked to a Discord account, the message will show the owning user.

| Platform | Channel | Discord Channel |
|----------|---------|-----------------|
| Meshtastic | `MediumFast` | `#logger` |
| Meshtastic | All others | `#logger-other` |
| MeshCore | Public | `#meshcore-logger` |
| MeshCore | All others | `#meshcore-logger-other` |


# Discord Bot
The NashMesh Discord bot lets you link your nodes, look up node info, manage flags, and share community resources.

## Slash Commands

Slash commands are available from the bot and they allow for control of different features the bot offers.

### `/linknode`

Link a Meshtastic or MeshCore node to your Discord account. If you don't provide a node ID, a modal will appear. With autocomplete enabled, you can also start typing a node name or hex ID.

<div class="dc-preview">
  <!-- User runs /linknode (no nodeid → modal) -->
  <div class="dc-message">
    <div class="dc-avatar dc-avatar--user">MH</div>
    <div class="dc-content">
      <div class="dc-header">
        <span class="dc-username">M3shHe4d</span>
        <span class="dc-ts">Today at 2:30 PM</span>
      </div>
      <div class="dc-body"><span class="dc-cmd">/linknode</span></div>
      <div class="dc-modal-wrap">
        <div class="dc-modal-header">Link Your Node</div>
        <div class="dc-input-label">Node ID <span style="color:#ed4245">*</span></div>
        <div class="dc-input">8-char hex (Meshtastic) or 64-char key (Meshcore)</div>
        <div class="dc-modal-footer">
          <span class="dc-btn dc-btn--secondary">Cancel</span>
          <span class="dc-btn dc-btn--primary">Submit</span>
        </div>
      </div>
    </div>
  </div>
</div>

---

### `/unlinknode`

Remove the link between a node and your Discord account. Running the command with no node ID shows a dropdown of your linked nodes. Unlinking also clears any flags you've set for that node.

<div class="dc-preview">
  <div class="dc-message">
    <div class="dc-avatar">NM</div>
    <div class="dc-content">
      <div class="dc-header">
        <span class="dc-username dc-username--bot">NashMesh Bot</span>
        <span class="dc-tag">APP</span>
        <span class="dc-ts">Today at 2:32 PM</span>
      </div>
      <div class="dc-interaction"><span class="dc-user">M3shHe4d</span> used <span class="dc-cmd">/unlinknode</span></div>
      <div class="dc-text">Select a node to unlink:</div>
      <div class="dc-select-wrap">
        <div class="dc-select">
          <span>Select a node to unlink</span>
          <span>▾</span>
        </div>
      </div>
      <div class="dc-ephemeral">🔒 Only you can see this</div>
    </div>
  </div>
</div>

---

### `/nodes`

List all nodes linked to you (or another user). Results are paginated if you have many nodes. Each node links to its page on Malla (Meshtastic) or the Analyzer (MeshCore).

<div class="dc-preview">
  <div class="dc-message">
    <div class="dc-avatar">NM</div>
    <div class="dc-content">
      <div class="dc-header">
        <span class="dc-username dc-username--bot">NashMesh Bot</span>
        <span class="dc-tag">APP</span>
        <span class="dc-ts">Today at 2:33 PM</span>
      </div>
      <div class="dc-interaction"><span class="dc-user">M3shHe4d</span> used <span class="dc-cmd">/nodes</span></div>
      <div class="dc-embed">
        <div class="dc-embed-pill"></div>
        <div class="dc-embed-body">
          <div class="dc-embed-author">
            <div class="dc-embed-author-icon">MH</div>
            <div class="dc-embed-author-name">M3shHe4d</div>
          </div>
          <div class="dc-embed-title">Linked Nodes</div>
          <div class="dc-embed-fields">
            <div class="dc-field">
              <div class="dc-field-name">[<span class="dc-code">!677d3afe</span>] Nashville Node</div>
              <div class="dc-field-value"><a href="#">View on Malla</a></div>
            </div>
            <div class="dc-field">
              <div class="dc-field-name">[<span class="dc-code">!3166fb16</span>] MC-Relay</div>
              <div class="dc-field-value"><a href="#">View on Analyzer</a></div>
            </div>
          </div>
        </div>
      </div>
      <div class="dc-ephemeral">🔒 Only you can see this</div>
    </div>
  </div>
</div>

---

### `/flags`

Manage per-node flags that control bot behavior. Running `/flags` with no arguments shows a dropdown if you have multiple nodes, or opens the flags panel directly if you only have one.

<div class="dc-preview">
  <div class="dc-message">
    <div class="dc-avatar">NM</div>
    <div class="dc-content">
      <div class="dc-header">
        <span class="dc-username dc-username--bot">NashMesh Bot</span>
        <span class="dc-tag">APP</span>
        <span class="dc-ts">Today at 2:35 PM</span>
      </div>
      <div class="dc-interaction"><span class="dc-user">M3shHe4d</span> used <span class="dc-cmd">/flags</span></div>
      <div class="dc-embed">
        <div class="dc-embed-pill" style="background:#fefdf5;"></div>
        <div class="dc-embed-body">
          <div class="dc-embed-title">Flags — Nashville Node</div>
          <div class="dc-embed-fields">
            <div class="dc-field--1">
              <div class="dc-field-name">showPosition</div>
              <div class="dc-field-value">false</div>
            </div>
          </div>
          <div class="dc-embed-footer"><span class="dc-code" style="color:#949ba4;">!677d3afe</span></div>
        </div>
      </div>
      <div class="dc-actions">
        <span class="dc-btn dc-btn--secondary">showPosition: OFF</span>
      </div>
      <div class="dc-ephemeral">🔒 Only you can see this</div>
    </div>
  </div>
</div>

Clicking a button toggles the flag on or off. When enabled, the button turns green:

<div class="dc-preview">
  <div class="dc-message">
    <div class="dc-avatar">NM</div>
    <div class="dc-content">
      <div class="dc-header">
        <span class="dc-username dc-username--bot">NashMesh Bot</span>
        <span class="dc-tag">APP</span>
        <span class="dc-ts">Today at 2:35 PM</span>
      </div>
      <div class="dc-embed">
        <div class="dc-embed-pill" style="background:#fefdf5;"></div>
        <div class="dc-embed-body">
          <div class="dc-embed-title">Flags — Nashville Node</div>
          <div class="dc-embed-fields">
            <div class="dc-field--1">
              <div class="dc-field-name">showPosition</div>
              <div class="dc-field-value">true</div>
            </div>
          </div>
          <div class="dc-embed-footer"><span class="dc-code" style="color:#949ba4;">!677d3afe</span></div>
        </div>
      </div>
      <div class="dc-actions">
        <span class="dc-btn dc-btn--success">showPosition: ON</span>
      </div>
      <div class="dc-ephemeral">🔒 Only you can see this</div>
    </div>
  </div>
</div>

**Available flags:**

| Flag | Default | Description |
|------|---------|-------------|
| `showPosition` | `false` | Allow your node's GPS position to be shared publicly |

---

<!--
### `/links list`

Browse all link categories saved for this server. Select a type from the dropdown to post its links to the channel.

<div class="dc-preview">
  <div class="dc-message">
    <div class="dc-avatar">NM</div>
    <div class="dc-content">
      <div class="dc-header">
        <span class="dc-username dc-username--bot">NashMesh Bot</span>
        <span class="dc-tag">APP</span>
        <span class="dc-ts">Today at 2:36 PM</span>
      </div>
      <div class="dc-interaction"><span class="dc-user">M3shHe4d</span> used <span class="dc-cmd">/links list</span></div>
      <div class="dc-embed">
        <div class="dc-embed-pill"></div>
        <div class="dc-embed-body">
          <div class="dc-embed-title">Available Link Types</div>
          <div class="dc-embed-desc">
<span class="dc-code">!antenna</span>
<span class="dc-code">!cable</span>
<span class="dc-code">!case</span>
<span class="dc-code">!power</span>
<span class="dc-code">!solar</span>
          </div>
          <div class="dc-embed-footer">5 types</div>
        </div>
      </div>
      <div class="dc-select-wrap">
        <div class="dc-select">
          <span>Select a type to view its links</span>
          <span>▾</span>
        </div>
      </div>
      <div class="dc-ephemeral">🔒 Only you can see this</div>
    </div>
  </div>
</div>

---

### `/links show`

Show all links for a specific type. If you omit the type, a dropdown appears. Links are posted publicly to the channel.

<div class="dc-preview">
  <div class="dc-message">
    <div class="dc-avatar">NM</div>
    <div class="dc-content">
      <div class="dc-header">
        <span class="dc-username dc-username--bot">NashMesh Bot</span>
        <span class="dc-tag">APP</span>
        <span class="dc-ts">Today at 2:37 PM</span>
      </div>
      <div class="dc-interaction"><span class="dc-user">M3shHe4d</span> used <span class="dc-cmd">/links show</span></div>
      <div class="dc-embed">
        <div class="dc-embed-pill"></div>
        <div class="dc-embed-body">
          <div class="dc-embed-title">!antenna</div>
          <div class="dc-embed-desc">
https://www.amazon.com/dp/B0EXAMPLE1
https://www.amazon.com/dp/B0EXAMPLE2
https://rokland.com/products/example-antenna</div>
        </div>
      </div>
    </div>
  </div>
</div>

---

### `/links add`

Add one or more URLs to one or more link types. A modal collects the URLs (one per line) and the type(s).

<div class="dc-preview">
  <div class="dc-message">
    <div class="dc-avatar dc-avatar--user">MH</div>
    <div class="dc-content">
      <div class="dc-header">
        <span class="dc-username">M3shHe4d</span>
        <span class="dc-ts">Today at 2:38 PM</span>
      </div>
      <div class="dc-body"><span class="dc-cmd">/links add</span></div>
      <div class="dc-modal-wrap">
        <div class="dc-modal-header">Add Link</div>
        <div class="dc-input-label">URL(s) — one per line <span style="color:#ed4245">*</span></div>
        <div class="dc-input dc-input--paragraph">https://www.amazon.com/dp/B0EXAMPLE3</div>
        <div class="dc-input-label">Type(s) (comma-separated, e.g. antenna,cable) <span style="color:#ed4245">*</span></div>
        <div class="dc-input">antenna</div>
        <div class="dc-modal-footer">
          <span class="dc-btn dc-btn--secondary">Cancel</span>
          <span class="dc-btn dc-btn--primary">Submit</span>
        </div>
      </div>
    </div>
  </div>
</div>

After submitting, the bot confirms what was added:

<div class="dc-preview">
  <div class="dc-message">
    <div class="dc-avatar">NM</div>
    <div class="dc-content">
      <div class="dc-header">
        <span class="dc-username dc-username--bot">NashMesh Bot</span>
        <span class="dc-tag">APP</span>
        <span class="dc-ts">Today at 2:38 PM</span>
      </div>
      <div class="dc-text">
        Added to <span class="dc-code">!antenna</span>:<br>
        - <span class="dc-code">https://www.amazon.com/dp/B0EXAMPLE3</span>
      </div>
    </div>
  </div>
</div>

---

### `/links remove`

Remove links from one or more types. Select the type(s), then pick the URL(s) to remove from a second dropdown.

<div class="dc-preview">
  <div class="dc-message">
    <div class="dc-avatar">NM</div>
    <div class="dc-content">
      <div class="dc-header">
        <span class="dc-username dc-username--bot">NashMesh Bot</span>
        <span class="dc-tag">APP</span>
        <span class="dc-ts">Today at 2:39 PM</span>
      </div>
      <div class="dc-interaction"><span class="dc-user">M3shHe4d</span> used <span class="dc-cmd">/links remove</span></div>
      <div class="dc-text">Select link type(s) to remove from:</div>
      <div class="dc-select-wrap">
        <div class="dc-select">
          <span>Select type(s) to remove links from</span>
          <span>▾</span>
        </div>
      </div>
      <div class="dc-ephemeral">🔒 Only you can see this</div>
    </div>
  </div>
</div>

After picking a type, you choose the specific URLs to remove:

<div class="dc-preview">
  <div class="dc-message">
    <div class="dc-avatar">NM</div>
    <div class="dc-content">
      <div class="dc-header">
        <span class="dc-username dc-username--bot">NashMesh Bot</span>
        <span class="dc-tag">APP</span>
        <span class="dc-ts">Today at 2:39 PM</span>
      </div>
      <div class="dc-text">Select URL(s) to remove from <span class="dc-code">!antenna</span>:</div>
      <div class="dc-select-wrap">
        <div class="dc-select">
          <span>Select URL(s) to remove</span>
          <span>▾</span>
        </div>
      </div>
      <div class="dc-ephemeral">🔒 Only you can see this</div>
    </div>
  </div>
</div>

-->

---

## Message Commands

These are triggered by typing `!commandname` in a text channel.

### `!mqtt`

Posts the MQTT connection settings for both MeshCore and Meshtastic.

---

### `!<linktype>`

Type any link category name prefixed with `!` to post its links directly to the channel. <!-- Link types are managed via `/links add`. -->

<div class="dc-preview">
  <div class="dc-message">
    <div class="dc-avatar dc-avatar--user">MH</div>
    <div class="dc-content">
      <div class="dc-header">
        <span class="dc-username">M3shHe4d</span>
        <span class="dc-ts">Today at 2:42 PM</span>
      </div>
      <div class="dc-body"><span class="dc-cmd">!antenna</span></div>
    </div>
  </div>
  <div class="dc-message" style="margin-top:4px;">
    <div class="dc-avatar">NM</div>
    <div class="dc-content">
      <div class="dc-header">
        <span class="dc-username dc-username--bot">NashMesh Bot</span>
        <span class="dc-tag">APP</span>
        <span class="dc-ts">Today at 2:42 PM</span>
      </div>
      <div class="dc-text">
        - &lt;https://www.amazon.com/dp/B0EXAMPLE1&gt;<br>
        - &lt;https://www.amazon.com/dp/B0EXAMPLE2&gt;<br>
        - &lt;https://rokland.com/products/example-antenna&gt;
      </div>
    </div>
  </div>
</div>

If there's only a single link, it's posted without the list prefix so Discord auto-embeds it.
