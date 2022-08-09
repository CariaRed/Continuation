import React, {useState, useEffect} from "react";
import { View, Text, TouchableOpacity, FlatList} from "react-native"

import firebase from "../../config/firebaseconfig";
import { FontAwesome} from "@expo/vector-icons"
import styles from "./style";

export default function Task({ navigation, route }){
    const [task, setTask] = useState([])
    const database = firebase.firestore();
    
    function deleteTask(id){
        database.collection(route.params.idUser).doc(id).delete({})
    }
    

    useEffect(() => {
        database.collection(route.params.idUser).onSnapshot((query) => {
            const list = []
            query.forEach((doc) => {
                list.push({...doc.data(), id: doc.id})
            })
            setTask(list)
        })
    }, [])

    return(
        <View style={styles.container}>
            <FlatList
            showVerticalScrollIndicator={false}
            data={task}
            renderItem={({ item })=>{
                return(
            <View style={styles.Tasks}>
            <TouchableOpacity 
            style={styles.deleteTask}
            onPress={() => {
                deleteTask(item.id)
                
            }    
            }
            >
            <FontAwesome
                name="star"
                size={23}
                color="#F92e6A"            
            >
            </FontAwesome>
            </TouchableOpacity>
            <Text
            style={styles.DescriptionTask}
            onPress={()=> {
                navigation.navigate("Details", {
                    id: item.id,
                    description: item.description,
                    idUser: route.params.idUser,
                })
            }
            }
           >
                {item.description}
            </Text>
           </View>
           )
        }}
        keyExtractor={(item) => item.id}
        />
            <TouchableOpacity style={styles.buttonNewTask}
            onPress={() => navigation.navigate("NewTask", { idUser: route.params.idUser })}
            >
                <Text style={styles.iconButton}>+</Text>
            </TouchableOpacity>
        </View>
    )
}