// < Calculate your monthly payment Javascript
function onLoadPageAcorn () {
  acornParameters = {
    dealerId: 'POD-WEBSITE-LP', // POD-WEBSITE-LP (needs to be created)
    companyName: 'PODS', // PODS company name
    subPurpose: 'Moving',
    loanAmount: 3200, // Total Estimate or Invoice amount
    returnURL: window.location.href,
    env: 'UAT', // Set to UAT for testing or Prod for Production
    paymentPrefix: 'PAYMENTS STARTING FROM', // FROM
    paymentSuffix: '/month on',
    theme: 'box', // light, dark, no-border, box
    showPromoText: false, // true, false
    // promoText: "quickly compare offers from top lenders &#8226; no impact to credit score",
    logging: false,
  };
  acornFinance.setAcornParameters(acornParameters);

  // add an appropriate event listener
  // window.addEventListener('acorn-payment-widget-click', (e) =>
  //   console.log('acorn-payment-widget-click', e.detail.label)
  // );

  // Example only, set acornParameters.loanAmount and run CalcPayment() when you have the total price
  let netType = '3g';
  if (navigator.connection) {
    netType = navigator.connection.effectiveType;
  }
  let delay = 300;
  if (netType === '3g') {
    delay = 750;
  } else if (netType === '2g') {
    delay = 3000;
  }
  setTimeout(() => {
    acornLoadPaymentAmountWidget();
  }, delay);
}

function acornUpdateExtraServices () {
  var sum = 0;
  for (i = 0; i < document.listForm.choice.length; i++) {
    if (document.listForm.choice[i].checked) {
      sum = sum + parseInt(document.listForm.choice[i].value);
    }
  }

  const num1 = parseInt(acornParameters.loanAmount);
  const num2 = parseInt(sum);
  const updatedLoanAmount = num1 + num2;
  console.log('amount', document.getElementById('acorn-amount-input').value)

  acornFinance.customCalcPayment(
    updatedLoanAmount,
    'acorn-custom-payment-amount-value',
    'acorn-custom-button-div',
    'acorn-custom-loan-maxmin',
    'page',
    'Check your rate'
  );
  document.getElementById("acorn-loan-amount").innerHTML = acornFormatCurrency(updatedLoanAmount);
}

function acornUpdatePaymentAmount (value) {

  document.getElementById("labor").checked = false;
  document.getElementById("car_shipping").checked = false;
  document.getElementById("boxes").checked = false;

  if (value.length === 0) {
    acornParameters.loanAmount = 1;
  } else {
    acornParameters.loanAmount = value;
    if (value == 0) {
      acornParameters.loanAmount = 1;
    }

    var sum = 0;
    const inputedAmount = parseInt(acornParameters.loanAmount);
    for (i = 0; i < document.listForm.choice.length; i++) {
      console.log(document.listForm.choice[1].value, '--', value)
      sum = parseInt(document.listForm.choice[i].value);

      acornFinance.customCalcPayment(
        document.listForm.choice[0].value,
        'item-payment-value-1',
        'acorn-custom-button-div',
        'acorn-custom-loan-maxmin',
        'page',
        'Check your rate'
      );

      acornFinance.customCalcPayment(
        document.listForm.choice[1].value,
        'item-payment-value-2',
        'acorn-custom-button-div',
        'acorn-custom-loan-maxmin',
        'page',
        'Check your rate'
      );

      acornFinance.customCalcPayment(
        document.listForm.choice[2].value,
        'item-payment-value-3',
        'acorn-custom-button-div',
        'acorn-custom-loan-maxmin',
        'page',
        'Check your rate'
      );
    }

    acornFinance.customCalcPayment(
      acornParameters.loanAmount,
      'acorn-custom-payment-amount-value',
      'acorn-custom-button-div',
      'acorn-custom-loan-maxmin',
      'page',
      'Check your rate'
    );
    document.getElementById("acorn-loan-amount").innerHTML = acornFormatCurrency(acornParameters.loanAmount);
  }
}

function acornLoadPaymentAmountWidget () {
  console.log('acornLoadPaymentAmountWidget');
  acornParameters.loanAmount = 3200;
  document.getElementById('acorn-amount-input').value = acornParameters.loanAmount
  acornUpdatePaymentAmount(acornParameters.loanAmount)
  acornParameters.utm_source = 'Contractor';
  acornParameters.docSource = 'Finance Page'; // PODS Source Doc
  acornParameters.docUser = 'Customer'; // Joist's Do User - Customer or Contractor
  acornFinance.customCalcPayment(
    acornParameters.loanAmount,
    'acorn-custom-payment-amount-value',
    'acorn-custom-button-div',
    'acorn-custom-loan-maxmin',
    'page',
    'Check your rate'
  );
}

// Format Number Currency
function acornFormatCurrency (value) {
  let formatted = Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
  return formatted;
}