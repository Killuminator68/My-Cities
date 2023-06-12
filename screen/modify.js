import React from 'react';
import WhiteButton from '../components/white_button';
import {StyleSheet,Button,View,SafeAreaView,Text,Alert,TextInput, TouchableOpacity,Image} from 'react-native';
import {connect} from "react-redux";
import * as SQLite from 'expo-sqlite';

class Modify extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:"" ,
            fname:"",
            email: "",
            pass:"",
            tel:"",
            civ:""
          }
    }

   

    render(){
        const {crnt_usr} = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Homepage')} style={styles.returnLink}>
                    <Text style={styles.returnText}>&larr; Accueil</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Nom</Text>
                <TextInput style={styles.input} value={this.state.name} onChangeText={text=> this.setState({name:text})}  placeholder="Nom" />

                <Text style={styles.title}>Prénom</Text>
                <TextInput style={styles.input} value={this.state.fname} onChangeText={text=> this.setState({fname:text})}  placeholder="Prénom" />

                <Text style={styles.title}>Email</Text>
                <TextInput style={styles.input} value={this.state.email} onChangeText={text=> this.setState({email:text})}  placeholder="Email" />

                <Text style={styles.title}>Mot de passe</Text>
                <TextInput style={styles.input} value={this.state.pass} onChangeText={text=> this.setState({pass:text})}  placeholder="Password" secureTextEntry />

                <Text style={styles.title}>Téléphone</Text>
                <TextInput style={styles.input} value={this.state.tel} onChangeText={text=> this.setState({tel:text})}  placeholder="Téléphone" />

                <Text style={styles.title}>Civilité</Text>
                <TextInput style={styles.input} value={this.state.civ} onChangeText={text=> this.setState({civ:text})}  placeholder="Civilité" />

                <WhiteButton style={{height: 20}} val = "Valider"  onPress={() => this.valid()}></WhiteButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#545454',
      alignItems: 'center',
      justifyContent: 'center',
    },
    returnLink: {
        position: 'absolute',
        top: 30,
        left: 10,
    },
    returnText: {
        color: 'white',
        fontSize: 12,
        fontWeight:'bold',
    },
    title: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 20,
    },
    input: {
      height: 40,
      width: 220,
      borderWidth: 1,
      padding: 10,
      backgroundColor:'white',
      margin: 10,
    }
   
});

const mapStateToProps = (state)=>{
    return state;}
export default connect(mapStateToProps)(Modify);
