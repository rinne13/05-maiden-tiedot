
const Countries = (country)
return (
    countries.map((country) => (
        <li key={country.cca3}>
          <div>
            <h2>{country.name.common}</h2>
            <img
              src={country.flags.svg}
              alt={`Flag of ${country.name.common}`}
              width="50"
            />
            <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'No information'}</p>
            <p><strong>Population:</strong> {country.population}</p>
            <p><strong>Region:</strong> {country.region}</p>
          </div>
        </li>
      ))
)

export default Countries;
