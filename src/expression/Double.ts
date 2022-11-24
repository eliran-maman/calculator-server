import { Expression } from "./Expression";

export class Double implements Expression {

    constructor(protected readonly _value: number) {}

    calculate(): number {
        return this._value;
    }

}