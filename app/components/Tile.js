'use client'

import React, {useState} from 'react';
import { StyleSheet, View, Text} from 'react-native';
import {FOREGROUND, LIGHT, DARK, ACCENT} from '../styles/colors.js';
import {gameSlice} from '../lib/redux/slices/gameSlice'
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import Chit from './Chit.js'




export default function Tile (props) {
  //props: id, link, name, cardWidth, img, onCLick, onRightClick, selected
  const dispatch = useAppDispatch();
  let prompt = useAppSelector((state) => state.gameReducer.prompt);
  const CARDWIDTH = props.cardWidth
  const CARDHEIGHT = CARDWIDTH * (9/10)

  // const _handleSwitch = () => {
  //   dispatch(gameSlice.actions.chitWasUnacceptable(props.id))
  // }

  const _handleClick = (item) => {
    props.onClick(item)
  }
  const _handleRightClick = (item, reason) => {
    console.log("rightclikc")
    props.onRightClick(item, reason)
  }

  var containerStyleBySelected = (props.selected) ? 
  styles.clicked_container : styles.container;
  // StyleSheet.compose([styles.clicked_container, styles.container]): styles.container;
  
  return (
    <View style={containerStyleBySelected}>
      <Text style = {styles.prompt}>{prompt}</Text>
      <Chit 
          id = {props.id} 
          name = {props.name} 
          details = {props.details}
          url = {props.link}
          img = {props.img} 
          dims = {{w: CARDWIDTH, h:CARDHEIGHT}}
          onClick = {_handleClick}
          onRightClick = {_handleRightClick}
      ></Chit>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  clicked_container: {
    flex: 1,
    backgroundColor: LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  prompt:{
    color: FOREGROUND,
    fontSize: 15,
    paddingBottom: 5,
    fontFamily:'heebo',
  }
});
