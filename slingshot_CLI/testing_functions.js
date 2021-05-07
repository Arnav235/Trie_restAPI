const fetch = require('node-fetch')
const server_URL = 'http://localhost:3000'

function display(){
    fetch(server_URL + '/display')
        .then(response => response.text())
        .then(data => console.log("The trie currently containes: " + data))
        .catch(err => console.log("The request failed: " + err)) 
}
function find(word){
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
}
function autocomplete (word){
    fetch(server_URL + '/autocomplete/' + word)
        .then(response => response.text())
        .then(data => console.log("The autocomplete suggestions found for the word '" + word + "' are: \n" + data))
        .catch(err => console.log("The request failed: " + err)) 
}
function add (word){
    fetch(server_URL + '/add/' + word, {method: "PATCH"}) 
    .catch(err => console.log("The request failed: " + err)) 
}
function remove (word) {
    fetch(server_URL + '/delete/' + word, {method: "DELETE"})
    .catch(err => console.log("The request failed: " + err)) 
}

module.exports = {display, find, autocomplete, add, remove}