import './styles.css';
import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';
import '../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import fetchCountries from './js/fetchCountries.js';
import countryTemplate from './template.hbs';

const BASE_URL = 'https://restcountries.eu/rest/v2/name/';

const refs = {
  input: document.getElementById('text-input'),
  countryList: document.getElementById('country-list'),
  countryWrapper: document.getElementById('country-box'),
};

refs.input.addEventListener(
  'input',
  _.debounce(handleInputFetchCountries, 1000),
);

function handleInputFetchCountries() {
  fetchCountries(BASE_URL, `${refs.input.value}`, onDataReady);
}

function onDataReady(data) {
  if (data.length >= 10) {
    fnToManyMatches();
  } else if (data.length > 1) {
    showCountryList(data);
  } else {
    showOneCountry(data[0]);
  }
}

function fnToManyMatches() {
  clearOutput();
  PNotify.error({
    title: 'Error!',
    text: 'To many matches found. Please enter a more specific query!',
  }); 
}

function showCountryList(data) {
  clearOutput();
  const listMarkup = data
    .map(item => `<li class="country-list__item">${item.name}</li>`)
    .join('');

  refs.countryList.insertAdjacentHTML('beforeend', listMarkup);
}

function showOneCountry(dataObj) {
  clearOutput();
  createMarkup(dataObj);
}

function createMarkup(obj) {
  const markup = countryTemplate(obj);
  refs.countryWrapper.insertAdjacentHTML('beforeend', markup);
}

function clearOutput() {
  refs.countryWrapper.innerHTML = '';
  refs.countryList.innerHTML = '';
}
