module.exports = {
  name: 'kick',
  run (message, args) {
  const Discord = require('discord.js');
  const { Client, MessageEmbed } = require('discord.js');
  const member = message.mentions.users.first();
  if (member) {
    if (message.member.hasPermission("KICK_MEMBERS")) {
      console.log(member);
      try {
        const taggedId = message.guild.members.cache.get(member.id);
        taggedId.kick().then((taggedId) => {message.channel.send(`Kicked ${taggedId}`) 
        })
        } catch (error) {
          console.error(error);
          message.reply(error);
        }
    }else{
      message.channel.send('No Permission ( ' + taggedId + ' )');
    }
  }else{
    message.channel.send('No Members Selected!')
  }
  },
};