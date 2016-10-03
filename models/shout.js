var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: String,required:true},
    content: {type: String, required: true}

});

module.exports = mongoose.model('Shouts', schema);