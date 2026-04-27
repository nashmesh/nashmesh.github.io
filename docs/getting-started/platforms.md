<h1 class="page-title-with-logo">What Do I Use?</h1>
NashMesh currently supports two platforms:

- <img src="../../static/images/meshtastic-logo.svg" class="page-title-logo" alt="Meshtastic"><a href="https://meshtastic.org">Meshtastic</a>
- <img src="../../static/images/meshcore-logo.png" class="page-title-logo" alt="MeshCore"><a href="https://meshcore.io">MeshCore</a>

<hr />

Choosing a platform is dependent on what your needs are for communication as each platform provides a different set of capabilities.

We have many members of the community who like to run nodes for both Meshtastic and MeshCore. As the old saying goes, "<i>¿Por qué no los dos?</i>". <small>Translation: "<i>Why not both?</i>"</small>

If you would like to see what nodes are in your area for each platform, check out our <a href="/map">network map</a>.

<div class="content-section content-section--a" markdown="1">

## <img src="../../static/images/meshtastic-logo.svg" class="page-title-logo" alt="Meshtastic">Meshtastic
Meshtastic is the first platform that was setup in the Nashville metropolitan area. It uses LoRa (Long Range) radio-capable devices to allow for communication with other radios that have direct line-of-sight.

<h3 class="no-anchor">Features</h3>
The network is decentralized which allows for nodes to join and leave the network while other nodes continue to provide coverage for the area. Packets can be retransmitted across the network by other nodes to help extend the coverage of the network.

Messages can be sent to a public or private channel, or to another user on the network. Packets are sent using AES-256 encryption to provide a layer of security when transmitting data across the network.

<h3 class="no-anchor">Usage</h3>
We've found Meshtastic to be great for ad-hoc communication as packets can only travel so far due to the 7-hop limit. This allows for our network to stay local to our area.

We use it to say "<i>ping... pong!</i>" (and more!) to each other, receive updates on severe weather alerts, for communication during post-disaster events such as power/internet outages, and much more. We have many Meshtastic nodes in-use comprising of client-based users and the infrastructure that community members have deployed around the area.

As of January 2026, we have been using the `MediumFast` network preset to reduce the frequency of packet collisions and to improve the overall reliability of the network. Since the switch, we've noticed a substantial improvement in packet delivery.

<a href="/getting-started/meshtastic" class="doc-btn">Meshtastic Setup Guide →</a>

<hr />

[The Comms Channel](https://www.youtube.com/@The_Comms_Channel) has put together a great video going over Meshtastic. Give it a watch to learn more!

<div class="yt-embed">
  <iframe src="https://www.youtube.com/embed/oAo2sb8LpFc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

</div>

<div class="content-section content-section--b" markdown="1">

## <img src="../../static/images/meshcore-logo.png" class="page-title-logo" alt="MeshCore">MeshCore
MeshCore is the second platform that has been deployed as of January 2026 and is similar in many ways to Meshtastic. It's a decentralized and encrypted mesh network using LoRa technology, but it does handle things differently than Meshtastic for how the network topology is laid out and used.

<h3 class="no-anchor">Features</h3>
MeshCore works by relying on two types of nodes: Companions and Repeaters.

* Companion nodes are similar to a Meshtastic node set-up to transmit user data and to receive data from other nodes. It may also act as a repeater if enabled.

* Repeater nodes are used for one purpose only: to extend the coverage of the network by helping to route packets to their final destination. Repeater nodes are not like Meshtastic repeaters as they do not retransmit every packet they receieve.

<h3 class="no-anchor">Usage</h3>
MeshCore has a maximum 64-hop limit for packets which is great for communication that extends beyond our region. Our current goal is to link up with the MeshCore network in East Tennessee and eventually across multiple states.

<a href="/getting-started/meshcore" class="doc-btn">MeshCore Setup Guide →</a>

<hr />

[The Comms Channel](https://www.youtube.com/@The_Comms_Channel) has also put together a great video going over MeshCore. Give it a watch to learn more!

<div class="yt-embed">
  <iframe src="https://www.youtube.com/embed/iaFltojJrAc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

</div>