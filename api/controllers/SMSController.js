/**
 * SMSController
 *
 * @description :: Server-side logic for managing activities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';

/* globals ReportSession, sails, ResponseService */
module.exports = {
    request: function(req, res) 
    {
        // TODO: Known issue of new sessions
        req.sessionID = 'override';
        var stage;
        if (req.body.Body.toLowerCase() === "rafiki") {
            ReportSession
                .update({sessionId: req.sessionID}, {complete: true, sessionId: req.sessionID+'-'+Math.random().toString(36).substring(7)}).then(function(){
                    ReportSession
                        .create({stage: 1, sessionId: req.sessionID}).then(function(){
                            res.send(ResponseService.questionResponse(1));
                        }).catch(function(err){
                            sails.log(err);
                        });
                }).catch(function(err){
                    sails.log(err);
                });
            stage = 1;
        } else if (req.body.Body.toLowerCase() === "done" || req.body.Body.toLowerCase() === "bye") {
            console.log('finished');
            ReportSession
                .update({sessionId: req.sessionID}, {complete: true, sessionId: req.sessionID+'-'+Math.random().toString(36).substring(7)}).then(function(){
                    res.send(ResponseService.questionResponse(999));
                }).catch(function(err){
                    sails.log(err);
                });
            stage = 999;
        } else {
            ReportSession.findOne({sessionId: req.sessionID})
                .then(function(reportSession){
                    if (reportSession) {
                        stage = reportSession.stage;
                        var description = [];
                        
                        console.log('============================');
                        console.log("BODY:" + req.body.Body);
                        console.log('STAGE: '+reportSession.stage);
                        console.log('============================');
                        
                        switch (reportSession.stage) {
                            case 1: // Hello
                            console.log('1');
                                ReportSession
                                    .update({sessionId: req.sessionID}, {stage: 2, where: req.body.Body})
                                    .catch(function(err){
                                        sails.log(err);
                                    });
                                break;
                            case 2: // Help me file
                            console.log('2');
                                ReportSession
                                    .update({'sessionId': req.sessionID}, {stage: 3, what: req.body.Body})
                                    .catch(function(err){
                                        sails.log(err);
                                    });
                                break;
                            case 3: // Where
                            console.log('3');
                                ReportSession
                                    .update({'sessionId': req.sessionID}, {stage: 4})
                                    .catch(function(err){
                                        sails.log(err);
                                    });
                                break;
                            case 4: // Currently Happening
                            console.log('4');
                            
                                var isCurrentlyHappening;
                                var s;
                                if (req.body.Body.toLowerCase() === 'yes') {
                                    console.log("HAPPENING");
                                    isCurrentlyHappening = true;
                                    s = 6;
                                } else {
                                    console.log("NOT HAPPENING");
                                    isCurrentlyHappening = false;
                                    s = 5;
                                }
                                ReportSession
                                    .update({'sessionId': req.sessionID}, {stage: s, isCurrentlyHappening: isCurrentlyHappening})
                                    .catch(function(err){
                                        sails.log(err);
                                    });
                                break;
                            case 5: // When
                            console.log('5');
                                ReportSession
                                    .update({'sessionId': req.sessionID}, {stage: 6})
                                    .catch(function(err){
                                        sails.log(err);
                                    });
                                break;
                            case 6: // Describe
                            console.log('6');
                            case 7: // Describe
                            console.log('7');
                            if (reportSession.description) { description = reportSession.description; }
                                description.push({text: req.body.Body});
                                ReportSession
                                    .update({'sessionId': req.sessionID}, {stage: 6, description: description})
                                    .catch(function(err){
                                        sails.log(err);
                                    });
                                break;
                        }
                    } // Otherwise do nothing
                    if (ResponseService.questionResponse(stage+1)) {
                        console.log("Question: "+stage);
                        res.send(ResponseService.questionResponse(stage+1));
                    } else {
                        res.send(200);
                    }
                    
                });
        }
        
    }
};
