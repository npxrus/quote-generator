const container = document.querySelector(".container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.querySelector(".twitter-btn");
const quoteBtn = document.querySelector(".fetch-btn");
const spinner = document.querySelector(".loader");

const getQuote = async () => {
  spinner.hidden = false;
  container.hidden = true;

  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    if (data.quoteAuthor === "") {
      quoteAuthor.innerText = "Неизвестный";
    } else {
      quoteAuthor.innerText = data.quoteAuthor;
    }

    if (data.quoteText.length > 80) {
      quoteText.classList.add("quote-text-long");
    } else {
      quoteText.classList.remove("quote-text-long");
    }
    quoteText.innerText = data.quoteText;

    if (!spinner.hidden) {
      container.hidden = false;
      spinner.hidden = true;
    }
  } catch (err) {
    getQuote();
    console.log(err);
  }
};

const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet/?text=${quoteText.innerText} - ${quoteAuthor.innerText}`;
  window.open(twitterUrl, "_blank");
};

twitterBtn.addEventListener("click", tweetQuote);
quoteBtn.addEventListener("click", getQuote);

getQuote();
