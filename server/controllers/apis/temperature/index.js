const
    express = require('express');
    temperatureService = require('../../../services/temperature');

let router = express.Router();

// Authentication related User APIs.
router.post('/create_temperature_feeling', temperatureService.createTemperatureFeeling);
router.get('/temperature_concensus', temperatureService.getTemperatureConcensusAll);
router.get('/temperature_concensus_cold', temperatureService.getTemperatureConcensusCold);
router.get('/temperature_concensus_hot', temperatureService.getTemperatureConcensusHot);

module.exports = router;
