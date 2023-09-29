const operators = {PLUS: '+', MINUS: '-', MULT: '*', DIV: '/'};

const ZERO_DIVIDER_ERR = "Error. Division por 0";

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
            console.log(keysPressed);
        })
    }
}

showNumbers(numberSelectors);

/*----------------------*\
    #OPERATOR EVENTS
\*----------------------*/

const findOperatorIndexes = (keysArr, operators) => {
    const plus = keysArr.findIndex(key => key === operators.PLUS);
    const minus = keysArr.findIndex(key => key ===  operators.MINUS);
    const mult = keysArr.findIndex(key => key === operators.MULT);
    const div = keysArr.findIndex(key => key === operators.DIV);

    const indexes = {plus, minus, mult, div};
    return indexes;
}

const solve = (operator, operators, keysArr, operatorIdxs) => {
    let res;
    let operatorIdx = operatorIdxs.plus;

    if(operator === operators.MINUS) operatorIdx = operatorIdxs.minus;
    
    let firstOperand = parseInt(keysArr.slice(0, operatorIdx).join(''));
    let secondOperand = parseInt(keysArr.slice(operatorIdx + 1, keysArr.length).join(''));
    
    if(operatorIdxs.mult !== -1){
        let firstOperandMult = parseInt(keysArr.slice(operatorIdx + 1, operatorIdxs.mult).join(''));
        let secondOperandMult = parseInt(keysArr.slice(operatorIdxs.mult + 1, keysArr.length).join(''));
        secondOperand = firstOperandMult * secondOperandMult;
    } 
    
    if(operatorIdxs.div !== -1){
        let firstOperandDiv = keysArr.slice(operatorIdx + 1, operatorIdxs.div).join('');
        let secondOperandDiv = keysArr.slice(operatorIdxs.div + 1, keysPressed.length).join('');
        secondOperand = parseInt(firstOperandDiv) / parseInt(secondOperandDiv);
    }
    
    operator === operators.PLUS ? res = firstOperand + secondOperand : res = firstOperand - secondOperand;
    keysArr = res.toString().split("");
    
    return {res, keysArr};
}

const resolve = (operator, operators, keysArr, operatorIdxs) => {
    let res;
    let operatorIdx = operatorIdxs.plus;

    if(operator === operators.MINUS) operatorIdx = operatorIdxs.minus;
    
    let firstOperand = keysArr.slice(0, operatorIdx + 1);
    let secondOperand = keysArr.slice(operatorIdx + 1, keysArr.length).join('');
    
    if(operatorIdxs.mult !== -1){
        let firstOperandMult = keysArr.slice(operatorIdx + 1, operatorIdxs.mult).join('');
        let secondOperandMult = keysArr.slice(operatorIdxs.mult + 1, keysArr.length).join('');
        secondOperand = (parseInt(firstOperandMult) * parseInt(secondOperandMult)).toString().split("");
    }
    
    if(operatorIdxs.div !== -1){
        let firstOperandDiv = keysArr.slice(operatorIdx + 1, operatorIdxs.div).join('');
        let secondOperandDiv = keysArr.slice(operatorIdxs.div + 1, keysArr.length).join('');
        secondOperand = (parseInt(firstOperandDiv) / parseInt(secondOperandDiv)).toString().split("");
    }
    
    res = secondOperand;
    keysArr = firstOperand.concat(secondOperand);

    return {res, keysArr};
}

const solveSimple = (operator, operators, keysArr, operatorIdxs) =>  {
    let res;
    let operatorIdx = operatorIdxs.mult;

    if(operator === operators.DIV) operatorIdx = operatorIdxs.div;
    
    const firstOperand = parseInt(keysArr.slice(0, operatorIdx).join(''));
    const secondOperand = parseInt(keysArr.slice(operatorIdx + 1, keysArr.length).join(''));
    
    if(operator === operators.DIV){
        secondOperand === 0 ? res = ZERO_DIVIDER_ERR : res = firstOperand / secondOperand;
    } else {
        res = firstOperand * secondOperand;
    }
    
    keysArr = res.toString().split("");
    
    return {res, keysArr};
}

plusKey.addEventListener("click", event => {
    const plus = event.target.value;
    
    const operatorIdxs = findOperatorIndexes(keysPressed, operators);
    
    if(operatorIdxs.plus !== -1){
        const operationInfoPlus = solve('+', operators, keysPressed, operatorIdxs);
        result = operationInfoPlus.res;
        keysPressed = operationInfoPlus.keysArr;
    } 
    
    if(operatorIdxs.minus !== -1){
        const operationInfoMinus = solve('-', operators, keysPressed, operatorIdxs);
        result = operationInfoMinus.res;
        keysPressed = operationInfoMinus.keysArr;
    }
    
    if(operatorIdxs.plus === -1 && operatorIdxs.minus === -1 && operatorIdxs.mult !== -1){
        const operationInfoMult = solveSimple('*', operators, keysPressed, operatorIdxs);
        result = operationInfoMult.res;
        keysPressed = operationInfoMult.keysArr;
    }

    if(operatorIdxs.plus === -1 && operatorIdxs.minus === -1 && operatorIdxs.div !== -1){ 
        const operationInfoDiv = solveSimple('/', operators, keysPressed, operatorIdxs);
        result = operationInfoDiv.res;
        keysPressed = operationInfoDiv.keysArr;
    }
    
    keysPressed.push(plus);
    console.log(keysPressed);
})

