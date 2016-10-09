/* global _ */
(function () {
    'use strict';

    var translations = {
        'en': {
            1: 'Hello, Rafiki here. What would you like to report?',
            2: 'Help me file your report.\n\n Pick a number:\n 1. Poaching\n 2. Trafficking and Illegal Trade\n 3. Human-Animal Conflict\n 4. Intelligence',            
            3: 'Where is it happening?',
            4: 'Is this happening right now?',
            5: 'When did it happen?',
            6: 'Please describe the incident. You can send photos too',
            7: 'Please give as much detail as you can. Say bye to finish',
            8: 'Thank you, I’ve told the rangers. If you’re happy to be contacted, tell me your name. You will remain anonymous if you don’t respond.'
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
