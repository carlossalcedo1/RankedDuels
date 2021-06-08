module.exports = {
	name: 'fun',
	run(message, args) {
		const Discord = require('discord.js');
		const player = message.mentions.users.first();
		if (player) {
			const tagged = message.guild.members.cache.get(player.id);
			tagged.author.voice.setChannel(null);
			//.then(() => console.log(`Moved ${player.id} to VC`))
			//.then(() => message.reply(`Moved ${player.id} to VC`))
			// catch(console.error)
		}
		else{
			message.channel.send('You did not tag a valid member!');
		}

	},
};