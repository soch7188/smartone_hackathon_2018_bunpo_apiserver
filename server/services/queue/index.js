const models = require('../../models');


function updateQueue (req, res){

    // Update Queue depending on Floor and Brand
    models.Queue.update({
        crowdedness: req.body.crowdedness
    }, {
        where: {
            floor: req.body.floor,
            brand: req.body.brand
        }
    }).spread((affectedCount, affectedRows) => {
        console.log('Queue update successful. affectedCount: ' + affectedCount + ', affectedRows: ' + affectedRows);
        if (affectedCount !== 0) {
            return res.status(200).json({success: true, message: "Successfully updated Queue."})
        }
        else {
            return res.status(200).json({success: false, message: "No rows affected."})
        }
    }).catch(function (err){
        return res.status(403).json({success: false, message: err.message + 'UpdateQueue failure'})
    });

    // Update Queue depending on Floor and Brand


    // Update User Access to Queue Data
    models.AccessRights.update({
        queue_access: true
    }, {
        where: {
            user_phone_number: req.body.phone_number
        }
    }).spread((affectedCount, affectedRows) => {
        console.log('AccessRights update successful. affectedCount: ' + affectedCount + ', affectedRows: ' + affectedRows);
        if (affectedCount !== 0) {
            return res.status(200).json({success: true, message: "Successfully updated queue access."})
        }
        else {
            return res.status(200).json({success: false, message: "No rows affected."})
        }
    }).catch(function (err){
        return res.status(403).json({success: false, message: err.message + 'User AccessRight Update failure'})
    });
}


function getQueue (req, res){
    const floor = req.param.floor;
    const brand = req.param.brand;

    models.Queue.find({
        where: {
            floor: floor,
            brand: brand
        }
    }).then(result => {
        console.log(res);
        return res.status(200).json(result);
    }).catch(function (err){
        console.log((err.toString()));
        return res.status(403).json({success: false, message: err.toString()})
    })
}


module.exports = {
    updateQueue,
    getQueue
};
