const currencySelectLoc = document.querySelector(".count-line select");
const currencyFlagLoc = document.querySelector(".currency-flag");
const currencyLoc = document.querySelector(".currency");
const rateLoc = document.querySelector(".rate");
const dateLoc = document.querySelector(".date");
const plAmountLoc = document.querySelector(".pl-amount");
const resultLoc = document.querySelector(".result");
const errorLoc = document.querySelector(".error");

currencySelectLoc.value = "eur";
plAmountLoc.value = "";

let chfCode;
let chfCurrency;
let chfDate;
let chfRate;

let eurCode;
let eurCurrency;
let eurDate;
let eurRate;

let usdCode;
let usdCurrency;
let usdDate;
let usdRate;

let gbpCode;
let gbpCurrency;
let gbpDate;
let gbpRate;

let result;
let rate;

let plAmount = "0";

$.getJSON({
    url: "http://api.nbp.pl/api/exchangerates/rates/a/chf/",
    headres: { Accept: "application/json", "Access-Control-Allow-Origin": "*" },
})
    .done(function (data) {
        chfCode = data.code;
        chfCurrency = data.currency;
        chfDate = data.rates[0].effectiveDate;
        chfRate = data.rates[0].mid;
    })
    .fail(function (error) {
        console.error(error);
    });

$.getJSON({
    url: "http://api.nbp.pl/api/exchangerates/rates/a/eur/",
    headres: { Accept: "application/json", "Access-Control-Allow-Origin": "*" },
})
    .done(function (data) {
        eurCode = data.code;
        eurCurrency = data.currency;
        eurDate = data.rates[0].effectiveDate;
        eurRate = data.rates[0].mid;

        currencyLoc.innerText = eurCurrency;
        rateLoc.innerText = eurRate;
        dateLoc.innerText = eurDate;
        rate = eurRate;
    })
    .fail(function (error) {
        console.error(error);
    });

$.getJSON({
    url: "http://api.nbp.pl/api/exchangerates/rates/a/usd/",
    headres: { Accept: "application/json", "Access-Control-Allow-Origin": "*" },
})
    .done(function (data) {
        usdCode = data.code;
        usdCurrency = data.currency;
        usdDate = data.rates[0].effectiveDate;
        usdRate = data.rates[0].mid;
    })
    .fail(function (error) {
        console.error(error);
    });

$.getJSON({
    url: "http://api.nbp.pl/api/exchangerates/rates/a/gbp/",
    headres: { Accept: "application/json", "Access-Control-Allow-Origin": "*" },
})
    .done(function (data) {
        gbpCode = data.code;
        gbpCurrency = data.currency;
        gbpDate = data.rates[0].effectiveDate;
        gbpRate = data.rates[0].mid;
    })
    .fail(function (error) {
        console.error(error);
    });

const calculate = (plAmount, rate) => {
    result = Number((plAmount * rate).toFixed(2));
    resultLoc.innerText = result;
};

currencySelectLoc.addEventListener("change", (e) => {
    currencyFlagLoc.src = "images/" + e.target.value.toLowerCase() + ".png";

    if (e.target.value.toLowerCase() === "chf") {
        currencyLoc.innerText = chfCurrency;
        rateLoc.innerText = chfRate;
        dateLoc.innerText = chfDate;
        rate = chfRate;
    }

    if (e.target.value.toLowerCase() === "eur") {
        currencyLoc.innerText = eurCurrency;
        rateLoc.innerText = eurRate;
        dateLoc.innerText = eurDate;
        rate = eurRate;
    }

    if (e.target.value.toLowerCase() === "usd") {
        currencyLoc.innerText = usdCurrency;
        rateLoc.innerText = usdRate;
        dateLoc.innerText = usdDate;
        rate = usdRate;
    }

    if (e.target.value.toLowerCase() === "gbp") {
        currencyLoc.innerText = gbpCurrency;
        rateLoc.innerText = gbpRate;
        dateLoc.innerText = gbpDate;
        rate = gbpRate;
    }

    calculate(plAmount, rate);
});

plAmountLoc.addEventListener("input", (e) => {
    plAmount = Number(e.target.value);

    calc: {
        console.log(plAmount);
        console.log(typeof plAmount);
        if (isNaN(plAmount)) {
            resultLoc.innerText = 0;
            errorLoc.innerText = "Błąd: Tylko wartości liczbowe!";
            {
                break calc;
            }
        }

        errorLoc.innerText = "";

        if (plAmount !== "") {
            calculate(plAmount, rate);
        }
    }
});
