import WebSocket, { WebSocketServer } from 'ws'
import { onFileChange } from './xmlObserver.js'
import { resetCache } from './resetCache.js'
import { host, port } from './config.js'

resetCache()

const server = new WebSocketServer({ host, port })

const broadcast = (message) => {
  server.clients.forEach((socket) => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(message)
    }
  })
}
server.on('connection', (ws, req) => {
  const id = req.socket.remoteAddress
  console.log(`[+] Client connected: ${id}. Active connections: ${server.clients.size}`)
  ws.on('message', (message) => console.log(`[::] ${id} sent: "${message}"`))
  ws.on('error', (err) => console.warn(`[!] error in connection with client ${id}: ${err}`))
  ws.on('close', () => console.log(`[-] Client disconnected: ${id}. Active connections: ${server.clients.size}`))
})
server.on('listening', () => console.log(`websocket server is listening on ${host}:${port}. Modify files in xml directory to notify clients`))

onFileChange('currency', broadcast)
onFileChange('weather', broadcast)
onFileChange('traffic', broadcast)
onFileChange('cryptoCurrency', broadcast)
onFileChange('stocks', broadcast)
