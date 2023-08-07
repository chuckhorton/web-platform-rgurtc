# PODS Loans Pages

[See on StackBlitz ⚡️](https://stackblitz.com/edit/web-platform-rgurtc)

Final PODS Calculate your monthly payment code snippet for PODS Loan Pages

# Instructions

Open index.html for example and code copying

1. IMPORT acorn ccs and js files in <head>

```
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
  <link rel="stylesheet" type="text/css"
    href="https://payment-amount.acornfinance.com/v4/partners/pods/calc/acorn-calc-monthly-payment.min.css" />
  <script async src="https://payment-amount.acornfinance.com/v4/acorn-finance.min.js"></script>
  <script async
    src="https://payment-amount.acornfinance.com/v4/partners/pods/calc/acorn-calc-monthly-payment.min.js"></script>
</head>
```

### No longer need

1.1 Download acorn-calc-monthly-payment.min.css and replace on PODS server
2.1 Download acorn-calc-monthly-payment-min.js and replace on PODS server

2. ON BODY TAG remove `onload="onLoadPageAcorn()`. This is now handled by acorn-calc-monthly-payment.js

```
<body>
```

3. COPY CODE below and replace existing code from index.html

   `<!-- Acorn Calculate your monthly payment HTML - CODE TO COPY -->`
   and above
   `<!-- END of CODE TO COPY  -->`

4. PASTE CODE below PODS How Acorn Finance Works section and See how financing can help with your move in PODS' financing page

5. Verify Your potential monthly payment amount is working

   - Change: What is your moving budget value
   - Click Labor
   - Click Car shipping
   - Click Boxes

6. Verify Check offers at Acorn Finance button is working by clicking on it

   - Should open new tab and show Acorn Finance calculator page with PODS logo in upper right corner
     When clicking Check Offers At Acorn Finance button
     - for www.pods.com/moving-loans when should go to https://www.acornfinance.com/apply/?d=POD-WEBSITE-LP
     - for www.pods.com/loans when should go to https://www.acornfinance.com/apply/?d=POD-WEBSITE-SSC

7. Share with Acorn when deployed and we will test and verifyAcorn to have Acorn review and test

## Versions

2023-08-07 version 1.6.0 - Remove <body onload="onLoadPageAcorn()"> from <body> and in acorn-calc-monthly.js add window.onload = onLoadPageAcorn; and move to PAW JS

2023-06-27 version 1.5.0 - Add auto set dealer id for www.pods.com/loans, add example page

2023-06-13 version 1.4.0 - Add x year term to description

2023-06-12 version 1.3.0 - Change to hide Start from for extras

2023-06-10 version 1.2.0 - Change to use min js, fix font size error, fix label wrapping

2023-06-09 version 1.1.0 - Fix add-on calcs

2023-04-20 version 1.0.0 - First production ready version
