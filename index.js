// Required libraries
const Discord = require('discord.js');
const irc = require('irc');
const md5 = require('md5');
const fs = require('fs');
const Enmap = require('enmap');

// Basic config
const config = require('./botconfig.json');
const channels = require('./channels.json');
const bot = new Discord.Client({disableEveryone: true});
const IRCBot = new irc.Client(config.host, config.nickname, { port: config.port, password: config.password, secure: config.ssl, selfSigned: config.selfssl, userName: config.username, realName: config.username
})
bot.config = config; // bot config

// set bot status
bot.on("ready", async () => {
    bot.user.setPresence( { activity: { name: `IRC Commands`, type: 'LISTENING' } });
});

function returnAttachments(att){
	let attText = "";
	for (let i = 0; i < att.length; i++) {
		attText += att[i].url + " && "; // Adds the attachment to the attText variable(where the attachment url is stored)
	}
	return attText.substr(0, attText.length - 4); //remove trailing " && "
}
function IRC_TO_DISCORD(discordChannel, embedConfig, ircChannel) { //contains 3 parameters, the discord channel you want to send to, the config for if you want to embed messages or not, and the irc channel to listen on
	IRCBot.addListener("message", function(nick, to, message) { // IRC Listener
		let userColour = md5(nick).substring(0, 6); // Discord embed color string from md5'd IRC name
		nick.replace("`", "\`"); // escape the codeblock tag to prevent formatting issues
		var messageEmbed = new Discord.MessageEmbed() // message embed
			.setColor(`#${userColour}`) // color of message embed
			.setTitle(`${nick}`) // IRC Nickname
			.setDescription(`${message}`) // IRC message

		if (to === `${ircChannel}`) { // check if the IRC Channel is equal to the configured channel
			//console.log(to, nick, message);

			if(embedConfig === true) {
				bot.channels.cache.get(discordChannel).send(messageEmbed); // send embeded version of message
			} else if(embedConfig === false) {
				bot.channels.cache.get(discordChannel).send(`\`<${nick}>\` | ${message}`); // send text-only version
			} else {
				console.log("Invalid type!"); // return on invalid value
				return;
			}
		} else {
			return; // return on unexpected error
		}
	});
}

function DISCORD_TO_IRC(discordChan, ircChan, msg) {
	if(msg.channel.id === discordChan) {
		if (msg.author.bot) return; // return if message author is the bot
		if (msg.content.substring(0,1) === config.prefix) return; // return if the message begins with the configured prefix
	 
		let discUser = msg.author.username.substring(0,8) + " ".repeat(Math.max((8 - msg.author.username.length), 0)); // Set discord username for IRC Message
	 
		var Attachment = (msg.attachments).array(); // attachments
		if(Attachment[0]) { // message loop
			IRCBot.say(`${ircChan}`, `${discUser} : ${msg.cleanContent} (Attachments: ${returnAttachments(Attachment)})`); // send each link to an attachment
		} else {
			IRCBot.say(`${ircChan}`, `${discUser} : ${msg.cleanContent}`); // send message content
		}
	}
}

bot.on('ready', async () => { // Send messages from IRC to Discord
	channels.link.forEach(channel => {
		IRC_TO_DISCORD(channel.discordChannelID, channel.embedMessages, channel.ircChannel);
	});
});

bot.on('message', async message => { // Send messages from Discord to IRC
	channels.link.forEach(channel => {
		DISCORD_TO_IRC(channel.discordChannelID, channel.ircChannel, message);
	});
});

// -- THIS IS THE DISCORD COMMAND HANDLER --

// events
 fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        bot.on(eventName, event.bind(null, bot));
    });
});

// Enmap
bot.commands = new Enmap();
  
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        bot.commands.set(commandName, props);
    });
});

// Bot login
bot.login(config.token);