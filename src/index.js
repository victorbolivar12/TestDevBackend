import app from './app.js'
import * as dotenv from 'dotenv'
dotenv.config()
import db from './db.js'
import createTables from './utils/createTables.js'
import usersRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import axios from 'axios';
import jwt from "jsonwebtoken";

//Defines functions that start with the server
try {
    await db.authenticate()
    createTables()
} catch (error) {
    console.log(`Error: ${error}`);
}

//defines the server routes
app.use('/users', usersRoutes)
app.use('/auth', authRoutes)

app.get('/', (req, res) => {
    res.render('login', {errorMessage:""});
});

app.get('/register', (req, res) => {
    res.render('register', {errorMessage:""});
});

app.get('/update-user', (req, res) => {
    res.render('editUser', {errorMessage:"", autentication:"", data:{}, message:""});
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const autentication = false
    try {
        const response = await axios.post('http://localhost:3000/auth', {
            email,
            password
        });
        // Extract the ID from the JWT token
        const decoded = jwt.verify(response.data.token, process.env.JWT_SECRET);
        const userId = decoded.userId;
        const user = await axios.get(`http://localhost:3000/users/${userId}`)
        const data = user.data;
        console.log(response.data);
        res.render('edituser', {data, message: "" ,errorMessage:"", autentication});
    } catch (error) {
        console.error(error.response.data.message);
        const errorMessage = "Credencioales Invalidas"
        res.render('login', { errorMessage }); 
    }
});

app.post('/update-user/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const autentication = true
    try {
        const response = await axios.put(`http://localhost:3000/users/${id}`, data)
        const message = "datos actualizados con éxito"
        console.log(response.data.message);
        res.render("editUser", {data, message, autentication})
    } catch (error) {
        console.error('Error al enviar los datos:', error.response.data);
        const errorMessage = "Error  al actulizar los datos"
        res.render('editUser', { data ,errorMessage, autentication });
    }
});

app.post('/register-user', async (req, res) => {
    const data = req.body;
    try {
        const response  = await axios.post(`http://localhost:3000/users/`, data)
        console.log(response.data.message);
        res.render('login', {errorMessage:""});
    } catch (error) {
        console.error(error.response.data);
        const errorMessage = "Verifique los datos ingresados"
        res.render('register', { data ,errorMessage});
    }
});



app.listen(process.env.PORT, () => { })