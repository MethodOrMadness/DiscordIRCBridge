# Discord <-> IRC

Discord <-> IRC is a discord / IRC bot to proxy messages to each other

## Installation

Install the required packages

```node
npm i
```

## Usage

Configure the IRC settings and discord bot token / prefix in `botconfig.json`

Add the irc channel name and discord channel ID along with a unique name and set the `embedMessages` to true or false in `channels.json`

## channels.json Example
```js
{
    "link": [
        {
            "name": "Link1",
            "discordChannelID": "813460669826056193",
            "ircChannel": "#Linked-1",
            "embedMessages": true
        },
        {
            "name": "Link2",
            "discordChannelID": "814632736547207434",
            "ircChannel": "#Linked-2",
            "embedMessages": false
        }
    ]
}
```

## License
This software is licensed under CC BY-NC-SA 4.0

Here is a short, human-readable version, this is NOT a substitute for the legal version(found in license.txt)

**You are free to:**

**Share** — copy and redistribute the material in any medium or format

**Adapt** — remix, transform, and build upon the material

### UNDER THESE TERMS:

**Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

**NonCommercial** — You may not use the material for commercial purposes.

**ShareAlike** — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

**No additional restrictions** — You may not apply legal terms or technological measures that legally restrict others from doing anything the license permits.
## Credits
MethodOrMadness for the original base code + optimizations

Devnol for huge optimizations(mainly helping take the code from 250 to around 100 lines)

The Discord.JS Developers

The IRC library Developers