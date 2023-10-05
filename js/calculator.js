const op = {add: '+', subtract: '-', multiply: '*', divide: '/'};

const ZERO_DIVIDER_ERR = "Error";

let keysPressed = [];
let result = 0;

const screen = document.getElementById('screen');

/*----------------------*\
    #NUMBER SELECTORS
\*----------------------*/

const zeroKey  = document.getElementById('zero');
const oneKey  = document.getElementById('one');
const twoKey  = document.getElementById('two');
const threeKey  = document.getElementById('three');
const fourKey  = document.getElementById('four');
const fiveKey  = document.getElementById('five');
const sixKey  = document.getElementById('six');
const sevenKey  = document.getElementById('seven');
const eightKey  = document.getElementById('eight');
const nineKey  = document.getElementById('nine');

const numberSelectors = [zeroKey, oneKey, twoKey, threeKey, fourKey, fiveKey, sixKey, sevenKey, eightKey, nineKey];

/*----------------------*\
    #THEME SELECTORS
\*----------------------*/

const themeOneBtn = document.getElementById('sel-theme-1');
const themeTwoBtn = document.getElementById('sel-theme-2');
const themeThreeBtn = document.getElementById('sel-theme-3');

/*----------------------------*\
    #COLORS THEME SELECTORS 
\*----------------------------*/

const circleBtns = document.querySelectorAll('.circle');
const keyBtns = document.querySelectorAll('.key');

const backgroundTheme = document.getElementById('bg-theme');
const brandTheme = document.querySelector('.brand');
const textTheme = document.querySelector('.theme__text');
const numberTheme = document.querySelector('.theme__numbers-number');
const selectorTheme = document.querySelector('.theme__numbers-selectors');
const backgroundDisplay = document.querySelector('.container-display');
const containerKeys = document.querySelector('.container-keys');

const arrThemeSelectors = [backgroundTheme, brandTheme, textTheme, numberTheme, selectorTheme, backgroundDisplay, screen, containerKeys];

/*---------------------*\
    #THEME FUNCTIONS 
\*---------------------*/

const applyTheme = (numberTheme, arrThemeSelectors) => {
    for(const selector of arrThemeSelectors){
        for(let n = 1; n < 4; n++){
            n === numberTheme ? selector.classList.add(`theme-${n}`) : selector.classList.remove(`theme-${n}`);
        }
    }
    
    keyBtns.forEach(key => {
        for(let n = 1; n < 4; n++){
            n === numberTheme ? key.classList.add(`theme-${n}`) : key.classList.remove(`theme-${n}`);
        }
    });
}

themeOneBtn.addEventListener("click", () => {
    applyTheme(1, arrThemeSelectors);
})

themeTwoBtn.addEventListener("click", () => {
    applyTheme(2, arrThemeSelectors);
})

themeThreeBtn.addEventListener("click", () => {
    applyTheme(3, arrThemeSelectors);
})

circleBtns.forEach((circleBtn, index) => {
    circleBtn.addEventListener("click", () => {
        circleBtns.forEach(btn => {
            btn.classList.remove("theme-1");
            btn.classList.remove("theme-2");
            btn.classList.remove("theme-3");
        })

        circleBtns[index].classList.add(`theme-${index+1}`);
    })
});

/*----------------------*\
    #OPERATOR SELECTORS
\*----------------------*/

const plusKey  = document.getElementById('plus');
const minusKey  = document.getElementById('minus');
const pointKey  = document.getElementById('point');
const divisionKey = document.getElementById('division');
const multiplicationKey  = document.getElementById('multiplication');
const deleteKey  = document.getElementById('del');
const resetKey = document.getElementById('reset');
const equalKey = document.getElementById('equal');

/*----------------------*\
    #NUMBER FUNCTIONS
\*----------------------*/

const showNumbers = selectors => {
    for(const selector of selectors){
        selector.addEventListener("click", event => {
            keysPressed.push(event.target.value);
            screen.innerText = keysPressed.join(''); 
            console.log(keysPressed);
        })
    }
}

showNumbers(numberSelectors);

/*------------------------*\
    #OPERATION FUNCTIONS
\*------------------------*/

