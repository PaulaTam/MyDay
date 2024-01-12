import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';

import userRoute from './routes/userroute.js';
import eventsRoute from './routes/eventroute.js';
import goalsRoute from './routes/goalroute.js';
import preferencesRoute from './routes/preferencesroute.js';
import placesOfInterestRoute from './routes/placesOfInterestroute.js';
import timeMapRoute from './routes/timeMaproute.js';
import suggestionsRoute from './routes/suggestionsroute.js';

const app = express();
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
        credentials: true,
    })
);
dotenv.config();
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

app.use('/user',userRoute);
app.use('/events',eventsRoute);
app.use('/goals',goalsRoute);
app.use('/preferences',preferencesRoute);
app.use('/placesOfInterest',placesOfInterestRoute);
app.use('/timeMap',timeMapRoute);
app.use('/suggestion',suggestionsRoute);

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

app.get("/", (req, res) => {
    res.json({ message: "***This message means the backend api works!***" });
})

mongoose.connect(DB_URL, { dbName: "Team07DB", useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => {
        console.log("listening on port: " + PORT);
    }))
    .catch((err) => {
        console.log(err);
    })
