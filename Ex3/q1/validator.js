const isOpValid = (op) => {
    switch(op) {
        case '+':
        case '-':
        case '*':
        case '/':
            return true;            
    }

    return false;
};

const validateInput = (input) => {
    if (!input)
        throw new Error('Invalid expression');
    
    if (!input.a)
        throw new Error('Invalid first input');

    if (!input.b)
        throw new Error('Invalid second input');

    if (!input.op)
        throw new Error('Mising operator');

    if (!isOpValid(input.op))
        throw new Error('Invalid operation');
    
};

const isReadyToSend = (expression) => {
    if (!expression || !expression.op || !expression.a || !expression.b)
        return false;

    if (!isOpValid(expression.op))
        throw new Error('Invalid operator');

    return true;
};

exports.isOpValid = isOpValid
exports.validateInput = validateInput
exports.isReadyToSend = isReadyToSend