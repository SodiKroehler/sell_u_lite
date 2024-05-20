'use client'
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Pressable } from "react-native";
import { COLORS } from './../styles/colors'
import ReactPlayer from 'react-player/lazy'

export default function Tarryer(props) {
    let BG = { backgroundColor: COLORS.DARK._ }
    let FG = COLORS.PRI._;
    if (props.bg) {
        BG = { backgroundColor: props.bg };
    }
    if (props.fg) {
        FG = props.fg;
    }

    return (
        // <View style={[BG, styles.container]}>
        //     <ActivityIndicator size="large" color={FG}/>
        // </View>

        <ReactPlayer
            url={"/loading.mp4"}
            controls={false}
            loop={true}
            playing={true}
            volume={0.9}
            muted={true}
            width="100%"
            height="100%"
        />
    );
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    bigText: {
        fontSize: 15,
        color: 'black'
    },
    RedText: {
        fontSize: 16,
        color: 'red'
    }
});
