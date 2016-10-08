/**
 * Report.js
 */

'use strict';

module.exports = {

    attributes: {

        stage: {
            type: 'integer',
            enum: [1, 2, 3, 4, 5, 6, 7]
        },
        
        where: {
            type: 'string'
        },
        
        what: {
            type: 'string'
        },
        
        isCurrentlyHappening: {
            type: 'boolean',
            default: false
        },
        
        date: {
            type: 'date'
        },
        
        time: {
            type: 'time'
        },
        
        description: {
            type: 'array'
        },
        
        sessionId: {
            type: 'string'
        }
    },

    schema:true
};
