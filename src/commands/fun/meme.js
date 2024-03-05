const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
module.exports = class MemeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'meme',
      usage: 'meme',
      description: 'Displays a random meme from the `memes`, `dankmemes`, or `me_irl` subreddits.',
      type: client.types.FUN
    });
  }
  async run(message) {
    try {
      let res = await fetch('https://www.reddit.com/r/memes/random/.json');
      res = await res.json();
      const data = res[0].data.children[0].data; // Access the meme data
      const embed = new MessageEmbed()
        .setTitle(data.title)
        .setImage(data.url)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
      message.channel.send(embed);
    } catch (err) {
      message.client.logger.error(err.stack);
      this.sendErrorMessage(message, 1, 'Please try again in a few seconds', err.message);
    }
  }
};
