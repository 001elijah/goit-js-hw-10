const BASE_URL = 'https://restcountries.com/v3.1';
const serchParams = new URLSearchParams({
    fields: "name,capital,population,flags,languages"
});
export function fetchCountries(name) {
    return fetch(`${BASE_URL}/name/${name}?${serchParams}`)
    .then(response => {
        return response.json();
    });
};