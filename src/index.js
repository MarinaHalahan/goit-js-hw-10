import './css/styles.css';
import { fetchCountries } from "./fetchCountries.js"
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');


const DEBOUNCE_DELAY = 300;

ref = {
    input: document.querySelector("#search-box"),
    countryList: document.querySelector(".country-list"),
    countryInfo: document.querySelector(".country-info"),
};



ref.input.addEventListener("input", debounce(onclick, DEBOUNCE_DELAY))
function onclick(event) {
    console.log(event);
   
  
    let name = (event.target.value).trim();
    

        fetchCountries(`${name}`).then((data) => {
            console.log(data);
            return data;
        })
    
    .then(maxLength);


    
       
}
    
function maxLength(data) {
    if (data.length>2 && data.length< 10) {
    let markup = data.map(({ flags, name }) => {
        return `<li class = "country_item"><img src="${flags.svg}"  alt="flag of ${name.official}" ><p>${name.official}</p></li>`

    }).join("");
         console.log(markup);
       return  ref.countryList.innerHTML = markup;

     
}
      
       if (data.length >= 10) {
      return  Notify.info("Too many matches found. Please enter a more specific name.");
       }
      
  
}


// function filterByName(data) {
   

// }


 
    
