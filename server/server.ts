//setting up server and routing
import { join } from 'node:path'
import express from 'express'
import decks from './routes/decks'

const server = express()

server.use(express.static(join(__dirname, 'public')))
server.use(express.json())

server.use('/v1/decks', decks)

export default server
