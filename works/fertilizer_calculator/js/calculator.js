(function() {

  var form = document.forms.calculator;
  var select = form.elements.agriculture;
  var prod = form.elements.productivity;
  var spendings = form.elements.spendings;
  var area = form.elements.area;
  var consumption;
  var average_cost;

  var data = [{
    average_cost: 3500,
    average_yield: 45,
    spendings_chemicals: 4000,
    area: 1000,
    consumption_rate: 1142
  }, {
    average_cost: 7500,
    average_yield: 25,
    spendings_chemicals: 3500,
    area: 1000,
    consumption_rate: 719
  }, {
    average_cost: 1500,
    average_yield: 70,
    spendings_chemicals: 4500,
    area: 1000,
    consumption_rate: 1385
  }, {
    average_cost: 6000,
    average_yield: 23,
    spendings_chemicals: 4500,
    area: 1000,
    consumption_rate: 1503
  }];

  /**
   * onChangeSelect() create values
   * for select and input elements
   * based on the data array
   */
  function onChangeSelect() {
    for (var i = 0; i < select.options.length; i++) {
      var option = select.options[i];
      if (option.selected) {
        average_cost = data[i].average_cost;
        prod.value = data[i].average_yield;
        spendings.value = data[i].spendings_chemicals;
        area.value = data[i].area;
        consumption = data[i].consumption_rate;
      }
    }
  }

  /**
   * onChange() remove null
   * values in input
   */
  function onChange(e) {
    var input = e.target;
    if (input.type == 'text' && input.value[0] == '0') {
      input.value = +input.value;
    }
    calculate();
  }

  /**
   * onPaste() filter input fields when
   * the user use paste operation,
   * leaves only numbers
   */
  function onPaste(e) {
    var input = e.target;
    if (input.type != 'text') return;
    input.addEventListener('input', function me() {
      this.removeEventListener('input', me);

      this.value = this.value.split('').filter(function(char) {
        return '0' <= char && char <= '9';
      }).join('');
    });
  }

  /**
   * onKeypress() filter input fields
   * only numbers
   */
  function onKeypress(e) {
    var chr = getChar(e);
    if (e.ctrlKey || e.altKey) return;
    if (chr == null) return;
    if (chr < '0' || chr > '9') e.preventDefault();
  }

  /**
   * calculate() returns a result
   * based on the data array and
   * values on input fields
   */
  function calculate() {
    var savings_chamical = 70;
    var increase_yield = 20;
    savings_chamical = (spendings.value * (savings_chamical / 100)) - consumption;
    increase_yield = prod.value * (increase_yield / 100);
    var result = (savings_chamical + (increase_yield * average_cost) / 10) * area.value;
    result = result.toFixed(0);
    document.querySelector('#calc_result h2').innerHTML = result;
  }

  /**
   * getChar() cross-browser function
   * for get char code of the event keypress
   */
  function getChar(event) {
    if (event.which == null) {
      if (event.keyCode < 32) return null;
      return String.fromCharCode(event.keyCode) // IE
    }

    if (event.which != 0 && event.charCode != 0) {
      if (event.which < 32) return null;
      return String.fromCharCode(event.which) // other browser
    }

    return null;
  }

  form.addEventListener('change', onChange);
  form.addEventListener('input', onChange);
  select.addEventListener('change', onChangeSelect);
  form.addEventListener('paste', onPaste);
  form.addEventListener('keypress', onKeypress);

  onChangeSelect();
  calculate();

})();
