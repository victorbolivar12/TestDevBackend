import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import bodyParser from 'body-parser';

const app = express()

app.use( cors() )
app.use(express.json())

// Configuring EJS as a templating engine
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configure body-parser to parse the request body
app.use(bodyParser.urlencoded({ extended: true }));

export default app;