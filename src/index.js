import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const NOTIFICATION_TEXT = 'Too many matches found. Please enter a more specific name.';
const ERROR_TEXT = 'Oops, there is no country with that name.';

const inputCountry = document.querySelector('#search-box');

const countryList = document.querySelector('ul.country-list');
countryList.style.listStyleType = 'none';

const countryCard = document.querySelector('div.country-info');

inputCountry.addEventListener('input', debounce(getCountries, DEBOUNCE_DELAY));

function getCountries(evt) {
    if (evt.target.value == '') {
        countryList.innerHTML = '';
        countryCard.innerHTML = '';
        return;
    };
    fetchCountries(evt.target.value.trim())
    .then((countries) => renderCountryList(countries))
    .catch(() => {
        Notiflix.Notify.failure(ERROR_TEXT);
        countryCard.innerHTML = '';
        countryList.innerHTML = '';
    });
};

function renderCountryList(countries) {
    let isList = true;
    const markup = countries.map((country, id, arr) => {
        if (id === 0 && arr.length > 10) Notiflix.Notify.info(NOTIFICATION_TEXT);
        if (arr.length >= 2 && arr.length <= 10) {
            return `<li style="display: flex; gap: 10px; align-items: center;">
            <img src="${country.flags.svg}" width="45px" height="30px"/>
            <p>${country.name.official}</p>
        </li>`;
        };
        if (arr.length === 1) {
            isList = false;
            return `
            <div style="display: flex; gap: 10px; align-items: center">
            <img src="${country.flags.svg}" width="45px" height="30px"/>
            <h1>${country.name.official}</h1>
            </div>
            <p>Capital: ${country.capital}</p>
            <p>Population: ${country.population}</p>
            <p>Languages: ${Object.values(country.languages)}</p>
            `;
        };
    })
    .join("");
    if (isList === true) {
        countryCard.innerHTML = '';
        countryList.innerHTML = markup;
    } else {
        countryList.innerHTML = '';
        countryCard.innerHTML = markup;
    }
};