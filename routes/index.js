const express = require('express');
const router = express.Router();
const swaggerUI = require("swagger-ui-express");

router.use('/edt', require('./edt'));
router.use('/group', require('./group'));
router.use('/docs',
	swaggerUI.serve,
	swaggerUI.setup(require('../docs'), {
		customCss: '.swagger-ui .topbar { display: none }',
		customSiteTitle: "ADE BFC API - Docs",
		customfavIcon: "../favicon.ico"
	})
);
router.use('/:path', (_req, res) => {
	res.status(404).send({ status: "error", message: "API not found" });
});
router.use('/', (_, res) => {
	res.redirect('/docs');
});

module.exports = router;