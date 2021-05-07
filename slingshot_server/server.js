const express = require('express')
const port = process.env.PORT || 3000

let app = express()

// This is the class used to construct a node in the trie
class TrieNode {
    constructor () {
        this.isEnd = false
        this.children = new Map()
    }
}

// This is the object used to hold the entire trie graph
function TrieGraph(){
    this.root = new TrieNode()
}

// This function inserts a word into the trie
TrieGraph.prototype.add = function(word){
    let currentNode = this.root

    for (let i = 0; i < word.length; i++){
        c = word.charAt(i)
        if (!currentNode.children.has(c)){
            currentNode.children.set(c, new TrieNode())
        }
        currentNode = currentNode.children.get(c)
    }
    currentNode.isEnd = true
}

// This function checks whether a certain word is already in the trie. It returns true or false
TrieGraph.prototype.find = function(word) {
    let currentNode = this.root

    for (let i = 0; i < word.length; i++){
        if (!currentNode.children.has(word.charAt(i))) {
            return false
        }
        currentNode = currentNode.children.get(word.charAt(i))
    }
    
    return currentNode.isEnd
}

// This function deletes a word from the trie
TrieGraph.prototype.delete = function(word){
    if (this.find(word)){
        delete_helper(this.root, word, 0)
    }
}

// This function takes a prefix and finds all of the words in the trie which also have that prefix
TrieGraph.prototype.autocomplete = function(prefix){
    let currentNode = this.root
    for (let i = 0; i < prefix.length; i++){
        if (!currentNode.children.has(prefix.charAt(i))){
            return []
        }
        currentNode = currentNode.children.get(prefix.charAt(i))
    }
    return display_helper(currentNode, prefix)
}

// This function returns all of the words in the trie
TrieGraph.prototype.display = function(){
    return display_helper(this.root, "")
}

// This is the recursive function used to help delete words from the trie
function delete_helper(node, word, depth){

    if (depth == word.length){
        node.isEnd = false
        if (node.children.size == 0){
            return true
        } else {
            return false
        }
    }

    if (delete_helper(node.children.get(word.charAt(depth)), word, depth+1)){
        // If the child didn't have any other children, then we can delete the reference to it in its parent
        // The Javascript garbage collector will then automatically delete the node (at least that's what the docs said)
        node.children.delete(word.charAt(depth)) 
        if (node.children.size == 0 && !node.isEnd){
            return true
        } else {
            return false
        }
    }
    return false
}

// This recursive function was used to help with autocomplete suggestions and find all the words in the trie
function display_helper (node, str){
    let words_arr = []
    if (node.children.size == 0){
        return words_arr
    }
    for (let [key, value] of node.children){
        if (value.isEnd){
            words_arr.push(str + key)
        }
        words_arr = [...display_helper (node.children.get(key), str + key), ...words_arr]
    }
    return words_arr
}



trie = new TrieGraph()

// This express route is here just in case someone tries to access it
app.get('/', (req, res, next) => { 
    res.send(`Hello! Welcome to this trie application. \nTry curling to '/display' to see what's currently in the trie`)
})

// This express route returns all of the words in the trie so that the CLI can display it
app.get('/display', (req, res) => { 
    res.send(trie.display())
})

// express route checks whether a certain word is in the trie
app.get('/find/:word', (req, res) => {
    res.send(trie.find(req.params.word))
})

// express route returns a list of autocomplete suggestions given a prefix
app.get('/autocomplete/:prefix', (req, res) => {
    res.send(trie.autocomplete(req.params.prefix))
})

// express route deletes a keyword from the trie
app.delete('/delete/:word', (req, res) => {
    trie.delete(req.params.word)
    console.log("The word " + req.params.word + " has been successfully deleted")
    res.status(200).send({message: "ok"})
})

// express route adds a certain word into the trie
app.patch('/add/:word', (req, res) => {
    trie.add(req.params.word)
    console.log("the word " + req.params.word + " has been successfully added")
    res.status(200).send({message: "ok"})   
})

// This fires if someone tries to access any page which is not defined
// Code snipet from: https://medium.com/@SigniorGratiano/express-error-handling-674bfdd86139 
app.all("*", (req, res, next) => {
    res.status(404).json({
        status:'fail',
        message:`Can't find the page ${req.originalUrl} on this server`
    })
})

// Error handler middleware to handle any other error
// Code snipet from: https://levelup.gitconnected.com/how-to-handle-errors-in-an-express-and-node-js-app-cb4fe2907ed9 
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send("Something Broke!");
   })

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})