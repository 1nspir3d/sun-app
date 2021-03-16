import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {useEffect} from 'react'
import {connect, useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {setPosition, setSun, setCity, setUndef, setInput} from '../actions'

function Main() {
    const position = useSelector(state => state.positionReducer)
    const sun = useSelector(state => state.sunReducer)
    const city = useSelector(state => state.cityReducer)
    const input = useSelector(state => state.inputReducer)
    const dispatch = useDispatch();

    function fail(error) {
        alert(`Currently we can't get your location because: "${error.message}"`)
    }

    function success(response) {
        dispatch(setPosition(response.coords));
    }

    function findCity(e) {
        e.preventDefault()
        dispatch(setCity(input))
        axios.get('https://api.openweathermap.org/geo/1.0/direct', {
            params: {
                q: input, 
                limit: 1,
                appid: 'a913b85241698a00b1014abe62a5ca0e'
            }
        })
        .then(response => {
            console.log(response);
            if(response.data[0]) {
                dispatch(setPosition(response.data[0]))
            } else {
                dispatch(setUndef())
            }
        }) 
    }

    useEffect(() => {
        const geo = navigator.geolocation;
        
        if(!geo) {
            fail()
        } else {
            geo.getCurrentPosition(success, fail)
        }
    // eslint-disable-next-line
    },[])

    useEffect(() => {
        if(position.lat && position.lat !== 'Not Found') {
            axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    lat: position.lat,
                    lon: position.lon,
                    appid: 'a913b85241698a00b1014abe62a5ca0e'
                }
            })
            .then((response) => {
                const sunriseTime = new Date(response.data.sys.sunrise * 1000)
                const sunsetTime = new Date(response.data.sys.sunset * 1000)
                const sun = {
                    sunrise: `${sunriseTime.getHours()}:${sunriseTime.getMinutes()}`,
                    sunset: `${sunsetTime.getHours()}:${sunsetTime.getMinutes()}`
                }
                dispatch(setSun(sun))
            })


            axios.get('https://api.openweathermap.org/geo/1.0/reverse', {
                params: {
                    lat: position.lat,
                    lon: position.lon,
                    limit: 1,
                    appid: 'a913b85241698a00b1014abe62a5ca0e'
                }
            })
            .then((response) => {
                dispatch(setCity(response.data[0].name))
            })
        }
    // eslint-disable-next-line
    },[position])

    
    return (
      <View style={{padding: 40}}>
        <View style={styles.form}>
          <TextInput 
            placeholder="Example text" 
            style={styles.cityInput}
            onChangeText={(e) => {dispatch(setInput(e))}}
            onSubmitEditing={(e) => {dispatch(setInput(e.nativeEvent.text)); findCity(e)}}
          />
          <Button title="Press ME!" onPress={findCity}/>
        </View>
        <View style={styles.info}>
            <Text style={styles.infoText}>City: {city}</Text>
            <Text style={styles.infoText}>Longitude :{position.lon}</Text>
            <Text style={styles.infoText}>Latitude: {position.lat}</Text>
            <Text style={styles.infoText}>Sunrise time: {sun.sunrise}</Text>
            <Text style={styles.infoText}>Sunset time: {sun.sunset}</Text>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    form: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      maxWidth: '100%'
    },
    cityInput: {
      borderColor: 'black',
      borderWidth: 2,
      borderRadius: 5,
      padding: 5,
      width: '80%'
    },
    info: {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 'max-content'
    },
    infoText: {
        fontSize: 20,
        fontWeight: 700   
    }
  });
  
  export default connect()(Main)