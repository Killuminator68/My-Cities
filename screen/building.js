import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView, Image } from 'react-native';
import { List } from 'react-native-paper'


export default class BuildForm extends React.Component
{
    constructor(props) 
    {
        super(props);
        this.state = 
        {
            latitude: 0,
            longitude: 0,
            building_name: "test",
            building_year: "1234",
            building_description: "desc",
            building_town:"Par",
            building_address:"1, rue du dev",
            building_architecte: "Bob",
            type:[],
            expanded:true,
            type_id: 1,
        };
    }

    componentDidMount()
    {
        this.setState({latitude: this.props.route.params.latitude})
        this.setState({longitude: this.props.route.params.longitude})

        
        fetch('http://jdevalik.fr/api/mycities/gettypes.php',
        {
            method:"POST",
            header:
            {
                "Content-Type":"multipart/form-data"
            },
        })
        .then((res) => res.json())
        .then((json) => 
        {
            if(json != false)
            {
                const arr = []
                for(let i=0; i<json.length; i++)
                {
                    arr.push({id:json[i].type_id, lib:json[i].type_lib})
                }
                this.setState({type: arr})
            }
        })
    }

    handlePress = () =>
    {
        this.setState({expanded: !this.state.expanded})
    }

    addBuild()
    {
       
        const crnt_role = "a"
        const crnt_id = 1
        const formdata = new FormData()
        formdata.append("user_id", crnt_id)
        formdata.append("name", this.state.building_name)
        formdata.append("descr", this.state.building_description)
        formdata.append("adress", this.state.building_address)
        formdata.append("year", this.state.building_year)
        formdata.append("city", this.state.building_town)
        formdata.append("arch", this.state.building_architecte)
        formdata.append("lat", this.state.building_latitude)
        formdata.append("long", this.state.building_longitude)
        formdata.append("admin", crnt_role)

        fetch('http://jdevalik.fr/api/mycities/addbuilding.php',
        {
            method:"POST",
            body:formdata,
            header:
            {
                "Content-Type":"multipart/form-data"
            },
        })
        .then((res) => {res.json(); })
        .then((json) => 
        {
            if(json != false)
            {
                Alert.alert('Succès', "Ajout des détails du bâtiment réussi !",
                [
                    {text: 'OK'}
                ]
                )
                this.props.navigation.navigate("AddBuild")
            }
            else
            {
                Alert.alert('Erreur', "Impossible d'ajouter les détails !",
                [
                    {text: 'OK'}
                ]
                )
            }
        })
        .catch((error) => 
        {
            
        })
    }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.returnLink} onPress={() => this.props.navigation.navigate('addbuilding')}>
            <Text style={styles.returnText}>Retour</Text>
        </TouchableOpacity>
        <View style={styles.formContainer}>
          <TextInput 
            style={styles.input}
            placeholder="le nom"
            placeholderTextColor="#fff"
            onChangeText={inputText => this.setState({building_name: inputText})}
          />

          <TextInput 
            style={styles.input}
            placeholder="l'année"
            placeholderTextColor="#fff"
            onChangeText={inputText => this.setState({building_year: inputText})}
          />

          <TextInput 
            style={styles.input}
            placeholder="la description"
            placeholderTextColor="#fff"
            onChangeText={inputText => this.setState({building_description: inputText})}
          />

          <TextInput 
            style={styles.input}
            placeholder="la ville"
            placeholderTextColor="#fff"
            onChangeText={inputText => this.setState({building_town: inputText})}
          />

          <List.Section title="">
            <List.Accordion
                    title="Les différents bâtiments"
                    left={props => <List.Icon {...props} icon="store" />}
                    expanded={this.state.expanded}
                    onPress={this.handlePress}>
                    {
                        this.state.type.map((item, i) => (
                            <List.Item
                                key={i}
                                title={item.lib}
                                onPress={()=>{this.setState({expanded:false}); this.setState({type_id:this.state.type[i].id});}}
                            />
                        ))
                    }
            </List.Accordion>
          </List.Section>
            <TouchableOpacity style={styles.button} onPress={() => this.addBuild()}>
            <Text style={styles.buttonText}>Ajouter le bâtiment</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 50,
  },
  formContainer: {
    width: '80%',
    marginTop: 30,
  },
  input: {
    backgroundColor: '#777',
    color: '#fff',
    padding: 0,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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
});
