
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

async function main() {
    await prismaClient.availableTrigger.create({
        data:{
            id:"webhook",
            name:"Webhook",
            image:"https://a.slack-edge.com/80588/img/services/outgoing-webhook_512.png"
        }
    })
    
    await prismaClient.availableAction.create({
        data:{
            id:"send-sol",
            name:"Send solana",
            image:"https://www.pngall.com/wp-content/uploads/10/Solana-Crypto-Logo-PNG-File.png"
        }
    })

    await prismaClient.availableAction.create({
        data:{
            id:"email",
            name:"Send Email",
            image:"https://media.istockphoto.com/id/1125279178/vector/mail-line-icon.jpg?s=612x612&w=0&k=20&c=NASq4hMg0b6UP9V0ru4kxL2-J114O3TaakI467Pzjzw="
        }
    })
    
}

main();