# url-shortener

A simple url shortener.

## Dependencies

- `mariadb`

## Usage

Create file `.env`

```bash
DB_HOST='172.17.0.1'
DB_PORT=3306
DB_USERNAME='root'
DB_PASSWORD='P@ssw0rd'
DB_DATABASE='short-url'
```

### `Docker`

```bash
docker run --name url-shortener \
-v $PWD/.env:/app/.env \
-p 3000:3000 \
--restart=always -d \
pinlin/url-shortener
```

### Manual

```bash
# Install dependencies
npm install

# Run on development mode
npm run start:dev
# Run on production mode
npm run build
npm run start:prod
```

## License
[MIT License](LICENSE)
