'use client'
import { useEffect, useState } from "react";
import { useRef } from 'react';
// import { Peer } from "peerjs";

var uniqueString = "sodis_odd_webrtc_id_string_"

async function checkForNewPeer(selfID) {
  console.log("checking for new peers")
  const queryString = './api/flamvSignaling?id=' + selfID
  const availPeerList = await fetch(queryString).then(r => r.text())
  return availPeerList
}

export default function Client() {
  const [pID, setpID] = useState("");
  const [chatMessage, setchatMessage] = useState("");
  const [jitterBufferSize, setJitterBufferSize] = useState(0);

  let selfVidRef = useRef(null);
  let peerVidRef = useRef(null);
  var CONN = null;
  var PEER = null;

useEffect(() => {
  console.log(PEER);
  if(PEER){
    PEER.setJitterBufferMaxPackets(jitterBufferSize);
   
  }
}, [jitterBufferSize]);
 
  const startSelfPeer= (e) =>{

    e.preventDefault()
    import("peerjs").then(({ default: Peer }) => {
      PEER = new Peer(uniqueString + pID);
      PEER.on('open', function(id) {
        console.log('My peer ID is: ' + PEER.id);

        // if (pID === "2"){
        //   var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        //   getUserMedia({video: true, audio: true}, function(stream) {
        //     var call = PEER.call(uniqueString + "1", stream);
        //     selfVidRef.current.srcObject = stream
        //     call.on('stream', function(remoteStream) {
        //       peerVidRef.current.srcObject = remoteStream
        //     }, function(err) {
        //       console.log('Failed to get remote stream' ,err);
        //     });
        //   }, function(err) {
        //       console.log('Failed to get local stream' ,err);
        //     });
        // } else {
        //   navigator.mediaDevices.getDisplayMedia({video: {cursor: 'always', displaySurface: 'monitor'}}, function(stream) {
        //   var call = PEER.call(uniqueString + "2", stream);
        //   selfVidRef.current.srcObject = stream
        //   call.on('stream', function(remoteStream) {
        //     peerVidRef.current.srcObject = remoteStream
        //   }, function(err) {
        //     console.log('Failed to get remote stream' ,err);
        //   });
        // }, function(err) {
        //     console.log('Failed to get local stream' ,err);
        //   });
        // }
      });

      PEER.on('disconnected', function(id) {
        console.log("connection with id " + id + " closed");
      });

      PEER.on('error', function(err) {
        console.log(err);
      });

      PEER.on('call', function(call) {
        console.log("call recived ");
        call.answer()
        call.on('stream', function(remoteStream) {
          peerVidRef.current.srcObject = remoteStream
        }, function(err) {
          console.log('Failed to get remote stream' ,err);
        });
        // if (pID === "2"){
        //   console.log("call recived on 2")
        //   getUserMedia({video: true, audio: true}, function(stream) {
        //     call.answer(stream); // Answer the call with an A/V stream.
        //     selfVidRef.current.srcObject = stream
        //   }, function(err) {
        //     console.log('Failed to get local stream' ,err);
        //   });
        // }
        //  else {
        //   navigator.mediaDevices.getDisplayMedia({video: {cursor: 'always', displaySurface: 'monitor'}}, function(stream) {
        //       call.answer(stream); // Answer the call with monitor stream.
        //       selfVidRef.current.srcObject = stream
        //     }, function(err) {
        //       console.log('Failed to get local stream' ,err);
        //     });
        //   }
      });

      PEER.on('connection', function(conn) {
        CONN = conn
        conn.on('open', function(){
          conn.send('hi!');
          console.log("opened conn")
        });
        conn.on('data', function(data){
          console.log(data);
        });
      });
    })
  }

  const sendChat = () => {
    selfConn.send(chatMessage)
  }

  const startCall= () =>{
    console.log("call started")
    if (PEER.id === (uniqueString+ "1")){
      console.log("true")
      var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      getUserMedia({video: true, audio: true}, function(stream) {
        var call = PEER.call(uniqueString + "2", stream);
        console.log(call)

        selfVidRef.current.srcObject = stream
        call.on('stream', function(remoteStream) {
          peerVidRef.current.srcObject = remoteStream
        }, function(err) {
          console.log('Failed to get remote stream' ,err);
        });
      }, function(err) {
          console.log('Failed to get local stream' ,err);
      });
    }
  }


  return (
    <div>
      <div>
        <form onSubmit={startSelfPeer} name="selfForm" method="GET">
          <input type="text" name="id" onChange={e => {setpID(e.target.value)}}></input>
          <input type="submit" value="start self"></input>
        </form>

        <input type="button" value="call" onClick={startCall}></input>



       
        <div>
          <p>Self Stream</p>
          <video controls width="250" autoPlay muted ref={selfVidRef} ></video >
        </div>

        <div>
          <p>Remote Stream</p>
          <video controls width="250" autoPlay muted  ref={peerVidRef} ></video >
        </div>
      </div>

      <input type="text"
          id="jitterBufferSize"
          onChange={e => {setJitterBufferSize(e.target.value)}}
        ></input>


    </div>

  );
}