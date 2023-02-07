/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const App = () => {
  var [data, setData] = useState([]);
  useEffect(() => {
    return () => {
      logWeather();
    }
  }, [])
  const logWeather = () => {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-RapidAPI-Key': 'ca71c429a1msh48276e7f59caa6dp1279e5jsn6ce08ef10cf4',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
        "access-control-allow-credentials": "true",
        "access-control-allow-origin": "*",
        "cache-control": "public, max-age=180",
        "cdn-cache": "HIT",
        "cdn-cachedat": "02/07/2023 08:58:54",
        "cdn-edgestorageid": "1022",
        "cdn-proxyver": "1.03",
        "cdn-pullzone": "93447",
        "cdn-requestcountrycode": "SG",
        "cdn-requestid": "ee913a902642f9a2a32166d599f06038",
        "cdn-requestpullcode": "200",
        "cdn-requestpullsuccess": "True",
        "cdn-status": "200",
        "cdn-uid": "8fa3a04a-75d9-4707-8056-b7b33c8ac7fe",
        "content-type": "application/json",
        "date": "Tue, 07 Feb 2023 09:00:30 GMT",
        "server": "RapidAPI-1.2.8",
        "vary": "Accept-Encoding",
        "x-rapidapi-region": "AWS - ap-southeast-1",
        "x-rapidapi-version": "1.2.8",
        "x-ratelimit-requests-limit": "1000000",
        "x-ratelimit-requests-remaining": "999985",
        "x-ratelimit-requests-reset": "2418239"
      }
    };  

    fetch('https://weatherapi-com.p.rapidapi.com/current.json?q=Thua%20Thien%20Hue&days=3', options)
      .then(response => response.json())
      .then(response => {
        setData(response);
        console.log(data)
      }
      )
      .catch(err => console.error(err));
  };

  const Item = ({item}) => {
      var itemC = item.current.temp_c;

      return(
        <Text>{`${itemC}`}</Text>
      );
  };


  return (
    <FlatList
    data={data}
    renderItem={Item}
    keyExtractor={item => `key-${item.current.is_day}`}
    />
  )
}

export default App;


