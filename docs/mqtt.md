## What is MQTT?

MQTT is a message-broker application that Meshtastic nodes can connect to. By connecting to an MQTT server, all LoRa traffic your node sees is sent over to our MQTT server where applications can pull and use.

!!! note "How to help without connecting to MQTT"
    If you would like to still help with contributing your nodes data but do not want to connect to MQTT, please set `OK to MQTT` to `true`.

    This allows any MQTT gateway (a node connected to MQTT) to submit your data to our MQTT server. For more information on enabling `OK to MQTT`, check out [Meshtastic's website](https://meshtastic.org/docs/configuration/radio/lora/#ok-to-mqtt).


## MQTT Settings
| Key              |  Value       |
| ------------ | ---------------- |
| Host       | `mqtt.nashme.sh`  |
| Username   | `meshdev`          |
| Password   | `large4cats`       |
| Topic      | `msh/US/TN/Middle` |
| Primary Channel Uplink   | `true`       |
| Primary Channel Downlink   | `false`       |
| Ok to MQTT  | `true`       |

!!! note "Reminder"

    It's preferred that MQTT is used only for collecting and displaying data from nodes. To keep the system running smoothly for everyone, we kindly ask that you leave MQTT downlink turned off on all public channels. This helps reduce unnecessary traffic on the server.

## Setup Images

Provided are images showing each required change that is needed to setup MQTT.

=== "Mac OS X and iOS"
    First navigate to the `Settings` tab. For `iOS`, this option is on the bottom of the screen.

    ![Image title](../static/images/mqtt/mac-os/01_Settings.jpg)

    Then access the `Channels` option.

    ![Image title](../static/images/mqtt/mac-os/02_Channels.png)

    Click on the `Primary Channel` to configure settings for it.

    ![Image title](../static/images/mqtt/mac-os/03_Primary_Channel.png)

    Enable `Uplink Enabled` to allow MQTT to upload data the radio receives.

    ![Image title](../static/images/mqtt/mac-os/04_Uplink_Enabled.png)

    Navigate to the `Settings` tab again. For `iOS`, this option is on the bottom of the screen.

    ![Image title](../static/images/mqtt/mac-os/05_Settings.jpg)

    Click the `MQTT` module to configure settings for it.

    ![Image title](../static/images/mqtt/mac-os/06_MQTT.png)

    Set `Enabled` for MQTT and enable `Encryption Enabled`. If your radio depends on your phones cellular network for internet connectivity, enable `MQTT Client Proxy`.

    ![Image title](../static/images/mqtt/mac-os/07_MQTT_Enabled.jpg)

    Set the `Root Topic` and MQTT server details.

    ![Image title](../static/images/mqtt/mac-os/08_Root_Topic_and_Server.png)
