const models = require('../../models');


function registerUser (req, res){
    console.log('registerUser called')
    const phone_number = req.body.phone_number;

    models.User.create({
        phone_number: phone_number,
        points: 0,
        name: ""
    }).then(user => {
        return res.status(201).json({success: true, message: 'Ok', phone_num: user.phone_number});
    }).catch(function (err) {
        if (err) res.status(500).json({
            success: false,
            message: err.message,
        });
    });

    models.AccessRights.create({
        user_phone_number: phone_number,
        queue_access: false,
        item_access: false,
    })
}

function updateName (req, res){
    models.User.update({
        name: req.body.name
    }, {
        where: {
            phone_number: req.body.phone_number
        }
    }).spread((affectedCount, affectedRows) => {
        console.log('Name update successful. affectedCount: ' + affectedCount + ', affectedRows: ' + affectedRows);
        if (affectedCount !== 0) {
            return res.status(200).json({success: true, message: "Successfully updated name."})
        }
        else {
            return res.status(200).json({success: false, message: "No rows affected."})
        }
    }).catch(function (err){
        return res.status(403).json({success: false, message: err.message + 'User Password reset failure'})
    });
}

function updatePoints (req, res){
    let original_points = 0;
    models.User.findOne({
        where: {
            phone_number: req.body.phone_number
        }
    }).then(user => {
        if (user) {
            original_points = user.points
        }
    });

    models.User.update({
        points: original_points + req.body.points
    }, {
        where: {
            phone_number: req.body.phone_number
        }
    }).spread((affectedCount, affectedRows) => {
        console.log('Points update successful. affectedCount: ' + affectedCount + ', affectedRows: ' + affectedRows);
        if (affectedCount !== 0) {
            return res.status(200).json({success: true, message: "Successfully updated Points."})
        }
        else {
            return res.status(200).json({success: false, message: "No rows affected."})
        }
    }).catch(function (err){
        return res.status(403).json({success: false, message: err.message + 'Points update failure'})
    });
}

function getPoints (req, res){
    let points = 0;
    models.User.findOne({
        where: {
            phone_number: req.body.phone_number
        }
    }).then(user => {
        if (user) {
            points = user.points
        }
    });
    return points;
}




module.exports = {
    registerUser,
    updateName,
    updatePoints,
    getPoints
};