const findOperationsIndexes = (keysArr, operations) => {
    const plus = keysArr.findIndex(key => key === operations.add);
    const minus = keysArr.findIndex(key => key ===  operations.subtract);
    const mult = keysArr.findIndex(key => key === operations.multiply);
    const div = keysArr.findIndex(key => key === operations.divide);

    const indexes = {plus, minus, mult, div};
    return indexes;
}

const calculate = (operation, operatorIdxs) => {
    let res = 0;

    if(keysPressed[keysPressed.length - 1] === op.add || 
        keysPressed[keysPressed.length - 1] === op.subtract || 
        keysPressed[keysPressed.length - 1] === op.multiply || 
        keysPressed[keysPressed.length - 1] === op.divide){
        keysPressed.pop();
        keysPressed.push(operation);
        console.log(keysPressed);
        return;
    }
    
    let idxInternalOp = -1;

    const operatorIndexes = Object.values(operatorIdxs);

    const activeOperators = operatorIndexes.filter(idx => idx !== -1);
    
    let idxExternalOp = activeOperators[0];

    if(activeOperators.length === 0 || 
    ((activeOperators.length === 1) && (operation === op.multiply || operation === op.divide) &&
    (keysPressed[idxExternalOp] === op.add || keysPressed[idxExternalOp] === op.subtract))){
        // No hay operadores o falta completar el segundo operador interno
        keysPressed.push(operation);
        console.log(keysPressed);
        return;
    }

    let firstOperand = parseInt(keysPressed.slice(0, idxExternalOp).join(''));
    let secondOperand = parseInt(keysPressed.slice(idxExternalOp + 1, keysPressed.length).join(''));
    
    if(activeOperators.length === 2){
        // Caso operacion combinada 
        idxInternalOp = activeOperators[1];

        let firstOpInternal = parseInt(keysPressed.slice(idxExternalOp + 1, idxInternalOp).join(''));
        let secondOpInternal = parseInt(keysPressed.slice(idxInternalOp + 1, keysPressed.length).join(''));

        secondOperand = firstOpInternal * secondOpInternal;

        if(keysPressed[idxInternalOp] === op.divide){
            if(secondOpInternal === 0){
                res = ZERO_DIVIDER_ERR;
                screen.innerText = res;
                keysPressed = [];
                console.log(keysPressed);
                return;
            } else {
                secondOperand = firstOpInternal / secondOpInternal;
            }
        }

        if(operation === op.multiply || operation === op.divide){
            // Concatenar resultados
            firstOperand = firstOperand.toString().split("");

            res = secondOperand;
            screen.innerText = res;
            
            keysPressed = (firstOperand.concat(keysPressed[idxExternalOp])).concat(secondOperand.toString().split(""));
            keysPressed.push(operation);
            console.log(keysPressed);
            
            return res;
        }
    }
    
    if(keysPressed[idxExternalOp] === op.add) res = firstOperand + secondOperand;
    
    if(keysPressed[idxExternalOp] === op.subtract) res = firstOperand - secondOperand;
    
    if(keysPressed[idxExternalOp] === op.multiply) res = firstOperand * secondOperand;

    if(keysPressed[idxExternalOp] === op.divide){
        if(secondOperand === 0){
            res = ZERO_DIVIDER_ERR;
            screen.innerText = res;
            keysPressed = [];
            console.log(keysPressed);
            return;
        } else {
            res = firstOperand / secondOperand;
        }
    } 

    screen.innerText = res;
    
    keysPressed = res.toString().split("");
    keysPressed.push(operation);
    console.log(keysPressed);

    return res;
}

plusKey.addEventListener("click", event => {
    const plus = event.target.value;
    
    const operatorIdxs = findOperationsIndexes(keysPressed, op);
    calculate(plus, operatorIdxs);
})

minusKey.addEventListener("click", event => {
    const minus = event.target.value;
    
    const operatorIdxs = findOperationsIndexes(keysPressed, op);
    calculate(minus, operatorIdxs);
})

multiplicationKey.addEventListener("click", event => {
    const multiplication = event.target.value;

    const operatorIdxs = findOperationsIndexes(keysPressed, op);
    calculate(multiplication, operatorIdxs);
})

divisionKey.addEventListener("click", event => {
    const division = event.target.value;

    const operatorIdxs = findOperationsIndexes(keysPressed, op);
    calculate(division, operatorIdxs);
})

resetKey.addEventListener("click", () => {
    keysPressed = [];
    screen.innerText = '0';
    console.log(keysPressed);
})

