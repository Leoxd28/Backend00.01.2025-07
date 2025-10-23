const db = require('../models');
const User = db.User;
const bcrypt = require('bcrypt');

exports.addUser = (req, res) => {
    let  = req.body;

    const usuarioNuevo = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.passwordHash, 8)
        };
    User.create(usuarioNuevo).then(data => {
        console.log(data);
        res.status(201).send(data);
    }).catch(error => {
        console.log(error);
        res.status(500).send({ message: error })
    })
}

exports.updateUser = async (req, res) => {

    let userId = req.params.id;
    await User.update(req.body, {
        where: { id: userId },
    }).then(result => {
        res.status(200).send({ message: `Rows updated: ${result[0]}` })
    }).catch(error => {
        console.log(error);
        res.status(500).send({ message: error })
    });

}

exports.deleteUser = async (req, res) => {

    let userId = req.params.id;
    await User.destroy({
        where: { id: userId },
    }).then(result => {
        if (result) {
            res.status(200).send({ message: `Record with ID ${userId} deleted successfully.` });
        } else {
            res.status(200).send({ message: `No record found with ID ${userId}.` });
        }

    }).catch(error => {
        console.log(error);
        res.status(500).send({ message: error })
    });

}