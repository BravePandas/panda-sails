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
        // TODO: Known issue of new sessions
        req.sessionID = 'override';
        var stage;
        if (req.body.Body.toLowerCase() === "rafiki") {
            ReportSession
                .create({stage: 1, sessionId: req.sessionID}).then(function(){
                    res.send(ResponseService.questionResponse(1));
                }).catch(function(err){
                    sails.log(err);
                });
            stage = 1;
        } else {
            ReportSession.findOne({sessionId: req.sessionID})
                .then(function(reportSession){
                    if (reportSession) {
                        stage = reportSession.stage;
                        var description = [];
                        switch (reportSession.stage) {
                            case 1: // Where
                                ReportSession
                                    .update({sessionId: req.sessionID}, {stage: 2, where: req.body.Body})
                                    .catch(function(err){
                                        sails.log(err);
                                    });
                                break;
                            case 2:
                            console.log('what');
                                ReportSession
                                    .update({'sessionId': req.sessionID}, {stage: 3, what: req.body.Body})
                                    .catch(function(err){
                                        sails.log(err);
                                    });
                                break;
                            case 3: 
                                var isCurrentlyHappening = req.body.Body.toLowerCase() === 'yes' ? true : false;
                                stage = 4;
                                if (isCurrentlyHappening) { stage = 6; }
                                ReportSession
                                    .update({'sessionId': req.sessionID}, {stage: stage, isCurrentlyHappening: isCurrentlyHappening})
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
                    } // Otherwise do nothing
                    if (ResponseService.questionResponse(stage+1)) {
                        res.send(ResponseService.questionResponse(stage+1));
                    } else {
                        res.send(200);
                    }
                    
                });
        }
        
    }
};
