'use client'
import React, { useEffect } from 'react';
import Image from 'next/image'
import { View, StyleSheet, FlatList, Text, Pressable } from 'react-native';
import { FOREGROUND, LIGHT, DARK, DARK_BORDER } from './../styles/colors.js';

export default function ProfilePersonal(props) {

    return (
        <View style={styles.container}>

            <Text style={styles.instructions}>{props.displayName}</Text>
            <Text style={styles.instructions}>{props.stars} stars</Text>
            <Text style={styles.instructions}>{props.pandas} pandas</Text>
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