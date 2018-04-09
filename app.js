import Express from 'express';
import Consign from 'consign';

const app = Express();

Consign({verbose: false})
	.include('libs/config.js')
	.then('db.js')
	.then('auth.js')
	.then('libs/middlewares.js')
	.then('routes')
	.then('libs/boot.js')
	.into(app);


module.exports = app;