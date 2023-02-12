import {StyleSheet} from 'react-native';

import { width, height } from './utils';


const styles = StyleSheet.create({
    containerTextInput: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#FFF",
        alignContent: "center",
        alignItems: "center",
        borderRadius:15
    },

    containerView: {
        width: width,
        height: height,
        alignItems: "center"
    },

    containerCenter: {
        backgroundColor: "#87CEEB",
        alignItems: "center",
        // alignContent: "center",
        padding: 10,
        borderRadius: 10,
        width: 150,
        opacity: 0.8

    },

    containerSearch: {
        position: "absolute",
        alignSelf: "center",
        marginTop: 50,
        backgroundColor: "#FFF",
        width: width - 21 ,
        borderBottomLeftRadius: 30,
        borderBottomEndRadius: 30,
        height: height /2
    },

    viewTemp: {
        alignItems: "center",
        flexDirection: "row",
        marginTop: 100
    },
    viewFlexRow: {
        flexDirection: "row",
        marginTop: 60
    },


    textTemp: {
        color: "black",
        fontSize: 20,
        fontStyle: "italic",
        fontWeight: "900"
    },
    textName: {
        fontFamily: "Roboto",
        fontSize: 30,
        color: "#00008B"
    },

    textContent: {
        color: "black",
        textAlign: "center",
        fontSize: 20
    },

    textItemSearch: {
        fontSize: 25,
        color: "#000",
        marginTop: 5,
        fontWeight: "500",
        marginLeft: 20
    },

    imgItem: {
        width: 50,
        height: 50
    },


});


export default styles;

