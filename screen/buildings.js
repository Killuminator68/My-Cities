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
import { connect } from 'react-redux';
import UserReducer from '../store/reducer/UserReducer';

import logo from '../assets/logo3.png';

class Buildings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buildings: [],
      type: []
    };
  }

  componentDidMount() {
    let buildid = { id: this.props.route.params.id };
    let formdata = new FormData();
    formdata.append('id', buildid.id);
    fetch('http://jdevalik.fr/api/mycities/buildingsbycity.php', {
      method: 'POST',
      body: formdata,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => response.json())
      .then((json) => {
        if (json !== false) {
          let arr = [];
          for (let i = 0; i < json.length; i++) {
            arr.push([json[i].build_name, json[i].build_id]);
          }
          this.setState({ buildings: arr });
        } else {
          console.log('salut');
          let emptyarr = new Array();
          this.setState({ buildings: emptyarr });
        }
      });
  }

  render() {
    const { favs } = this.props;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        {this.state.buildings.map((building, Building) => (
          <TouchableOpacity
            key={Building}
            style={styles.buildingContainer}
            onPress={() => navigate('building', { id: building[1] })}
          >
            <Text style={styles.buildingText}>{building[0]}</Text>
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
    justifyContent: 'center'
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20
  },
  buildingContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  buildingText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  },
  
});

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Buildings);
