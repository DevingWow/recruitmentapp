
const logger = require('../util/Logger');
const MessageBroker = require('./MessageBroker');
const MQrabbitLocalAdapter = require('./MQrabbitLocalAdapter');
const HerokukafkaAdapter = require ('./HerokukafkaAdapter');
const AzureServiceBusAdapter = require('./AzureServiceBusAdapter');

/**
 * 
 * @returns {MessageBroker}
 */
function MessageBrokerFactory() {
    switch (process.env.MQ_ENVIRONMENT) {
        case 'local':
            return new MQrabbitLocalAdapter();
        case 'kafka':
            return new HerokukafkaAdapter();
        case 'azure':
            return new AzureServiceBusAdapter();
        default:
            return new MQrabbitLocalAdapter();
    }
}

module.exports = MessageBrokerFactory;
