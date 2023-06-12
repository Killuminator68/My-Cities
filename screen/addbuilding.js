import React from 'react';
import { SafeAreaView, StyleSheet, Text, Alert, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline, Callout } from 'react-native-maps';
import {connect} from "react-redux";

class BuildForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      errMessage: null,
      region: {
        latitude: 46.5984807,
        longitude: 2.4952946,
        latitudeDelta: 10.0,
        longitudeDelta: 10.0,
      },
      buildMarker: {
        latitude: 0,
        longitude: 0,
      },
    };
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  componentDidMount() {
    this.useEffect();
  }

  async useEffect() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      this.setState({ errMessage: 'Permission to access location was denied' });
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location: location });
    console.log(location);
  }

  onRegionChange = (reg) => {
    this.setState({
      region: reg,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={this.state.region}
          onRegionChange={this.onRegionChange}
          onPress={(e) => {
            this.setState({
              buildMarker: e.nativeEvent.coordinate,
            });
            console.log(this.state.buildMarker);
          }}
        >
          {this.state.buildMarker && (
            <Marker
              coordinate={this.state.buildMarker}
              title="Nouveau bâtiment"
              onCalloutPress={() => {
                Alert.alert(
                  'Ajout du bâtiment',
                  'Ajout avec ses coords => latitude : ' +
                    this.state.buildMarker.latitude +
                    ', longitude : ' +
                    this.state.buildMarker.longitude,
                  [
                    {
                      text: 'Annuler',
                      onPress: () => {
                        console.log('Bouton Annuler pressé');
                      },
                      style: 'cancel',
                    },
                    {
                      text: 'Ajouter ce bâtiment',
                      onPress: () => {
                        console.log('Navigate to BuildForm.js');
                        this.props.navigation.navigate('buildform', {
                          latitude: this.state.buildMarker.latitude,
                          longitude: this.state.buildMarker.longitude,
                        });
                      },
                    },
                  ]
                );
              }}
              pinColor="blue"
            >
              <Callout>
                <View>
                  <Text>Ajout du bâtiment</Text>
                </View>
              </Callout>
            </Marker>
          )}
        </MapView>
        <Text>Latitude : {this.state.region.latitude}</Text>
        <Text>Longitude : {this.state.region.longitude}</Text>
        <Text>Latitude Delta : {this.state.region.latitudeDelta}</Text>
        <Text>Longitude Delta: {this.state.region.longitudeDelta}</Text>
        <Text>BuildMarker Latitude : {this.state.buildMarker.latitude}</Text>
<Text>BuildMarker Longitude : {this.state.buildMarker.longitude}</Text>
</SafeAreaView>
);
}
}

const styles = StyleSheet.create({
container: {
flex: 1,
},
buttonContainer: {
flex: 1,
backgroundColor: 'transparent',
flexDirection: 'row',
margin: 20,
},
button: {
flex: 0.1,
alignSelf: 'flex-end',
alignItems: 'center',
},
buttonSnap: {
marginTop: 20,
flex: 0.3,
alignSelf: 'flex-start',
alignItems: 'center',
},
text: {
fontSize: 18,
color: 'white',
},
map: {
width: '100%',
height: '50%',
},
});

class AddBuilding extends React.Component {
constructor(props) {
super(props);
this.state = {
latitude: 0,
longitude: 0,
building_name: 'test',
building_year: 1234,
building_description: 'desc',
building_town: 1,
building_address: '1, rue du dev',
type: [],
expanded: true,
type_id: 1,
};
}

componentDidMount() {
this.setState({ latitude: this.props.route.params.latitude });
this.setState({ longitude: this.props.route.params.longitude });
fetch('http://jdevalik.fr/api/mycities/gettypes.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})
  .then((res) => res.json())
  .then((json) => {
    if (json != false) {
      const arr = [];
      for (let i = 0; i < json.length; i++) {
        arr.push({ id: json[i].type_id, lib: json[i].type_lib });
      }
      this.setState({ type: arr });
    }
  });
  }

handlePress = () => {
this.setState({ expanded: !this.state.expanded });
};

addBuild(cit_id) {
const { crnt_id } = this.props;
const { crnt_role } = this.props;
const formdata = new FormData();
formdata.append('name', this.state.building_name);
formdata.append('desc', this.state.building_description);
formdata.append('adress', this.state.building_address);
formdata.append('year', this.state.building_year);
formdata.append('city', cit_id);
formdata.append('lat', this.state.latitude);
formdata.append('long', this.state.longitude);
formdata.append('admin', crnt_role);
formdata.append('type', this.state.type_id);

fetch('http://jdevalik.fr/api/mycities/addbuilding.php', {
  method: 'POST',
  body: formdata,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})
  .then((response) => response.json())
  .then((json) => {
    if (json != false) {
      console.log('test123', json[0]);
      if (crnt_role != 'a') {
        this.addpending(json[0].id);
      }
      Alert.alert(
        'Succès',
        "Ajout des détails du bâtiment réussi !",
        [{ text: 'OK' }]
      );
      //this.props.navigation.navigate("AddBuild")
    } else {
      Alert.alert(
        'Erreur', "Impossible d'ajouter les détails !", [
{ text: 'OK' }
]);
}
})
.catch((error) => {
console.error(error);
});
}

checkcity() {
let formdata = new FormData();
formdata.append('city', this.state.building_town);
fetch('http://jdevalik.fr/api/mycities/checkcity.php', {
method: 'POST',
body: formdata,
headers: {
'Content-Type': 'multipart/form-data',
},
})
.then((response) => response.json())
.then((json) => {
if (json != false) {
this.addBuild(json[0].id);
}
});
}

addpending(bid) {
const { crnt_id } = this.props;
let formdata = new FormData();
formdata.append('user_id', crnt_id);
formdata.append('building_id', bid);
fetch('http://jdevalik.fr/api/mycities/addpenduser.php', {
method: 'POST',
body: formdata,
headers: {
'Content-Type': 'multipart/form-data',
},
});
}

render() {
return (
<View>
<Text>Latitude : {this.state.latitude}</Text>
<Text>Longitude : {this.state.longitude}</Text>
<TextInput
placeholder="Insérer le nom du bâtiment"
onChangeText={(inputText) =>
this.setState({ building_name: inputText })
}
/>
<TextInput
placeholder="Insérer l'année du bâtiment"
onChangeText={(inputText) =>
this.setState({ building_year: inputText })
}
/>
<TextInput
placeholder="Insérer la description du bâtiment"
onChangeText={(inputText) =>
this.setState({ building_description: inputText })
}
/>
<TextInput
placeholder="Insérer la ville du bâtiment"
onChangeText={(inputText) =>
this.setState({ building_town: inputText })
}
/>
<Text>
InputText(Nom:{this.state.building_name}, Année:
{this.state.building_year}, Description:
{this.state.building_description})
</Text>
<List.Section title="Détails du bâtiment">
<List.Accordion
title="Types"
left={(props) => <List.Icon {...props} icon="store" />}
expanded={this.state.expanded}
onPress={this.handlePress}
>
{this.state.type.map((item, i) => (
<List.Item
key={i}
title={item.lib}
onPress={() => {
this.setState({ expanded: false });
this.setState({ type_id: this.state.type[i].id });
}}
/>
))}
</List.Accordion>
</List.Section>
<Button
title="Ajouter le bâtiment"
onPress={() => this.checkcity()}
/>
<Text>Type id : {this.state.type_id}</Text>
</View>
);
}
}

const mapStateToProps = (state) => {
return state;
};

export default connect(mapStateToProps)(BuildForm);

