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