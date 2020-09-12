import React from 'react';

import { Chart, CountryPicker, Cards, StateTable } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import coronaImage from './images/image.png';

class App extends React.Component {

    state = {
        data: {},
        country: '',
    }

    async componentDidMount() {
        const fetchedData = await fetchData();

        this.setState({ data: fetchedData })
    //    console.log(data);
    }

    handleCountryChange = async (country) => {

        const fetchedData = await fetchData(country);
        //console.log(fetchedData);
        //console.log(country);
        //fetch data and set state
        this.setState({ data: fetchedData, country: country });
    }

    render() {
        const { data, country } = this.state;

        return (
            <div className={styles.container}>
                <img classNames={styles.image} src={coronaImage} alt="COVID-19" />
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country} />
                {country ? <StateTable country={country} /> : null}
            </div>
            )
    }
}

export default App;
