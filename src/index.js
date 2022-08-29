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
});

server.post('/tweets', (req, res) => {
  const body = req.body;

  if (!body.tweet) {
    res.status(400).send('Todos os campos são obrigatórios!');
  } else {
    const user = users.find((user) => user.username === req.header('User'));
    const newTweet = {
      username: user.username,
      avatar: user.avatar,
      tweet: body.tweet,
    };
    tweets.push(newTweet);
    res.status(201).send('Ok');
  }
});

server.get('/tweets', (req, res) => {
  const page = parseInt(req.query.page);
  if (page >= 1) {
    res.send(
      tweets
        .slice(
          Math.max(tweets.length - 10 * page, 0),
          Math.max(tweets.length - 10 * (page - 1), 0)
        )
        .map((tweet) => {
          return {
            ...tweet,
            avatar: users.find((user) => user.username === tweet.username)
              .avatar,
          };
        })
        .reverse()
    );
  } else {
    res.status(400).send('Informe uma página válida!');
  }
});

server.get('/tweets/:username', (req, res) => {
  const { username } = req.params;
  const user = users.find((user) => user.username === username);

  if (!user) {
    return res.status(404).send('Usuário não encontrado');
  }

  const tweetsUser = tweets.filter((tweet) => tweet.username === username);

  res.send(tweetsUser);
});

//Iniciando o servidor
server.listen(5000, () => console.log(chalk.green('Online Server')));