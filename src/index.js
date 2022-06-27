import './css/styles.css';
import { fetchCountries } from "./fetchCountries.js"
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { ref } from './ref';
var debounce = require('lodash.debounce');


const DEBOUNCE_DELAY = 300;


let name;


ref.input.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
    
    name = (event.target.value).trim();

    if (name === "") {
       cleanerMarkup()
        return;
    }
    fetchCountries(`${name}`).then((data) => {
        return data;
    })
        .then(countryFilter);
};

function countryFilter(data) {
   
    if (data.length === 1) {
        markupForOneCountry(data);
    };

    if (data.length>=2 && data.length<= 10) {
        markupForListOfCountries(data) 
    };

    if (data.length > 10) {
       cleanerMarkup()
      return  Notify.info("Too many matches found. Please enter a more specific name.");
    };
};

function markupForOneCountry(data) {
    ref.countryList.innerHTML = "";
    let markup = data.map(({ flags, name, capital, population, languages }) => {
        return `<div class ="countries_box"><img src="${flags.svg}" alt="flag of ${name.official}">
      <h1>${name.official}</h1></div>
      <ul class = "country_list">
        <li><p><b>Capital: </b>${capital}</p></li>
        <li><p><b>Population: </b>${population}</p></li>
        <li><p><b>Languages: </b>${Object.values(languages)}</p></li>
      </ul>`}).join("");
         
    return ref.countryInfo.innerHTML = markup;
};

function markupForListOfCountries(data) {
       ref.countryInfo.innerHTML = "";
    let markup = data.map(({ flags, name }) => {
        return `<li class = "country_item"><img src="${flags.svg}"alt="flag of ${name.official}" ><p>${name.official}</p></li>`
    }).join("");
      
    return  ref.countryList.innerHTML = markup;
};

function cleanerMarkup() {
    ref.countryList.innerHTML = "";
    ref.countryInfo.innerHTML = "";
}
  
    
