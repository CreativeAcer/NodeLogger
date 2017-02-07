var winston = require('winston');
winston.emitErrs = true;

var logger = new (winston.Logger)({
    levels: {
        error: 0,
        warn: 1,
        sql: 2,
        info: 3,
        console: 4
    },

    colors: {
        console: 'magenta',
        sql: 'cyan',
        info: 'green',
        warn: 'yellow',
        error: 'red'
    },
    transports: [
        new (winston.transports.File)({
            name: 'info-file',
            level: 'info',
            filename: 'info.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 2,
            colorize: true
        }),
        new (winston.transports.File)({
            name: 'error-file',
            level: 'error',
            filename: 'error.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: true
        }),
        new (winston.transports.Console)({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
