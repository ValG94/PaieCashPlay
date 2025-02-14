import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import paycomet from './paycomet.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Routes PayCOMET
app.use('/api/paycomet', paycomet);
console.log('==> paycometRoutes is being registered');
app.use('/api/paycomet', paycomet);


// Servir les fichiers statiques de l'application React
app.use(express.static(join(__dirname, '../dist')));

// Route catch-all pour SPA
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});