import Db from '../db';

module.exports = app => {
    
    const Users = Db.models.user;

    //GET ALL THE INFORMATION OF THE USER
    app.route("/user")
    .all(app.auth.authenticate())
    .get((req, res) => {
        Users.findById(req.user.id, {
            attributes: ["id", "fullName", "email", "number"]
        })
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    });

    //CREATES A NEW USER
    app.post("/users", (req, res) => {
        Users.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
            res.status(412).json({msg: error.message});
        });
    });
}
