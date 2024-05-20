'use client'

import React, {useEffect} from 'react';
import { StyleSheet, View, FlatList, Dimensions} from 'react-native';
import Chit from './Chit';
import {FOREGROUND, LIGHT, DARK, DARK_BORDER} from './../styles/colors.js';
import { useAppSelector, useAppDispatch } from "../lib/redux/hooks";
import {gameSlice, swap} from '../lib/redux/slices/gameSlice'
import {COLORS} from './../styles/colors.js';



export default function ImageGallery () {

  const selector = useAppSelector((state) => state.gameReducer.selected)
  const chits = useAppSelector((state) => state.gameReducer.chits)
  const dispatch = useAppDispatch();

  const WIDTH = Dimensions.get('window').width;
  const HEIGHT = Dimensions.get('window').height;
  const CARDWIDTH = HEIGHT * 0.5  
  const CARDHEIGHT = CARDWIDTH * (9/10)

  const _vote = (itemId) => {
    dispatch(gameSlice.actions.chitWasSelected(itemId))
  }

  const _switch = (itemId, reason) => {
    //to rerender the gallery
    // if (selector > 0){
    //   dispatch(gameSlice.actions.chitWasSelected(-1))
    // } else {
    //   dispatch(gameSlice.actions.chitWasSelected(selector-1))
    // }
    dispatch(gameSlice.actions.chitWasSelected(-2))
    dispatch(swap(itemId, reason))
  }

  const _renderItem = ({item}) => {
    var clickedChitStyle = (selector === item.id) ? 
    StyleSheet.compose([styles.chit, styles.clicked_chit]): styles.chit;

    return (
    <View style = {clickedChitStyle}>
      <Chit 
        id = {item.id} 
        name = {item.chit.name} 
        url = {item.chit.link}
        img = {item.gif} 
        dims = {{w: CARDWIDTH, h:CARDHEIGHT}}
        onClick = {_vote}
        onRightClick = {_switch}
      ></Chit>
    </View>

    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data = {chits}
        renderItem ={_renderItem}
        horizontal = {true}
        extraData={selector}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: DARK,
    width: '100%',
  },
  chit: {
    flex: 1,
    backgroundColor: DARK,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  clicked_chit: {
    backgroundColor: LIGHT,
  },
});

