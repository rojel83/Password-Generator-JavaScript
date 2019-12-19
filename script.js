//Dom elements-------------------------------------
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

//-------------------------------------------------
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbols
};

//generate event-------------------------------
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;



    resultEl.innerText = generatePassword(
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        length
    );
});

//Copy password to clipboard

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if (!password) {
        return;

        textarea.value = password;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        alert('Password copied to clipboard!');
    }
})

//generate password function
function generatePassword(lower, upper, number, symbol, length) {

    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;


    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);


    // console.log('typeArr:', typesArr);

    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];

            // console.log('funcName: ');

            generatedPassword += randomFunc[funcName]();

        });
    }

    //console.log(generatedPassword);

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;


}

//-----------------------------------------------------------------------------------

//Generator functions

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbols() {
    const symbols = "~!@#$%^&*()_+}{:?><,./;'[]\|=-";
    return symbols[Math.floor(Math.random() * symbols.length)];
}