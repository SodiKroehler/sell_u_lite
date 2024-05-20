'use client'
import React, { useEffect } from 'react';
import Image from 'next/image'
import { View, StyleSheet, FlatList, Text, Pressable } from 'react-native';
import { FOREGROUND, LIGHT, DARK, DARK_BORDER } from './../styles/colors.js';

export default function ProfilePersonal(props) {

    const listOfRooms = ["room1", "room2"]
    return (
        <View style={styles.container}>
            {listOfRooms}
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
})