const express = require('express')
const server = express()

server.all('/', (req, res)=>{
  res.send('Bot is up and running!!')
})

function keepAlive(){
  server.listen(3000, ()=>{
    console.log('server is ready sussy baka!!')
  })
}

module.exports = keepAlive