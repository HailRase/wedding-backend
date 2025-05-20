const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
    fio: String,
    presence: String,
    peopleCount: String,
    alcogols: [String]
});

module.exports = mongoose.model('Guest', GuestSchema);