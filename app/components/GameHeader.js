'use client'
import React from 'react';
import Image from 'next/image'
import { StyleSheet, Text, View, Pressable } from 'react-native';
import logo from '/public/logo.png';
import { gameSlice, exit } from '@lib/redux/slices/gameSlice'
import { FOREGROUND, LIGHT, DARK, DARK_BORDER } from './../styles/colors.js';
import { useAppSelector, useAppDispatch } from "../lib/redux/hooks";

export default function Header() {

  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.logoDiv}>
        <Image src={logo} style={styles.logo}
          width={1366} height={768} alt={'chitters logo'} />
      </View>

      <View style={styles.details}>
        <View style={styles.roomForGameRoomNum}>
          <Pressable onPress={() => dispatch(exit())}>
            <Text style={styles.score}>Exit</Text>
          </Pressable>
        </View>

        <Text style={styles.score}> Score</Text>
        <Text style={styles.score}>
          {useAppSelector((state) => state.gameReducer.roomName)}
        </Text>
        <Text style={styles.scoreVal}>
          {useAppSelector((state) => state.gameReducer.score)}
        </Text>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    width: '60%',
    height: 'auto',
    padding: 40,
  },
  subtitle: {
    marginTop: '1%',
    color: FOREGROUND,
    fontSize: 25,
    // fontFamily:'sleepy',
  },
  roomForGameRoomNum: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: FOREGROUND,
    borderBottomColor: DARK,
    borderBottomWidth: 2,
  },
  gameRoomNum: {
    color: DARK,
    fontSize: 25,
    fontFamily: 'heebo',
  },
  score: {
    flex: 1,
    color: DARK,
    fontSize: 20,
    fontFamily: 'heebo',
  },
  scoreVal: {
    flex: 2,
    color: DARK,
    fontSize: 40,
    fontFamily: 'heebo',
  },
  details: {
    flex: 1,
    backgroundColor: FOREGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  logoDiv: {
    flex: 3,
    backgroundColor: DARK,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  container: {
    flex: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
});
