import 'reflect-metadata';
import Express from 'express';
import { config } from 'dotenv';
import { createConnection } from 'typeorm';
import { ShortUrl } from './entity/short-url';

config();

const app = Express();

createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        ShortUrl
    ],
    synchronize: true,
    logging: false,
}).then(connection => {
    console.log("Database connection established.");

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
}).catch(error => console.log(error));
