import React from 'react';
import WhiteButton from '../components/white_button';
import {StyleSheet, Button, View, SafeAreaView, Text, Alert, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import { useNavigation } from '@react-navigation/native';


class Validation extends React.Component{
    constructor(props){
      super(props);
      this.deco = this.deco.bind(this);
      this.modif = this.modif.bind(this);
}


deco(){
  const {navigate} = this.props.navigation ;
  const action2 = {type:"crnt_user",value:null} ;
  this.props.dispatch(action2);
  navigate("Homepage");
}

modif(){
  const {navigate} = this.props.navigation ;
  navigate("modify");
}

    render(){
        
        const {crnt_usr} = this.props;
        const {crnt_role} = this.props;
        const {crnt_id} = this.props;

        console.log(this.props.crnt_role);

        return (
            <View style={styles.container}>
                      <TouchableOpacity onPress={this.deco} style={styles.returnLink}>
                      <Text style={styles.returnText}>&larr; Accueil</Text>
                      </TouchableOpacity> 
                      <Text style={{color:'white',fontSize: 22 , textAlign:'center'}}>Vous êtes connecté</Text>
                      <View style={{height: 20}}/>
                      <Text>Bienvenue</Text>
                      <View style={{height: 20}}/>
                      <WhiteButton style={{height: 20}} val = "Modification"  onPress={this.modif}></WhiteButton>
<WhiteButton style={{height: 20}} val = "Déconnexion"  onPress={this.deco}></WhiteButton>
                      <View style={{height: 20}}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
       flex: 1,
       backgroundColor: '#5a5a5a',
       alignItems: 'center',
       justifyContent: 'center',
    },
    returnLink: {
       position: 'absolute',
       top: 20, // Ajustez cette valeur pour déplacer le bouton vers le bas
       left: 10,
    },
    returnText: {
       color: 'black',
       fontSize: 16,
       fontWeight: 'bold',
   },
  });


const mapStateToProps = (state)=>{
    return state;}
export default connect(mapStateToProps)(Validation);