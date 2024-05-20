'use client'
import React, { useEffect } from 'react';
import Image from 'next/image'
import { View, StyleSheet, TextInput, Text, Pressable } from 'react-native';
import logo from '/public/logo.png';
import googlogo from '/public/static/icons/google.svg';
import discLogo from '/public/static/icons/discord.png';
import instaLogo from '/public/static/icons/insta.png';
import { signIn } from "next-auth/react"
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import { signOut } from "next-auth/react"

import { FOREGROUND, LIGHT, DARK, DARK_BORDER } from './../styles/colors.js';

export default function SignIn(props) {


  const [email, setEmail] = React.useState("");
  let icon = useAppSelector((state) => state.gameReducer.icon);
  const dispatch = useAppDispatch();

  const imgs = { "Discord": discLogo, "Google": googlogo, "Facebook": instaLogo }
  // console.log(props)

  const provButtons = Object.values(props.providers).filter((provider) => { return provider.type === "oauth" }).map((provider) => (
    <Pressable key={provider.name}
      onPress={() => signIn(provider.id)}
      style={styles.providerButton}>
      <Image src={imgs[provider.name]}
        width={500} height={500} alt={provider.name + " logo"}
        style={styles.providerLogo}></Image>
      {/* <Text style={styles.providerText}>{provider.name}</Text> */}
    </Pressable>
  ))

  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Image src={logo} width={1366} height={768} alt="chitters logo"
          style={styles.logo} />
      </View>

      <Text style={styles.instructions}>Please sign in with</Text>
      <View style={styles.providerBar}>
        {provButtons}
      </View>

      <Text style={styles.instructions}>or</Text>

      <View style={styles.emailBar}>

        <TextInput
          onChangeText={setEmail}
          placeholder="email"
          style={styles.inputLine}
          autoCompleteType="email"
          returnKeyType="next"
          autoFocus={true}
          onSubmitEditing={() => signIn("email", { email })}
        ></TextInput>

        <Pressable
          style={styles.button}
          onPress={() => signIn("email", { email })}>
          <Text style={styles.buttonText}>login</Text>
        </Pressable>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 4,
    backgroundColor: DARK,
  },

  logo: {
    resizeMode: 'contain',
    width: '100%',
    height: 'auto'
  },
  logoContainer: {
    width: '25%',
    alignItems: "center",
  },
  providerBar: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1%',
  },
  emailBar: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1%',
  },
  providerButton: {
    // backgroundColor: LIGHT,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  providerText: {
    fontFamily: 'heebo',
    fontSize: 20,
    color: DARK,
  },
  instructions: {
    color: LIGHT,
    fontSize: 18,
    marginHorizontal: 15,
    fontFamily: 'heebo',
  },
  button: {
    backgroundColor: FOREGROUND,
    padding: 15,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontFamily: 'heebo',
    fontSize: 20,
    color: DARK,
  },
  inputLine: {
    backgroundColor: LIGHT,
    padding: 15,
    fontSize: 20,
    width: '45%',
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    fontFamily: 'heebo',
  },
  providerLogo: {
    width: 50,
    height: 'auto',
  }
});





