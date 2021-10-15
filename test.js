const Discord = require('discord.js')
const keepAlive = require('./server')
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

  if (command === 'weather') {
    if (!args.length) {
      return message.channel.send(`you didn't provided any arguements ${message.author}, the syntax is \`$weather <city-name>\` `);
    } else if (args[0] === 'foo') {
      return message.channel.send('bar');
    }

    else (
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args.join("+")}&appid=d358dcbeb873438e43991e11736e25b0`)
        .then(function(res) {
          console.log(res.data)
          message.channel.send('hey');

          const weatherEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(res.data.name)
            .setURL('https://discord.js.org/')
            .setAuthor('Anurag')
            .setDescription(res.data.weather[0].main)
            .setThumbnail('https://media.istockphoto.com/photos/majestic-storm-clouds-picture-id516351793?b=1&k=20&m=516351793&s=170667a&w=0&h=dNSelfEsetPTQObY4yvcRiGHtnehwwUFTTJbhMfx-S0=')
            .addFields(
              { name: 'temp', value: `${res.data.main.temp}` },
              { name: 'humidity', value: `${res.data.main.humidity}` },
              { name: 'lattitide', value: `${res.data.coord.lat}` },
              { name: 'longitude', value: `${res.data.coord.lon}` }
            )
            .setImage('https://images.unsplash.com/photo-1561484930-998b6a7b22e8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80')
            .setTimestamp()
            .setFooter('okay, am i geeting paid or what');

            message.channel.send({ embeds: [weatherEmbed] });
        })
        .catch(err => console.log(err))
    )
  }
})

client.login(process.env['TOKEN'])