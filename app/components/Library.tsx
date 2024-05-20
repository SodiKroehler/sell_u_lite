'use client'
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, Text, View, StyleSheet } from "react-native";
import Scroller from '../components/Scroller.js'
import Poster from '../components/Poster'
import { librarySlice, fetchFlo, refreshLive } from '../lib/redux/slices/librarySlice'
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import { FOREGROUND, LIGHT, DARK, ACCENT } from './../styles/colors.js';
import Image from 'next/image'
import Link from 'next/link'
import tw from '@styles/tw'
import NoSSR from 'react-no-ssr'



export default function Library(props) {
  const dispatch = useAppDispatch();
  const libStatus = useAppSelector((state) => state.libraryReducer.libStatus);
  const chits = useAppSelector((state) => state.libraryReducer.chits);
  const flo = useAppSelector((state) => state.libraryReducer.currFlo);
  let flos: React.JSX.Element[] = [];


  useEffect(() => {
    if (libStatus === 'outdated') {
      // if (flo === 'live') {
      //   dispatch(refreshLive())
      // } else {
      // }
      dispatch(fetchFlo())

    }

  }, [libStatus])

  flos.push(
    <Pressable
      style={styles.floButton}
      onPress={() => {
        // dispatch(librarySlice.actions.changeFlo("live"))
        console.log("error ocurring here")
      }}
      key={8} >
      <Text style={styles.floTitle}>{"LIVE"}</Text>
    </Pressable>
  )

  for (let i = 0; i < props.library.length; i++) {

    flos.push(
      <Pressable
        style={styles.floButton}
        onPress={() => {
          dispatch(librarySlice.actions.changeFlo(props.library[i].id))
        }}
        key={i} >
        <Text style={styles.floTitle}>{props.library[i].name}</Text>
      </Pressable>
    )
  }


  return (
    <View style={tw.style('flex w-full h-full flex-row')}>
      <View style={tw`basis-1/4 bg-dark flex-col h-full w-full`}>
        <View style={tw`basis-3/4 overflow-y-scroll no-scrollbar`}>
          <Text style={tw`text-light text-2xl text-center pb-3`}>My Collections</Text>
          {flos}
        </View>
        <View style={tw`basis-1/4 justify-self-end`}>
          <Text style={tw`text-light text-2xl text-center pb-3`}>Upload</Text>
          <Text style={tw`text-md text-light text-center`}>Coming Soon!</Text>
          {/* <Poster />  */}
        </View>
      </View>

      <View style={tw`grow overflow-y-scroll no-scrollbar`}>
        <NoSSR>
          <Scroller />
        </NoSSR>

      </View>

    </View>

  );
}





const styles = StyleSheet.create({
  libcontainer: {
    //   flex : 1,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    //   backgroundColor: 'red',
  },
  header: {
    flex: 1,
    alignItems: 'flexEnd',
    backgroundColor: DARK,
  },
  bodyContainer: {
    flex: 14,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  sidebar: {
    flex: 1,
    backgroundColor: DARK,
    alignItems: 'center',
  },
  viewport: {
    paddingTop: 10,
    flex: 4,
    backgroundColor: LIGHT,
  },
  floButton: {
    backgroundColor: FOREGROUND,
    height: 50,
    flexShrink: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: '1px',
    borderColor: 'DARK'
  },
  floTitle: {
    color: LIGHT
  },
  divisionName: {
    color: LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '2em'
  }
});

