import 'reflect-metadata';
import bodyParser from 'body-parser';
import Express from 'express';
import { config } from 'dotenv';
import { createConnection } from 'typeorm';
import { ShortUrl } from './entity/short-url';
import { CreateShortUrlDto } from './dto/create-short-url';
import { generateShortCode } from './util/generate-short-code';

config();

const app = Express();
app.use(bodyParser.json());

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

    app.get('/:shortCode', async (req, res) => {
        const shortCode = req.params.shortCode;

        const shortUrlRepository = connection.getRepository(ShortUrl);
        const shortUrl = await shortUrlRepository.findOne({ shortCode });

        if (shortUrl) {
            shortUrl.clickCount++;
            shortUrlRepository.save(shortUrl);

            res.redirect(shortUrl.url, 302);
        } else {
            res.status(404).send('Not Found');
        }
    });

    app.post('/api/shortUrl', async (req, res) => {
        const data = req.body as CreateShortUrlDto;

        const shortUrlRepository = connection.getRepository(ShortUrl);
        if (data.shortCode) {
            if (shortUrlRepository.findOne({ shortCode: data.shortCode })) {
                res.status(409).send('Conflict');
            }
        } else {
            while (true) {
                data.shortCode = generateShortCode(6);
                if (!await shortUrlRepository.findOne({ shortCode: data.shortCode })) {
                    break;
                }
            }
        }

        const shortUrl = new ShortUrl();
        shortUrl.url = data.url;
        shortUrl.shortCode = data.shortCode;
        shortUrl.createdTime = new Date();

        await shortUrlRepository.save(shortUrl);

        res.status(201).send(shortUrl);
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
}).catch(error => console.log(error));
