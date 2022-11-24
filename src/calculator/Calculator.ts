import { Div } from "../expression/Div";
import { Double } from "../expression/Double";
import {Expression} from "../expression/Expression";
import { Minus } from "../expression/Minus";
import { Mul } from "../expression/Mul";
import { Plus } from "../expression/Plus";

function getTokens(exp: string) {
    return exp.split(/(?<=[-+*/()])|(?=[-+*/()])/);
}

export function calculate(exp: string): number | undefined {
    // Validate expressio
    const validCharacters = exp.match(/^[0-9+/.()*-]+$/);
    if(!validCharacters) {
        throw `Expression [${exp}] contains invalid characters`;
    }

    const tokens = getTokens(exp);
    const expressions: Expression[] = [];
    const queue: string[] = [];
    const stack: string[] = [];

    // Shutting yard algorithm
    tokens.forEach(token => {
        // check if number
        if(+token) {
            // Is number
            queue.push(token);
            return;
        }

        switch(token) {
            case '/':
            case '*':
            case '(':
                stack.push(token);
                break;
            case '+':
            case '-':
                while(stack.length > 0 && stack.at(stack.length-1) !== '(') {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    queue.push(stack.pop()!);
                }
                stack.push(token);
                break;
            case ')':
                while(stack.at(stack.length-1) !== '(') {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    queue.push(stack.pop()!);
                }
                stack.pop();
                break;
        }
    });
    
    while(stack.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        queue.push(stack.pop()!);
    }

    // Queue is now contains postfix form
    queue.forEach(token => {
        if(+token) {
            expressions.push(new Double(+token));
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const right = expressions.pop()!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const left = expressions.pop()!;

        switch(token) {
            case '/':
                expressions.push(new Div(left, right));
                break;
            case '*':
                expressions.push(new Mul(left, right));
                break;
            case '+':
                expressions.push(new Plus(left, right));
                break;
            case '-':
                expressions.push(new Minus(left, right));
                break;
        }
    });

    if(expressions.length !== 1) {
        throw `Invalid expression, shutting yard could not parse the expression ${exp}. Expression stack size is ${expressions.length}`
    }
    
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return Math.floor(expressions.pop()!.calculate() * 1000) / 1000;
}
