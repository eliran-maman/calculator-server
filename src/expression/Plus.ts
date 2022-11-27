import {BinaryExpression} from "./BinaryExpression";
import {Expression} from "./Expression";

export class Plus extends BinaryExpression {

    constructor(left: Expression, right: Expression) {
        super(left, right);
    }

    calculate(): number {
        return this._left.calculate() + this._right.calculate();
    }

}