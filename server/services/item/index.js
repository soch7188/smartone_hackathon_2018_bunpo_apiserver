const models = require('../../models');


function updateItemPrice (req, res){
    models.Item.findOne({
        where: {
            name: req.body.name,
            brand: req.body.brand
        }
    }).then(item => {
        if (item) {
            models.Item.update({
                price: req.body.price
            })
        } else {
            models.Item.create({
                name: req.body.name,
                brand: req.body.brand,
                price: req.body.price
            })    
        }
        // Update User Access to Queue Data
        models.AccessRights.update({
            item_access: true
        }, {
            where: {
                user_phone_number: req.body.phone_number
            }
        }).spread((affectedCount, affectedRows) => {
            console.log('AccessRights update successful. affectedCount: ' + affectedCount + ', affectedRows: ' + affectedRows);
            if (affectedCount !== 0) {
                return res.status(200).json({success: true, message: "Successfully updated item access."})
            }
            else {
                return res.status(200).json({success: false, message: "No rows affected."})
            }
        })
    });
}


function getItemPrice (req, res){
    models.Item.find({
        where: {
            name: req.param.name,
            brand: req.param.brand
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
    updateItemPrice,
    getItemPrice
};
