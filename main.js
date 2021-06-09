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
client.on('guildMemberAdd', guildMember => {
  const playerRole = guildMember.guild.roles.cache.find(role => role.name === 'Member');
  try {
    guildMember.roles.add(playerRole);
    guildMember.guild.channels.get(config.configChannel).send('Welcome test to our server');
  }catch(error) {
    console.error(error);
    guildMember.guild.channels.get('783696734165532702').send('Error with join event handler!');
  }
});

client.once('ready', () => {
  client.user.setActivity('TerminalMC.tk', { type: 'PLAYING' });
  if (config.verbose) {
	console.log(`Setup.json Verbose: \n Prefix: ${config.prefix} \n Name: ${config.name} \n Token: ${config.token} \n Welcome Channel: ${config.configChannel} \n`);
  console.log(`Connected to DiscordAPI and is registering "FS" node.js module! \nRegistering ${cmdFiles.length} Commands!`)
  }else{
    console.log('Now Online! - Verbose is off')
  }
});

// that goes in the end
client.login(config.token);