import React, { useState } from "react";
import {KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity} from "react-native";
import firebase from "../../config/firebaseconfig"
import styles from "./style";
import { MaterialCommunityIcons } from "@expo/vector-icons"


export default function NewUser({ navigation }){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorRegister, setErrorRegister] = useState("");

    const register = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
        let user = userCredential.user;
        navigation.navigate("Task", { idUser: user.uid })
    
      })
    
      .catch((error) => {
        setErrorRegister(true)
        let errorCode = error.code;
        let errorMessage = error.message;
        
      });
    };

    
    return(
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        >
            <Text style={styles.title}>Create a Task account</Text>
        <TextInput
        style={styles.input}
        placeholder="enter your email"
        type="text"
        onChangeText={(text) => setEmail(text)}
        value={email}
        />
        <TextInput
        style={styles.input}
        placeholder="enter a password"
        type="text"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        />

            {errorRegister === true 
            ?
            <View style={styles.contentAlert}>
            <MaterialCommunityIcons
            name="alert-circle"
            size={20}
            color="#bdbdbd"
            />
            <Text style={styles.warningAlert}>invalid email or password</Text>
            </View>
            :
            <View/>
            }

           {email === "" || password === ""
           ?
            
            <TouchableOpacity
            disabled={true}
            styles={styles.buttonRegister}
            >
            <Text style={styles.textButtonRegister}>Register</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.buttonRegister}
            onPress={register}
            >
                <Text style={styles.textButtonRegister}>Register</Text>
            </TouchableOpacity>
            }

        
            <Text style={styles.login}>
            already register ?
            <Text
            style={styles.linkLogin}
            onPress={() => navigation.navigate("Login")}
            >
            Login...
            </Text>
            </Text>
            <View style={{ height: 100}}/>

        </KeyboardAvoidingView>
        
    )
};