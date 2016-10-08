/**
 * ReportController
 *
 * @description :: Server-side logic for managing activities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';

var request = require('request');

/* globals Report, sails */
module.exports = {
    get: function (req, res) {
        Type.find().then(function(types){
            res.send(types);
        }).catch(function(err){
            sails.log(err);
            res.negotiate(err);
        });
    }
};
