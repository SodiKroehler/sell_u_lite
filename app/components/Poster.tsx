'use client'
import { useEffect, useState } from "react";
import { Button, Text, View, TextInput, StyleSheet } from "react-native";
import { librarySlice } from '../lib/redux/slices/librarySlice'
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";


export default function Poster() {
  const dispatch = useAppDispatch();
  const libStatus = useAppSelector((state) => state.libraryReducer.libStatus);
  const chits = useAppSelector((state) => state.libraryReducer.chits);

  const [desc, setDesc] = useState('')
  const [album, setAlbumName] = useState('')
  const [artist, setArtistName] = useState('')
  // const [link, setLink] = useState('')
  const [postChitStatus, setPostChitStatus] = useState('idle')

  const submitNewChit = async () => {
    if (postChitStatus === 'idle') {
      try {
        setPostChitStatus('posting')
        // await dispatch(newChitSubmitted(JSON.stringify({desc, artist, album}))).unwrap()
        setDesc('')
        setAlbumName('')
        setArtistName('')
      } catch (err) {
        console.log(err)
      } finally {
        setPostChitStatus('idle')
      }
    }
  }

  return (
    <View style={styles.container}>

      <TextInput
        onChangeText={setArtistName}
        placeholder="artist name"></TextInput>

      <TextInput
        onChangeText={setAlbumName}
        placeholder="album name"></TextInput>

      <TextInput
        onChangeText={setDesc}
        placeholder="chit desc"></TextInput>

      <Button onPress={submitNewChit} title="Submit" />

      <View>
        <Text>{useAppSelector((state) => state.libraryReducer.error)}</Text>
      </View>

    </View>
    //     

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    flex: 2
  },
  viewport: {
    flex: 8
  }
});
