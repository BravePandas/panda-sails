/* global _ */
(function () {
    'use strict';

    var translations = {
        'en': {
            1: 'Where are you?',
            2: 'What are you reporting?',
            3: 'Is the incident happening right now?',
            4: 'What date did this happen?',
            5: 'What time did this happen?',
            6: 'Please send as much detail as you can including photos (reply with done to finish)',
            7: 'Thank you for your report.'
        },
        'ro': {
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
            6: '',
            7: ''
        }
    };


    var questionResponse = function(stage, language)
    {
        var question;

        var t = translations[language || 'en'];
        
        switch(stage) {
            case 1:
                question = t[1];
                break;
            case 2:
                question = t[2];
                break;
            case 3:
                question = t[3];
                break;
            case 4:
                question = t[4];
                break;
            case 5:
                question = t[5];
                break;
            case 6:
            case 7:
            case 8:
                question = t[6];
                break;
            case 999:
                question = t[7];
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
