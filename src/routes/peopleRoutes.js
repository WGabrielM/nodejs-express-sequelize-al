import express from 'express';

import PersonController from '../controllers/PersonController.js';



const routes = express.Router();

routes.get('/people', PersonController.getAll);


export default routes;
