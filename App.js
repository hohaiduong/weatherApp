/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Text
} from 'react-native';

import ItemLoad from './components/Item';
import { width, height } from './components/utils';
const img = {uri: "https://hinhanhdephd.com/wp-content/uploads/2017/06/top-100-hinh-nen-thien-nhien-phong-canh-dep-3.jpg"};


const App = () => {

  return (
    <SafeAreaView>
     
      <ImageBackground source={img} resizeMode="cover" style={styles.background}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>THỜI TIẾT HÔM NAY</Text>
      </View>
      <ItemLoad/>
      </ImageBackground>
      
      
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    width: width,
    height: height
  },
  containerTitle: {
    backgroundColor: "#FF0000",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    borderRadius: 50,
    height: 60
  },

  title: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold"
  }
}
)
export default App;


