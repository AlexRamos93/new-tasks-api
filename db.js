import Sequelize from 'sequelize';
import bcrypt from 'bcryptjs';


const Conn = new Sequelize(
    '', //DB NAME
    '', //USERNAME
    '', //SERVER PASSWORD
    {
        dialect: 'postgres', //You can use any RDB that sequelize supports.
        host: '' //YOUR HOST
    }
);

//USER MODEL
const User = Conn.define('user', {
    fullName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    number: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: user => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
        }
    }
});

//TASK MODEL
const Task = Conn.define('task', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

//REALATIONS
User.hasMany(Task);
Task.belongsTo(User);

export default Conn;