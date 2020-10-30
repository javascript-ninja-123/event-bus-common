import { Message, Stan, SubscriptionOptions } from "node-nats-streaming"
import { Subject } from "./subjects"

interface Event {
    subject: Subject
    data: any
}


export abstract class Listener <T extends Event> {
    abstract subject: T["subject"]
    abstract queueName: string
    abstract onMessage(data: T["data"], msg: Message): void
    protected ackWait:number = 5 * 5000
    constructor(private stan: Stan){}

    protected getSubscription(): SubscriptionOptions {
        return this.stan
        .subscriptionOptions()
        .setDeliverAllAvailable()
        .setManualAckMode(true)
        .setAckWait(this.ackWait)
        .setDurableName(this.queueName)
    }

    protected parseMessage(msg: Message){
        const data = msg.getData() 
        return typeof data === "string" ? JSON.parse(data) : JSON.parse(data.toString("utf8"))
    }

    public listen(){
        const subscripton = this.stan.subscribe(this.subject, this.queueName, this.getSubscription())

        subscripton.on("message", (msg: Message) => {
            console.log(`Message received  ${this.subject} ${this.queueName}`)

            const parsedData = this.parseMessage(msg)

            this.onMessage(parsedData, msg)
        })
    }
}