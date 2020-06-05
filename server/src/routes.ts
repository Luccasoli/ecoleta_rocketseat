import express from 'express';
import path from 'path';
import ItemsControllers from './controllers/items_controllers';
import PointsControllers from './controllers/points_controllers';

const routes = express.Router();

routes.get('/', (request, response) => {
    return response.send('oi');
});

routes.get('/items', ItemsControllers.index);

routes.post('/points', PointsControllers.create);
routes.get('/points/:id', PointsControllers.show);
routes.get('/points', PointsControllers.index);

// Static files
routes.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

export default routes;
