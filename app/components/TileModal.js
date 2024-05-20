'use client'
import * as React from 'react';
import { View, Share, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import { Video, ResizeMode } from 'expo-av';

import {FOREGROUND, LIGHT, DARK, DARK_BORDER} from './../styles/colors.js';
import logo from './../../public/static/logo.png';
import shareLogo from './../../public/static/chitters_send.png';
import closeLogo from './../../public/static/chitters_close.png';


export default function TileModal(props) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  function close(){
    props.changeContentState(null);
  }

  function share(){
    console.log("user tried to share");
    // const onShare = async () => {
    //   try {
    //     const result = await Share.share({
    //       message: props.prompt,
    //       //url:props.winner[2].gif/>
    //     });
    //   } 
    //   catch (error) {
    //     alert(error.message);
    //   }
    // }
  }

  if (props.state === null){
    //is rendered from main page so this is necessary to hide when not in use
    return (null);
  } else {

    const doubledCardWidth = ((props.cardHeight *4)/5) *1.45;
    const doubledCardHeight = ((props.cardHeight) * 1.45);

    const chitSize = {
      width: doubledCardWidth,
      height: doubledCardHeight,
    };

    const modalSize = {
      width: doubledCardWidth + 30,
      height: doubledCardHeight + (0.2 * doubledCardHeight),
    };

    var chitStyle = StyleSheet.compose(styles.chit, chitSize);
    var containerStyle = StyleSheet.compose(styles.container, modalSize);


    var chit =  <Image source={{uri: `data:image/gif;base64,${props.state.data}`}}  style = {chitStyle} /> 

    // if (props.state.video != null){
    //   console.log("rendered video")
    //   chit = <Video
    //     ref={video}
    //     style = {styles.video}
    //     source={{
    //       uri: props.state.video,
    //       // uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    //     }}
    //     useNativeControls
    //     resizeMode={ResizeMode.CONTAIN}
    //     isLooping
    //   />
    // }

        
    return (
      <View style = {containerStyle}>

        <Image source={logo} style = {styles.cardLogo} />

        {chit}

        <TouchableOpacity 
          style = {styles.closeButton}
          onPress= {close}>
            <Image source={closeLogo}  style = {styles.icon} /> 
        </TouchableOpacity>

        <TouchableOpacity 
          style = {styles.shareButton}
          onPress= {share}>
          <Image source={shareLogo}  style = {styles.icon} /> 
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  video: {
    alignSelf: 'center',
    width: '56%',
    height: '17%',
  },
  chit:{
    resizeMode: 'contain',
    margin: 2
  },
  cardLogo:{
    resizeMode: 'contain',
    width: '50%',
    height: '10%',
    // marginBottom: '-5%'
  },
  container: {
    width: '70%',
    height: '87.5%', 
    zIndex: 6,
    position:'absolute',
    top: '6.25%',
    left: '15%',

    backgroundColor: DARK,
    borderColor: DARK_BORDER,
    borderWidth:5,
    borderRadius: 13,
    shadowColor: DARK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton:{
    zIndex:16,
    position: "absolute",
    bottom: 10,
    right: 5,
  },
  shareButton:{
    zIndex:16,
    position: "absolute",
    bottom: 10,
    left: 5,
  },
  icon: {
    // zIndex:16,
    width: 65,
    height: 65,
  }
});