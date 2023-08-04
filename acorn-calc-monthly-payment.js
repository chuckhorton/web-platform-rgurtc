// Acorn Finance Loan Payment Calculator
// Copyright © 2023 by Acorn Finance. All rights reserved
// Unauthorized copying of this file, via any medium is strictly prohibited
// Proprietary and confidential
// THIS CODE IS PROVIDED ON AN * AS IS * BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
// WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
// MERCHANTABILITY OR NON-INFRINGEMENT.

// Instead of <body onload="onLoadPageAcorn()">
window.onload = onLoadPageAcorn;

// < Calculate your monthly payment Javascript
function onLoadPageAcorn() {
  acornParameters = {
    dealerId: 'POD-WEBSITE-LP', // POD-WEBSITE-LP
    companyName: 'PODS', // PODS company name
    subPurpose: 'Moving',
    loanAmount: 3200, // Total Estimate or Invoice amount
    returnURL: window.location.href,
    env: 'Prod', // Set to UAT for testing or Prod for Production
    paymentPrefix: 'PAYMENTS STARTING FROM', // FROM
    paymentSuffix: '/month on',
    theme: 'box', // light, dark, no-border, box
    showPromoText: false, // true, false
    // promoText: "quickly compare offers from top lenders &#8226; no impact to credit score",
    logging: true,
  };
  let locHref = window.location.href;
  if (locHref.indexOf('/loans') > 0) {
    acornParameters.dealerId = 'POD-WEBSITE-SSC';
  }
  acornFinance.setAcornParameters(acornParameters);

  // add an appropriate event listener
  window.addEventListener('acorn-payment-widget-click', (e) =>
    console.log('acorn-payment-widget-click', e.detail.label)
  );

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

function acornUpdateExtraServices() {
  var sum = 0;
  for (i = 0; i < document.listForm.choice.length; i++) {
    if (document.listForm.choice[i].checked) {
      sum = sum + parseInt(document.listForm.choice[i].value);
    }
  }

  const num1 = parseInt(acornParameters.loanAmount);
  const num2 = parseInt(sum);
  const updatedLoanAmount = num1 + num2;
  // console.log('amount', document.getElementById('acorn-amount-input').value, updatedLoanAmount, num1, num2)

  let payInfo = acornFinance.customCalcPayment(
    updatedLoanAmount,
    'acorn-custom-payment-amount-value',
    'acorn-custom-button-div',
    'acorn-custom-loan-maxmin',
    'page',
    'Check offers at Acorn Finance'
  );
  document.getElementById('acorn-loan-amount').innerHTML =
    acornFormatCurrency(updatedLoanAmount);
  let lowPay = acornFinance.calcLowPayment(updatedLoanAmount);
  document.getElementById('acorn-loan-term').innerHTML = lowPay.years;
}

function acornUpdatePaymentAmount(value) {
  document.getElementById('labor').checked = false;
  document.getElementById('car-shipping').checked = false;
  document.getElementById('boxes').checked = false;

  if (value.length === 0) {
    acornParameters.loanAmount = 1;
  } else {
    acornParameters.loanAmount = value;
    if (value == 0) {
      acornParameters.loanAmount = 1;
    }

    acornFinance.customCalcPayment(
      acornParameters.loanAmount,
      'acorn-custom-payment-amount-value',
      'acorn-custom-button-div',
      'acorn-custom-loan-maxmin',
      'page',
      'Check offers at Acorn Finance'
    );
    document.getElementById('acorn-loan-amount').innerHTML =
      acornFormatCurrency(acornParameters.loanAmount);
    let lowPay = acornFinance.calcLowPayment(acornParameters.loanAmount);
    document.getElementById('acorn-loan-term').innerHTML = lowPay.years;
    setExtraPaymentAmounts();
  }
}

function setExtraPaymentAmounts() {
  // Labor
  // console.log('setExtraPaymentAmounts', acornParameters.loanAmount)
  let lowLoanAmount = 1000;
  let loanAmount = parseInt(acornParameters.loanAmount);
  if (loanAmount < 5000) {
    lowLoanAmount = 1000;
  } else if (loanAmount < 10000) {
    lowLoanAmount = 5000;
  } else if (loanAmount < 25000) {
    lowLoanAmount = 10000;
  } else if (loanAmount < 50000) {
    lowLoanAmount = 25000;
  } else if (loanAmount < 120000) {
    lowLoanAmount = 50000;
  }
  let laOnly = acornFinance.calcLowPayment(lowLoanAmount);
  let laWithLabor = acornFinance.calcLowPayment(lowLoanAmount + 750);
  let laWithCarShipping = acornFinance.calcLowPayment(lowLoanAmount + 1700);
  let laWithBoxes = acornFinance.calcLowPayment(lowLoanAmount + 120);
  let laLaborOnly = laWithLabor.value - laOnly.value;
  let laCarShippingOnly = laWithCarShipping.value - laOnly.value;
  let laBoxesOnly = laWithBoxes.value - laOnly.value;
  // acorn-labor-only-payment
  document.getElementById('acorn-labor-only-payment').innerHTML =
    '$' + laLaborOnly;
  document.getElementById('acorn-car-shipping-only-payment').innerHTML =
    '$' + laCarShippingOnly;
  document.getElementById('acorn-boxes-only-payment').innerHTML =
    '$' + laBoxesOnly;
  // console.log(acornParameters.loanAmount, lowLoanAmount, laLaborOnly, laCarShippingOnly, laBoxesOnly)
}

function acornLoadPaymentAmountWidget() {
  // console.log('acornLoadPaymentAmountWidget');
  acornParameters.loanAmount = 3200;
  document.getElementById('acorn-amount-input').value =
    acornParameters.loanAmount;
  acornUpdatePaymentAmount(acornParameters.loanAmount);
  acornParameters.utm_source = 'Contractor';
  acornParameters.docSource = 'Finance Page'; // PODS Source Doc
  acornParameters.docUser = 'Customer'; // Joist's Do User - Customer or Contractor
  acornFinance.customCalcPayment(
    acornParameters.loanAmount,
    'acorn-custom-payment-amount-value',
    'acorn-custom-button-div',
    'acorn-custom-loan-maxmin',
    'page',
    'Check offers at Acorn Finance'
  );
}

// Format Number Currency
function acornFormatCurrency(value) {
  let formatted = Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
  return formatted;
}

let rateRanges = null;
let rateRangesError = false;
let partnerParams = {};
let rateRangesLoading = false;
acornLoadRateRanges();
async function acornLoadRateRanges(rateRangesUrl = '') {
  rateRangesUrl =
    rateRangesUrl ||
    `https://fs.acornfinance.com/lib/rates/acorn-rate-ranges.json`;
  try {
    rateRangesLoading = true;
    let response = await fetch(rateRangesUrl);
    if (response.ok) {
      rateRanges = await response.json();
      rateRangesLoading = false;
      acornSetRanges();
    } else {
      rateRangesError = true;
      console.log('PayAmt Loaded ERROR else, Can not load:', rateRangesUrl);
      // postActivityLog('PayAmt Loaded ERROR else', `Can not load: ${rateRangesUrl}`)
    }
  } catch {
    rateRangesError = true;
    console.log('PayAmt Loaded ERROR catch, Can not load:', rateRangesUrl);
    // postActivityLog('PayAmt Loaded ERROR catch', `Can not load: ${rateRangesUrl}`)
  }
}

function acornSetRanges() {
  // console.log('acornSetRanges Acorn rate ranges loaded', rateRanges)
  document.getElementById('acorn-low-term').innerHTML =
    rateRanges.months_low || '24';
  document.getElementById('acorn-high-term').innerHTML =
    rateRanges.months_high || '144';
  document.getElementById('acorn-low-rate').innerHTML =
    rateRanges.rates_low || '6.99';
  document.getElementById('acorn-high-rate').innerHTML =
    rateRanges.rates_high || '36.00';
}

function acornScrollToTarget() {
  const element = document.getElementById('acorn-scroll-target');
  element.scrollIntoView();
}
