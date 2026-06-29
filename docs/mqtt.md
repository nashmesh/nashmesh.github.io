## What is MQTT?

MQTT is a message-broker application that mesh nodes can connect to. By connecting to an MQTT server, all LoRa traffic your node sees is sent to our MQTT server where applications can pull and use it.

## MQTT Settings

These settings work for both <img src="../static/images/meshcore-logo.png" class="page-title-logo" alt="MeshCore">**MeshCore** and <img src="../static/images/meshtastic-logo.svg" class="page-title-logo" alt="Meshtastic">**Meshtastic**.

| Key        | Value              |
| ---------- | ------------------ |
| Host       | `mqtt.nashme.sh`   |
| Username   | `meshdev`          |
| Password   | `large4cats`       |

## MeshCore Analyzer Observer

An Observer is a MeshCore node that reports packets it hears to the [MeshCore Analyzer](https://analyzer.nashme.sh), helping map network coverage and reliability across the region. Observers can be repeaters, room servers, or companion devices, and can stop sharing data at any time.

To set up your node as an observer, visit the [Observer Onboarding page](https://analyzer.letsmesh.net/observer/onboard?type=companion) for step-by-step instructions.

Use the following configuration to connect your observer to the NashMesh MQTT server:

<div class="copyable-code">
<pre><code>[general]
iata = "BNA"
[[broker]]
name = "nashmesh"
enabled = true
server = "mqtt.nashme.sh"
port = 1883
transport = "tcp"
keepalive = 60
qos = 0
retain = true
[broker.auth]
method = "password"
username = "meshdev"
password = "large4cats"</code></pre>
</div>

## Experimental Observer Firmware

Custom firmwares provided by [Adam](https://gessaman.com) include observer functionality built directly into the firmware — no companion device or separate install needed. Both repeater and room server variants are available.

Supported devices:

- Heltec T190 / v3 / v4
- LilyGo T3S3 SX1262
- RAK 3112
- Station G2
- T-Beam S3 Supreme
- T-Beam SX1262 / SX1276
- Xiao S3 WIO

[Download experimental firmwares](https://files.gessaman.com/meshcore-observer/){ .doc-btn }

For full documentation on all available settings and commands, see the [MQTT Bridge Implementation docs](https://github.com/agessaman/MeshCore/blob/mqtt-bridge-implementation-flex/MQTT_IMPLEMENTATION.md).

### Radio Settings

If this is a fresh flash or full erase, configure radio parameters for the NashMesh region:

<div class="copyable-code">
<pre><code>set radio 910.525,62.5,7,8</code></pre>
</div>

<div class="copyable-code">
<pre><code>set tx 22</code></pre>
</div>

### Device Identity

Set your node's name and the Nashville IATA code:

<div class="copyable-code">
<pre><code>set name MyObserver</code></pre>
</div>

<div class="copyable-code">
<pre><code>set mqtt.iata BNA</code></pre>
</div>

### WiFi

<div class="copyable-code">
<pre><code>set wifi.ssid YourNetworkName</code></pre>
</div>

<div class="copyable-code">
<pre><code>set wifi.pwd YourPassword</code></pre>
</div>

### Add NashMesh and TennMesh

Slot 1 is pre-configured for LetsMesh Analyzer. Replace slot 2 (LetsMesh EU) with TennMesh, and add NashMesh to slot 3:

<div class="copyable-code">
<pre><code>set mqtt2.preset tennmesh</code></pre>
</div>

<div class="copyable-code">
<pre><code>set mqtt3.preset nashmesh</code></pre>
</div>

### Reboot

<div class="copyable-code">
<pre><code>reboot</code></pre>
</div>

After rebooting, verify your connections with:

<div class="copyable-code">
<pre><code>get mqtt.status</code></pre>
</div>

If connected successfully, each configured preset will show `ok`.

<div class="ai-badge-footer"><span class="page-title-ai-badge">AI Assisted Page</span></div>
