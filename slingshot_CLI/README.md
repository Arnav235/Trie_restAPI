# The Command Line Interface

This command line interface interacts with the server's endpoints using fetch. 

## Installing the CLI

In order to install this CLI, you must have NPM and Node.js installed.  
1. From the terminal, navigate into this directory.
2. Type the command `npm link` in your terminal. You may require `sudo`.
3. The above command creates a symbolic link from your global node_modules directory to the local module. You can read more about it [here](https://medium.com/@alexishevia/the-magic-behind-npm-link-d94dcb3a81af).
4. Now you can use the CLI! The name of this module is `trie`.  

## Using the CLI
In your command line, you can type `trie [command] argument` to execute operations on the server. The available commands are:  
- Add word: `trie add [word]`. For example `trie add super` adds the word 'super' to the trie.  
- Delete word: `trie delete [word]`.  
- Find word: `trie find [word]`. Returns true/false depending on whether the word is in the trie or not.  
- Autocomplete: `trie autocomplete [prefix]`. Returns a list of words in the trie which have the same prefix.  
- Display: `trie display`. Returns a list of all of the words currently in the trie.  

## Test functions

This folder also includes files named testing_functions.js and test_scripts.js. testing_functions.js holds functions which execute add, delete, find, etc. operations on the trie. test_scripts.js holds a couple of functions which I used to test the server.
