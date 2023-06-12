import React from 'react';
import {StyleSheet,Button,View,SafeAreaView,Text,Alert,TextInput,TouchableOpacity,Image} from 'react-native';
import { connect } from "react-redux";
import logo from '../assets/logo2.png';

class Inscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      lname: "",
      fname: "",
      tel: "",
      civ: ""
    }
  }

  testinputs() {
    const { navigate } = this.props.navigation;
    const formdata = new FormData();
    if (this.state.email === "" || this.state.pass === "") {
      Alert.alert("Veuillez remplir tous les champs.", "", [{ text: "ok", onPress: () => console.log("test") }], { cancelable: false });
    } else {
      formdata.append("name", this.state.lname);
      formdata.append("fname", this.state.fname);
      formdata.append("mail", this.state.email);
      formdata.append("pass", this.state.pass);
      formdata.append("tel", this.state.tel);
      formdata.append("civ", this.state.civ);

      fetch('http://jdevalik.fr/api/mycities/usersinsert.php', {
        method: 'POST',
        body: formdata,
        headers: {
          "Content-Type": "multipart/form-data"
        },
      }).then((response) => response.json())
        .then((json) => {
          if (json == false) {
            Alert.alert(
              'Erreur',
              'Cet Email n\'est pas disponible.',
              [
                { text: 'OK' },
              ],
            );
          } else {
            navigate('Homepage');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
       <Image source={logo} style={styles.logo} />
       <Text style={{ color: 'white', fontSize: 22, textAlign: 'center' }}>Connexion</Text>
        <TouchableOpacity onPress={() => navigate('Homepage')} style={styles.returnLink}>
        <Text style={styles.returnText}>&larr; Accueil</Text>
        </TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 22, textAlign: 'center' }}></Text>
        <View style={{ height: 5 }} />
        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={text => this.setState({ email: text })}
          placeholder="E-mail"
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
        <TextInput
          style={styles.input}
          value={this.state.lname}
          onChangeText={text => this.setState({ lname: text })}
          placeholder="Nom"
          keyboardType="default"
        />
        <View style={{ height: 5 }} />
        <TextInput
          style={styles.input}
          value={this.state.fname}
          onChangeText={text => this.setState({ fname: text })}
          placeholder="Prénom"
          keyboardType="default"
        />
        <View style={{ height: 5 }} />
        <TextInput
          style={styles.input}
          value={this.state.tel}
          onChangeText={text => this.setState({ tel: text })}
          placeholder="Téléphone"
          keyboardType="default"
        />
        <View style={{ height: 5 }} />
        <TextInput
          style={styles.input}
          value={this.state.civ}
          onChangeText={text => this.setState({ civ: text })}
          placeholder="Civilité"
          keyboardType="default"
          />
          <View style={{ height: 5 }} />
          <Button
          style={{ margin: 10 }}
          color='black'
          title="Valider"
          onPress={() => this.testinputs()}
          />
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
    margintop: 0,
  },
  returnLink: {
    position: 'absolute',
    top: 50, 
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
    margintop: -50,
    backgroundColor: 'white',
  },
  logo: {
    position: 'absolute',
    top: -40,
    left: 80,
    width: 200,
    height: 200,
  },  
});

const mapStateToProps = (state) => {
return state;
}

export default connect(mapStateToProps)(Inscription);
