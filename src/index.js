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
    const body= req.body;
    
    const newUser = {
        username: body.username,
        avatar: body.avatar
    }
    
    users = [...users, newUser];
})

server.post('/tweets', (req, res) => {
    const body = req.body;
    
    const newTweet = {
        username: body.username,
        tweet: body.tweet
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

