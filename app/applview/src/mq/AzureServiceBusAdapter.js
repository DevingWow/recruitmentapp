
const logger = require('../util/Logger');
const MessageBroker = require('./MessageBroker');
const {delay, ServiceBusClient, ServiceBusMessage} = require('@azure/service-bus');

class AzureServiceBusAdapter extends MessageBroker {
    constructor(){
        super();
        this.configs = {
            connectionString:process.env.SERVICE_BUS_CONNECTION_STRING,
            topicName:process.env.SERVICE_BUS_TOPIC,
            subscription:process.env.SERVICE_BUS_SUBSCRIPTION
        }
    }

    async connect(){
        this.sbClient = new ServiceBusClient(this.configs.connectionString);
        this.sender = this.sbClient.createSender(this.configs.topicName);
        this.receiver = this.sbClient.createReceiver(this.configs.topicName, this.configs.subscription);
    }

    #refreshSender(){
        this.sender = this.sbClient.createSender(this.configs.topicName, this.configs.subscription);
    }

    async sendMessage(msg){
        try {
            const message = {
                body: msg
            };
            await this.sender.sendMessages(message);
            await this.sender.close();
            this.#refreshSender();
            return {status: 'OK'};
        } catch (error) {
            throw error;
        }
    }

    extractMessageContentString(msg){
        return msg.body.toString('utf8');
    }

    async receiveMessage(callback){
        try {
            const dataHandler = (msg) => {
                callback(msg);
            }
            const errHandler = (err) => {
                logger.log(err);
            }
            this.receiver.subscribe({
                processMessage: dataHandler,
                processError: errHandler
            });
        } catch (error) {
            throw error; 
        }
    }

    async ackMessage(msg){
        try {
            await this.receiver.completeMessage(msg);
        } catch (error) {
            throw error;
        }
    }

}


module.exports = AzureServiceBusAdapter;