# Flora — Backend

Express + PostgreSQL (Sequelize) REST API for a bouquets collection.

## Stack

- Express
- Sequelize + PostgreSQL (`pg`)
- Joi (validation)
- Multer (file uploads)
- Swagger UI (`/api-docs`)

## Project structure

```
config/          Sequelize instance + DB connection
models/          Sequelize models (Bouquet)
schemas/         Joi validation schemas
routes/          Express routers
controllers/     Request handlers
services/        DB queries (Sequelize calls)
middlewares/     validateBody, isValidId, upload (multer), errorHandler
helpers/         HttpError, ctrlWrapper
swagger/         swagger.json (OpenAPI spec)
public/photos/   Permanent storage for uploaded photos (served statically)
temp/            Temporary storage for Multer uploads before move
```

## Local setup

1. Install dependencies:
   ```
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in your PostgreSQL connection string:
   ```
   cp .env.example .env
   ```
   ```
   PORT=3000
   DB_URL=postgresql://user:password@host:5432/flora
   DB_SSL=true
   ```

3. Start the server:
   ```
   npm run start:dev
   ```

   On success you'll see:
   ```
   Database connection successful
   Server is running on port 3000
   ```

4. Open Swagger UI: `http://localhost:3000/api-docs`

## API

Base path: `/api/bouquets`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/bouquets` | List all bouquets |
| GET | `/api/bouquets/:id` | Get one bouquet |
| POST | `/api/bouquets` | Create a bouquet |
| PUT | `/api/bouquets/:id` | Update a bouquet |
| DELETE | `/api/bouquets/:id` | Delete a bouquet |
| PATCH | `/api/bouquets/:id/favorite` | Toggle favorite status |
| PATCH | `/api/bouquets/:id/photo` | Upload/replace photo (`multipart/form-data`, field name `photo`) |

## Deploying to Render (steps you need to do yourself)

1. **Create a PostgreSQL instance**
   - Render dashboard → New → PostgreSQL → pick a name/region → Create.
   - Copy the **Internal Database URL** (or External, if connecting from outside Render).

2. **Push this repo to GitHub**
   ```
   git init
   git add .
   git commit -m "Flora backend"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

3. **Create a Web Service on Render**
   - New → Web Service → connect your GitHub repo.
   - Build command: `npm install`
   - Start command: `npm start`
   - Add environment variables under "Environment":
     - `DB_URL` = the connection string from step 1
     - `DB_SSL` = `true`
     - `PORT` is provided automatically by Render (Express already reads `process.env.PORT`).

4. **Deploy** — Render will build and start the service. Once live, your API is at:
   ```
   https://<your-service-name>.onrender.com/api/bouquets
   ```
   and Swagger UI at:
   ```
   https://<your-service-name>.onrender.com/api-docs
   ```

5. Point your frontend's API base URL at the live Render URL and redeploy the frontend to GitHub Pages.

## Notes

- Uploaded photos are stored in `/temp` first, then moved to `/public/photos` with a unique filename on success — nothing is left behind in `/temp` on failure.
- If no `photoURL` is supplied on creation, a placeholder image URL is generated automatically.
- Field naming is unified across the model, Joi schemas, and Swagger: `photoURL`, `favorite`.
