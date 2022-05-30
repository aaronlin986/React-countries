const Country = ({country}) => {
    return (
        <div>
          <p>Capital {country.capital[0]}</p>
          <p>Area {country.area}</p>
          <h2>Languages : </h2>
          <ul>
            {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
          </ul>
          <img src={country.flags.png}/>
        </div>
    );
}

export default Country;