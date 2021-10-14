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
    let data = {
      $ping: 'replies with pong!',
      $gm: 'replies with gm!',
      $hey: 'says hey in a different way',
      $wassup: 'says wassup by pinging the user',
      $user: 'shows the name of the user',
      $pic: 'replies with the avatar of the user',
      $cat: 'replies with a random cat pic!!'
    }

    message.channel.send('commands: ')
    console.log(data)
    // in development
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

  else if(message.content === '$dog'){
    axios.get('https://random.dog/woof.json')
    .then(function(res){
      message.channel.send(res.data.url)
    })
  }
})

keepAlive()
client.login(process.env['TOKEN'])