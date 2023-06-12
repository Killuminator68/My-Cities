import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/logo3.png';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      pass: '',
    };
  }

  checkpassword() {
    const formdata = new FormData();
    formdata.append('email', this.state.email);
    formdata.append('pass', this.state.pass);
  }

  connexion() {
    const { navigate } = this.props.navigation;

    if (this.state.email === '' || this.state.pass === '') {
      Alert.alert('Veuillez entrer des informations valides.');
      return false;
    }

    const formdata = new FormData();
    formdata.append('email', this.state.email);
    formdata.append('pass', this.state.pass);

    fetch('http://jdevalik.fr/api/mycities/checkpass.php', {
      method: 'POST',
      body: formdata,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json !== false) {
          const action2 = { type: 'crnt_role', value: json[0].user_status };
          this.props.dispatch(action2);
          const action1 = { type: 'crnt_user', value: this.state.email };
          this.props.dispatch(action1);
          const action3 = { type: 'crnt_id', value: json[0].user_id };
          this.props.dispatch(action3);

          this.getfavs(json[0].user_id);

          navigate('valid');
        } else {
          return false;
        }
      });
  }

  getfavs(cid) {
    const formdata = new FormData();
    console.log('dans le getfav', cid);
    formdata.append('id', cid);

    fetch('http://jdevalik.fr/api/mycities/getfavs.php', {
      method: 'POST',
      body: formdata,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json !== false) {
          let arr = [];
          for (let i = 0; i < json.length; i++) {
            arr.push(json[i].fav_build_id);
          }
          const action5 = { type: 'add_fav', value: arr };
          this.props.dispatch(action5);
        } else {
          return false;
        }
      });
  }

  test() {
    console.log(this.checkpassword());
  }

render() {
  const { navigate } = this.props.navigation;
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={{ color: 'white', fontSize: 22, textAlign: 'center' }}>Connexion</Text>
      <View style={{ height: 5 }} />
      <TextInput
        style={styles.input}
        value={this.state.email}
        onChangeText={(text) => this.setState({ email: text })}
        placeholder="Email"
        keyboardType="default"
      />
      <View style={{ height: 5 }} />
      <TextInput
        style={styles.input}
        value={this.state.pass}
        onChangeText={(text) => this.setState({ pass: text })}
        placeholder="Mot de passe"
        keyboardType="default"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigate('inscription')}>
        <Text style={styles.buttonText}>Inscription</Text>
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
left: 55,
width: 250,
height: 250,
},
});

const mapStateToProps = (state) => {
return state;
};

export default connect(mapStateToProps)(Login);
