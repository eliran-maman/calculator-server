import * as express from 'express';
import {calculate} from './calculator/calculate';

const server = express.default();

type Request = {
    expression: string;
}

server.use(express.json());

server.get('/', (req, res) => {
    try{
        const expression = (req.body as Request).expression;
        console.log(`Request arrived with expression ${expression}`);
        const result = calculate(expression);
        console.log(`Request calculated: ${expression} = ${result}`);
        res.send({result});
    }catch(e){
        console.error(e);
        res.status(400).send(`Bad expression: ${e}`);
    }
})

server.listen(process.env['CALCULATOR_PORT'] ?? 8080, () => {
    console.log('Calculator is waiting for customers..');
})