import { PubSub } from "graphql-subscriptions";

class Subscriptions{

    private static instance: Subscriptions;
    pubsub: PubSub;
    
    private constructor(){
         this.pubsub = new PubSub();
    }

    public static get Instance()
    {
        return this.instance || (this.instance = new this());
    }
    
}

export = Subscriptions;