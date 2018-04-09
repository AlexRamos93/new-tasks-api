import Db from '../db';

module.exports = app => {
	Db.sync().done(() => {
		app.listen(app.get("port"), () => {
			console.log(`Server listening - Port ${app.get("port")}`);
		});
	});
};