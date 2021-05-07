#!/usr/bin/env node

const fetch = require('node-fetch')
const server_URL = 'https://slingshot-server1-tz6carz7la-ue.a.run.app'

// In the CLI, the first command line argument corresponds to the action the user wants to do
let command = process.argv[2]

// Displays all words currently in trie
if (command == 'display'){
    fetch(server_URL + '/display')
        .then(response => response.text())
        .then(data => console.log("The trie currently containes: " + data))
        .catch(err => console.log("The request failed: " + err)) 
    
    // Unless the command is 'display', the user must have a second argument. If they do not, then we print this message
} else if (process.argv[3] == undefined){
    console.log("That was an invalid command. The available commands are 'display', 'add', 'delete', 'find', and 'autocomplete'")
    console.log("All of the commands excluding the 'display' require a second argument. Ex. trie add apple – adds the word 'apple'")
    
    // Adds word
} else if (command == 'add'){
    word = process.argv[3]
    fetch(server_URL + '/add/' + word, {method: "PATCH"})
        .then(response => response.json())
        .then((data) => {
            if (data.message == 'ok'){
                console.log("The word '" + word + "' has been successfully added")
            }
        })
        .catch(err => console.log("The request failed: " + err)) 

    // Deletes word
} else if (command == 'delete'){
    word = process.argv[3]
    fetch(server_URL + '/delete/' + word, {method: "DELETE"})
        .then(response => response.json())
        .then((data) => {
            if (data.message == 'ok'){
                console.log("The word '" + word + "' has been successfully deleted")
            }
        })
        .catch(err => console.log("The request failed: " + err)) 
    
    // Checks whether a certain word is in the trie
} else if (command == 'find'){
    word = process.argv[3]
    fetch(server_URL + '/find/' + word)
        .then(response => response.text())
        .then((data) => {
            if (data == 'true'){
                console.log("The word '" + word + "' was found")
            } else {
                console.log("The word '" + word + "' was not found") 
            }
        })
        .catch(err => console.log("The request failed: " + err)) 
    
    // Gets a list of autocomplete suggestions based on a prefix
} else if (command == 'autocomplete'){
    word = process.argv[3]
    fetch(server_URL + '/autocomplete/' + word)
        .then(response => response.text())
        .then(data => console.log("The autocomplete suggestions found for the word '" + word + "' are: \n" + data)) 
        .catch(err => console.log("The request failed: " + err))    

    // If the user's command does not match any of those arguments, then we print this message
} else {
    console.log("That was an invalid command. The available commands are 'display', 'add', 'delete', 'find', and 'autocomplete'")
    console.log("All of the commands excluding the 'display' require another parameter. Ex. trie add apple – adds the word 'apple'")
}