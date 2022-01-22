import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, FlatList, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#E8EAED'
    },

    wrapper: {
        paddingTop: 80,
        paddingHorizontal: 20
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },

    input: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    inputWrite: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        width: 250,
        borderWidth: 1
    },


    inputButton: {
    },

    listTodo: {
        marginTop: 24
    },

    todo: {
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        borderRadius: 10,
        padding: 15
    },

    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },

    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 8,
        marginRight: 15
    },

    itemText: {
        maxWidth: '80%'
    },

    circular: {
        width: 12,
        height: 12,
        backgroundColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5
    }
})

export default function Todo() {
    const [list, setList] = useState<string[]>([])
    const [name, setName] = useState("");

    function addTodo() {
        if (name.length == 0) {
            Alert.alert("Informe uma tarefa para a lista")
        } else {
            if (list.find(nome => nome === name)) {
                Alert.alert("Essa tarefa ja existe")
                return;
            }

            if(list.length === 6 || list.length > 6) {
                Alert.alert("Lista cheia")
                return;
            }

            setList([...list, name])
            setName("")
            return;
        }
    }

    function removeItem(index : number) {
        var array = [...list];

       array.splice(index, 1);

       setList(array);
    }

    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>

                <Text style={styles.title}>Lista de tarefas</Text>

            </View>

            <View style={styles.listTodo}>
                {Object.keys(list).length === 0 ? <Text>Nenhuma tarefa encontrada</Text> : <FlatList keyExtractor={(item, index) => item} data={list} renderItem={(item) => (
                    <View style={styles.todo}>
                        <View style={styles.itemLeft}>
                            <TouchableOpacity onPress={() => removeItem(item.index)} style={styles.square}></TouchableOpacity>

                            <Text style={styles.itemText}>{item.item}</Text>
                        </View>

                        <View style={styles.circular}></View>
                    </View>
                )} />}
            </View>

            <KeyboardAvoidingView style={styles.input} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TextInput style={styles.inputWrite} value={name} onChangeText={(name) => setName(name)} placeholder='Informe a tarefa' />
                <TouchableOpacity style={styles.inputButton} onPress={() => addTodo()}>
                    <AntDesign name="pluscircle" size={42} color={'blue'} />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}