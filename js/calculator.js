const op = {add: '+', subtract: '-', multiply: '*', divide: '/'};

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

const calculateInternalOp = (idxExternalOp, idxInternalOp) => {
    let firstInternalOperand = parseInt(keysPressed.slice(idxExternalOp + 1, idxInternalOp).join(''));
    let secondInternalOperand = parseInt(keysPressed.slice(idxInternalOp + 1, keysPressed.length).join(''));
    let secondOperand = firstInternalOperand * secondInternalOperand;
    
    if(keysPressed[idxInternalOp] === op.divide) secondOperand = firstInternalOperand / secondInternalOperand;

    return secondOperand;
}

const resolve = (idxExternalOp, operatorIndexes) => {
    let res = 0;
    let operatorIdx = idxExternalOp;
    let firstOperand = parseInt(keysPressed.slice(0, operatorIdx).join(''));
    let secondOperand = parseInt(keysPressed.slice(operatorIdx + 1, keysPressed.length).join(''));

    if((keysPressed[operatorIdx] === op.add || keysPressed[operatorIdx] === op.subtract) && operatorIndexes.mult !== -1){
        secondOperand = calculateInternalOp(operatorIdx, operatorIndexes.mult);
    }

    if((keysPressed[operatorIdx] === op.add || keysPressed[operatorIdx] === op.subtract) && operatorIndexes.div !== -1){
        secondOperand = calculateInternalOp(operatorIdx, operatorIndexes.div);
    }

    if(keysPressed[operatorIdx] === op.add) res = firstOperand + secondOperand;

    if(keysPressed[operatorIdx] === op.subtract) res = firstOperand - secondOperand;

    if(keysPressed[operatorIdx] === op.multiply) res = firstOperand * secondOperand;

    if(keysPressed[operatorIdx] === op.divide) res = firstOperand / secondOperand;

    screen.innerText = res;
    
    keysPressed = res.toString().split("");
}

const resolveInternalOp = (idxExternalOp, idxInternalOp) => {
    let firstOperand = keysPressed.slice(0, idxExternalOp + 1);
    let res = calculateInternalOp(idxExternalOp, idxInternalOp);
    
    let secondOperand = res.toString().split("");
    keysPressed = firstOperand.concat(secondOperand);
}

const calculate = (operation, operatorIndexes) => {

    if(keysPressed[keysPressed.length - 1] === op.add || 
        keysPressed[keysPressed.length - 1] === op.subtract || 
        keysPressed[keysPressed.length - 1] === op.multiply || 
        keysPressed[keysPressed.length - 1] === op.divide){
        keysPressed.pop();
        keysPressed.push(operation);
        console.log(keysPressed);
        return;
    } 
    
    if(operation === op.add || operation === op.subtract){
        if(operatorIndexes.plus !== -1) resolve(operatorIndexes.plus, operatorIndexes);
        
        if(operatorIndexes.minus !== -1) resolve(operatorIndexes.minus, operatorIndexes);
        
    } 
    
    if(operation === op.multiply || operation === op.divide){
        if(operatorIndexes.plus !== -1 && operatorIndexes.mult !== -1){
            resolveInternalOp(operatorIndexes.plus, operatorIndexes.mult);
        }

        if(operatorIndexes.plus !== -1 && operatorIndexes.div !== -1){
            resolveInternalOp(operatorIndexes.plus, operatorIndexes.div);
        }

        if(operatorIndexes.minus !== -1 && operatorIndexes.mult !== -1){
            resolveInternalOp(operatorIndexes.minus, operatorIndexes.mult);
        }

        if(operatorIndexes.minus !== -1 && operatorIndexes.div !== -1){
            resolveInternalOp(operatorIndexes.minus, operatorIndexes.div);
        }
    } 
    
    if(operatorIndexes.plus === -1 && operatorIndexes.minus === -1 && operatorIndexes.mult !== -1){
        resolve(operatorIndexes.mult, operatorIndexes);
    } 
    
    if(operatorIndexes.plus === -1 && operatorIndexes.minus === -1 && operatorIndexes.div !== -1){
        resolve(operatorIndexes.div, operatorIndexes);
    }

    keysPressed.push(operation);
    console.log(keysPressed);
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

const calculateBasicOperation = operatorIdx => {
    let res = 0;
    let firstOperand = parseInt(keysPressed.slice(0, operatorIdx).join(''));
    let secondOperand = parseInt(keysPressed.slice(operatorIdx + 1, keysPressed.length).join(''));

    if(keysPressed[operatorIdx] === op.add) res = firstOperand + secondOperand;

    if(keysPressed[operatorIdx] === op.subtract) res = firstOperand - secondOperand;

    if(keysPressed[operatorIdx] === op.multiply) res = firstOperand * secondOperand;

    if(keysPressed[operatorIdx] === op.divide) res = firstOperand / secondOperand;
    
    return res;
}

equalKey.addEventListener("click", () => {
    console.log("veo lo que hay en teclas presionadas", keysPressed);
    let res = 0;

    const operatorIdxs = findOperationsIndexes(keysPressed, op);

    console.log(operatorIdxs);

    if(operatorIdxs.plus !== -1){
        console.log("entro en una suma comun a priori")
        let firstOperand = parseInt(keysPressed.slice(0, operatorIdxs.plus).join(''));
        let secondOperand = parseInt(keysPressed.slice(operatorIdxs.plus + 1, keysPressed.length).join(''));

        if(operatorIdxs.mult !== -1){
            console.log("ahora, entrando a combinada suma y multi");
            secondOperand = calculateInternalOp(operatorIdxs.plus, operatorIdxs.mult);
        }

        if(operatorIdxs.div !== -1){
            console.log("ahora, entrando a combinada suma y div");
            secondOperand = calculateInternalOp(operatorIdxs.plus, operatorIdxs.div);
        }

        res = firstOperand + secondOperand;
    }
    
    if(operatorIdxs.minus !== -1){
        console.log("entrando a priori en una resta comun");
        let firstOperand = parseInt(keysPressed.slice(0, operatorIdxs.minus).join(''));
        let secondOperand = parseInt(keysPressed.slice(operatorIdxs.minus + 1, keysPressed.length).join(''));

        if(operatorIdxs.mult !== -1){
            console.log("ahora, entrando a combinada suma y multi");
            secondOperand = calculateInternalOp(operatorIdxs.minus, operatorIdxs.mult);
        }

        if(operatorIdxs.div !== -1){
            console.log("ahora, entrando a combinada suma y div");
            secondOperand = calculateInternalOp(operatorIdxs.minus, operatorIdxs.div);
        }

        res = firstOperand - secondOperand;
    }
    
    if(operatorIdxs.plus === -1 && operatorIdxs.minus === -1 && operatorIdxs.mult !== -1){
        console.log("entrando a mult comun");
        res = calculateBasicOperation(operatorIdxs.mult);
    }

    if(operatorIdxs.plus === -1 && operatorIdxs.minus === -1 && operatorIdxs.div !== -1){
        console.log("entrando a div comun");
        res = calculateBasicOperation(operatorIdxs.div);
    }
    
    screen.innerText = res;
    console.log("res", res);
    
    keysPressed = res.toString().split("");
    console.log("keypressed", keysPressed);

})