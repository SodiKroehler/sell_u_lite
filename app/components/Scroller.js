'use client'
import {useEffect, useState} from "react";
import {ScrollView, Button, Text, View, FlatList, StyleSheet, Dimensions, useWindowDimensions} from "react-native";
// import {chitRecommender} from '../api/VANESSA/VANESSA'
import Chit from './Chit.js'
import Tile from "./Tile.js";
import { useAppDispatch, useAppSelector } from "../lib/redux/hooks";
import {librarySlice} from '../lib/redux/slices/librarySlice'
import {FOREGROUND, LIGHT, DARK, ACCENT} from './../styles/colors.js';
import Tarryer from "./Tarryer.js";
import tw from '@styles/tw'


export default function Scroller (props) {

    const dispatch = useAppDispatch();
    const loading = useAppSelector((state) => state.libraryReducer.loading);
    const chits = useAppSelector((state) => state.libraryReducer.chits); 
    // const tiles = useAppSelector((state) => state.libraryReducer.tiles); 
    const flo = useAppSelector((state) => state.libraryReducer.currFlo); 
    const page = useAppSelector((state) => state.libraryReducer.currPage);

    let h = Math.floor(useWindowDimensions().height * 0.4);
    let w = Math.floor(h * 0.9);
    let numCols = Math.floor(useWindowDimensions().width / (w+100) );


    const [tiles, settiles] = useState([1,2,3,4,5,6,7,8,9]);

    const _renderChit = ({item, index}) => {
        return (
            <View style={[
                {backgroundColor: FOREGROUND,
                    // paddingRight:5,
                    // paddingLeft:5
                },
                  index % numCols === 0
                ? {
                //   paddingRight: 10,
                } : {
                  paddingLeft: 10
                }
              ]}>
                <Chit 
                    id = {item.id} 
                    name = {item.fullname} 
                    url = {item.link}
                    img = {item.gif} 
                    dims = {{w: w, h: h}}
                    onClick = {null}
                    onRightClick = {null}
                    key={h}
                ></Chit>
            </View>

        );
    }

    const _renderTile = ({item}) => {
        return (
            // <Tile 
            //     id = {item.id} //same as position
            //     link = {item.link}
            //     name = {item.name}
            //     cardWidth = {w}
            //     onClick = {null}
            //     img = {item.gif}
            //     onRightClick = {null}
            //     selected = {false}
            //     key={h}
            // ></Tile> 

            <Text style={tw`w-80 h-80 bg-fg text-light text-4xl`}>
                {item.id}
            </Text>
        );
    }
    
    const _fetchMoreChits = () => {

        let lastTile = tiles[tiles.length - 1]
        let customTiles = []

        console.log("fetch more called")
        for (let i=0; i<10; i++){
            lastTile+=1;
            customTiles.push(lastTile)
            
        }
        settiles(tiles.concat(customTiles))
        
        // fetch more tiles
        // if (!loading){
        //     dispatch(librarySlice.actions.nextPage());
        //     // dispatch(librarySlice.actions.setLoading(true));
        // }
    }

  

    // const _renderEmpty = () => {
    //     return(
    //     <View>
    //         <Text>No Data atm</Text>
    //         <Button onPress={() => _fetchMoreChits()} title = "refresh" />
    //     </View>
    //     )
    // }

    // const _renderFooter =() => {
    //     return (
    //     <View>
    //         {/* <Button onPress={() => dispatch(librarySlice.actions.init())} title = "init" /> */}
    //         {loading && <ActivityIndicator />}
    //         {/* {ending && <Text>No more chits buster</Text>} */}
    //     </View>
    //     )
    // }
    
    let callOnScrollEnd = false;

    const _processViewChange = ({viewableItems, changed}) => {
        console.log("Visible items are", viewableItems);
        console.log("Changed in this iteration", changed);

        let isNotPastThreshold = true;

        for (let k=0;k<viewableItems.length-5; k++){
            if (t.id == viewableItems[viewableItems.length].id){
                isNotPastThreshold = false; 
            }
        }

        isNotPastThreshold && console.log("refreshing")

      };


    const spViewConfig = {
        waitForInteraction: false,
        itemVisiblePercentThreshold: 75,
        minimumViewTime: 10
      }

    return(
        <View style = {styles.container}>
            {flo !== "live" && <FlatList
            data = {chits}
            renderItem ={_renderChit}
            ListEmptyComponent = {<Tarryer />}
            numColumns = {numCols} //{Math.floor(realW/ (w + 160))}
            ItemSeparatorComponent={
                (({highlighted}) => (
                  <View style={styles.seperator}>
                  </View>
                ))
            }
            key={h} //dont change, enables rerenders on resize
            getItemLayout={(data, index) => (
                {length: h, widthoffset: h * index, index}
            )}
            />}
            {flo === "live" && 
    //         <ScrollView 
    //             style ={tw`w-76`} 
    //             onScroll = {() => {console.log('scrollin')}}>
    //     <Text style={tw`text-5xl`}>
    //       Lorem ipsum
    //     </Text>
    //   </ScrollView>
            <FlatList
            style = {{width: w, height: (h*1.5)}}
            data = {tiles}
            renderItem ={_renderTile}
            ListEmptyComponent = {<Tarryer />}
            numColumns = {1}
            ItemSeparatorComponent={
                (({highlighted}) => (
                  <View style={styles.seperator}>
                  </View>
                ))
            }
            showsHorizontalScrollIndicator={false}
            // onEndReached={() => {callOnScrollEnd = true }}
            // onMomentumScrollBegin = {() => {
            //     console.log("scrolled")
            //     callOnScrollEnd && _fetchMoreChits()
            //     callOnScrollEnd = false
            // }}
            onViewableItemsChanged = {_processViewChange}
            viewabilityConfig = {spViewConfig}
            getItemLayout={(data, index) => (
                {length: h, offset: (h * index) + (h * 0.4), index}
            )}
            />
            }
        </View>
        
    );
}

//https://suelan.github.io/2020/01/21/onViewableItemsChanged/

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        backgroundColor: FOREGROUND,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    seperator: {
        backgroundColor: FOREGROUND,
        // width: 100,
        // height: 500,
        // border: 1,
        // borderColor: LIGHT,
        padding: 5,
    },
    saveButton:{
        width: 1,
        height: 1,
        color: DARK
    }
});



 // refreshing = {loading}
            // extraData = {page}
            // ListHeaderComponent={_renderHeader}
            // ListFooterComponent ={_renderFooter}
            // ListEmptyComponent ={_renderEmpty}
            // onEndReachedThreshold={0.2}
            // onEndReached={({distanceFromEnd }) => {
            //     console.log("distance from end is " + distanceFromEnd.toString());
            //     if (distanceFromEnd > 0) {
            //         _fetchMoreChits()
            //     }
            // }
            
            // }
            // pagingEnabled = {true}
            // initialNumToRender = {10}
            // getItemLayout={(chits, index) => (
            //     {length: 500, offset: 500 * index, index}
            //   )}
            // onEndReached = {_fetchMoreChits}
            // onEndReached={callOnScrollEnd = true}
            // onMomentumScrollEnd={() => {
            //     _fetchMoreChits(callOnScrollEnd);
            //     callOnScrollEnd = false;
            //   }
            // }

              // const _apiReq = () => {
    //     const newChitNum = chits.length.toString();
    //     if (newChitNum < 10){
    //         dispatch(librarySlice.actions.addChit(newChitNum));
    //     }
    //     // dispatch(librarySlice.actions.setLoading(false));
    // }

    // useEffect(() => {
    //     _apiReq();
    //     console.log("requested for page " + page.toString());
    // }, [page])