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

    // Split the string at the comma and keep the first part
    randomQuote.author = randomQuote.author.split(',')[0];
    
    return randomQuote;    
  }

  let displayQuote = async () => {
    let randomQuote = await getRandomQuote(url);

    document.getElementById('quote').innerText = randomQuote.text;
    
    if (randomQuote.author === "type.fit") {
      document.getElementById('author').innerText = "Unknown";
    }else {
      document.getElementById('author').innerText = randomQuote.author;
    } 
    
  }

  displayQuote();