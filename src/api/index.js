import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';
const dailyurl = 'https://covid19.mathdro.id/api/daily';
const countriesurl = 'https://covid19.mathdro.id/api/countries';

export const fetchData = async (country) => {
    let changeableUrl = url;

    if (country) {
        //changeableUrl = url+'/countries' + '/country=' + country;
        changeableUrl = `${url}/countries/${country}`;
    }
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);
       
        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(dailyurl);

        const modifiedData = data.map((dailtData) => ({
            confirmed: dailtData.confirmed.total,
            deaths: dailtData.deaths.total,
            date: dailtData.reportDate,
        }));

        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(countriesurl);

        return countries.map((country) => country.name);
    } catch (error) {
        console.log(error);
    }
}
// https://covid19.mathdro.id/api/countries/India/confirmed
export const fetchStates = async (country) => {
    try {
        const { data } = await axios.get(`${url}/countries/${country.country}/confirmed`);
        
        const modifiedData = data.map((stateData) => ({
            provinceState: stateData.provinceState,
            confirmed: stateData.confirmed,
            active: stateData.active,
            recovered: stateData.recovered,
            deaths: stateData.deaths,
        }));

        console.log(modifiedData);
        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}