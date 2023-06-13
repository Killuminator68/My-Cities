import React from 'react';
import WhiteButton from '../components/white_button';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import logo from '../assets/logo3.png';

class Validation extends React.Component {
  constructor(props) {
    super(props);
  }

  deco() {
    const { navigate } = this.props.navigation;
    const action2 = { type: 'crnt_user', value: null };
    this.props.dispatch(action2);
    navigate('Homepage');
  }

  modif() {
    const { navigate } = this.props.navigation;
    navigate('modify');
  }

 
   render() {
    const { crnt_usr, crnt_role, crnt_id, navigate } = this.props;

    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Vous êtes connecté</Text>
        <Text style={styles.subtitle}>
          Bienvenue {crnt_usr} {crnt_role} {crnt_id} sur notre application
        </Text>
        <TouchableOpacity style={styles.button} onPress={this.modif}>
          <Text style={styles.buttonText}>Modification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.deco}>
          <Text style={styles.buttonText}>Déconnexion</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigate('cities')}>
            <Text style={styles.secondaryButtonText}>City</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigate('addbuilding')}>
            <Text style={styles.secondaryButtonText}>Add Building</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 20,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  secondaryButton: {
    backgroundColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    marginLeft: 5,
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Validation);