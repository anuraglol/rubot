const Discord = require('discord.js')
const axios = require('axios').default;
const { MessageEmbed } = require('discord.js');

const client = new Discord.Client({
  allowedMentions: {
    parse: ['users', 'roles'],
    repliedUser: true,

  },
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_PRESENCES",
    "GUILD_MEMBERS",
    "GUILD_MESSAGE_REACTIONS",
  ]
})

client.on('ready', () => {
  console.log("Tada, I'm ready")
})

client.on("messageCreate", async message => {
  let prefix = '$'
  
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'movie') {
    if (!args.length) {
      return message.channel.send(`you didn't provided any arguements ${message.author}, the syntax is \`$movie <name>\` `);
    } else if (args[0] === 'foo') {
      return message.channel.send('bar');
    }

    else (
      axios.get(`http://www.omdbapi.com/?apikey=5c401357&t=${args.join("+")}`)
        .then(function(res) {
          console.log(res.data)

          const movieEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(res.data.Title)
            .setURL('https://discord.js.org/')
            .setAuthor('Anurag')
            .setDescription(res.data.Plot)
            .setThumbnail(res.data.Poster)
            .addFields(
              { name: 'Actors', value: `${res.data.Actors}` },
              { name: 'Awards', value: `${res.data.Awards}`},
              { name: 'BoxOffice', value: `${res.data.BoxOffice}` },
              { name: 'Rating', value: `ImDb: ${res.data.Ratings[0].Value} stars`, inline: true },
              { name: 'Released', value: `${res.data.Year}`, inline: true }
            )
            .setImage(res.data.Poster)
            .setTimestamp()
            .setFooter('okay, am i geeting paid or what');

          message.channel.send({ embeds: [movieEmbed] });
        })
        .catch(err => console.log(err))
    )
  }
})

client.login(process.env['TOKEN'])