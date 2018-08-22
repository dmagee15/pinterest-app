'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Image = new Schema({
        data: Buffer,
        contentType: String,
        title: String,
        url: String,
        username: String,
        pinusers: Array,
});

module.exports = mongoose.model('Image', Image);
