---
template: base_no_sidebar.html
---
# What do I use?
NashMesh currently supports two platforms:  <img src="../../static/images/meshtastic-logo.svg" class="page-title-logo" alt="Meshtastic"><a href="https://meshtastic.org">Meshtastic</a> and <img src="../../static/images/meshcore-logo.png" class="page-title-logo" alt="MeshCore"><a href="https://meshcore.io">MeshCore</a>.

<hr />

Choosing a platform is dependent on what your needs are for communication as each platform provides a different set of capabilities. We have many members of the community who like to run a node for Meshtastic and another for MeshCore. The old saying goes, "¿Por qué no los dos?".

If you would like to see what nodes are in your area for each platform, check out our <a href="/map">network map</a>.

## <img src="../../static/images/meshtastic-logo.svg" class="page-title-logo" alt="Meshtastic">Meshtastic
Meshtastic is the first platform that was setup in Metro Nashville. It uses LoRa (Long Range) radio modules to allow for communication with other radios that have direct line-of-sight.

The network is decentralized which allows for nodes to join and leave the network while other nodes continue to provide coverage for the area. Packets can be retransmitted across the network by other nodes to help extend the coverage of the network.

Messages can be sent to a public or private channel, or to another user on the network. Packets are encrypted using AES-256 to provide a layer of security when transmitting data across the network.

### Usage
We've found Meshtastic to be great for ad-hoc communication as packets cannot go further than the maximum 7-hop limit the platform has.

We use it to say "<i>ping... pong!</i>", receive updates on severe weather alerts, for communication during post-disaster events such as power/internet outages, and much more. We have many Meshtastic nodes in-use comprising of client-based users and the infrastructure that we and other community members have deployed around the area.

As of January 2026, we have been using the `MediumFast` network preset to reduce the frequency of packet collisions and to improve the overall reliability of the network. Since the switch, we've noticed a substantial improvement in packet delivery.

If you're wanting to learn more about connecting to our Meshtastic network, check out our <a href="/getting-started/meshtastic">setup guide</a>.

<div class="yt-embed">
  <iframe src="https://www.youtube.com/embed/oAo2sb8LpFc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
<small>Video by [The Comms Channel](https://www.youtube.com/@The_Comms_Channel)</small>

<hr />

## <img src="../../static/images/meshcore-logo.png" class="page-title-logo" alt="MeshCore">MeshCore
MeshCore is the second platform that has been deployed as of January 2026. The concept is similar to Meshtastic in terms of a decentralized and encrypted mesh network using LoRa technology, but it does handle things differently than Meshtastic for how the network topology is laid out and used.

MeshCore works by relying on two types of nodes: Companions and Repeaters.

* Companion nodes are similar to a Meshtastic node setup in client or client-mute mode. It can receive and transmit messages while also acting as a repeater if enabled. This is what would be used to communicate on the network.

* Repeater nodes are used for one purpose only: to extend the coverage of the network by helping to route packets to their final destination. Repeater nodes are not like Meshtastic repeaters as they do not retransmit every packet they receieve.

### Usage
MeshCore has a maximum 64-hop limit for packets which is great for communication that extends beyond our region. Our current goal is to link up with the MeshCore network in East Tennessee and eventually across multiple states.

If you're wanting to learn more about connecting to our MeshCore network, check out our <a href="/getting-started/meshcore">setup guide</a>.

<div class="yt-embed">
  <iframe src="https://www.youtube.com/embed/iaFltojJrAc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>
<small>Video by [The Comms Channel](https://www.youtube.com/@The_Comms_Channel)</small>