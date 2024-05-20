'use client'

import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {FOREGROUND, LIGHT, DARK} from './../styles/colors.js';
import {gameSlice, isReady, submit, newRound} from '../lib/redux/slices/gameSlice'
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
export default function Footer(props) {

  let gameState = useAppSelector((state) => state.gameReducer.gameState);
  let selected = useAppSelector((state) => state.gameReducer.selected);
  let chits = useAppSelector((state) => state.gameReducer.chits);
  const dispatch = useAppDispatch();


  var mainButtonText = gameState;
  if (gameState === "waiting"){
    mainButtonText = "Let's Begin";
  } else if (gameState === "ending"){
    mainButtonText = "Begin Again";
  } else if (gameState === "choosing"){
    mainButtonText = "Submit";
  }
  
  const mainButtonHandler = () => {
    switch (gameState) {
      case 'choosing' :
        dispatch(submit([chits[selected].chit.id, selected]))
        break;
      case 'waiting':
        dispatch(isReady())
        break;
      case 'ending': 
        dispatch(newRound())
        break;
      default: 
        console.log(gameState)
    }

  }

  return (
    <View style={styles.container}>

      <View style = {styles.promptBox}>
        <Text style={styles.prompt}> 
          {useAppSelector((state) => state.gameReducer.prompt)}
        </Text>
      </View>
    
      <View style = {styles.baseLine}>
        <Text style={styles.message}> 
          {useAppSelector((state) => state.gameReducer.message)}
        </Text>
          

        <TouchableOpacity onPress = {mainButtonHandler}
        style = {styles.button}>
          <Text style= {styles.buttonText}>{mainButtonText}</Text>
        </TouchableOpacity>

      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: DARK,
    // alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width:'100%',
  },
  promptBox:{
    flex:3,
    width:'100%',
    padding:10,
    backgroundColor:FOREGROUND,
    alignItems:'center',
    justifyContent:'center',
  },
  prompt:{
    color: DARK,
    fontSize:25,
    fontFamily:'heebo',
  },
  baseLine:{
    flex:3,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'flex-end',
    width:'100%',
    padding:10,
  },
  message:{
    fontSize: 20,
    flex:3,
    color: FOREGROUND,
    fontFamily:'heebo',
    alignItems:'center',
    padding:10,
  },


 
  button: {
    flex:1,
    backgroundColor: FOREGROUND,
    padding: 20,
    borderRadius: 5,
    height:'50%',
    justifyContent:'center',
    textAlign:'center',
  },
  buttonText: {
    fontSize: 20,
    color: DARK,
    fontFamily:'heebo',
  }
});
