'use client'

import NoSSR from 'react-no-ssr'
import { useEffect, useState } from "react";

import ReactPlayer from 'react-player/lazy'
import { StyleSheet, Text, View, Pressable } from "react-native";
import { COLORS } from './../styles/colors.js';


export default function Chit(props) {
    const [playing, changePlaying] = useState(false);
    const [cxMenuState, setCxMenuState] = useState(false);

    const hoverFunc = (props, boul) => {
        changePlaying(boul)
    }

    const cxMenuSize = StyleSheet.compose({
        width: (props.dims.w / 2),
        height: (props.dims.w / 2),
        left: (props.dims.w / 4),
        top: ((props.dims.h - (props.dims.w / 2)) / 2),
    })

    const collection = (props.details?.collectionId) ? props.details.collectionId : "None";

    return (
        <NoSSR>
            <Pressable
                onHoverIn={() => hoverFunc(props, true)}
                onHoverOut={() => hoverFunc(props, false)}
                onPress={() => props.onClick(props.id)}
                onLongPress={() => setCxMenuState(!cxMenuState)}
            >
                <ReactPlayer
                    url={props.url}
                    controls={false}
                    // light = {<Image url ={props.img} style = {styles.previewImage} /> }
                    loop={true}
                    playing={playing}
                    volume={0.9}
                    muted={false}
                    width={props.dims.w}
                    height={props.dims.h}
                />
            </Pressable>


            {cxMenuState === true &&
                <View style={[cxMenuSize, styles.cxMenu]}>
                    <Pressable style={styles.closeBut}
                        onPress={() => setCxMenuState(false)}>
                        <Text style={styles.closeX}>x</Text>
                    </Pressable>
                    <Text style={styles.info}>
                        <Text style={styles.infoName}>Collection Id: </Text>
                        {collection}
                    </Text>
                    <Text style={styles.info}>
                        <Text style={styles.infoName}>Name: </Text>
                        {props.name}
                    </Text>
                    <Pressable
                        onPress={() => props.onRightClick(props.id, "swap")}
                        style={[styles.swapButton, styles.cxMenuItem]}
                    >
                        <Text>Switch With Similar</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => props.onRightClick(props.id, "condemn")}
                        style={[styles.condemnButton, styles.cxMenuItem]}
                    >
                        <Text>Switch With Different</Text>
                    </Pressable>
                </View>}
        </NoSSR>
    );
}


const styles = StyleSheet.create({
    cxMenu: {
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 14,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },
    info: {
        color: COLORS.DARK._,
        fontFamily: 'heebo',
    },
    infoName: {
        color: COLORS.PRI.alt_dark1,
        fontFamily: 'heebo',
    },
    swapButton: {
        borderRadius: 5,
    },
    condemnButton: {
        borderRadius: 5,
    },
    cxMenuItem: {
        backgroundColor: COLORS.PRI._,
        padding: 5,
        margin: 1,
    },
    closeBut: {
        borderWidth: 1,
        borderColor: COLORS.DARK._,
        borderRadius: 5,
        position: 'absolute',
        top: 5,
        right: 5,
        lineHeight: 1,
        paddingHorizontal: 5,
    },
    closeX: {
        fontFamily: 'heebo',
    }
});
