import { CalErrorValue } from '../../types/CalErrorValue';

export function shuntingYard(expression: string): string[] | null {
    const outputQueue: string[] = [];
    const operatorStack: string[] = [];
    const operators: { [key: string]: { precedence: number; associativity: string } } = {
        '+': { precedence: 2, associativity: 'Left' },
        '-': { precedence: 2, associativity: 'Left' },
        '*': { precedence: 3, associativity: 'Left' },
        '/': { precedence: 3, associativity: 'Left' },
    };

    const tokens = expression.match(/\d+|\+|\-|\*|\/|\(|\)|\./g);
    // const tokens= expression.match(/^-?\d+(\.\d+)?([+\-*/]-?\d+(\.\d+)?)*(\s*\(\s*-?\d+(\.\d+)?(\s*[+\-*/]\s*-?\d+(\.\d+)?)*\s*\))*$/)
    console.log('tokens ', tokens);
    
    if (!tokens) {
        return null;
    }

    tokens.forEach((token) => {
        if (!isNaN(parseFloat(token))) {
            outputQueue.push(token);
            // numberString.concat(token)
        } else if ('+-*/'.includes(token)) {
            while (
                operatorStack.length &&
                '()+-*/'.includes(operatorStack[operatorStack.length - 1]) &&
                ((operators[token].associativity === 'Left' &&
                    operators[token].precedence <= operators[operatorStack[operatorStack.length - 1]].precedence) ||
                    (operators[token].associativity === 'Right' &&
                        operators[token].precedence < operators[operatorStack[operatorStack.length - 1]].precedence))
            ) {
                outputQueue.push(operatorStack.pop()!);
            }
            operatorStack.push(token);
        } else if (token === '(') {
            operatorStack.push(token);
        } else if (token === ')') {
            while (operatorStack.length && operatorStack[operatorStack.length - 1] !== '(') {
                outputQueue.push(operatorStack.pop()!);
            }
            operatorStack.pop();
        }
    });

    while (operatorStack.length) {
        outputQueue.push(operatorStack.pop()!);
    }

    return outputQueue;
}
export function evaluatePostfix(postfixExpression: string[] | null): number | CalErrorValue {
    const stack: number[] = [];

    if (postfixExpression == null) {
        return CalErrorValue.ErrorSyntax;
    } else {
        postfixExpression.forEach((token) => {
            if (!isNaN(parseFloat(token))) {
                stack.push(parseFloat(token));
            } else {
                const b = stack.pop()!;
                const a = stack.pop()!;
                switch (token) {
                    case '+':
                        stack.push(a + b);
                        break;
                    case '-':
                        stack.push(a - b);
                        break;
                    case '*':
                        stack.push(a * b);
                        break;
                    case '/':
                        stack.push(a / b);
                        break;
                }
            }
        });

        return stack[0];
    }
}
