const convertButton = document.getElementById("convert-button");
const currencySelect = document.getElementById("currency-select");
const currencyFrom = document.getElementById("currency-from");

async function getCotacoes() {
  const url = "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL";
  const response = await fetch(url);
  const data = await response.json();

  return {
    real: 1,
    dolar: Number(data.USDBRL.bid),
    euro: Number(data.EURBRL.bid),
    libra: Number(data.GBPBRL.bid),
    bitcoin: Number(data.BTCBRL.bid)
  };
}

async function convertValor() {
  const inputCurrency = Number(
    document.getElementById("input-currency").value.replace(",", ".")
  );

  const currencyValue = document.getElementById("currency-value");
  const currencyValueConverted = document.getElementById("currency-value-converted");

  if (!inputCurrency) {
    currencyValue.innerHTML = "R$ 0,00";
    currencyValueConverted.innerHTML = "R$ 0,00";
    return;
  }

  try {
    const cotacoes = await getCotacoes();

    const fromRate = cotacoes[currencyFrom.value];
    const toRate = cotacoes[currencySelect.value];

    const valueInBRL = inputCurrency * fromRate;
    const convertedValue = valueInBRL / toRate;

    currencyValue.innerHTML = formatCurrency(inputCurrency, currencyFrom.value);
    currencyValueConverted.innerHTML = formatCurrency(convertedValue, currencySelect.value);

  } catch (error) {
    console.log("Erro ao buscar cotação:", error);
    alert("Não foi possível buscar a cotação em tempo real.");
  }
}

function formatCurrency(value, currency) {
  if (currency === "real") {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
  }

  if (currency === "dolar") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(value);
  }

  if (currency === "euro") {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR"
    }).format(value);
  }

  if (currency === "libra") {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP"
    }).format(value);
  }

  if (currency === "bitcoin") {
    return value.toFixed(8) + " BTC";
  }
}

function changeCurrency() {
  const currencyName = document.getElementById("currency-name");
  const currencyImg = document.getElementById("currency-img");

  if (currencySelect.value === "dolar") {
    currencyName.innerHTML = "Dólar Americano";
    currencyImg.src = "./assets/dolar.png";
  }

  if (currencySelect.value === "euro") {
    currencyName.innerHTML = "Euro";
    currencyImg.src = "./assets/euro.jpg";
  }

  if (currencySelect.value === "libra") {
    currencyName.innerHTML = "Libra";
    currencyImg.src = "./assets/libra.png";
  }

  if (currencySelect.value === "bitcoin") {
    currencyName.innerHTML = "Bitcoin";
    currencyImg.src = "./assets/biticoin.png";
  }

  if (currencySelect.value === "real") {
    currencyName.innerHTML = "Real Brasileiro";
    currencyImg.src = "./assets/brasil.jpg";
  }

  convertValor();
}

function changeCurrencyFrom() {
  const currencyNameFrom = document.getElementById("currency-name-from");
  const currencyImgFrom = document.getElementById("currency-img-from");

  if (currencyFrom.value === "real") {
    currencyNameFrom.innerHTML = "Real Brasileiro";
    currencyImgFrom.src = "./assets/brasil.jpg";
  }

  if (currencyFrom.value === "dolar") {
    currencyNameFrom.innerHTML = "Dólar Americano";
    currencyImgFrom.src = "./assets/dolar.png";
  }

  if (currencyFrom.value === "euro") {
    currencyNameFrom.innerHTML = "Euro";
    currencyImgFrom.src = "./assets/euro.jpg";
  }

  if (currencyFrom.value === "libra") {
    currencyNameFrom.innerHTML = "Libra";
    currencyImgFrom.src = "./assets/libra.png";
  }

  if (currencyFrom.value === "bitcoin") {
    currencyNameFrom.innerHTML = "Bitcoin";
    currencyImgFrom.src = "./assets/biticoin.png";
  }

  convertValor();
}

currencyFrom.addEventListener("change", changeCurrencyFrom);
currencySelect.addEventListener("change", changeCurrency);
convertButton.addEventListener("click", convertValor);

changeCurrencyFrom();
changeCurrency();