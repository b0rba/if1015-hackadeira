const isOpValid = (op) => {
    switch(op) {
        case 0:
        case 1:
        case 2:
        case 3:
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


    if (!isOpValid(input.op))
        throw new Error('Invalid operation');
    
};

exports.isOpValid = isOpValid
exports.validateInput = validateInput