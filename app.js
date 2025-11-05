import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import path  from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { send } from 'process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app=express()

const server=http.createServer(app)
const io=new Server(server)

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))

io.on('connection',function(socket){
console.log('Socket connected')
socket.on('send-location',function(data){
io.emit("Location-received",{id:socket.id,...data})
})
socket.on('disconnect',function(){
    io.emit("user-disconnected",socket.id)
})
})
app.get('/',function(req,res){
        res.render('index.ejs')
    console.log('this is get')
})



server.listen(9000,(req,res)=>{
    console.log('Server started at port 9000')
})




