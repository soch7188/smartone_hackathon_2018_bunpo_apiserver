const models = require('../../models');

function getUser (req, res){
    models.User.find({
        where: {
            phone_number: req.query.phone_number
        }
    }).then(user => {
        return res.status(201).json({success: true, message: 'Ok', user: user});
    }).catch(error =>{
        return res.status(404).json({success: false, message: 'User does not exist'});
    });
}

function getUserHasName (req, res){
    models.User.find({
        where: {
            phone_number: req.query.phone_number
        }
    }).then(user => {
        return res.status(201).json({success: true, message: 'Ok', user: user});
    }).catch(error =>{
        return res.status(404).json({success: false, message: 'User does not exist'});
    });
}

function registerUser (req, res){
    const phone_number = req.body.phone_number;
    console.log("phone_number: ", phone_number)

    models.User.find({
        where: {
            phone_number: phon_number
        }
    }).then(user => {
        return res.status(201).json({success: true, message: 'Already exist', phone_number: user.phone_number});
    })
    
    models.User.create({
        phone_number: phone_number,
        points: 0,
        name: " "
    })

    models.AccessRights.create({
        user_phone_number: phone_number,
        queue_access: false,
        item_access: false,
    }).then(user => {
        console.log("Final log: ", user)
        return res.status(201).json({success: true, message: 'New user created', phone_number: user.phone_number});
    })

    // models.User.find({
    //     where: {
    //         phone_number: phone_number
    //     }
    // }).then(user => {
    //     if (user){
    //         return res.status(201).json({success: true, message: 'Ok', phone_number: user.phone_number});
    //     } else {
    //         models.User.create({
    //             phone_number: phone_number,
    //             points: 0,
    //             name: " "
    //         }).then(user => {
    //             models.AccessRights.create({
    //                 user_phone_number: phone_number,
    //                 queue_access: false,
    //                 item_access: false,
    //             }).then(user => {
    //                 console.log("Final log: ", user)
    //                 return res.status(201).json({success: true, message: 'New user created', phone_number: user.phone_number});
    //             })
    //         })
    //     }
    // })
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
        original_points = user.points
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
        points = user.points
        return res.status(200).json({success: true, points: points});
    }).catch(error =>{
        return res.status(500).json({success: false, points: null});
    })
}




module.exports = {
    getUser,
    registerUser,
    updateName,
    updatePoints,
    getPoints
};
