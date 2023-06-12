import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
} from 'react-native';
import { connect } from 'react-redux';
import logo from '../assets/logo.png';

class Cities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cities: [],
    };
  }

  valid() {
    const formdata = new FormData();
    formdata.append('name', this.state.city);
    fetch('http://jdevalik.fr/api/mycities/citybyname.php', {
      method: 'POST',
      body: formdata,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json != false) {
          let arr = [];
          for (let i = 0; i < json.length; i++) {
            arr.push([json[i].cit_name, json[i].cit_id]);
          }
          this.setState({ cities: arr });
        } else {
          let emptyarr = [];
          this.setState({ cities: emptyarr });
        }
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Rechercher une ville</Text>
        <TextInput
          value={this.state.city}
          onChangeText={(text) => this.setState({ city: text })}
          placeholder="Tapez une ville"
          style={styles.input}
          keyboardType="default"
        />
        <Button
          color="black"
          title="Valider"
          onPress={() => this.valid()}
        />

        {this.state.cities.map((city, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cityContainer}
            onPress={() => navigate('buildings', { id: city[1] })}
          >
            <Text style={styles.cityText}>{city[0]}</Text>
          </TouchableOpacity>
        ))}
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  cityContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  cityText: {
    fontSize: 16,
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

export default connect(mapStateToProps)(Cities);
