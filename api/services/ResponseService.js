/* global _ */
(function () {
    'use strict';

    var Promise = require("bluebird");

    var questionResponse = function(stage)
    {
        var question;
        switch(stage) {
            case 1:
                question = 'Where are you?';
                break;
            case 2:
                question = 'What are you reporting?';
                break;
            case 3:
                question = 'Is the incident happening right now?';
                break;
            case 4:
                question = 'What date did this happen?';
                break;
            case 5:
                question = 'What time did this happen?';
                break;
            case 6:
            case 7:
            case 8:
                question = 'Please send as much detail as you can including photos (reply with done to finish)';
                break;
            case 999:
                question = 'Thank you for your report.';
                break;
        }
        if (question) {
            return '<Response><Message>'+question+'</Message></Response>';
        } else {
            return false;
        }
        
    };

    module.exports = {
        questionResponse: questionResponse
    };
}());
