import React from 'react';
import {
  StyleSheet,
  Button,
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Image,
  Alert,
  useEffect,
  setInterval,
  TextInput
} from 'react-native';




export default class Pendingexe extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bd_id:"",
            bd_name:"",
            bd_description:"",
            bd_year:"",
            bd_address:""
        }      
}

componentDidMount(){
    const {navigate} = this.props.navigation;

    let buildid = {id:this.props.route.params.id};
    this.setState({bd_id:buildid.id});

    const formdata = new FormData;
    formdata.append("id", buildid.id);

    
    fetch('http://jdevalik.fr/api/mycities/buildingbyid.php', {
                method: 'POST', 
                body: formdata, 
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            }).then((response) => response.json())
                .then((json) => {
                    if(json != false){
                        this.setState({bd_name: json[0].build_name})
                        this.setState({bd_description: json[0].build_desc})
                        this.setState({bd_year: json[0].build_year})
                        this.setState({bd_address: json[0].build_addresse})
                    }else{
                        navigate('Homepage');
                    }
                })
                .catch((error) => {
                        console.error(error);
                    }
                );
}

pendexe(boolt){
    console.log(this.state.bd_id);
    const {navigate} = this.props.navigation;
    const formdata = new FormData;
    formdata.append("valid",boolt);
    formdata.append("id",this.state.bd_id);
    fetch('http://jdevalik.fr/api/mycities/pendingexe.php', {
        method: 'POST', 
        body: formdata, 
        headers: {
            "Content-Type": "multipart/form-data"
        },})
    navigate("pending");
    }

render(){
    const {navigate} = this.props.navigation;

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigate('admin')} style={styles.returnLink}>
                <Text style={styles.returnText}>&larr; Retour </Text>
            </TouchableOpacity>

            <Text style={styles.titleText}>{this.state.bd_name}</Text>
            <Text style={styles.normalText}>{this.state.bd_description}</Text>
            <Text style={styles.normalText}>{this.state.bd_year}</Text>
            <Text style={styles.normalText}>{this.state.bd_address}</Text>

            <TouchableOpacity style={styles.button} onPress={() => this.pendexe(1)}>
                <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity> 

            <TouchableOpacity style={styles.button} onPress={() => this.pendexe(0)}>
                <Text style={styles.buttonText}>Supprimer</Text>
            </TouchableOpacity>
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
      padding: 20,
    },
    titleText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      
    },
    normalText: {
      color: 'white',
      fontSize: 16,
      marginBottom: 10,
    },
    button: {
      backgroundColor: 'black',
      padding: 10,
      borderRadius: 5,
      width: '50%',
      alignItems: 'center',
      margin: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 15,
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
