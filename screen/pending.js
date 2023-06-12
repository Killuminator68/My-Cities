import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';

export default class Pending extends React.Component{
    constructor(props){
        super(props);
        this.state={
            buildings:[]
        }      
    }

    componentDidMount(){
        fetch('http://jdevalik.fr/api/mycities/getpending.php', {
            method: 'POST',  
            headers: {
                "Content-Type": "multipart/form-data"
            },
        }).then((response) => response.json())
            .then((json) => {
              if(json != false){
                let arr = [];
                for(let i=0;i<json.length;i++){
                    arr.push({id: json[i].build_id, name: json[i].build_name});
                }
                console.log(arr);
                this.setState({buildings:arr});
              }else{
                console.log('salut');
                let emptyarr = new Array();
                this.setState({buildings:emptyarr})
              }
        })
    }

    renderRow = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("pendingexe",{id:item.id})}>
                <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonDelete]}>
                <Text style={styles.buttonText}>Supprimer</Text>
            </TouchableOpacity>
        </View>
    );

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('admin')} style={styles.returnLink}>
                    <Text style={styles.returnText}>&larr; Admin</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Nouveaux bâtiments en attente de validation</Text>
                <FlatList 
                    data={this.state.buildings}
                    renderItem={this.renderRow}
                    keyExtractor={item => item.id}
                />
            </View>
        )
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
        zIndex: 1,
    },
    returnText: {
        color: 'white',
        fontSize: 12,
        fontWeight:'bold',
    },
    title: {
        fontSize: 15,
        color: 'white',
        marginTop: 100, // Increased top margin
        marginHorizontal: 20,
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
    },
    cell: {
        color: 'white',
        fontSize: 11,
    },
    button: {
        backgroundColor: 'black',
        borderRadius: 20,
        height: 35,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    buttonDelete: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
});
