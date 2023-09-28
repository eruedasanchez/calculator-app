const PLUS_KEY = '+';
const MINUS_KEY = '-';
const MULT_KEY = '*';
const DIV_KEY = '/';
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
    #NUMBER EVENTS
\*----------------------*/

zeroKey.addEventListener("click", event => {
    const zero = event.target.value;
    keysPressed.push(zero); 
    console.log(keysPressed);
})

oneKey.addEventListener("click", event => {
    const one = event.target.value;
    keysPressed.push(one); 
    console.log(keysPressed);
})

twoKey.addEventListener("click", event => {
    const two = event.target.value;
    keysPressed.push(two); 
    console.log(keysPressed);
})

threeKey.addEventListener("click", event => {
    const three = event.target.value;
    keysPressed.push(three); 
    console.log(keysPressed);
})

fourKey.addEventListener("click", event => {
    const four = event.target.value;
    keysPressed.push(four); 
    console.log(keysPressed);
})

fiveKey.addEventListener("click", event => {
    const five = event.target.value;
    keysPressed.push(five); 
    console.log(keysPressed);
})

sixKey.addEventListener("click", event => {
    const six = event.target.value;
    keysPressed.push(six); 
    console.log(keysPressed);
})

sevenKey.addEventListener("click", event => {
    const seven = event.target.value;
    keysPressed.push(seven); 
    console.log(keysPressed);
})

eightKey.addEventListener("click", event => {
    const eight = event.target.value;
    keysPressed.push(eight); 
    console.log(keysPressed);
})

nineKey.addEventListener("click", event => {
    const nine = event.target.value;
    keysPressed.push(nine); 
    console.log(keysPressed);
})

/*----------------------*\
    #OPERATOR EVENTS
\*----------------------*/

plusKey.addEventListener("click", event => {
    const plus = event.target.value;
    
    const idxPlus = keysPressed.findIndex(key => key === PLUS_KEY);
    const idxMinus = keysPressed.findIndex(key => key === MINUS_KEY);
    const idxMult = keysPressed.findIndex(key => key === MULT_KEY);
    const idxDiv = keysPressed.findIndex(key => key === DIV_KEY);
    
    let firstOperand;
    let secondOperand;

    if(idxPlus !== -1){
        firstOperand = parseInt(keysPressed.slice(0, idxPlus).join(''));
        secondOperand = parseInt(keysPressed.slice(idxPlus + 1, keysPressed.length).join(''));
        
        if(idxMult !== -1){
            let firstOperandMult = parseInt(keysPressed.slice(idxPlus + 1, idxMult).join(''));
            let secondOperandMult = parseInt(keysPressed.slice(idxMult + 1, keysPressed.length).join(''));
            console.log(firstOperandMult);
            console.log(secondOperandMult);

            secondOperand = firstOperandMult * secondOperandMult;
            console.log(secondOperand);
        } 
        
        if(idxDiv !== -1){
            let firstOperandDiv = keysPressed.slice(idxPlus + 1, idxDiv).join('');
            let secondOperandDiv = keysPressed.slice(idxDiv + 1, keysPressed.length).join('');
            secondOperand = parseInt(firstOperandDiv) / parseInt(secondOperandDiv);
        }
        
        result = firstOperand + secondOperand;
        console.log(result);
        keysPressed = result.toString().split("");
        console.log(keysPressed);
    }

    if(idxMinus !== -1){
        firstOperand = parseInt(keysPressed.slice(0, idxMinus).join(''));
        secondOperand = parseInt(keysPressed.slice(idxMinus + 1, keysPressed.length).join(''));
        
        if(idxMult !== -1){
            let firstOperandMult = keysPressed.slice(idxMinus + 1, idxMult).join('');
            let secondOperandMult = keysPressed.slice(idxMult + 1, keysPressed.length).join('');
            secondOperand = parseInt(firstOperandMult) * parseInt(secondOperandMult);
        } 
        
        if(idxDiv !== -1){
            let firstOperandDiv = keysPressed.slice(idxMinus + 1, idxDiv).join('');
            let secondOperandDiv = keysPressed.slice(idxDiv + 1, keysPressed.length).join('');
            secondOperand = parseInt(firstOperandDiv) / parseInt(secondOperandDiv);
        }
        
        result = firstOperand - secondOperand;
        keysPressed = result.toString().split("");
    }

    if(idxPlus === -1 && idxMinus === -1 && idxMult !== -1){ 
        firstOperand = parseInt(keysPressed.slice(0, idxMult).join(''));
        secondOperand = parseInt(keysPressed.slice(idxMult + 1, keysPressed.length).join(''));
        
        result = firstOperand * secondOperand;
        keysPressed = result.toString().split("");
    }

    if(idxPlus === -1 && idxMinus === -1 && idxDiv !== -1){
        firstOperand = parseInt(keysPressed.slice(0, idxDiv).join(''));
        secondOperand = parseInt(keysPressed.slice(idxDiv + 1, keysPressed.length).join(''));

        secondOperand === 0 ? result = ZERO_DIVIDER_ERR : result = firstOperand / secondOperand;
        keysPressed = result.toString().split("");
    }
    
    keysPressed.push(plus);
    console.log(keysPressed);
})

