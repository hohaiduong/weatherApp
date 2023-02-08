import React, { useState } from "react";
import { TextInput, View, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"
const SearchCityName = () => {
    const [cityName, setCityName] = useState("");

    return (
        <View style={styles.container}>
            <TextInput
            placeholder = "Search City"
            value = {cityName}
            onChangeText = {(text) => setCityName(text)}
            style={{fontSize: 20, marginLeft: 10}}
            />
            <Icon name="search-outline" style={{fontSize: 30, marginRight: 10}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#FFF",
        alignContent: "center",
        alignItems: "center",
        borderRadius:15
    }
})

export default SearchCityName;