import express from 'express';
import jwt from 'jsonwebtoken';

const authRouter        = express.Router();
// JWT Secret Key'ler
const AUTH_SECRET       = 'auth_secret_key';
const REFRESH_SECRET    = 'refresh_secret_key';

authRouter.post('/login', (req, res) => {

    const { username, password } = req.body;

    if (username !== 'test' && password !== '1234') {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // JWT tokenlarını oluştur
    const authToken     = jwt.sign({ username }, AUTH_SECRET, { expiresIn: '15m' });
    const refreshToken  = jwt.sign({ username }, REFRESH_SECRET, { expiresIn: '7d' });

    // Token'ları HttpOnly ve Secure cookie olarak yerleştir
    res.cookie('authToken', authToken, {
        httpOnly: true,
        secure: true,           // Yalnızca HTTPS bağlantılarında çalışır (lokalde secure: false yapabilirsin)
        sameSite: 'Strict',
        maxAge: 15 * 60 * 1000, // 15 dakika
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,           // Yalnızca HTTPS bağlantılarında çalışır (lokalde secure: false yapabilirsin)
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 gün
    });

    res.json({ message: 'Login successful' });
});

authRouter.get('/users', (req, res) => {

    const authToken = req.cookies.authToken;

    if (!authToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Token doğrulama
    jwt.verify(authToken, AUTH_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token is invalid or expired' });
        }
        
        res.json({ message: 'Protected data', data: [{ name: "John", age: 55 }, { name: 'Bill', price: 32 }, { name: 'Robet', price: 25 }] });
    });
});

export { authRouter };