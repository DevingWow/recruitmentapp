const e = require('express');
const MessageBroker = require('./MessageBroker');

const CONNECTION_TIMEOUT_DEFAULT = 10000;

class HerokukafkaAdapter extends MessageBroker {
    constructor(){
        super();
        this.kafka = require('no-kafka');
        this.topic = process.env.KAFKA_TOPIC||'local_queue';
        if (process.env.KAFKA_PREFIX){
            this.topic = process.env.KAFKA_PREFIX + this.topic;
        }
    }

    async connect(){
        try {
            const config = {
                connectionString: process.env.KAFKA_URL,
                ssl: {
                    cert: process.env.KAFKA_CLIENT_CERT,
                    key: process.env.KAFKA_CLIENT_CERT_KEY
                },
                connectionTimeout: CONNECTION_TIMEOUT_DEFAULT||process.env.KAFKA_CONNECTION_TIMEOUT,
            };
            if(process.env.KAFKA_PRODUCER_FLAG === 'true'){
                this.producer = new this.kafka.Producer(config);
                await this.producer.init();
            }
            if(process.env.KAFKA_CONSUMER_FLAG === 'true'){
                this.consumer = new this.kafka.SimpleConsumer(config);
                await this.consumer.init();
            }
        } catch (error) {
            throw error;
        }
    }



    async sendMessage(msg){
        try {
            const res = await this.producer.send({
                topic: this.topic,
                message: {
                    value: msg
                }
            });
            console.log(res);
        } catch (error) {
            throw error;
        }
    }

    extractMessageContentString(msg){
        return msg.message.value.toString('utf8');
    }

    async receiveMessage(callback){
        try {
            const dataHandler = (msgSet, topic, partition) => {
                msgSet.forEach((msg) => {
                    //const msg = m.message.value.toString('utf8');
                    callback(msg);
                });
            };

            await this.consumer.subscribe(this.topic, dataHandler);
        } catch (error) {
            throw error;
        }
    }

    async ackMessage(msg){
        try {
            this.consumer.commitOffset(msg);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = HerokukafkaAdapter;