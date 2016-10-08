/**
 * ReportSession.js
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
            type: 'string'
        },
        
        time: {
            type: 'string'
        },
        
        dateTime: {
            type: 'datetime'
        },
        
        description: {
            type: 'array'
        },
        
        sessionId: {
            type: 'string'
        },
        
        latitude: {
            type: 'float'
        },

        longitude: {
            type: 'float'
        }
    },

    schema: true
};
