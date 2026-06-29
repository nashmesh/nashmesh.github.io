![Image title](./static/images/main.jpg)

<div id="banner-container"></div>

## Mission
Our mission is to provide a reliable mesh network along with resources, guidance, and support for anyone who would like to use the network.

## What Is a Mesh Network?
A mesh network is a decentralized, off-grid communications network built on low-powered devices. Each node relays messages for others, extending range and resilience without relying on traditional infrastructure. It's used as a messaging platform that provides a backup for everyday communication, popular during disasters, power outages, or simply as a hobby.

NashMesh runs on <img src="../../static/images/meshcore-logo.png" class="page-title-logo" alt="MeshCore">[**MeshCore**](https://meshcore.io), an open-source, decentralized mesh network using LoRa radios designed for long-range communication without relying on traditional infrastructure.

### How Do I Get Started?
Got the itch to give the mesh a try? Check out our <a href="/getting-started/meshcore">MeshCore setup guide</a> to get on the network.

Community members who run <img src="../../static/images/meshtastic-logo.svg" class="page-title-logo" alt="Meshtastic">[Meshtastic](https://meshtastic.org) nodes are also welcome. See the <a href="/getting-started/meshtastic/">Meshtastic setup guide</a> under Resources for more info.

### How Do I Get Involved?
Feel free to jump into our [Discord](https://discord.gg/sSS8gEpuh8)! We have plenty of folks with experience and knowledge that can help you get started.

### Who's Around Me?
A top-level view of this map provides a heat signature for any active nodes in the area. Zoom in to show where nodes are available.
<div id="homepage-map-canvas" style="width: 100%; height: 50vh; z-index: 1; border-radius: 6px"></div>

<script>window.NASHME_POSTS = {{ recent_posts_json() }}; window.NASHME_MEETUPS = {{ recent_meetups_json() }};</script>

