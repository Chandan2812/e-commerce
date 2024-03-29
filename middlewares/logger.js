const winston = require('winston');

// Configure the Winston logger
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(), 
        new winston.transports.File({ 
            filename: 'error.log', 
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp(), 
                winston.format.json()
            )
        }), // Log errors to error.log file
        new winston.transports.File({ 
            filename: 'combined.log',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        }) 
    ]
});

module.exports = logger;
