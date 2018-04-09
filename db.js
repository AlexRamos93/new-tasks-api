import Sequelize from 'sequelize';
import bcrypt from 'bcryptjs';


const Conn = new Sequelize(
    'taskdb', //DB NAME
    'postgres', //USERNAME
    'xande123', //SERVER PASSWORD
    {
        dialect: 'postgres',
        host: 'localhost'
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