import React, { Component } from 'react';
import {StyleSheet, Text, View, Animated } from 'react-native';
import Weather from './components/Weathher';
import { API_KEY } from './utils/WeatherAPIKey'

class App extends Component {
  state = {
    isLoading: false,
    temperature: 0,
    weatherCondition: null,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Getting Weather Condtions'
        });
      }
    );
  }

  fetchWeather(lat = 25, lon = 25) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=${part}&appid=${API_KEY}`
    )
      .then(res => res.json())
      .then(json => {
        // console.log(json);
        this.setState({
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          isLoading: false
        });
      });
  }



  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
      {isLoading ? <Text>Fetching The Weather</Text> : <Weather weather={weatherCondition} temperature={temperature} />}
    </View>
    );
  }
} 



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;