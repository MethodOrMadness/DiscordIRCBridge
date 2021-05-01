module.exports = (bot, message) => {
    // Ignore if client is a bot
    if(message.author.bot) return;

    // Ignore messages not starting with the prefix (defined as prefix in botconfig.json)
    if(message.content.indexOf(bot.config.prefix) !== 0) return;

    // Our standard argument/command name definition.
    const args = message.content.slice(bot.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // Grab the command data from the client.commands Enmap
    const cmd = bot.commands.get(command);

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    // Run the command
    cmd.run(bot, message, args);
}