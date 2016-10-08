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
        
        ReportSession.findOne({'sessionId': req.sessionID})
            .then(function(reportSession){
                if (reportSession) {
                    
                    if (reportSession.stage < 7) {
                        reportSession.stage = reportSession.stage + 1;
                    }
                    
                    switch (reportSession.stage) {    
                        case 1: // Where
                            reportSession.where = req.body.Body;
                            break;
                        case 2: // When
                            reportSession.when = req.body.Body;
                            break;
                        case 3: // Happening Right Now?
                            reportSession.isCurrentlyHappening = req.body.Body==='yes'?true:false;
                            // reportSession.date = Date.now();
                            // reportSession.time = Date.now();
                            break;
                        case 4: // Date
                            // reportSession.date = Date.now();
                            break;
                        case 5: // Time
                            // reportSession.time = Date.now();
                            break;
                        case 6: // Description
                            if (!reportSession.description) {
                                reportSession.description = [];
                            }
                            reportSession.description.push({
                                text: req.body.Body
                            });
                            break;
                        case 7:
                            if (!reportSession.description) {
                                reportSession.description = [];
                            }
                            reportSession.description.push({
                                text: req.body.Body
                            });
                            break;
                    }
                    
                    
                    reportSession.save().then(function(err){
                        if (!err) {
                            res.send(ResponseService.questionResponse(reportSession.stage));
                        } else {
                            sails.log(err);
                        }
                    });
                } else {
                    sails.log("Creating new report");
                    ReportSession.create({
                        stage: 1,
                        sessionId: req.sessionID
                    }).then(function(r){
                        res.send(ResponseService.questionResponse(r.stage));
                    });
                }
            });
        
        
    }    
};
