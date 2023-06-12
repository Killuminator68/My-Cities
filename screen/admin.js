import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {StyleSheet,Button,View,SafeAreaView,Text,Image,Alert,useEffect,setInterval,TouchableOpacity} from 'react-native';
import WhiteButton from '../components/white_button';
import Inscription from './inscription';
import * as SQLite from 'expo-sqlite';
import {connect} from "react-redux";
import logo from '../assets/logo2.png';



class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }      
}




render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={styles.container}>
            <TouchableOpacity onPress={() => navigate('login')} style={styles.returnLink}>
            <Text style={styles.returnText}>&larr; Accueil</Text>
            </TouchableOpacity>
            <Image source={logo} style={styles.logo} />
            <TouchableOpacity style={styles.button} onPress={() => navigate("promote")}>
            <Text style={styles.buttonText}>Promouvoir un utilisateur</Text>
            </TouchableOpacity>
            <View style={{height: 20}}/>
            <TouchableOpacity style={styles.button} onPress={() => navigate("pending")}>
            <Text style={styles.buttonText}>Valider bâtiments en attentes</Text>
            </TouchableOpacity>
            <View style={{height: 20}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#545454',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: 'black',
        borderRadius: 20,
        height: 35,
        width: 250,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    logo: {
        position: 'absolute',
        top: 0,
        left: 35,
        width: 300,
        height: 300,
     },
     returnLink: {
        position: 'absolute',
        top: 30,
        left: 10,
        zIndex: 1,
    },
    returnText: {
        color: 'white',
        fontSize: 12,
        fontWeight:'bold',
    },
});




const mapStateToProps = (state)=>{
    return state;}
export default connect(mapStateToProps)(Admin);