import {prismaClient} from "@prisma/client";
import { Kafka } from "kafkajs";

const TOPIC_NAME = "zap-events"
 

const client = new prismaClient();
const kafka  = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092']
});

async function main(){
    while(1){
        const pendingRows = await client.zapRunOutbox.findMany({
            where:{},
            take:10
        })
    
        producer.send({
            topic: TOPIC_NAME,
            messages: pendingRows.map(r => {
                return {
                    value: r.zapRunId
                }
            })
        })  
    
        await client.zapRunOutbox.deleteMany({
            where: {
                id: {
                    in: pendingRows.map(x => x.id)
                }
            }
        })
    }
}
    
