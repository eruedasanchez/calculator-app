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
            return;
        } else {
            res = firstOperand / secondOperand;
        }
    } 

    screen.innerText = res;
    
    keysPressed = res.toString().split("");
    keysPressed.push(operation);
    
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
})

deleteKey.addEventListener("click", () => {
    keysPressed.pop();
    screen.innerText = keysPressed.join('');
})

const compute = (operation, operand) => {
    let result = 0;

    if(operation === op.add) result = 2 * operand;
    if(operation === op.subtract) result = operand - operand;
    if(operation === op.multiply) result = operand * operand;
    if(operation === op.divide) result = operand / operand;

    return result;
}

const resolve = (operation, operand, idxExternalOp, operatorIdxs) => {
    let result = 0;

    if(idxExternalOp === keysPressed.length - 1){
        result = compute(operation, operand);
    } else {
        result = calculate(operation, operatorIdxs);
    }
    
    screen.innerText = result;
    
    keysPressed = result.toString().split("");
    keysPressed.push(operation);
    
    return result;
}

equalKey.addEventListener("click", () => {
    let result = 0;
    
    const operatorIdxs = findOperationsIndexes(keysPressed, op);
    
    const operatorIndexes = Object.values(operatorIdxs);

    const activeOperators = operatorIndexes.filter(idx => idx !== -1);
    
    let idxExternalOp = activeOperators[0];

    let firstOperand = parseInt(keysPressed.slice(0, idxExternalOp).join(''));

    if(keysPressed[idxExternalOp] === op.add){
        result = resolve(op.add, firstOperand, idxExternalOp, operatorIdxs);
    }
    
    if(keysPressed[idxExternalOp] === op.subtract){
        result = resolve(op.subtract, firstOperand, idxExternalOp, operatorIdxs);
    } 
    
    if(keysPressed[idxExternalOp] === op.multiply){
        result = resolve(op.multiply, firstOperand, idxExternalOp, operatorIdxs);
    } 
    
    if(keysPressed[idxExternalOp] === op.divide){
        result = resolve(op.divide, firstOperand, idxExternalOp, operatorIdxs);
    } 
})


