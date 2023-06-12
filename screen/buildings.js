import React from 'react';
import {StyleSheet,Button,View,TouchableOpacity,SafeAreaView,Text,Image,Alert,useEffect,setInterval,TextInput} from 'react-native';
import {connect} from "react-redux";
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/logo2.png';




 class Buildings extends React.Component{
    constructor(props){
        super(props);
        this.state={
            buildings:[],
        }      
}


componentDidMount(){
    
    let buildid = {id:this.props.route.params.id};
    let formdata = new FormData;
    formdata.append("id",buildid.id);
    fetch('http://jdevalik.fr/api/mycities/buildingsbycity.php', {
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
                arr.push([json[i].build_name,json[i].build_id]);
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


render(){
    const {favs} = this.props;
    const {navigate} = this.props.navigation;
    return(
        <View style={styles.container}>
        <TouchableOpacity onPress={() => navigate('Homepage')} style={styles.returnLink}>
        <Text style={styles.returnText}>&larr; Accueil</Text>
        </TouchableOpacity>
        <Image source={logo} style={styles.logo} />
            
        {this.state.buildings.map((building, Building) => (
        <View  key={Building}>
                <View >
                <TouchableOpacity onPress={() => navigate("building",{id:building[1]})}>
                <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>{building[0]}{favs && favs.includes(building[1]) ? "⭐" : ""}</Text>
</TouchableOpacity>
                </View>
        </View>))}

        </View>)}
}

const styles = StyleSheet.create({
container:{
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
logo: {
    position: 'absolute',
    top: 0,
    left: 25,
    width: 300,
    height: 300,
},  
}
)

const mapStateToProps = (state)=>{
    return state;}
export default connect(mapStateToProps)(Buildings);