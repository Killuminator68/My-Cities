import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert, TextInput, Image} from 'react-native';
import logo from '../assets/logo2.png';
import { Card } from 'react-native-elements';

export default class Promote extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:"",
            users:[]
        }      
    }

    getuser(){
        console.log("dedans");
        let formdata = new FormData();
        formdata.append("name",this.state.user);

        fetch('http://jdevalik.fr/api/mycities/getusertopromote.php', {
            method: 'POST',
            body: formdata,
            headers: {
                "Content-Type": "multipart/form-data"
            },
        }).then((response) => response.json())
            .then((json) => {
            if(json != false){
                console.log("notfalse",json);
                let arr = [];
                for(let i=0;i<json.length;i++){
                    arr.push([json[i].user_id,json[i].user_fname,json[i].user_name,json[i].user_mail]);
                }
                this.setState({users:arr});
                if(json.length==0){
                    this.setState({users:arr});
                }
            }else{
                console.log("false",json);
                let arr = [];
                this.setState({users:arr});
            }
        })
    }

    promote(id){
        let formdata = new FormData();
        formdata.append("id",id);
        fetch('http://jdevalik.fr/api/mycities/promoteuser.php', {
            method: 'POST',
            body: formdata,
            headers: {
                "Content-Type": "multipart/form-data"
            },
        })
    }

    validation(user_id){
        Alert.alert('', "Etes vous sur de vouloir ajouter cet personne en administrateur ?",
        [ { text: 'Oui', onPress:()=> {this.promote(user_id)} }, {text: 'Non'}]
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('admin')} style={styles.returnLink}>
                    <Text style={styles.returnText}>&larr; Admin</Text>
                </TouchableOpacity>
                <Image source={logo} style={styles.logo} />
                <View style={styles.searchSection}>
                    <TextInput  
                        style={styles.input}
                        value={this.state.user} 
                        onChangeText={text=> this.setState({user:text})}  
                        placeholder="Chercher un utilisateur par nom, prénom ou adresse mail" 
                        keyboardType="default"
                    />
                    <TouchableOpacity style={styles.button} onPress={() => this.getuser()}>
                        <Text style={styles.buttonText}>Recherche</Text>
                    </TouchableOpacity>
                </View>
                {this.state.users.map((users, Users) => (
                    <Card key={Users}>
                        <Card.Title>{users[1]} {users[2]}</Card.Title>
                        <Card.Divider/>
                        <Text style={styles.resultText}>Mail: {users[3]}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => this.validation(users[0])}>
                            <Text style={styles.buttonText}>Promouvoir</Text>
                        </TouchableOpacity>
                    </Card>
                ))}
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
    input: {
        height: 40,
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    button: {
        backgroundColor: 'black',
        borderRadius: 20,
        height: 35,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    resultText: {
        color: 'black', //changed color from white to black for visibility on the Card
        fontSize: 15,
        textAlign: 'center',
        marginVertical: 10,
    },
    searchSection: {
    marginTop: 50,
    alignItems: 'center', 
},
});
