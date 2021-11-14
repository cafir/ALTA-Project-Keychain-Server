import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from "dotenv"

import holderRoutes from './routes/holders.js'
import userRoutes from './routes/users.js'

const app = express();
dotenv.config()
//maxium file upload
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use

app.use('/holders', holderRoutes);
app.use('/user', userRoutes)

//mongoDB url connection
// const CONNECTION_URL = 'mongodb+srv://ecafirhan:ecafirhan82013@cluster0.gtgvt.mongodb.net/dbKeychain?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

//connection to mongoose database
mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) =>  console.log(error.message));