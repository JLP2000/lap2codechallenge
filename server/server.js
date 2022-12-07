const express = require('express')
const server = express();

const port = process.env.PORT || 3000;

server.use(express.json());

const postRoutes = require('./routes/posts')
server.use('/posts', postRoutes)
server.get('/', (req, res) => res.send('Welcome to the Posts API'))

server.listen(port, () => console.log(`Server starting on port ${port}`))
