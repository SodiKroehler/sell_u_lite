'use client'
import React, { useEffect } from 'react';
import Image from 'next/image'
import { View, StyleSheet, FlatList, Text, Pressable } from 'react-native';
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import { signOut } from "next-auth/react"
import Link from 'next/link'
import ProfilePersonal from './Profile-personals'
import ProfileChats from './Profile-chats'
import ProfileRooms from './Profile-rooms'
// import {debug} from '../lib/logger/flamLogger'

import { FOREGROUND, LIGHT, DARK, DARK_BORDER } from './../styles/colors.js';

export default function Profile(props) {

  const [tempIcon, setTempIcon] = React.useState("");
  let icon = useAppSelector((state) => state.gameReducer.icon);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>

      <ProfilePersonal />
      <ProfileChats />
      <ProfileRooms />

      <Pressable
        style={styles.button}
        onPress={() => signOut()}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
      <Link href="/">
        <Image src='/static/icons/game.svg' alt="home" width={25} height={25} />
      </Link>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: '75%',
    height: '75%',
    position: 'absolute',
    top: '12.5%',
    left: '12.5%',
    zIndex: 4,
    borderColor: FOREGROUND,
    borderWidth: 5,
    borderRadius: 5,
    backgroundColor: DARK,
    shadowColor: DARK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // padding: '5%',
  },

  logo: {
    resizeMode: 'contain',
    width: '100%',
    height: 'auto'
  },
  logoContainer: {
    flex: 2,
    width: '85%',
    paddingTop: 10,
    paddingBottom: -3,
    alignItems: "center",
  },
  buttonContainer: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: '3%',
  },
  iconContainer: {
    flex: 5,
    width: '100%',
    alignItems: "center",
    backgroundColor: LIGHT,
    paddingBottom: '2%'
  },
  button: {
    backgroundColor: FOREGROUND,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },

  instructions: {
    color: FOREGROUND,
    fontSize: 18,
    marginHorizontal: 15,
    fontFamily: 'heebo',
  },
  inputLine: {
    backgroundColor: LIGHT,
    padding: 15,
    fontSize: 20,
    width: '45%',
    borderRadius: 5,
    margin: 10,
    fontFamily: 'heebo',
  },
  buttonText: {
    fontFamily: 'heebo',
    fontSize: 20,
    color: DARK,
  },
  icon: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: DARK,
    fontSize: 30,
    padding: 15,
    margin: 2,
  },
  clicked_icon: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: DARK,
    backgroundColor: FOREGROUND,
    fontSize: 30,
    padding: 15,
    margin: 2,
  }
});
