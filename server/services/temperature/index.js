const models = require('../../models');

function createTemperatureFeeling (req, res){
    models.TemperatureFeeling.create({
        feeling: req.body.feeling
    }).then(tf => {
        return res.status(201).json({success: true, message: 'Success'});
    }).catch(function (err) {
        if (err) res.status(500).json({
            success: false,
            message: err.message,
        });
    });
}


function getTemperatureConcensusAll (req, res){
    models.TemperatureFeeling.findAll({
    }).then(result => {
        console.log(res);
        return res.status(200).json(result);
    }).catch(function (err){
        console.log((err.toString()))
        return res.status(403).json({success: false, message: err.toString()})
    })
}

function getTemperatureConcensusCold (req, res){
    models.TemperatureFeeling.findAll({
        where: {
            feeling: "cold"
        }
    }).then(result => {
        console.log(res);
        return res.status(200).json(result);
    }).catch(function (err){
        console.log((err.toString()))
        return res.status(403).json({success: false, message: err.toString()})
    })
}

function getTemperatureConcensusHot (req, res){
    models.TemperatureFeeling.findAll({
        where: {
            feeling: "hot"
        }
    }).then(result => {
        console.log(res);
        return res.status(200).json(result);
    }).catch(function (err){
        console.log((err.toString()))
        return res.status(403).json({success: false, message: err.toString()})
    })
}



module.exports = {
    createTemperatureFeeling,
    getTemperatureConcensusAll,
    getTemperatureConcensusCold,
    getTemperatureConcensusHot,
};
