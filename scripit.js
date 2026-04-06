const convertButton = document.getElementById("convert-button");
const currencySelect = document.getElementById("currency-select");

function convertValor() {
    const inputCurrency = Number(document.getElementById("input-currency").value.replace(",", "."));
    const currencyValueConverted = document.getElementById("currency-value-converted");
    const currencyValue = document.getElementById("currency-value");

    const dolarToday = 5.2;
    const euroToday = 6.2;
    const libraToday = 7.2;
    const pesoToday = 0.2;

    let convertedValue = 0;
    let locale = "en-US";
    let currencyCode = "USD";

    if (currencySelect.value === "dolar") {
        convertedValue = inputCurrency / dolarToday;
        locale = "en-US";
        currencyCode = "USD";
    }

    if (currencySelect.value === "euro") {
        convertedValue = inputCurrency / euroToday;
        locale = "de-DE";
        currencyCode = "EUR";
    }

    if (currencySelect.value === "libra") {
        convertedValue = inputCurrency / libraToday;
        locale = "en-GB";
        currencyCode = "GBP";
    }

    if (currencySelect.value === "peso") {
        convertedValue = inputCurrency / pesoToday;
        locale = "es-AR";
        currencyCode = "ARS";
    }

    currencyValue.innerHTML = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(inputCurrency);

    currencyValueConverted.innerHTML = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currencyCode
    }).format(convertedValue);
}

convertButton.addEventListener("click", convertValor);