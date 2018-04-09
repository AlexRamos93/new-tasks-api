import Db from '../db';

module.exports = app => {
    const Task = Db.models.Task;

    app.route("/task")
    .all(app.auth.authenticate())
    //GETS ALL THE TASKS OF THE SPECIFIC USER
    .get((req, res) => {
        Task.findAll({where: {
            userId: req.user.id
        }})
        .then(result => res.json(result))
        .catch(error => {
             res.status(412).json({msg: error.message});
        });
    })
    //CREATES AN TASK WITH THE ID OF THE SPECIFIC USER
    .post((req, res) => {
        //CREATE THE REMIND HOUR FOR THE SCHEDULE
        let remindHour = req.body.rehour;
		let date = new Date(req.body.year, req.body.month - 1, req.body.day, req.body.hour, req.body.min);
		let id = data.user[0]._id;
				
		date = date.setHours(date.getHours() - remindHour);
        date = new Date(parseInt(date));
        
        //CREATES A TASK OBJECT TO BE STORE IN THE DATABASE
        const newTask = {
            name: req.body.name,
			body: req.body.body,
			date: date,
			userId: req.user.id
        }

        Task.create(newTask)
		.then(result => {
            //SCHEDULE AN SMS IN THE GIVING DATE
            sms.createSms(date, req.user.number, req.body.body);
            res.json(result)
        })
		.catch(error => {
			res.status(412).json({msg: error.message});
		});
    });

    //DELETE A TASK
    app.route("/tasks/:id")
    .all(app.auth.authenticate())
    .delete((req,res) => {
        Tasks.destroy({ where: {
            id: req.params.id,
            user_id: req.user.id
        }})
        .then(result => res.sendStatus(204))
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    });
};