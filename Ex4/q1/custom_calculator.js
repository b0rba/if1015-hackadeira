const calculate = ({ a, b, op}) => {
    const numberA = parseFloat(a);
    const numberB = parseFloat(b);
    switch(op) {
         case 0:
             return numberA + numberB;
         case 1:
             return numberA - numberB;
         case 2:
             return numberA * numberB;
         case 3:
             return numberA / numberB;
    }
}

exports.calculate = calculate