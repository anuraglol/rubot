const Discord = require('discord.js')
const keepAlive = require('./server')
const axios = require('axios').default;

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
  if (message.content === '$help') {
  
  message.channel.send("commands: \n `$help`: *help me out!* \n `$ping`: *replies with pong!* \n `$gm`: *replies with gm!* \n `$hey`: *replies with hey, but in a funny way* \n `$wassup`: *pings user* \n `$user`: *replies with the user(s) name* \n `$pic`: *replies with the avatar of the user* \n `$cat`: *replies with a random cat picture* \n `$dog`: *replies with a random doggo pic* ")

  }

  else if (message.content === '$ping') {
    message.channel.send("pong!")
  }

  else if (message.content === '$gm') {
    message.channel.send('gm!')
  }

  else if (message.content === '$hey') {
    message.channel.send('hey sussy baka')
  }

  else if (message.content === '$wassup') {
    message.channel.send(`wassup, ${message.author.toString()}`)
  }

  else if (message.content === '$user') {
    message.channel.send(message.author.username)
  }

  else if (message.content === '$pic') {
    message.channel.send(message.author.avatarURL())
  }

  else if (message.content === '$cat') {
    message.channel.send('meow1')
    axios.get('https://aws.random.cat/meow')
      .then(function(res) {
        message.channel.send(res.data.file)
      })
  }

  else if (message.content === '$dog') {
    axios.get('https://random.dog/woof.json')
      .then(function(res) {
        message.channel.send(res.data.url)
      })
  }
})

keepAlive()
client.login(process.env['TOKEN'])