minusKey.addEventListener("click", event => {
    const minus = event.target.value;

    const operatorIdxs = findOperatorIndexes(keysPressed, operators);
    
    if(operatorIdxs.plus !== -1){
        const operationInfoPlus = solve('+', operators, keysPressed, operatorIdxs);
        result = operationInfoPlus.res;
        keysPressed = operationInfoPlus.keysArr;
    }

    if(operatorIdxs.minus !== -1){
        const operationInfoMinus = solve('-', operators, keysPressed, operatorIdxs);
        result = operationInfoMinus.res;
        keysPressed = operationInfoMinus.keysArr;
    }
    
    if(operatorIdxs.plus === -1 && operatorIdxs.minus === -1 && operatorIdxs.mult !== -1){
        const operationInfoMult = solveSimple('*', operators, keysPressed, operatorIdxs);
        result = operationInfoMult.res;
        keysPressed = operationInfoMult.keysArr;
    }

    if(operatorIdxs.plus === -1 && operatorIdxs.minus === -1 && operatorIdxs.div !== -1){ 
        const operationInfoDiv = solveSimple('/', operators, keysPressed, operatorIdxs);
        result = operationInfoDiv.res;
        keysPressed = operationInfoDiv.keysArr;
    }
    
    keysPressed.push(minus);
    console.log(keysPressed);
})

multiplicationKey.addEventListener("click", event => {
    const multiplication = event.target.value;

    const operatorIdxs = findOperatorIndexes(keysPressed, operators);
    
    if(operatorIdxs.plus !== -1){
        const operationInfoPlus = resolve('+', operators, keysPressed, operatorIdxs);
        result = operationInfoPlus.res;
        keysPressed = operationInfoPlus.keysArr;
    }

    if(operatorIdxs.minus !== -1){
        const operationInfoMinus = resolve('-', operators, keysPressed, operatorIdxs);
        result = operationInfoMinus.res;
        keysPressed = operationInfoMinus.keysArr;
    }
    
    if(operatorIdxs.minus === -1 && operatorIdxs.plus === -1 && operatorIdxs.mult !== -1){ 
        const operationInfoMult = solveSimple('*', operators, keysPressed, operatorIdxs);
        result = operationInfoMult.res;
        keysPressed = operationInfoMult.keysArr;
    }

    if(operatorIdxs.minus === -1 && operatorIdxs.plus === -1 && operatorIdxs.div !== -1){
        const operationInfoDiv = solveSimple('/', operators, keysPressed, operatorIdxs);
        result = operationInfoDiv.res;
        keysPressed = operationInfoDiv.keysArr;
    }
    
    keysPressed.push(multiplication);
    console.log(keysPressed);
})

divisionKey.addEventListener("click", event => {
    const division = event.target.value;

    const operatorIdxs = findOperatorIndexes(keysPressed, operators);
    
    if(operatorIdxs.plus !== -1){
        const operationInfoPlus = resolve('+', operators, keysPressed, operatorIdxs);
        result = operationInfoPlus.res;
        keysPressed = operationInfoPlus.keysArr;
    }

    if(operatorIdxs.minus !== -1){
        const operationInfoMinus = resolve('-', operators, keysPressed, operatorIdxs);
        result = operationInfoMinus.res;
        keysPressed = operationInfoMinus.keysArr;
    }
    
    if(operatorIdxs.minus === -1 && operatorIdxs.plus === -1 && operatorIdxs.mult !== -1){ 
        const operationInfoMult = solveSimple('*', operators, keysPressed, operatorIdxs);
        result = operationInfoMult.res;
        keysPressed = operationInfoMult.keysArr;
    }
    
    if(operatorIdxs.minus === -1 && operatorIdxs.plus === -1 && operatorIdxs.div !== -1){
        const operationInfoDiv = solveSimple('/', operators, keysPressed, operatorIdxs);
        result = operationInfoDiv.res;
        keysPressed = operationInfoDiv.keysArr;
    }
    
    keysPressed.push(division);
    console.log(keysPressed);
})

resetKey.addEventListener("click", () => {
    keysPressed = [];
    console.log(keysPressed);
})

deleteKey.addEventListener("click", () => {
    keysPressed.pop();
    console.log(keysPressed);
})
        