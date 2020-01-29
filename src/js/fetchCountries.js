export default function fetchCountries(baseUrl, searchQuery, onData) {
  return fetch(`
  https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      onData(data);
    })
    .catch(error => {
      console.error(error);
      throw new Error('fetch error!');
    });
}
