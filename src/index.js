import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');  

input.addEventListener('input',onInputChange);
function onInputChange(event){
//    if(!event.currentTarget.value){
//        return refs.outputEl.textContent = 
//    } 
  
   const name =event.currentTarget.value;
   fetchCountries(name)
   .then(renderCountryCard)
   
   .catch(error=>{
       console.log(error);
       Notify.failure('Oops, there is no country with that name');
   });
}


function fetchCountries(name){
   return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response =>{
    return response.json();
})
};


function renderCountryCard(country){
        console.log(country);
        if(country.length>10){
            Notify.info('Too many matches found. Please enter a more specific name.');
        }
        const markup = countryCardTpl(country);
}
