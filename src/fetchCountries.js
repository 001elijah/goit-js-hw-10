const BASE_URL = 'https://restcountries.com/v3.1';
// const serchParams = new URLSearchParams({
//     name: "name.official",
//     capital: "capital",
//     population: "population",
//     flags: "flags.svg",
//     languages: "languages"
// });
// console.log(serchParams.toString());
export function fetchCountries(name) {
    return fetch(`${BASE_URL}/name/${name}`)
    .then(response => {
        return response.json();
    });
};