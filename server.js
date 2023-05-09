import express from 'express'
import { dirname } from 'path';
import bcrypt from 'bcrypt'
import cors from 'cors'
import knex from 'knex'
import pg from 'pg'
import handleRegister from './controllers/register.js'
import handleSignIn from './controllers/signin.js'
import handleRankUp from './controllers/rank.js'
import handleGetUser from './controllers/user.js'
import handleImage from './controllers/image.js'


import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// dw about it for now its just a way to get __dirname for some reason is not automatic


const app = express();
const saltRounds = 10;
const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'test',
    database: 'smartbrain',
  },
});

// MIDDLEWARE
app.use(express.urlencoded({extended: false}));
app.use(express.json()); //instead of body-parser
app.use(cors())
//app.use(express.static(__dirname + '/public'))


app.post('/signin', (req, res) => {handleSignIn(req, res, db, bcrypt)})
app.post('/image', (req, res) => {handleImage(req, res)})
app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt, saltRounds)})
app.put('/rankup', (req,res) => {handleRankUp(req, res, db)})
app.get('/profile/:id', (req, res) => {handleGetUser(req, res, db)})
// DEPENDANCY INJECTION: pass base params and the ones that needed 


app.listen(5000, () => {
	console.log('server is running of port 5000')
})
