const winston = require('winston');

// Configure the Winston logger
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ 
            filename: 'error.log', 
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp(), // Add timestamp to logs
                winston.format.json()
            )
        }), // Log errors to error.log file
        new winston.transports.File({ 
            filename: 'combined.log',
            format: winston.format.combine(
                winston.format.timestamp(), // Add timestamp to logs
                winston.format.json()
            )
        }) // Log all messages to combined.log file
    ]
});

module.exports = logger;
