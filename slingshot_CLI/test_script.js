const functions = require('./testing_functions.js')

words = ["hello", "hi", "how", "wow", "computer"]

function add_and_delete(){
    for (let word of words){
        functions.add(word)
        functions.display()
        functions.remove(word)
        functions.display()
    }
}

// add_and_delete()

add_words_arr = ["apple", "app", "able", "apeel", "aptera", "alter", "always", "almost", "alwant"]
complete_words_arr = ["a", "ap", "al", "alw"]


function check_auto_complete(add_words_arr, complete_words_arr){
    for (let word of add_words_arr){
        functions.add(word)
    }
    for (let word of complete_words_arr){
        functions.autocomplete(word)
    }
    for (let word of add_words_arr){
        functions.remove(word)
    }
}

// check_auto_complete(add_words_arr, complete_words_arr)

find_words = ["apple", "app", "able", "ap", "a", "aptera", ""]

function check_find (add_words_arr, find_words){
    for (let word of add_words_arr){
        functions.add(word)
    }
    for (let word of find_words){
        functions.find(word)
    }
    for (let word of add_words_arr){
        functions.remove(word)
    }
}

// check_find(add_words_arr, find_words)