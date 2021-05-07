# The Server

This server is hosted on Google Cloud using its Cloud Run service.  
The server has a trie data structure which holds words. The trie supports 5 operations: add, delete, find (returns true/false), autocomplete(given a prefix, returns all of the words in the trie which have the same prefix) and display (returns all words in trie).  
  
The server uses 'express' to make REST endpoints which execute the operations. Below you can view the curl commands for each operation:  
Add words: `curl --request PATCH https://slingshot-server1-tz6carz7la-ue.a.run.app/add/{word that you want to add}`  
Delete words: `curl -X DELETE https://slingshot-server1-tz6carz7la-ue.a.run.app/delete/{word that you want to delete}`  
Find: `curl https://slingshot-server1-tz6carz7la-ue.a.run.app/find/{word to find}`  
Autocomplete: `curl https://slingshot-server1-tz6carz7la-ue.a.run.app/autocomplete/{autocomplete prefix}`  
Display: `curl https://slingshot-server1-tz6carz7la-ue.a.run.app/display`  
  
The command line interface uses fetch to interact with these endpoints
