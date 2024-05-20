'use client'
import React, { useEffect } from 'react';
import Image from 'next/image'
import {View, StyleSheet, TextInput, Text, Pressable, FlatList } from 'react-native';
import logo from '/public/logo.png';
import inkBlotPng from '/public/inkblot.png';
import { signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'

import {COLORS} from './../styles/colors.js';
import rncomps from './../styles/rn_comps';

const tsAlbums = [
    {id: 1, title: "N/A"},
    {id: 2, title: "Graduation"},
    {id: 3, title: "Debut"},
    {id: 4, title: "Fearless"},
    {id: 5, title: "Speak Now"},
    {id: 6, title: "Red"},
    {id: 7, title: "1989"},
    {id: 8, title: "Reputation"},
    {id: 9, title: "Lover"},
    {id: 10, title: "Folklore"},
    {id: 11, title: "Evermore"},
    {id: 12, title: "Midnights"},
    {id: 13, title: "All of them"},
]


const generateScale = (handler, actions, names) => {
    const pieces = []
    let coolors = [rncomps.pri_l2, rncomps.pri_l1, rncomps.pri, rncomps.pri_d1, rncomps.pri_d2]
    if (names.length <4){coolors = [rncomps.pri_l2, rncomps.pri, rncomps.pri_d2] }
    for (let i=0; i<names.length; i++){
        let rad = rncomps.mid_rad;
        if (i === 0) {rad = rncomps.left_rad}
        else if (i === (names.length-1)) {rad = rncomps.right_rad}
        pieces.push({
            id: i,
            action: actions[i],
            name: names[i],
            rad: rad,
            color: coolors[i]})
    }
    
        
    return (
        <View style={styles.rowDiv}>
            {pieces.map((piece) => {
                return (
                <Pressable
                    key = {piece.id}
                    style = {[piece.color, piece.rad, styles.button]}
                    onPress= {() => handler(piece.action)}>
                    <Text style= {styles.buttonText}>{piece.name}</Text>
                </Pressable>)
            })}
        </View> 
    )
}

const _submitUserData = async (userData) => {
    await fetch('/api/createUser', {
        method: "POST",
        body: JSON.stringify(userData)
    })
    console.log("submitted")
}

export default function NewUserModal(props) {

    const [firstName, setFN] = React.useState("first name");
    const [lastName, setLN] = React.useState("last name");
    const [middleInitial, setMI] = React.useState("initial");
    const [tag, setTag] = React.useState("");
    const [inkBlotText, setInkBlotText] = React.useState("");
    const [stepCompleted, step] = React.useState(0);
    const [password, setPassword] = React.useState('');
    const [passwordStatus, setPasswordStatus] = React.useState(0);
    const [tsDropDownState, setTsDropdownState] = React.useState(false);
    const [tsAlbum, setTsAlbum] = React.useState('');
    const userData = {}
    const router = useRouter()


    useEffect(() => {
        if (password.includes(['@', '#', '$', '%', '^', '&', '*', '(', ')'])){
            setPassword("unsupported character present")
        } else {
            setPassword("password must contain a special character")
        }

        if(password.length === 6){
            setPasswordStatus("Password must be longer than 12 characters")
        }
        else if(password.length < 18 && password.length > 12){
            setPasswordStatus("Password is too long")
        }

        if (password.length ===13){
            setPasswordStatus("password cannot be a password")
        }
        if (password === 'password'){
            setPasswordStatus("very strong password detected, well done")
        }
    }, [password])

    useEffect(() => {
        userData['ts'] = tsAlbum, 
        setTsDropdownState(false)
    }, [tsAlbum])

  //confirm email
  //fn, me, ln
  //publically available name
  //robot?
  //ink blot test
  //do you have a uncle thrice removed named Greg
  //password w changing reqs
  //gender
  //favorite ts song
  //ethics question?

    const _emailAccepter = (answer) => {
        userData['email'] = props.email;
        switch (answer){
            case "accepted":
                step(stepCompleted + 1)
                userData['emailAccepted'] = true;
                break;
            case "declined":
                signOut()
                break;
            case "existing":
                //need to get from vannessa eventually and relink
                //for now just boot
                signOut()
                break;
                // router.push("/")
        }
    }

    const _handleRobot = (pos) => {
        step(stepCompleted + 1)
        userData['robot'] = pos;
    }

    const _handleGreg = (val) => {
        step(stepCompleted + 1)
        userData['greg'] = val;
    }

    const _handleObgyn = (val) => {
        step(stepCompleted + 1)
        userData['obgyn'] = val;
    }

    const _handleKant = (val) => {
        step(stepCompleted + 1)
        userData['kant'] = val;
    }

    const _handleAge = (val) => {
        step(stepCompleted + 1)
        userData['adult'] = val;
    }

    const submitUserData = () => {
        _submitUserData(userData);
        router.push('/')

    }
    
    const email = () => {
        return (<View style={styles.questionContainer}>
            <Text style={styles.question}>Is {props.email} a good email for you?</Text>

            {generateScale(_emailAccepter, 
                ['denied','accepted','existing'], 
                ["not me", "sure", "not a new user"])}
        </View>)}

    const fullname = () => {
        let combinedName = firstName + " " + middleInitial + " " + lastName
        let prompt = "Please enter your name";
        return (<View style={styles.questionContainer}>
            <Text style={styles.question}>{prompt}</Text>

            <View style={styles.rowDiv}>
                <TextInput onChangeText={setFN} placeholder = {firstName} style={[rncomps.left_rad, styles.textAnswer]}></TextInput>
                <TextInput onChangeText={setMI} placeholder = {middleInitial} style={[rncomps.mid_rad, styles.textAnswer]}></TextInput>
                <TextInput onChangeText={setLN} placeholder = {lastName} style={[rncomps.mid_rad, styles.textAnswer]}></TextInput>

                <Pressable
                    style = {[rncomps.pri_d1, rncomps.right_rad, styles.button]}
                    onPress= {() => {
                        step(stepCompleted + 1)
                            userData['publicName'] = combinedName
                        }}>
                    <Text style= {styles.buttonText}>done</Text>
                </Pressable>
            </View>
        </View>)}

    const displayName = () => {
        const prompt = "Publicly, you'll be known as ... ?"
        return (<View style={styles.questionContainer}>
            <Text style={styles.question}>{prompt}</Text>

            <View style={styles.rowDiv}>
                <TextInput onChangeText={setTag} placeholder = {props.possTag} style={[rncomps.left_rad, styles.textAnswer]}></TextInput>

                <Pressable
                    style = {[rncomps.pri_d1, rncomps.right_rad, styles.button]}
                    onPress= {() => {
                        step(stepCompleted + 1)
                            userData['publicName'] = tag
                        }}>
                    <Text style= {styles.buttonText}>done</Text>
                </Pressable>
            </View>
        </View>)}


    const robot = () => {
        return (<View style={styles.questionContainer}>

            <Text style={styles.question}>How confident are you that you are not a robot?</Text>
            {generateScale(_handleRobot, [1,2,3,4,5], ["probably am", "unsure", "uh kinda", "very much", "10000000"])}

        </View>)}

    const inkBlot = () => {
        return (<View style={styles.questionContainer}>

            <Text style={styles.question}>What does this look like to you?</Text>

            <Image src={inkBlotPng} width={1280} height={942} alt={"an ink blot picture"}
            style={styles.inkblot}></Image>

            <View style={styles.rowDiv}>
                <TextInput onChangeText={setInkBlotText}
                            style={[rncomps.left_rad, styles.textAnswer]}
                            multiline={true}
                ></TextInput>
                <Pressable
                    style = {[rncomps.pri, rncomps.right_rad, styles.button]}
                    onPress= {() => {
                        step(stepCompleted +1);
                        userData['inkBlot'] = inkBlotText;
                    }}>
                    <Text style= {styles.buttonText}>done</Text>
                </Pressable>
            </View>
        </View>)}

    const greg = () => {
        return (<View style={styles.questionContainer}>

            <Text style={styles.question}>Do you have a third possible uncle, twice removed and thrice bereaved, named "Greg" or "Gary"?</Text>

            {generateScale(_handleGreg, [true, false], ["yes", "no"])}
        </View>)}

    const pwd = () => {
        return (<View style={styles.questionContainer}>

            <Text style={styles.question}>Please enter a password:</Text>

            <View style={styles.rowDiv}>
                <TextInput onChangeText={setPassword}
                            style={[rncomps.left_rad, styles.textAnswer]}
                            multiline={false}
                            secureTextEntry={true}
                ></TextInput>
                <Pressable
                    style = {[rncomps.pri, rncomps.right_rad, styles.button]}
                    onPress= {() => {
                        step(stepCompleted +1);
                        userData['password'] = password;
                    }}>
                    <Text style= {styles.buttonText}>done</Text>
                </Pressable>
            </View>

            <Text style={styles.passwordStatus}>{passwordStatus}</Text>

        </View>)}

    const obgyn = () => {
        return (<View style={styles.questionContainer}>

            <Text style={styles.question}>Your preferred fingernail treatment:</Text>

            {generateScale(_handleObgyn, ['chewed', 'clipped', 'mani'], ['chewed', 'clipped', 'mani'])}

        </View>)}

    const ts = () => {
        return (<View style={styles.questionContainer}>

            <Text style={styles.question}>Which Taylor Swift album are you?</Text>

            <View style={styles.rowDiv}>
                <View style={[{width: 255, height: 59}, rncomps.left_rad, styles.textAnswer]}></View>
                <Pressable
                    style = {[rncomps.pri, rncomps.right_rad, styles.button]}
                    onPress= {() => {
                        setTsDropdownState(!tsDropDownState)
                    }}>
                    <Text style= {styles.buttonText}>^</Text>
                </Pressable>
            </View>

            {tsDropDownState === true && <View style ={{
                width:250, 
                height:150, 
                backgroundColor: COLORS.PRI._,
                position: 'relative',
                top: -50,
                right: 17,
                padding:2, 
                borderColor: COLORS.PRI._,}}>
                <FlatList
                    data = {tsAlbums}
                    renderItem ={(item, index) => {
                        return (
                            <Pressable
                                style = {styles.tsAlbumButton}
                                onPress= {() => {
                                    step(stepCompleted +1);
                                    setTsAlbum(item.item.title)
                                }}>
                                <Text style={styles.tsAlbum}>{item.item.title}</Text>
                            </Pressable>
                        )
                    }}
                    showsVerticalScrollIndicator = {false}
                    />
            </View>}
            

        </View>)}

    const ethics = () => {
        return (<View style={styles.questionContainer}>

            <Text style={styles.question}>What is your opinion on the ethical theories of Emmanuel Kant?</Text>

            {generateScale(_handleKant,
            ["sheer baloney", "ughhhhhh","i'm clueless", "it's okay", "genius"], 
            ["sheer baloney", "ughhhhhh","i'm clueless", "it's okay", "genius"])}

        </View>)}

    const age = () => {
        return (<View style={styles.questionContainer}>

            <Text style={styles.question}>Keep it PG-13?</Text>

            {generateScale(_handleAge, [false, true], ["yes", "no"])}

        </View>)}

    return (
    <View style = {styles.container}>

        <View style = {styles.logoContainer}>
            <Image src={logo} width={1366} height={768} alt="chitters logo" 
            style={styles.logo}/> 
        </View>

        <Text style={styles.heading}>New User Signup</Text>

        {email()}

        {stepCompleted >= 1 && fullname()}
        {stepCompleted >= 2 && displayName()}
        {stepCompleted >= 3 && robot()}
        {stepCompleted >= 4 && inkBlot()}
        {stepCompleted >= 5 && greg()}
        {stepCompleted >= 6 && pwd()}
        {/* {stepCompleted >= 7 && obgyn()} */}
        {stepCompleted >= 7 && ts()}
        {stepCompleted >= 8 && ethics()}
        {stepCompleted >= 9 && age()}

        {stepCompleted >= 10 && 
            <Pressable
                style = {[rncomps.pri, rncomps.full_rad, styles.button]}
                onPress= {() => submitUserData()}>
                <Text style= {styles.buttonText}>done</Text>
            </Pressable>
        } 
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: '100%',
    position:'absolute',
    top: 0,
    // zIndex: 4,
    backgroundColor: COLORS.LIGHT._,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: '50%',
    height: '20%',
    margin: 50,
    backgroundColor: COLORS.LIGHT._,
  },
  rowDiv: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: 'row',
    backgroundColor: COLORS.LIGHT._,
    marginBottom: 50, 
  },
  logo:{
    resizeMode: 'contain',
    width: '100%',
    height: 'auto'
  },
  inkblot:{
    resizeMode: 'contain',
    width: '50%',
    height: 'auto',
    margin: 50,
  },
  questionContainer:{
    width: '75%',
    alignItems: "center",
  },
  question:{
    color: COLORS.PRI._, 
    fontSize: 18,
    fontFamily:'heebo',
    marginBottom: 15, 
    marginTop: 75,
  },
  heading:{
    color: COLORS.PRI._, 
    fontSize: 30,
    marginHorizontal: 15,
    fontFamily:'heebo',
    fontWeight: 'bold',
    // marginBottom: 50,
  },
  button: {
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    fontFamily:'heebo',
    fontSize: 20,
    color: COLORS.DARK._,
  },
  textAnswer: {
    backgroundColor: COLORS.LIGHT.alt_light1,
    padding: 14,
    fontSize: 20,
    fontFamily:'heebo',
    marginHorizontal: 1,
    borderColor: COLORS.PRI._,
    borderWidth: 1,
  },
  passwordStatus:{
    color: 'red', 
    fontSize: 10,
    fontFamily:'heebo',
  },
  tsAlbumButton: {
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.PRI._,
    backgroundColor: COLORS.LIGHT.alt_light1,
    margin: 1,

  },
  tsAlbum: {
    fontFamily:'heebo',
    fontSize: 14,
    color: COLORS.DARK._,
  },

});





