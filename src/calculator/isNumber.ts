export function isNumber(value: string): boolean {
    if (+value) {
        return true;
    }
    
    return +value === 0;
}