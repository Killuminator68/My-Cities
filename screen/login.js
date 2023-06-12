import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity,Image , Alert} from 'react-native';
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/logo2.png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      pass: ""
    }
  }

  connexion() {
    const { navigate } = this.props.navigation;

    if (this.state.email === "" || this.state.pass === "") {
      Alert.alert("Veuillez entrer des informations valides.");
      return false;
    }

    const formdata = new FormData();
    formdata.append("email", this.state.email);
    formdata.append("pass", this.state.pass);

    fetch('http://jdevalik.fr/api/mycities/checkpass.php', {
      method: 'POST',
      body: formdata,
      headers: {
        "Content-Type": "multipart/form-data"
      },
    }).then((response) => response.json())
      .then((json) => {
        if (json !== false) {
          const action2 = { type: "crnt_role", value: json[0].user_status };
          this.props.dispatch(action2);
          const action1 = { type: "crnt_user", value: this.state.email };
          this.props.dispatch(action1);
          const action3 = { type: "crnt_id", value: json[0].user_id }
          this.props.dispatch(action3);
          navigate("valid");
        } else {
          return false;
        }
      })
  }

 render() {
  const { navigate } = this.props.navigation;
  return (
    <View style={styles.container}>
    <Image source={logo} style={styles.logo} />
      <TouchableOpacity onPress={() => navigate('Homepage')} style={styles.returnLink}>
        <Text style={styles.returnText}>&larr; Accueil</Text>
      </TouchableOpacity>
      <Text style={{ color: 'white', fontSize: 22, textAlign: 'center' }}>Connexion</Text>
      <View style={{ height: 5 }} />
      <TextInput
        style={styles.input}
        value={this.state.email}
        onChangeText={text => this.setState({ email: text })}
        placeholder="Email"
        keyboardType="default"
      />
      <View style={{ height: 5 }} />
      <TextInput
        style={styles.input}
        value={this.state.pass}
        onChangeText={text => this.setState({ pass: text })}  
        placeholder="Mot de passe"
        keyboardType="default"
      />
      <View style={{ height: 5 }} />
      <TouchableOpacity style={styles.button} onPress={() => this.connexion()}>
        <Text style={styles.buttonText}>Connexion</Text>
      </TouchableOpacity>
      <View style={{ height: 15 }} /> 
      <TouchableOpacity style={styles.button} onPress={() => navigate('inscription')}>
        <Text style={styles.buttonText}>inscription</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.adminButton} onPress={() => navigate('admin')}>
        <Text style={styles.adminButtonText}>Admin</Text>
      </TouchableOpacity>
    </View>
  );
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
fontWeight: 'bold',
},
input: {
height: 40,
width: 220,
borderWidth: 1,
padding: 10,
margin: 10,
backgroundColor: 'white',
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
logo: {
position: 'absolute',
top: -25,
left: 30,
width: 300,
height: 300,
},
adminButton: {
backgroundColor: 'red',
borderRadius: 20,
height: 35,
width: 150,
justifyContent: 'center',
alignItems: 'center',
position: 'absolute',
bottom: 10,
},
adminButtonText: {
color: 'white',
fontSize: 15,
fontWeight: 'bold',
},
});

const mapStateToProps = (state) => {
return state;
}

export default connect(mapStateToProps)(Login);

