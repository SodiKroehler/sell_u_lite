'use client'
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FOREGROUND, LIGHT, DARK, DARK_BORDER } from '../styles/colors.js';
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import ReactPlayer from 'react-player/lazy'
import { Peer } from "peerjs";
// import { getFlamPusher } from '@lib/pusherClientFlam.tsx';

export default function VideoBox(props) {
  let roomID = useAppSelector((state) => state.gameReducer.roomId);
  let gameState = useAppSelector((state) => state.gameReducer.gameState);
  let beaks = useRef([])
  let numBoxes = 4
  let boxes = []
  let PEER = null

  const updateBeaks = (member) => {
    console.log(member)
    console.log(beaks)
    let isNotFound = true
    for (let m in beaks) {
      if (beaks[m].id === member.id) {
        beaks[m].info = member.info
        isNotFound = false
        return m
      }
    }
    if (isNotFound) {
      let m = 0
      while (beaks[m].id !== null) {
        m++;
      }
      beaks[m].id = member.id;
      beaks[m].info = member.info
      return m
    }
  }

  //get video from camera an permission once game room is open
  //get peerID from server, and then open a peer with that
  //on each new participant, call them with current stream and display remote stream

  for (let i = 0; i < numBoxes; i++) {
    beaks[i] = { "key": i, "id": null, "ref": "/loading.mp4", "info": null }
    boxes.push(
      <View style={[styles.beakBox]} key={i}>
        <ReactPlayer
          url={beaks[i].ref}
          controls={false}
          loop={true}
          playing={true}
          volume={0.9}
          muted={false}
          width="100%"
          height="100%"
        />
      </View>)
  }


  useEffect(() => {
    if (props.flamPusherState === "loaded") {

      // var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      navigator.mediaDevices.getUserMedia({ video: true, audio: true }, function (stream) {
        beaks[0].ref = stream
      }, function (err) {
        console.log('Failed to get local stream', err);
      });

      var channel = props.flamPusher.current.subscribe('presence-' + roomID);

      channel.bind('pusher:subscription_succeeded', (currMembers) => {
        // debugm("new user joined room number", roomID)
        beaks[0].id = channel.members.me.id
        beaks[0].info = channel.members.me.info


        let peerID = "beak_" + channel.members.me.id //effectively "beak_socketid"

        let PEER = new Peer(peerID);

        PEER.on('open', function (id) {
          console.log('My peer ID is: ' + PEER.id);
        });

        PEER.on('call', function (call) {
          console.log("call recived ");
          call.answer()
          call.on('stream', function (remoteStream) {
            console.log("recv call is", call)
            //whos ref does it go to?
            // peerVidRef.current.srcObject = remoteStream
          }, function (err) {
            console.log('Failed to get remote stream', err);
          });
        });

        currMembers.each((member) => {
          updateBeaks(member)
          console.log(member)
        })
      })
      channel.bind("pusher:subscription_error", (erorr) => {
        console.log(erorr)
      })

      channel.bind("member_added", (member) => {
        const newIndex = updateBeaks(member)
        if (member.id !== channel.members.me.id) {
          var call = PEER.call("beak_" + member.id, beaks[0].ref);
          console.log(call)

          call.on('stream', function (remoteStream) {
            beaks[newIndex].ref = remoteStream
          }, function (err) {
            console.log('Failed to get remote stream', err);
          });
        }
      })

      channel.bind("member_removed", (member) => {
        console.log(member)
      })
    }

  }, [props.flamPusherState])


  return (
    <View style={styles.videoBox}>
      {boxes}
    </View>
  );
}

const styles = StyleSheet.create({

  videoBox: {
    flex: 1,
    display: 'flex',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '50%',
    height: '100%',
    backgroundColor: LIGHT,
    flexFlow: 'column wrap',
  },
  beakBox: {
    width: '50%',
    height: '50%',
    backgroundColor: LIGHT,
  },
});


