import * as express from 'express';
import {calculate} from './calculator/calculate';
import * as axios from 'axios';

const server = express.default();

type Request = {
    expression: string;
}

type CacheResponse = {
    code: number,
    data: string,
}

server.use(express.json());

async function getFromCache(exp: string): Promise<string | undefined> {
    const cacheAddrs = process.env['CACHE_SERVICE_ADDRS'];
    if(!cacheAddrs) {
        console.log('No cache service available');
        return undefined;
    }

    console.log(`Fething cache for ${exp} from cache service at ${cacheAddrs}`);
    const res = await axios.default.get(`${cacheAddrs}/${exp}`);
    const response = res.data as CacheResponse;

    if(response.code !== 200) {
        console.log(`Cache not exists for ${exp}, ${response.data}`);
        return undefined;
    }

    console.log(`Cache fetched for ${exp}=${response.data}`);
    return response.data;
}

async function storeInCache(exp: string, result: number): Promise<void> {
    const cacheAddrs = process.env['CACHE_SERVICE_ADDRS'];
    if(!cacheAddrs) {
        console.log('No cache service available');
        return undefined;
    }

    console.log(`Store cache for ${exp}=${result} at ${cacheAddrs}`);
    const res = await axios.default.put(`${cacheAddrs}/${exp}/${result}`);
    const response = res.data as CacheResponse;

    if(response.code !== 200) {
        console.log(`Could not store cache for ${exp}=${result}, ${response.data}`);
        return undefined;
    }

    console.log(`Cache stored for ${exp}=${res}`);
}


server.get('/', async (req, res) => {
    try{
        const expression = (req.body as Request).expression;
        console.log(`Request arrived with expression ${expression}`);

        const cachedResult = await getFromCache(expression);
        if(cachedResult) {
           return res.send({result: +cachedResult}); 
        }

        const result = calculate(expression);
        console.log(`Request calculated: ${expression} = ${result}`);

        await storeInCache(expression, result);
        res.send({result});
    }catch(e){
        console.error(e);
        res.status(400).send(`Bad expression: ${e}`);
    }
})

server.listen(process.env['CALCULATOR_PORT'] ?? 8080, () => {
    console.log('Calculator is waiting for customers..');
})