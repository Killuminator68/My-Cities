import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image, Button } from 'react-native';
import { connect } from 'react-redux';

import logo from '../assets/logo3.png';

class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cities: [],
    };
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
            this.setState({cities:arr});
          }else{
            let emptyarr = [];
            this.setState({cities:emptyarr})
          }
    })
}

render() {
  const { navigate } = this.props.navigation;
  const cities = this.state.cities || [];

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo3.png')} style={styles.logo} />
      <Text style={styles.title}>Entrer une ville</Text>
      <View style={styles.searchContainer}>
        <TextInput
          value={this.state.city}
          onChangeText={(text) => this.setState({ city: text })}
          placeholder="Tapez une ville"
          keyboardType="text"
          style={styles.input}
        />
        <Button color="black" title="Valider" onPress={() => this.valid()} />
      </View>

      {Array.isArray(cities) && cities.map((city, index) => {
        if (city && Array.isArray(city)) {
          const cityName = city[0] || '';
          const cityId = city[1] || '';
          return (
            <View key={index} style={styles.cityContainer}>
              <TouchableOpacity onPress={() => navigate("buildings", { id: cityId })}>
                <Text style={styles.cityText}>{cityName}</Text>
              </TouchableOpacity>
            </View>
          );
        }
        return null;
      })}
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#545454',
    alignItems: 'center',
    paddingTop: 100,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    marginBottom: 10,
    fontSize: 16,
    color: 'black',
  },
  button: {
    width: '50%',
    height: 40,
    backgroundColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cityContainer: {
    backgroundColor: 'black',
    borderRadius: 20,
    height: 35,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  cityText: {
        color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Cities);

