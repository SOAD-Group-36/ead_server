const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./apidoc.json');

router.use('/swagger', swaggerUi.serve);
router.get('/swagger', swaggerUi.setup(swaggerDocument));

export default router;
