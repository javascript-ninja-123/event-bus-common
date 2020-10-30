import  {Stan} from "node-nats-streaming"
import {Subject} from "./subjects"

interface Event {
    subject: Subject,
    data: any
}

export abstract class Publisher<T extends Event>{
    abstract subject:Event["subject"]
    constructor(private stan: Stan){

    }
    private normalizeData(data: Event["data"]): string {
        return typeof data === "string" ? data : JSON.stringify(data)
    }

    public publish(data: Event["data"]): Promise<void>{
        return new Promise((resolve,reject) => {
            this.stan.publish(this.subject, this.normalizeData(data), (err) => {
                if(err){
                    reject(err)
                    return
                }   
                console.log("event published to subject", this.subject)
                resolve()
            })
        })
    }
}