import './css/styles.css';
import { fetchCountries } from './fetchCounties';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box')
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info')

input.addEventListener('input', debounce(onInputQuery, DEBOUNCE_DELAY))
function onInputQuery(){
    const valueOfInputQuery = input.value.trim()
if(valueOfInputQuery === ''){
    clearCountryList();
    return;
}
fetchCountries(valueOfInputQuery)
.then(countries => {
    if (countries.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      clearCountryList();
    } else if (countries.length >= 2 && countries.length <= 10){
      renderCardMarkup(countries)
    } else if(countries.length === 1){
        clearCountryList()
        renderOneCardMarkup(countries)
    }
})
.catch(error => {
if(error.message === '404'){
Notiflix.Notify.failure("Oops, there is no country with that name");}
else {
  console.log(error.message);
}
})
} 

function clearCountryList() {
    countryList.innerHTML = '';
  }
function renderCardMarkup(countries){
  const markup = countries.map(country => `
  <li>
    <img src="${country.flags.svg}" alt="${country.name}" width="32">
    <span>${country.name}</span>
  </li>
`).join('');
countryList.innerHTML = markup;
}
function renderOneCardMarkup(countries){
  const markupForOneCountry = countries.map(country =>{
    `<img src="${country.flags.svg}" alt="${country.name}" width="32">
<h2>${country.name}</h2>
<ul>
  <li><h3>Capital:</h3><span>${country.capital}</span></li>
  <li><h3>Population:</h3><span>${country.population}</span></li>
  <li><h3>Languages:</h3><span>${Object.values(country.languages)}</span></li>
</ul>`.join('')
})
countryInfo.innerHTML = markupForOneCountry;
}