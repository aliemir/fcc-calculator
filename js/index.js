$(document).ready(function(){
  var state = {
    result: 0,
    history: [],
    input: '',
    opsRequired: false
  };
  var printToScreen = function(){
    if(state.input === ''){
      $('.inp').html('&nbsp;');
    }else {
      $('.inp').text(state.input);
    }
    $('.history').text(state.history.join(' ')+' '+state.input);
  };
  var calculate = function(){
    var calcElems = [];
    var operators = [];
    //take first element and shift from array
    //map the array for string to number
    state.history.map(function(el){
      if(!isOperator(el)){
        el = parseFloat(el);
      }
    });
    //take the first el. and shift from array
    state.result = parseFloat(state.history.shift());
    //now operator and number counts are equal
    //take elements to arr and ops to another
    calcElems = state.history.filter(function(el){
      if(el == '+' || el == '-' || el == '*' || el == '/'){
        operators.push(el);
         return false;
         }else {
         return true;
         }
    });
    //since there are equal numbers of ops and els
    //we will start doing ops
    //result (op)= calcElems[first];
    operators.forEach(function(op){
      var el = calcElems.shift();
      switch(op){
        case '+':
          state.result = (state.result + parseFloat(el));
          break;
        case '-':
          state.result -= el;
          break;
        case '*':
          state.result *= el;
          break;
        case '/':
          state.result /= el;
          break;
      }
    });
    //then calculations are complete
    //clear history and assign result to history
    state.history = [];
    state.input = state.result;
    state.opsRequired = true;
  };
  var isOperator = function(k){
    return (k == '/' || k == '+' || k == '-' || k == '*' || k == '=');
  };
  var ops = function(op){
    if(state.input != ''){
      state.history.push(state.input);
      state.input = '';
    } else if (state.input == '' && op != '='){
       var last = state.history.pop();
      if(isOperator(last)){
        state.history.push(op);
      }else {
        state.history.push(last);
      }
      return false;
    }
    if(op == '=' && state.history.length > 0)
      calculate();
    else if (op != '='){
      state.history.push(op);
      state.input = '';
    }
  };
  var digs = function(dig){
    if(state.input[0] == '.'){
      input = '0' + input;
    }
    state.input += dig;
  };
  var sysBts = function(bt){
    switch(bt){
      case 'ac':
        state.result = 0;
        state.history = [];
        state.input = '';
        break;
      case 'ce':
        state.input = '';
        break;
    }
  };
  $("#buttons").on("click","button",function(){
    var pressed = $(this).attr("value");
    if(state.opsRequired && (!isOperator(pressed)  && pressed != 'ac' && pressed != 'ce')){
      return false;
    }
    if(state.opsRequired)
      state.opsRequired = false;
    if(pressed == 'ce' || pressed == 'ac'){
      sysBts(pressed);
    } else if (isOperator(pressed)) {
      ops(pressed);
    } else {
      digs(pressed);
    }
    printToScreen();
  });
});