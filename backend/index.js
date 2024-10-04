import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { authRouter } from './src/router/authRouter.js';

const app = express();

// Middleware'ler
app.use(express.json());
app.use(cookieParser());            // CookieParser() fonksiyonu, Node.js'de Express.js uygulamalarında kullanılan bir middleware'dir. Tarayıcıdan gelen HTTP istekleri üzerindeki çerezleri (cookies) ayrıştırır ve bu çerezleri req.cookies nesnesi altında kullanılabilir hale getirir.
app.use(cors({
  origin: 'http://localhost:5173',  // Frontend'in çalıştığı domaini belirtilir.
  methods: 'GET,POST,PUT,DELETE',   // izin verilen HTTP metodları
  credentials: true,                // Cookie'leri kabul et
}));

// API rotaları
app.use('/auth', authRouter);

// Sunucuyu dinlemeye başlat
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
