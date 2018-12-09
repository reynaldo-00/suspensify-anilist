const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();


server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('tiny'))


server.get('/', (req, res) => {
    res.json('It\'s Alive')
})

const port = 9001 || process.env.PORT;
server.listen(port, () => console.log(`\nServer alive on ${port}\n`));
