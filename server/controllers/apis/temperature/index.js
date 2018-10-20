const
    express = require('express');
    temperatureService = require('../../../services/temperature');

let router = express.Router();

// Authentication related User APIs.
router.post('/create_temperature_feeling', temperatureService.createTemperatureFeeling);
router.get('/temperature_concensus', temperatureService.getTemperatureConcensusAll);

module.exports = router;
