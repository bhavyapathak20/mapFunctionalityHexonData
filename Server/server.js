import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import mapRoutes from './routes/mapRoutes.js';
import fileRoutes from './routes/fileRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/newUser', authRoutes);
app.use('/api/existingUser', authRoutes);
app.use('/api/location', mapRoutes); 
app.use('/api/location', fileRoutes);

app.listen(5000, ()=> console.log("server started on port 5000"));
