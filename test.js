import Client from './client.js'
import axios from 'axios'

(async () =>{
    const url = "http://localhost:8000"
    // await axios.post('')

    const client = new Client(url,{
        maxRetries: 10,
        initialInterval: 2000,
        maxInterval : 10000,
        timeOut : 60000
    })
    try{
        const status = await client.statusPoll();
        console.log(`Current Status ${status}`)
    }catch(error){
        console.error(error);
        
    }

})();


/*
maxRetries : number 15
initialInterval : sec 2000
maxInterval: sec 10000
timeOut: > sec 60000 / so that we don't hit the api ultimately if
not getting the response
*/