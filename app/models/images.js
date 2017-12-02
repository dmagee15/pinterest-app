'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Image = new Schema({
        title: String,
        source: String,
        username: String,
        pinusers: Array,
});

module.exports = mongoose.model('Image', Image);
