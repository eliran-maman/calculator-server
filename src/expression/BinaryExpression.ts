import {Expression} from "./Expression";

export abstract class BinaryExpression implements Expression {
    protected _left: Expression;
    protected _right: Expression;

    constructor(left: Expression, right: Expression) {
        this._left = left;
        this._right = right;
    }

    abstract calculate(): number
}