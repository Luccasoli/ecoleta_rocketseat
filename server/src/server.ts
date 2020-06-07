import express from 'express';
import routes from './routes';
import cors from 'cors';
import { errors } from 'celebrate';

const app = express();

app.use(cors());

// enable body with json
app.use(express.json());

app.use(routes);

app.use(errors());

app.listen(3333);
