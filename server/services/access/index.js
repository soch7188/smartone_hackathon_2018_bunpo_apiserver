const models = require('../../models');


function getAccess (req, res){
    const phone_number = req.param.phone_number;
    models.AccessRights.find({
        where: {
            user_phone_number: phone_number,
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
    getAccess
};
