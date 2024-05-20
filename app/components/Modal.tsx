'use client'
import React, {useState, useEffect} from 'react';
import { StyleSheet, FlatList, Text, Pressable, View, Dimensions} from 'react-native';
import ReactPlayer from 'react-player/lazy'
import {gameSlice, vote} from '../lib/redux/slices/gameSlice'
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import {FOREGROUND, LIGHT, DARK, DARK_BORDER} from './../styles/colors.js';
import Tile from './Tile'

export default function Modal () {
    const [selectedPlayer, setSelePlayer] = useState('')
    const [selectedChit, setSeleChit] = useState('')
    const [playing, setPlaying] = useState(false)

    const dispatch = useAppDispatch();
    let gstate = useAppSelector((state) => state.gameReducer.gameState)
    let subs = useAppSelector((state) => state.gameReducer.submissions);
    let votes = useAppSelector((state) => state.gameReducer.votes);
    let icons = useAppSelector((state) => state.gameReducer.icons);

    const WIDTH = Dimensions.get('window').width;
    const HEIGHT = Dimensions.get('window').height;
    const CARDWIDTH = HEIGHT * 0.45

    const _vote = (sleChit) =>{
      setSeleChit(sleChit)
      if (gstate === 'voting') {
        dispatch(gameSlice.actions.newVote([selectedPlayer, subs[selectedChit].chit.id]));
      }
    }


    const _renderChit = ({item}) => {
      var isSele = (selectedChit === item.id);
       return (
        <Tile 
          id = {item.id} //same as position
          link = {item.chit.link}
          name = {item.chit.name}
          cardWidth = {CARDWIDTH}
          onClick = {() => _vote(item.id)}
          img = {null}
          onRightClick = {null}
          selected = {isSele}
        ></Tile>
        )
      }

  const _renderUser = ({item}) => {
    var buttonStyle = (selectedPlayer === item) ? styles.clicked_userButton : styles.userButton;
    var ic = icons[item]
    return (
        <Pressable
        onPress ={() => setSelePlayer(item)}
        style= {buttonStyle}>
          <Text style = {styles.nickname}>{ic} </Text>
        </Pressable>
    );
  }

  const _mainButtonHandler = () => {
    if (gstate === 'voting'){
      dispatch(vote())
    }
    else {
      dispatch(gameSlice.actions.resultsFinished())
    }
  }

  const mainButtonText = (gstate === 'voting') ? 'Submit' : 'Done';
  const instruText = (gstate === 'voting') ? 'to each player, give a chit' : 
  'the chits just got real';


  return (
    <View style = {styles.container}>

      <View style = {styles.header}>
        <Text style={styles.instructions}>{instruText}</Text>
      </View>
      
      
      <View style = {styles.body}>
    
        <View style = {styles.userContainer}>
          <FlatList
            data = {Object.keys(votes)}
            renderItem ={_renderUser}
            extraData={selectedPlayer}
          ></FlatList>
        </View>

        <View style = {styles.chitContainer}>
          <FlatList
            data = {subs}
            renderItem ={_renderChit}
            horizontal = {true}
            extraData={selectedChit}
          ></FlatList>
        </View>
      </View>

    <View style= {styles.footer}>
      <Pressable 
        style = {styles.button}
        onPress= {_mainButtonHandler}>
        <Text style= {styles.buttonText}>{mainButtonText}</Text>
      </Pressable>

      {/* {gstate === 'ending' && <Pressable 
        style = {styles.button}
        onPress= {_quitGame}>
        <Text style= {styles.buttonText}>Quit</Text>
      </Pressable>} */}
    </View> 
  </View>
  );

}


const styles = StyleSheet.create({
  
    container: {
      width: '80%',
      height: '80%',
      position: 'absolute',
      margin: '5%',
      backgroundColor:DARK,
      // borderColor: FOREGROUND,
      // borderWidth:5,
      alignItems: "center",
      zIndex: 10,
      borderRadius: 5,
    },
    header:{
      flex:1,
      backgroundColor:DARK,
      width:'100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    body :{
      flex: 4,
      flexDirection: 'row',
      width: '100%'
    },
    userContainer:{
      flex:1,
      backgroundColor:FOREGROUND,
    },
    chitContainer:{
      flex:3,
      backgroundColor:FOREGROUND,
    },
    footer:{
      flex:1,
      width: '90%',
      alignItems: 'flex-end',
      justifyContent: 'center'
    },
    button: {
      backgroundColor: FOREGROUND,
      padding: 15,
      borderRadius: 5,
      // marginTop:5,

    },
    buttonText: {
      fontSize: 20,
      color: DARK,
      fontFamily:'heebo',
    },
    instructions:{
      color: LIGHT, 
      fontSize: 18,
      marginHorizontal: 15,
      fontFamily:'heebo',
    },
    chit:{
      width:190,
      height: 190,
      backgroundColor: DARK,
    },
    clicked_chit:{
      width: 200,
      height: 200,
      backgroundColor: FOREGROUND,
    },
    nickname:{
      color: FOREGROUND, 
      fontSize: 18,
      padding: 5,
      // marginHorizontal: 15,
      fontFamily:'heebo',
    },
    userButton: {
      backgroundColor: LIGHT,
      margin: 15,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
    },
    clicked_userButton:{
      backgroundColor: DARK,
      margin: 15,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  