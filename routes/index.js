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

module.exports = router;