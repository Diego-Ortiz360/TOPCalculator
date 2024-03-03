let fnumb = ``;
let snumb = ``;
let operator =``;
let result = ``;
let display = ``;
let isDecimal = false;


const currentOperationScreen = document.getElementById(`currentOperation`);
const previusOperationScreen = document.getElementById (`previusOperation`);
const btnNumbersArray = document.querySelectorAll(`.number`);
const btnDecimal = document.querySelector(`.decimal`);
const btnEqual = document.querySelector(`.equal`);
const btnOperatorsArray = document.querySelectorAll(`.operator`);
const btnClear = document.getElementById(`clear`);
const btnDelete = document.getElementById(`delete`);


const addition = (a, b) => (a  + b);
const subtraction = (a, b) => (a-b);
const product = (a, b) => (a * b);
const quotient = (a, b) => (a / b);


const disableBtn = (btn) =>
{
  btn.disabled = true;
}

const enableBtn = (btn) =>
{
  btn.disabled = false;
}

function keyboardHandler (keyboard)
{
  if (keyboard.key >= 0 && keyboard.key <= 9) { appendNumber(keyboard.key); }

  else if (keyboard.key == `Escape`) { clear(); }

  else if (keyboard.key == `Enter` || keyboard.key == `=`) { equal(); }

  else if (keyboard.key == `.`) { setDecimal();}

  else if(keyboard.key == `Backspace`) { del(); }

  else if (keyboard.key == `+` || keyboard.key == `-` || keyboard.key == `x` || keyboard.key == `/`) { setOperator(keyboard.key); }

}

const operate = (operator, firstNumber, secondNumber ) => 
{
    let zero = false;

    if (secondNumber == 0 || secondNumber == ``)
    {
      zero = true;
      secondNumber = 0;
    }

    switch (operator) 
    {
        case `+`:

            result = addition(parseFloat(firstNumber), parseFloat(secondNumber));
            break;
    
        case `-`:

            result = subtraction(parseFloat (firstNumber), parseFloat(secondNumber));
            break;

        case `x`:

            result = product (firstNumber,secondNumber);
            break;

        case `/`:

            if(zero)

            {
              clear();
              result=`Lmao`;
            }
            else
            {
              result = quotient   (firstNumber, secondNumber);
            }
            
            break;

        case ``:

            result = fnumb;
            break;
    }

    if (!Number.isInteger(result) && result != `Lmao`)
    {
      result = parseFloat(result).toFixed(2);
    }

    return ((result));
};

const print = (toPrint,screen)=>
{
  let print = null;

  if (toPrint != ``)
  {
    if (typeof(toPrint) === `string`)
    {
      if (toPrint.length > 10)
      {
        print = parseFloat(toPrint).toExponential(2);
      }
      else 
      { print = toPrint};
    }
    else
    {
      print = `` + toPrint;
      
      if (print.length > 10)
      {
        print = parseFloat(toPrint).toExponential(2);
      }
      else 
      { print =  toPrint;}
    }
  }

  else
  {print = toPrint;} 

  screen.value = print;
}

const clear = ()=>
{
  fnumb = ``;
  snumb = ``;
  operator= ``;
  result = ``;
  display = ``;
  print (``,previusOperationScreen);
  print(``,currentOperationScreen);
  isDecimal = false;
  enableBtn(btnDecimal);
}

const del = ()=>
{

  if (snumb == ``)
  {
    if (fnumb.endsWith(`.`))
    {
      isDecimal = false;
      enableBtn(btnDecimal);  
    }
    fnumb = fnumb.slice(0,-1);
    display = fnumb;
  }
  else
  {
    if (snumb.endsWith(`.`))
    {
      isDecimal = false;
      enableBtn(btnDecimal);  
    }
    snumb = snumb.slice(0, -1);

    display = snumb;
  }

  print (display,currentOperationScreen);

}

const setOperator = (operatorValue) =>
{
  if ( fnumb != `` && operator != `` && snumb != ``)
  {
    fnumb = operate(operator,fnumb,snumb)
    snumb = ``;
    
  }
  else if (result != ``&& result != `Lmao`)
  {
    fnumb = result;
    result = ``;

    isDecimal = false;
    enableBtn (btnDecimal);
  }
  else
  {
    result = ``;

  }
  operator = operatorValue;

  isDecimal = false;
    enableBtn (btnDecimal);

  print (`${fnumb} ${operator}`,previusOperationScreen);
  
  print(``,  currentOperationScreen);
};

const appendNumber = (numEntry) =>
{

  if (result !== ``)
  {
    result = ``;
  }
  if ( fnumb == `` || (fnumb != `` && operator == ``) )
  {
    fnumb = fnumb + numEntry;
    display = fnumb;
  }
  else 
  {
    snumb = snumb + numEntry;
    display = snumb;
  }
  
  print (display,currentOperationScreen);
}

const equal = ()=>
{
  display = operate(operator, fnumb, snumb);

  if (display === `NaN`)
  {
    print (``,currentOperationScreen);
  }
  else
  {
    print(display,currentOperationScreen);
  }

  operator = ``;
  fnumb = ``;
  snumb = ``;
  print(``,previusOperationScreen);
  isDecimal = false;
  enableBtn(btnDecimal);
}

const setDecimal = () =>
{
  if (!isDecimal)
  {
    isDecimal = true;
    disableBtn (btnDecimal);
    if (fnumb == ``)
  {
    fnumb = `0.`;  
    display = fnumb
  }
  
  else if (fnumb != `` && operator == ``)
  {
    fnumb = fnumb + `.`;
    display = fnumb;
  }
  else
  {
    snumb = snumb + `.`;
    display = snumb;
  }
  }
  
  print (display,currentOperationScreen);
}

window.addEventListener(`keydown`,keyboardHandler);

btnClear.addEventListener(`click`, clear);

btnDelete.addEventListener(`click`, del);

btnEqual.addEventListener(`click`,equal);

btnDecimal.addEventListener(`click`, setDecimal);

btnOperatorsArray.forEach((currentOperator)=>
{
  currentOperator.addEventListener(`click`, ()=>
  {
    setOperator(currentOperator.textContent);
  });
});

btnNumbersArray.forEach((currentNumber)=>
{
    currentNumber.addEventListener(`click`, ()=>
    {
      appendNumber(currentNumber.textContent);
    });
});











