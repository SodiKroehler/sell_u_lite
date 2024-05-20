'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image'
import { View, StyleSheet, FlatList, Text, Pressable, TextInput } from 'react-native';
import logo from '/public/logo.png';
import { gameSlice, joinRoom } from '@lib/redux/slices/gameSlice'
import { useAppDispatch, useAppSelector } from "@lib/redux/hooks";
import Tarryer from './Tarryer'

import { FOREGROUND, LIGHT, DARK, DARK_BORDER } from '@styles/colors.js';

// const getIcons = async() => {
//   const data = await fetch('/api/game/getIcons', 
//   {credentials: "same-origin"}).then(r => r.json())
//   return await data
// }

export default function IntroModal(props) {
  const [roomType, setroomType] = useState('');
  const [roomName, setroomName] = useState('');
  const dispatch = useAppDispatch();
  let statusMsg = useAppSelector((state) => state.gameReducer.statusMsg);

  function _joinPublicRoom() {
    setroomType("public")
    // dispatch(joinRoom())
  }

  function _createPrivateRoom() {
    setroomType("private")
  }

  function _joinRoom() {
    let r = ""
    if (roomType === "private" && roomName === '') {
      r = "newPrivate"
    } else {
      r = roomName
    }
    console.log("joining room " + r)
    dispatch(joinRoom(r))
  }


  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Image src={logo} width={1366} height={768} alt="chitters logo"
          style={styles.logo} />
      </View>

      <View style={styles.buttonContainer}>

        <Pressable
          style={styles.button}
          onPress={_createPrivateRoom}>
          <Text style={styles.buttonText}>Join Private Room</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={_joinPublicRoom}>
          <Text style={styles.buttonText}>Join Public Room</Text>
        </Pressable>
      </View>

      {roomType === 'private' && <View style={styles.iconContainer}>

        <TextInput
          // style={styles.input}
          value={roomName}
          placeholder="if you already know your room name, enter it here"
          onChangeText={text => setroomName(text)}
          style={styles.inputLine}
        ></TextInput>
        <Pressable
          style={styles.button}
          // onPress={console.log("disptach")}>
          onPress={() => { _joinRoom() }}>
          <Text style={styles.buttonText}>Join Room</Text>
        </Pressable>
        <Text style={styles.instructions}>{statusMsg}</Text>
      </View>}

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
    width: '50%',
    height: 'auto',
    paddingTop: '10%'
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
    flex: 1,
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
    borderColor: FOREGROUND,
    borderWidth: 2,
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




// {roomType === 'public' && possIcons && (possIcons.length === 0) && <Tarryer />}


// {roomType === 'public' && possIcons && (possIcons.length > 0) && <View style={styles.iconContainer}>
//   <Text style={styles.instructions}> Select your avatar</Text>

//   <FlatList
//     data={possIcons}
//     renderItem={_renderIcon}
//     horizontal={true}
//     extraData={icon}
//   ></FlatList>

//   <Pressable onPress={() => {
//     dispatch(gameSlice.actions.setIcon(tempIcon))
//   }}
//     style={styles.button}>
//     <Text style={styles.buttonText}>Start</Text>
//   </Pressable>
// </View>}

// const [tempIcon, setTempIcon] = React.useState("");
// const [possIcons, setPossIcons] = React.useState([]);
// let icon = useAppSelector((state) => state.gameReducer.icon);
// useEffect(() => {
//   if (icon === 'waiting') {
//     getIcons().then(r => {
//       setPossIcons(r.icons)
//     })
//   }
// }, [icon])
// function _selectIcon(item) {
//   console.log(item)
//   setTempIcon(item)
// }
// const _renderIcon = ({ item }) => {
//   const iconStyle = (tempIcon === item) ? styles.clicked_icon : styles.icon;
//   return (
//     <Pressable onPress={() => setTempIcon(item)} >
//       <Text style={iconStyle}>{item}</Text>
//     </Pressable>
//   )
// }