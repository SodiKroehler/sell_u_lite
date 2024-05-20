'use client'

// import * as Font from 'expo-font';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { gameSlice, getChit, scoreUpdated } from '../lib/redux/slices/gameSlice'
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import NoSSR from 'react-no-ssr'
import dynamic from 'next/dynamic'
import Pusher from 'pusher-js';



//components
// import VideoBox from './VideoBox'
import ImageGallery from './ImageGallery.js';
import Header from './GameHeader.js';
import Footer from './GameFooter.js';
import IntroModal from './IntroModal.js';
import Modal from './Modal';
import VideoBox from './VideoBox';

//assets
import { FOREGROUND, LIGHT, DARK, DARK_BORDER } from './../styles/colors.js';



export default function GameRoom(props) {

  var submissions = [];
  var temporaryCardStorage = [];
  const [flamPusherState, setflamPusherState] = useState("null");
  // const [flamPusher, setflamPusher] = useState(null);
  let gameState = useAppSelector((state) => state.gameReducer.gameState);
  let chits = useAppSelector((state) => state.gameReducer.chits);
  let roomId = useAppSelector((state) => state.gameReducer.roomId);
  let flamPusher = useRef(null)

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (roomId) {
      // Pusher.logToConsole = true;
      flamPusher.current = new Pusher(props.pusherKey,
        { cluster: props.pusherCluster ?? '', channelAuthorization: { endpoint: "/api/pusherAuth" } }
      )

      flamPusher.current.connection.bind('connected', function () {
        setflamPusherState("loaded");

        var channel = flamPusher.current.subscribe('client-' + roomId);

        // channel.bind_global((event, data) => {
        //   console.log(event)
        // });
        channel.bind("start", (data) => {
          for (let i = 0; i < 7; i++) {
            dispatch(getChit([null, i])); //card num of null asks vanessa
          }
          dispatch(gameSlice.actions.gameWasStarted());
        });
        channel.bind("submissionsComplete", (data) => {
          dispatch(gameSlice.actions.recievedSubmissions(data));
        });

        channel.bind("votingCompleted", (data) => {
          dispatch(gameSlice.actions.recievedVotes(data));
          dispatch(scoreUpdated());
        });

      })
    }
  }, [roomId])

  // useEffect(() => {
  //   if (flamPusher.current) {

  //   }
  // }, [flamPusher.current])


  return (
    <View style={styles.container}>


      <View style={styles.videoBox} >
        <NoSSR>
          <VideoBox
            userID={props.userID}
            flamPusher={flamPusher}
            flamPusherState={flamPusherState}>
          </VideoBox>
        </NoSSR>

      </View>

      <View style={styles.gameBox}>

        <Header />
        <ImageGallery />
        <Footer />

      </View>

      {gameState === 'off' && <NoSSR><IntroModal styles={styles.modal} /></NoSSR>}

      {(gameState === "voting" || gameState === "results") && <Modal />}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'none',
    flexDirection: 'row',
  },
  gameBox: {
    flex: 1,
    // width: '50%',
    height: '100%',
  },
  videoBox: {
    flex: 1,
    backgroundColor: DARK,
    // width:'50%',
    // height: '100%',
  },
  hr: {
    flex: 1,
    backgroundColor: DARK,
    width: '100%',
  },

  modal: {
    flex: 1,
    width: '75%',
    height: '75%',
    position: 'absolute',
    top: '12.5%',
    left: '12.5%',
    zIndex: 4,

    backgroundColor: DARK,
    borderColor: DARK_BORDER,
    borderWidth: 5,
    borderRadius: 13,
    shadowColor: DARK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  TileModal: {
    width: '70%',
    height: '87.5%',
    zIndex: 6,
    position: 'absolute',
    top: '6.25%',
    left: '15%',

    backgroundColor: DARK,
    borderColor: DARK_BORDER,
    borderWidth: 5,
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
});
