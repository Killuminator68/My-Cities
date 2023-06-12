import React from 'react';
import { SafeAreaView, StyleSheet, Text, Alert, View, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline, Callout } from 'react-native-maps';


export default class AddBuilding extends React.Component 
{
    constructor(props) 
    {
        super(props);
        this.state = 
        {
            location: null,
            errMessage: null,
            region: {
                latitude: 46.5984807,
                longitude: 2.4952946,
                latitudeDelta: 10.0,
                longitudeDelta: 10.0,
            },
            buildMarker : {
                latitude : 0,
                longitude : 0
            },
        };
        this.onRegionChange = this.onRegionChange.bind(this)
    }

    componentDidMount()
    {
        this.useEffect()
    }

    async useEffect()
    {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            this.setState({errMessage: 'Permission to access location was denied'});
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({location: location});
        
    }

    onRegionChange = (reg) => 
    {
        this.setState({
            region: reg           
        });
    }

    render() 
    {
        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('cities')} style={styles.returnLink}>
                    <Text style={styles.returnText}>&larr; Villes</Text>
                </TouchableOpacity>
                <MapView
                    style={styles.map}
                    initialRegion={this.state.region}
                    onRegionChange={this.onRegionChange}
                    onPress=
                    {
                        (e) => 
                        {
                            this.setState(
                            { 
                                buildMarker : e.nativeEvent.coordinate 
                            }); 
                            
                        }
                    }
                >
                    {
                        this.state.buildMarker &&
                         <Marker 
                            coordinate={this.state.buildMarker}
                            title="Nouveau bâtiment"
                            onCalloutPress=
                            {() =>
                                {
                                    Alert.alert('Ajout du bâtiment', ' ' , 
                                    [
                                        {
                                            text: 'Annuler',
                                            onPress: () => 
                                            {
                                                
                                            },
                                            style: 'cancel',
                                        },
                                        {
                                            text: 'Ajouter ce bâtiment', 
                                            onPress: () => 
                                            {
                                                this.props.navigation.navigate('building', {latitude : this.state.buildMarker.latitude, longitude: this.state.buildMarker.longitude}); 
                                            }
                                        },
                                    ]);
                                }
                            }
                            pinColor='red'
                        >
                            <Callout>
                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutText}>Ajout de bâtiment</Text>
                                </View>
                            </Callout>
                                </Marker>
                    }
                </MapView>
                
                <Text style={styles.instruction}>Clique sur la carte pour choisir une ville, puis clique à nouveau sur ajout d'un bâtiment.</Text>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#545454'
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
        fontWeight: 'bold',
    },
    calloutContainer: {
        backgroundColor: '#545454',
    },
    calloutText: {
        color: 'white',
    },
    instruction: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
        position: 'absolute',
        bottom: 20,
    },
    map:
    {
        top: 50,
        width: '100%',
        height: '85%',
    },
    
});
