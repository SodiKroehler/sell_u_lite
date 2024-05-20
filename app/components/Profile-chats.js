'use client'
import React, { useEffect } from 'react';
import Image from 'next/image'
import { View, StyleSheet, Pressable, Text, TextInput } from 'react-native';
import { FOREGROUND, LIGHT, DARK, DARK_BORDER } from './../styles/colors.js';

export default function ProfileChats(props) {

    const allChats = ["sample1", "sample2"]
    const selectedChat = ["some nonsense", "some other meaningful nonsense", "vanity"]
    return (
        <View style={styles.container}>

            <View style={styles.allChatsBox}>{allChats}</View>

            <View style={styles.currChatBox}>
                <View style={styles.currChat}></View>
                <TextInput style={styles.input}></TextInput>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: LIGHT,
        borderColor: DARK,
        borderWidth: '5px',
        color: LIGHT
    },
    allChatsBox: {
        flex: 1,
        backgroundColor: LIGHT
    },
    currChatBox: {
        flex: 3
    },
    currChat: {
        flex: 6
    },
    input: {
        flex: 1,
        borderColor: DARK,
        borderWidth: '5px'
    }
})