deleteKey.addEventListener("click", () => {
    keysPressed.pop();
    screen.innerText = keysPressed.join('');
    console.log(keysPressed);
})

equalKey.addEventListener("click", () => {
    let result = 0;
    console.log("veo lo que hay en teclas presionadas", keysPressed);

    const operatorIdxs = findOperationsIndexes(keysPressed, op);
    
    const operatorIndexes = Object.values(operatorIdxs);

    const activeOperators = operatorIndexes.filter(idx => idx !== -1);
    
    let idxExternalOp = activeOperators[0];

    if(keysPressed[idxExternalOp] === op.add) result = calculate(op.add, operatorIdxs);
    
    if(keysPressed[idxExternalOp] === op.subtract) result = calculate(op.subtract, operatorIdxs);
    
    if(keysPressed[idxExternalOp] === op.multiply) result = calculate(op.multiply, operatorIdxs);
    
    if(keysPressed[idxExternalOp] === op.divide) result = calculate(op.divide, operatorIdxs);
})


// Casos a resolver

/* 

suma 
1 + 1 +       -> 2 +  (OK)
1 - 1 +       -> 0 +  (OK)
1 * 1 +       -> 1 +  (OK)
1 / 1 +       -> 1 +  (OK)
1 / 0 +       -> error (OK)
1 + 2 * 1 +   -> 3 + (OK)
1 - 2 * 1 +   -> -1 + (OK)
1 + 2 / 1 +   -> 3 + (OK)
1 - 2 / 1 +   -> -1 + (OK)
1 + 2 / 0 +   -> error (OK)
1 - 2 / 0 +   -> error (OK)

resta 
1 + 1 -       -> 2 -    (OK)
1 - 1 -       -> 0 -    (OK)
1 * 1 -       -> 1 -    (OK)
1 / 1 -       -> 1 -    (OK)
1 / 0 -       -> error  (OK)
1 + 2 * 1 -   -> 3 -    (OK)
1 - 2 * 1 -   -> -1 -   (OK)
1 + 2 / 1 -   -> 3 -    (OK)
1 - 2 / 1 -   -> -1 -   (OK)
1 + 2 / 0 -   -> error  (OK)
1 - 2 / 0 -   -> error  (OK)

multiplicacion
1 + 1 *       -> pasa al caso suma,resta o [+,*]   (OK)
1 - 1 *       -> pasa al caso suma,resta o [-,*]   (OK)
1 * 1 *       -> 1 *      (OK)
1 / 1 *       -> 1 *      (OK)
1 / 0 *       -> error    (OK)
1 + 2 * 1 *   -> 1 + 2 *  (OK)
1 - 2 * 1 *   -> 1 - 2 *  (OK)
1 + 2 / 1 *   -> 1 + 2 *  (OK)
1 - 2 / 1 *   -> 1 - 2 *  (OK)
1 + 2 / 0 *   -> error    (OK)
1 - 2 / 0 *   -> error    (OK)

division
1 + 1 /       -> pasa al caso suma,resta o [+,/]    (OK)
1 - 1 /       -> pasa al caso suma,resta o [-,/]   (OK)
1 * 1 /       -> 1 /   (OK)
1 / 1 /       -> 1 /   (OK)
1 / 0 /       -> error   (OK)
1 + 2 * 1 /   -> 1 + 2 /     (OK)
1 - 2 * 1 /   -> 1 - 2 /   (OK)
1 + 2 / 1 /   -> 1 + 2 /   (OK)
1 - 2 / 1 /   -> 1 - 2 /   (OK)
1 + 2 / 0 /   -> error   (OK)
1 - 2 / 0 /   -> error   (OK)

*/

// combinaciones posibles

// caso 1: tengo como operador externo (+,-) y clickeo sobre la * o /. No hago nada 

// caso 2: tengo como op externo (+,-) y ya tengo como op interno * o / (vino del caso 1):

// caso 2.a: si clickeo sobre + o -, resuelvo la * o / y luego la + o - y envio el res mas (+,-)
// caso 2.b: si clickeo sobre * o /, resuelvo la * o / y luego envio el arreglo desde el principio
// hasta el operador externo concatenado con el res de la op interna

// caso 3: cualquier otra combinacion. realizo simplemente la operacion entre dos numeros  

// calculatee = (multiplication, operatorIdxs)








