import express from 'express';
import jwt from 'jsonwebtoken';
import { db, usersSchema } from '../db/db.js'
import { eq, and } from 'drizzle-orm';
import { validateBody } from '../middlewares/validateBody.js';


const router = express.Router();

router.post('/login', (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).json({message: "Missing Basic Auth header."})
    }
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    const user = db.select().from(usersSchema).where(and(eq(username, usersSchema.username), eq(password, usersSchema.password)))
    if (!user) {
        return res.status(401).json({message: "Invalid credentials"});
    }

    const token =jwt.sign({email: user.email}, process.env.JWT_SECRET, {expiresIn: '8h'})
    res.json({token});
})

export default router;