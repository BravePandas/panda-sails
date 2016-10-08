// /**
//  * ReportController
//  *
//  * @description :: Server-side logic for managing activities
//  * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
//  */
// 'use strict';
// 
// var request = require('request');
// 
// /* globals Report, sails */
// module.exports = {
//     post: function (req, res) {
//         Report.create({
//             description:    req.body.description,
//             latitude:       req.body.latitude,
//             longitude:      req.body.longitude,
//         }).then(function(){
//             res.send(200);
//         }).catch(function(err){
//             sails.log(err);
//             return res.negotiate(err);
//         });
//     }
// };
