export function fetchCountries(name) {
    return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error fetching countries.');
      });
  }
  