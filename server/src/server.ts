import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();

app.use(cors());

// enable body with json
app.use(express.json());

app.use(routes);

app.listen(3333);
