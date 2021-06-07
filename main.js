const Discord = require('discord.js');
const config = require('./setup.json');
const fs = require('fs');
// filesystem stuff to connect to different files nothing to do with discord bot.
const client = new Discord.Client();
client.commands = new Discord.Collection();
// discord collection extends the map class for stuff
const cmdFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of cmdFiles) {
	const commandReq = require(`./commands/${file}`);

	client.commands.set(commandReq.name, commandReq);
}

client.on('message', message => {
	if(!message.content.startsWith(config.prefix) || message.author.bot) {return;}

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) {return;}

	try {
		client.commands.get(command).run(message, args);
	}
	catch (error) {
		console.error(error);
		message.reply('Error Executing Command!');
	}

});
client.once('ready', () => {
	console.log('Bot Online - ' + config.name + '\nLogged in with:' + config.token + ', prefix: ' + config.prefix);
	client.user.setActivity('TerminalMC.tk', { type: 'PLAYING' });
});

// that goes in the end
client.login(config.token);