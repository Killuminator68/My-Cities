import React from 'react';
import {StyleSheet,Button,View, SafeAreaView,TouchableOpacity,Text,Image,Alert,useEffect,setInterval,TextInput} from 'react-native';
import {connect} from "react-redux";
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/logo2.png';
import { Card } from 'react-native-elements';


class Cities extends React.Component{
    constructor(props){
        super(props);
        this.state={
            city:"",
            cities:[],
            selectedCity: null,
        }      
    }

    valid(){
        const formdata = new FormData;
        formdata.append("name",this.state.city);
        fetch('http://jdevalik.fr/api/mycities/citybyname.php', {
            method: 'POST', 
            body: formdata, 
            headers: {
                "Content-Type": "multipart/form-data"
            },
        }).then((response) => response.json())
            .then((json) => {
              if(json != false){
                let arr = [];
                for(let i=0;i<json.length;i++){
                    arr.push([json[i].cit_name,json[i].cit_id]);
                }
                console.log(arr);
                this.setState({cities:arr, selectedCity: this.state.city});
              }else{
                console.log('salut');
                let emptyarr = new Array();
                this.setState({cities:emptyarr, selectedCity: null})
              }
        })
    }

   render(){
    const {navigate} = this.props.navigation;
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigate('Homepage')} style={styles.returnLink}>
                <Text style={styles.returnText}>&larr; Accueil</Text>
            </TouchableOpacity>
            <Image source={logo} style={styles.logo} />
            <View style={styles.searchSection}>
                <TextInput  
                    style={styles.input}
                    value={this.state.city} 
                    onChangeText={text=> this.setState({city:text})}  
                    placeholder="Tapez une ville" 
                    keyboardType="default"
                />
                <TouchableOpacity style={styles.buttonValidate} onPress={() => this.valid()}>
                    <Text style={styles.buttonText}>Valider</Text>
                </TouchableOpacity>
            </View>

            
            {this.state.selectedCity && 
                <Text style={styles.instructions}>Cliquez pour avoir les informations</Text>}
            
            {this.state.cities.map((city, City) => (
            <Card key={City}>
                <Card.Title>{city[0]}</Card.Title>
                <Card.Divider/>
                <TouchableOpacity style={styles.button} onPress={() => navigate("addbuilding",{id:city[1]})}>
                    <Text style={styles.buttonText}>Visiter</Text>
                </TouchableOpacity>
            </Card>
        ))}
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
    input: {
        height: 40,
        width: 220,
        borderWidth: 1,
        padding: 10,
        margin: 10,
        backgroundColor: 'white',
    },
    searchSection: {
        marginTop: 50, 
    },
    resultText: {
        color: 'turquoise', 
        fontSize: 25, 
        textAlign: 'center' 
    },
    selectedCity: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    instructions: {
        color: 'turquoise',
        fontSize: 13,
        marginTop: 50,
        marginBottom: 0,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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
    logo: {
        position: 'absolute',
        top: 0,
        left: 25,
        width: 300,
        height: 300,
    },
    buttonValidate: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: 100,
        alignSelf: 'center', 
    },
    button: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: 100,
        
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },  
})

const mapStateToProps = (state)=>{
    return state;
}
export default connect(mapStateToProps)(Cities);

