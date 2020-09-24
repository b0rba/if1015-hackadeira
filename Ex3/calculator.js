const calculate = ({ a, b, op}) => {
    const numberA = parseFloat(a);
    const numberB = parseFloat(b);
    switch(op) {
         case '+':
             return numberA + numberB;
         case '-':
             return numberA - numberB;
         case '*':
             return numberA * numberB;
         case '/':
             return numberA / numberB;
    }
}

exports.calculate = calculate