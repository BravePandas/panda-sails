/**
 * Report.js
 */

'use strict';

module.exports = {

    attributes: {

        description: {
            type: 'array'
        },
        
        originator: {
            type: 'string'
        },
        
        type: {
            model: 'type'
        },

        latitude: {
            type: 'float'
        },

        longitude: {
            type: 'float'
        },
        
        date: {
            type: 'datetime'
        }

    },

    schema:true
};
