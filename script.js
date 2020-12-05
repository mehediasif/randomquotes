const quoteContainer = document.querySelector('#quoteContainer');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterbtn = document.querySelector('#twitter');
const newQuoteButton = document.querySelector('#newQuote');
const loader = document.querySelector("#loader");


let apiQuotes = [];
//Show that its loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//show new quote
function newQuote(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);

    if(!quote.author){
        authorText.textContent = 'Unknown'
    }else{
        authorText.textContent = quote.author;
    }
    //Check the quote length to determine style
    if(quote.text.length > 150){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote');
    }
    //Setting quote and hide the loader
    quoteText.textContent = quote.text;
    complete();
}

//Getting quotes from api
async function getquote(){
    loading();
    const apiUrl= 'https://type.fit/api/quotes';
    console.log("Checked!!");
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch(e){
        console.log("Something went wrong", e);
    }
}
//to tweet a quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}
newQuoteButton.addEventListener('click', newQuote);
twitterbtn.addEventListener('click', tweetQuote);
//On LOading
getquote();