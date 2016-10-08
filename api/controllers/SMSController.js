/**
 * SMSController
 *
 * @description :: Server-side logic for managing activities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';

var gateway = require('twilio'),
    accountSSID = 'ACa512c0bad81f66d5df539deee5e0fa96',
    authToken = '5f5bd304e479d0b75cb3e72c0a7cd16b';

/* globals ReportSession, sails, ResponseService */
module.exports = {
    request: function(req, res) 
    {
        // console.log(req.body);
        // console.log(req.sessionID);
        // 
        
        req.sessionID = 'override';

        ReportSession.findOne({sessionId: req.sessionID})
            .then(function(reportSession){                
                
                console.log(reportSession);
                var description = [],
                    stage = 1;
                    
                if (reportSession) {
                    stage = reportSession.stage;
                }

                
                switch (stage) {    
                    case 1: // Where
                        if (reportSession) {
                            ReportSession
                                .update({sessionId: req.sessionID}, {stage: 2, where: req.body.Body})
                                .catch(function(err){
                                    sails.log(err);
                                });
                        } else {
                            ReportSession
                                .create({stage: 2, where: req.body.Body, sessionId: req.sessionID})
                                .catch(function(err){
                                    sails.log(err);
                                });
                        }
                        break;
                    case 2:
                        ReportSession
                            .update({'sessionId': req.sessionID}, {stage: 3, what: req.body.Body})
                            .catch(function(err){
                                sails.log(err);
                            });
                        break;
                    case 3: 
                        var isCurrentlyHappening = req.body.Body === 'yes' ? true : false;
                        ReportSession
                            .update({'sessionId': req.sessionID}, {stage: 4, isCurrentlyHappening: isCurrentlyHappening})
                            .catch(function(err){
                                sails.log(err);
                            });
                        break;
                    case 4:
                        ReportSession
                            .update({'sessionId': req.sessionID}, {stage: 5})
                            .catch(function(err){
                                sails.log(err);
                            });
                        break;
                    case 5:
                        ReportSession
                            .update({'sessionId': req.sessionID}, {stage: 6})
                            .catch(function(err){
                                sails.log(err);
                            });
                        break;
                    case 6:
                    case 7:
                    if (reportSession.description) { description = reportSession.description; }
                        description.push({text: req.body.Body});
                        ReportSession
                            .update({'sessionId': req.sessionID}, {stage: 7, description: description})
                            .catch(function(err){
                                sails.log(err);
                            });
                        break;
                }
                res.send(ResponseService.questionResponse(stage));
            });
        
        
    }    
};
