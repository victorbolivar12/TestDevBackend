import UserModule from "../models/user.module.js";
import bcrypt from 'bcrypt';

// GET /users
const getUsers = async (req, res) => {
    try {
        const users = await UserModule.findAll({
            attributes: { exclude: ['password'] }
        });
        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: 'Error obteniendo la lista de usuarios' });
    }
};

// GET /users/:id
const getUserById = async (req, res) => {
    try {
        const user = await UserModule.findByPk(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error getting user" });
    }
};

// POST /users
const createUser = async (req, res) => {
    const { password, email } = req.body;

    // Validate password 
    //✔ Minimum 8 characters
    //✔ Maximum 15
    const passwordRegex = /^.{8,15}$/
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: "Invalid password"});
    }

    try {
        // Check if the email is already registered
        const existingUser = await UserModule.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "The email is already registered" });
        }
        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { ...req.body, password: hashedPassword }
        await UserModule.create(user);

        res.json({ "message": "User created successfully" });
    } catch (error) {
        const errorMessage = error.errors[0].message;
        console.error(error);
        res.status(500).json({ error: errorMessage });
    }
};

// PUT /users/:id
const updateUser = async (req, res) => {
    try {
        const { password, ...restOfData } = req.body;

        if (password) {
            // Validate password 
            //✔ Minimum 8 characters
            //✔ Maximum 15
            const passwordRegex = /^.{8,15}$/;
            if (!passwordRegex.test(password)) {
                return res.status(400).json({ error: "Invalid password" });
            }

            // Encrypt the password
            const hashedPassword = await bcrypt.hash(password, 10);
            restOfData.password = hashedPassword;
        }

        const [updatedRowCount] = await UserModule.update(restOfData, { where: { id: req.params.id } });
        if (updatedRowCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ "message": "User successfully updated"});
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errorMessage = error.errors[0].message;
            return res.status(400).json({ error: errorMessage });
        }
        console.error(error);
        res.status(500).json({ error: "Error updating a user" });
    }
};


// DELETE /users/:id
const deleteUser = async (req, res) => {
    try {
        const user = await UserModule.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        await user.destroy();
        res.json({
            "message": "user deleted successfully"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error deleting user" });
    }
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
