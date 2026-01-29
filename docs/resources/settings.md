# Recommended Settings

We have some sane default settings that we strongly recommend you follow.

Please make sure to update the firmware on your device as you get started. The easiest way to do that is to use the Web Flasher. The latest stable release, even if labeled Beta, is generally a very safe option.
Most importantly make sure to keep all automatic beacons like telemetry and position (if used on a stationary node) to 6 hours +. If you want to send position while moving, use Smart Position, with minimum 10 minutes and distance trigger 100 to 130. This helps keep our mesh clean of background traffic that's of little use.

If you are joining our network you may visit discord and ‘/linknode !nodeid’ in the logger channels.

In the Middle TN Area, we have a few recommendations for configuration:
(Make sure to read all the recommended settings)

### LoRa

| Setting                           | Value         |
| --------------------------------- | ------------- |
| Region                            | `US`          |
| Preset                            | Medium Range Fast |
| Max Hops (infrastructure nodes)   | `4 (up to 5)` |
| Max Hops (personal nodes)         | `6 (up to 7)` |
| Ignore MQTT (optional)            | Optional: Enable this to ignore traffic that may have been downlinked from MQTT (the internet) |
| OK to MQTT (recommended)          | Recommended but optional: Enable this for your messages to be uploaded to MQTT (the internet). This is required for your messages to show up on the Discord logger, Malla, MeshInfo, or location on any maps. This helps us see where traffic flows, and troubleshoot issues. |

### Channels
Below are configuration settings for the `0 Primary Channel`.

| Setting                           | Value         |
| --------------------------------- | ------------- |
| Name                              | *Left intentionally blank* |
| PSK                               | `AQ==`        |
| Position Precision                | You may wish to turn off *Positions & Location* if you’re not interested in broadcasting your location. If you wish to enable a precise location you can do so via any client other than iOS |

### User

| Setting                           | Value   |
| --------------------------------- | ------------- |
| Long Name                         | Something descriptive. Ex: Your name, Discord Handle, or Ham Callsign. You can even include an email or website (ProTip: put nashme.sh in your name so more people can find us)            |
| Short Name                        | Max of 4 characters, something unique for you and that particular radio. This will be what’s displayed in chat. You can even use emojis to spice things up.                          |
| Is Licensed (not recommended)     | Not recommended. Do not enable unless you are a licensed Amateur Radio operators. (You will not be able to communicate with people on any of the default channels if you enable this)

### Device Roles

| Role                  | Description   |
| --------------------- | ------------- |
| `CLIENT_MUTE`         | The safe, defacto role that is default. Perfect for your single primary node. It will relay messages it receives.
| `CLIENT`              | Best for vehicles and any time you have more than 2 nodes in the same place. It will not relay messages. (It will still transmit its own packets)
| `CLIENT_BASE`         | Designed for stationary, high-elevation nodes (e.g., rooftops, attics) to act as a personal, privileged relay. It prioritizes rebroadcasting packets to/from specific "favorited" personal nodes, boosting signal reliability for weaker, indoor, or handheld devices while still acting as a regular client for general mesh traffic. Important note - You MUST favorite your personal indoor nodes to the Client Base node and vice-versa.
| `ROUTER` / `REPEATER` | DO NOT use this role. There are a lot of considerations, and caveats, to using the official Router & Repeater roles. Remember: The Client or Client_Base role relays messages just fine.

### Module Configuration

#### MQTT

If you want to upload to the internet to help us with data logging, see MQTT - This can be on nodes with their own WiFi chips or on the go with MQTT client proxy from the phone app.

#### Telemetry

| Setting                           | Description   |
| --------------------------------- | ------------- |
| Environment Telemetry Enabled     | Enables the environment telemetry sensors | `true` | [telemetry/#environment-telemetry-enabled](https://meshtastic.org/docs/configuration/module/telemetry/#environment-telemetry-enabled)
| Device Metrics Update Interval    | How often to send Device Metrics over the mesh | 6 hour (iOS) / 21,600 seconds (Android) |[telemetry/#device-metrics-update-interval](https://meshtastic.org/docs/configuration/module/telemetry/#device-metrics-update-interval)
| Environment Metrics Update Intervall    | How often to send Device Metrics over the mesh | 6 hour (iOS) / 21,600 seconds (Android) |[telemetry/#environment-metrics-update-interval](https://meshtastic.org/docs/configuration/module/telemetry/#environment-metrics-update-interval)

#### Tips
* Make sure to keep all automatic beacons like telemetry and position (if used on a stationary node) to `6 hours+`. If you want to send position while moving, use *Smart Position*, with minimum `10 minutes` and distance trigger `100` to `130`. This helps keep the mesh network clean of background traffic that's of little use.

!!! info

    Configuration guide was happily donated by [bayme.sh](https://bayme.sh).