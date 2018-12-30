
    //  api request
   let stats;
   const CountryStats = async (e) => {
  
    const api_call = await fetch(`https://restcountries.eu/rest/v2/`);
    const data = await api_call.json();
    const country = data[0]; }
      
