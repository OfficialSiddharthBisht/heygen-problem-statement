import axios from 'axios';

class Client {
    // / **
    // **
    // * @param {string} backendURL
    // * @param {Object} options
    // * /
    constructor(backendURL="",options ={}){
        this.backendURL = backendURL
        this.maxRetries  = options.maxRetries
        this.initialInterval  = options.initialInterval
        this.maxInterval = options.maxInterval 
        this.timeOut = options.timeOut
    }

    async statusPoll(){
        let retries = 0;
        let interval = this.initialInterval;
        let startTime = Date.now()
        while(retries < this.maxRetries){
            try{
                if(Date.now() - startTime > this.timeOut){
                    throw new Error('Time Out')
                }
                let response = await axios.get(`${this.backendURL}/status`);
                
                let status = response.data.result;
                console.log(`Retries ${retries + 1} Status ${status}`);
                if(status === "completed" || status === "error"){
                    return status;
                }
                await this._sleep(interval)
                interval = Math.min(interval * 2,this.maxInterval)
                // 2 sec => 4 sec  => 8 sec => 16 sec => 32 sec
            }
            catch(error){
                console.log(error);
                retries++;
                if(retries > this.maxRetries){
                    throw new Error('Max Retries Reached')
                }
            }
        }
        throw new Error('Wrong inputs')
    }
    _sleep(interval){
        return new Promise((resolve)=>setTimeout(resolve,interval))
    }
}

export default Client;




/*
maxRetries : number 15
initialInterval : sec 2000
maxInterval: sec 10000
timeOut: > sec 60000 / so that we don't hit the api ultimately if
not getting the response

=>Starting with frequent checks and gradually slowing down
Implementing automatic retries if there are connection issues
Adding timeout features so users don't wait forever
Making the checking interval configurable
Adding proper error handling and logging

*/