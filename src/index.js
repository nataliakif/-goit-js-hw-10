import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import API from './fetchCountries'

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');  

input.addEventListener('input',debounce(onInputChange, DEBOUNCE_DELAY));
function onInputChange(event){
    countryList.innerHTML = '';
   countryInfo.innerHTML = '';
   const name = input.value.trim();
   if(name){
   API.fetchCountries(name)
   .then(renderCountryCard)
   .catch(error=>{
       console.log(error);
       Notify.failure('Oops, there is no country with that name');
   });
}
}
function renderCountryCard(country){
    console.log(country.length)
        if(country.length>10){
           return  Notify.info('Too many matches found. Please enter a more specific name.'); 
        }
        return markupCountries(country);
    }

     
function markupCountries (country){
    if(country.length === 1){
        console.log('country')
        markupCountry(country);
    } else{
        console.log(country.flags)
       
    const markupInfo = country
    .map((c) => {
        return `<li><img src="${c.flags.svg}" width="60" height="20"/>${c.name.official}</li>`;
      })
      .join('');
      return countryList.insertAdjacentHTML('afterbegin', markupInfo);
    }
   
}

function markupCountry(country){
   
    const markupInfo = country
    .map((c) => {return `<ul><li><img src="${c.flags.svg}" width="100" height="50" class="flag_image"/>${c.name.official}</li>
        <li>Capital: ${c.capital}</li>
    <li>Population: ${c.population}</li>
    <li>Languages: ${Object.values(c.languages)}</li>
    </ul>`;
      });  
   return countryInfo.insertAdjacentHTML('afterbegin', markupInfo);
}