minusKey.addEventListener("click", event => {
    const minus = event.target.value;
    
    const idxPlus = keysPressed.findIndex(key => key === PLUS_KEY);
    const idxMinus = keysPressed.findIndex(key => key === MINUS_KEY);
    const idxMult = keysPressed.findIndex(key => key === MULT_KEY);
    const idxDiv = keysPressed.findIndex(key => key === DIV_KEY);
    
    let firstOperand;
    let secondOperand;

    if(idxMinus !== -1){
        firstOperand = parseInt(keysPressed.slice(0, idxMinus).join(''));
        secondOperand = parseInt(keysPressed.slice(idxMinus + 1, keysPressed.length).join(''));
        
        if(idxMult !== -1){
            let firstOperandMult = parseInt(keysPressed.slice(idxMinus + 1, idxMult).join(''));
            let secondOperandMult = parseInt(keysPressed.slice(idxMult + 1, keysPressed.length).join(''));
            console.log(firstOperandMult);
            console.log(secondOperandMult);

            secondOperand = firstOperandMult * secondOperandMult;
            console.log(secondOperand);
        } 
        
        if(idxDiv !== -1){
            let firstOperandDiv = keysPressed.slice(idxMinus + 1, idxDiv).join('');
            let secondOperandDiv = keysPressed.slice(idxDiv + 1, keysPressed.length).join('');
            secondOperand = parseInt(firstOperandDiv) / parseInt(secondOperandDiv);
        }
        
        result = firstOperand - secondOperand;
        console.log(result);
        keysPressed = result.toString().split("");
        console.log(keysPressed);
    }

    if(idxPlus !== -1){
        firstOperand = parseInt(keysPressed.slice(0, idxPlus).join(''));
        secondOperand = parseInt(keysPressed.slice(idxPlus + 1, keysPressed.length).join(''));
        
        if(idxMult !== -1){
            let firstOperandMult = keysPressed.slice(idxPlus + 1, idxMult).join('');
            let secondOperandMult = keysPressed.slice(idxMult + 1, keysPressed.length).join('');
            secondOperand = parseInt(firstOperandMult) * parseInt(secondOperandMult);
        } 
        
        if(idxDiv !== -1){
            let firstOperandDiv = keysPressed.slice(idxPlus + 1, idxDiv).join('');
            let secondOperandDiv = keysPressed.slice(idxDiv + 1, keysPressed.length).join('');
            secondOperand = parseInt(firstOperandDiv) / parseInt(secondOperandDiv);
        }
        
        result = firstOperand + secondOperand;
        keysPressed = result.toString().split("");
    }

    if(idxMinus === -1 && idxPlus === -1 && idxMult !== -1){ 
        firstOperand = parseInt(keysPressed.slice(0, idxMult).join(''));
        secondOperand = parseInt(keysPressed.slice(idxMult + 1, keysPressed.length).join(''));
        
        result = firstOperand * secondOperand;
        keysPressed = result.toString().split("");
    }

    if(idxMinus === -1 && idxPlus === -1 && idxDiv !== -1){
        firstOperand = parseInt(keysPressed.slice(0, idxDiv).join(''));
        secondOperand = parseInt(keysPressed.slice(idxDiv + 1, keysPressed.length).join(''));

        secondOperand === 0 ? result = ZERO_DIVIDER_ERR : result = firstOperand / secondOperand;
        keysPressed = result.toString().split("");
    }
    
    keysPressed.push(minus);
    console.log(keysPressed);
})

