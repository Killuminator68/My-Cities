import React from "react";
import {
    StyleSheet,
    Button,
    View,
    SafeAreaView,
    Text,
    Alert,
    TextInput,
    TouchableOpacity,
  } from 'react-native';

export default class WhiteButton extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {val} = this.props;
        return (
            <View>
                <TouchableOpacity onPress={this.props.onPress} style={{backgroundColor:"white",height:40,padding:10,display:"flex",borderColor:"black",borderBottomWidth:1,borderRadius:6, justifyContent:"center"}}><Text style={{color:"black",textAlign:"center", fontSize:15}}>{val}</Text></TouchableOpacity>
            </View>
        )
    }
}

