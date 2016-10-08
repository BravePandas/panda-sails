/* global _ */
(function () {
    'use strict';

    var Promise = require("bluebird");

    var questionResponse = function(stage)
    {
        console.log("stage: "+stage);
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
                question = 'Can you give move detail?';
                break;
            case 7:
            case 8:
                question = 'You can send more details or photos (reply with done to finish)';
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