multiplicationKey.addEventListener("click", event => {
    const multiplication = event.target.value;

    // const idxPlus = keysPressed.findIndex(key => key === PLUS_KEY);
    // const idxMinus = keysPressed.findIndex(key => key === MINUS_KEY);
    const idxMult = keysPressed.findIndex(key => key === MULT_KEY);
    const idxDiv = keysPressed.findIndex(key => key === DIV_KEY);

    let firstOperand = [];
    let secondOperand = [];

    if(idxMult !== -1){
        firstOperand = keysPressed.slice(0, idxMult).join('');  
        secondOperand = keysPressed.slice(idxMult + 1, keysPressed.length).join('');
        
        result = parseInt(firstOperand) * parseInt(secondOperand);
        
        keysPressed = result.toString().split("");

        console.log("encontre un operando multiplicacion en un producto");
    }
    if(idxDiv !== -1){
        firstOperand = keysPressed.slice(0, idxDiv).join('');  
        secondOperand = keysPressed.slice(idxDiv + 1, keysPressed.length).join('');
        
        secondOperand === 0 ? result = ZERO_DIVIDER_ERR : result = parseInt(firstOperand) / parseInt(secondOperand);
        
        keysPressed = result.toString().split("");
        
        console.log("encontre un operando division en un producto");
    }
    
    keysPressed.push(multiplication); 
    console.log(keysPressed);
})

divisionKey.addEventListener("click", event => {
    const division = event.target.value;

    // const idxPlus = keysPressed.findIndex(key => key === PLUS_KEY);
    // const idxMinus = keysPressed.findIndex(key => key === MINUS_KEY);
    const idxMult = keysPressed.findIndex(key => key === MULT_KEY);
    const idxDiv = keysPressed.findIndex(key => key === DIV_KEY);

    let firstOperand = [];
    let secondOperand = [];

    if(idxMult !== -1){
        firstOperand = keysPressed.slice(0, idxMult).join('');  
        secondOperand = keysPressed.slice(idxMult + 1, keysPressed.length).join('');
        
        result = parseInt(firstOperand) * parseInt(secondOperand);
        
        keysPressed = result.toString().split("");

        console.log("encontre un operando multiplicacion en una division");
    }
    if(idxDiv !== -1){
        firstOperand = keysPressed.slice(0, idxDiv).join('');  
        secondOperand = keysPressed.slice(idxDiv + 1, keysPressed.length).join('');
        
        secondOperand === 0 ? result = ZERO_DIVIDER_ERR : result = parseInt(firstOperand) / parseInt(secondOperand);
        
        keysPressed = result.toString().split("");
        
        console.log("encontre un operando division en una division");
    }
    
    keysPressed.push(division); 
    console.log(keysPressed);
})

resetKey.addEventListener("click", event => {
    keysPressed = [];
    console.log(keysPressed);
})

deleteKey.addEventListener("click", event => {
    keysPressed.pop();
    console.log(keysPressed);
})
        