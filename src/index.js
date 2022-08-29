//Import de bibliotecas
import express, { json } from 'express';
import cors from 'cors';
import chalk from 'chalk';

let users = [];
let tweets = [];

//Criando o servidor
const server = express();
server.use(json()); 
server.use(cors()); 

//Criando rotas
server.post('/sign-up', (req, res) => {
    const user = req.body;

    if (user.username.length !== 0 && user.avatar.length !== 0) {
        users.push(user);
        return res.status(201).send('OK');
    } else {
        return res.status(400).send('Preencha todos os campos');    
    }
    
})

server.post('/tweets', (req, res) => {
    const user = req.body;
    
    const newTweet = {
        username: user.username,
        tweet: user.tweet
    }
    
    tweets = [...tweets, newTweet];
    
    res.send('OK')
})

server.get('/tweets', (req, res) => {

    let lastTenTweets = [];

    for (let i = tweets.length - 1; i > tweets.length - 11; i--) {
        const avatarUser = users.find(user => tweets[i].username === user.username).avatar;
        lastTenTweets = [...lastTenTweets, {
            username: tweets[i].username,
            avatar: avatarUser,
            tweet: tweets[i].tweet
        }]
    }

    res.send(lastTenTweets);
})

//Iniciando o servidor
server.listen(5000, () => {
    console.log(chalk.green('Online Server'));
})

