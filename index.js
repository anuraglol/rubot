const Discord = require('discord.js')
const keepAlive  = require('./server')

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

client.on('ready', ()=>{
  console.log("Tada, I'm ready")
})

client.on("messageCreate", async message => {
  if(message.content === '!ping'){
    message.channel.send("pong!")
  }

  else if(message.content === '!gm'){
    message.channel.send('gm!')
  }

  else if(message.content === '!hey'){
    message.channel.send('hey sussy baka')
  }

  else if(message.content === '!wassup'){
    message.channel.send(`wassup, ${message.author.toString()}`)
  }

  else if(message.content === '!user'){
    message.channel.send(message.author.username)
  }
  
  else if(message.content === '!pic'){
    message.channel.send(message.author.avatarURL())
  }
  
})

keepAlive()
client.login(process.env['TOKEN'])