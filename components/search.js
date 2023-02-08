import React, { useState } from "react";
import { TextInput, View, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"

const SearchCityName = ({LoadWeather}) => {
    const [cityName, setCityName] = useState("");

    return (
        <View style={styles.containerTextInput}>
            <TextInput
            placeholder = "Search City"
            value = {cityName}
            onChangeText = {(text) => setCityName(text)}
            style={{fontSize: 20, marginLeft: 10}}
            />
            <Icon onPress={ () => LoadWeather(cityName) } name="search-outline" style={{fontSize: 30, marginRight: 10}} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    containerTextInput: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#FFF",
        alignContent: "center",
        alignItems: "center",
        borderRadius:15
    }
})

export default SearchCityName;