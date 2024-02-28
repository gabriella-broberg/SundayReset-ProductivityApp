//This controles the greeting by the avatar 

// const api_url ="https://zenquotes.io?api=quotes";

// async function getapi(url)
// {
//   const response = await fetch(url, {mode: "no-cors"});
//   var data = await response.json();
//   console.log(data);
// }

// getapi(api_url);

// fetch("https://type.fit/api/quotes")
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(data) {
//     console.log(data);
//   });

const url = `https://type.fit/api/quotes`;

  let getData = async (url) => {
    let response = await fetch(url); 
    let json = await response.json();
    console.log(json);
    
    return json;   
  }
  

  let getRandomQuote = async(url) => {
    let json = await getData(url);
    let randomIndex = Math.floor(Math.random() * json.length);
    let randomQuote = json[randomIndex];
    console.log(randomQuote);

    // Dela strängen vid kommatecknet och behåll den första delen
    randomQuote.author = randomQuote.author.split(',')[0];

    return randomQuote;    
  }

  let displayQuote = async () => {
    let randomQuote = await getRandomQuote(url);

    document.getElementById('quote').innerText = randomQuote.text;
    document.getElementById('author').innerText = randomQuote.author;
  }

  displayQuote();