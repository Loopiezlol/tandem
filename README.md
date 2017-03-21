
#### SendBird stuff:
#### Our AppID is: 78A3DDF9-3396-4088-95C3-A5E8CBDF9AD3
#### Our API_TOKEN is: ff8bf5060352c01ce575287f25def5be4b02fd6d

  - Recent chats persistent store
  - 'Enter' key while focused on message input box sends message
  - Last seen time + latest message on userlist entries
  - single pane UI for mobile

---

# Tandem

### Prerequisites (globally installed)

 - node + npm
 - mongod (not atm but will)
 - yarn

After installing these, clone the repository. Within its contents run:
```
yarn install
```

### Database
Make a `.localdb` folder within the repository: `mkdir .localdb`.

Eeach time open the DB with:
```
$ mongod --dbpath .localdb
```

### Backend

To run:
```
yarn backend
```

Uses:

- express
- mongoose/mongo

### Website/Webapp

To run:
```
yarn web-app
```

Uses:

- ES6 syntax
- React + Reflux
