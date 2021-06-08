module.exports = {
	name: 'botinfo',
	run(message, args) {
		const Discord = require('discord.js');
		const fs = require('fs');
		const setup = fs.readFile(path.join(__dirname, '../setup.json'));
		message.channel.send('Token: ' + setup.token + ', ' + 'Prefix: ' + setup.prefix);
		console.log('[' + message.channel.name + ', ' + message.author.tag + '] sent: ' + message.content);
	},
};