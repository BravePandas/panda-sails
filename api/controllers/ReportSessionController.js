/**
 * ReportController
 *
 * @description :: Server-side logic for managing activities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';

/* globals ReportSession, sails */
module.exports = {
    post: function (req, res) {
        ReportSession.create({
            where: req.body.where,
            what: req.body.what,
            isCurrentlyHappening: req.body.isCurrentlyHappening,
            date: req.body.date,
            time: req.body.time,
            dateTime: req.body.dateTime,
            description: req.body.description,
            sessionId: req.sessionID
        }).then(function(created){
            console.log(created);
            res.send(200);
        }).catch(function(err){
            sails.log(err);
            return res.negotiate(err);
        });
    }
};
