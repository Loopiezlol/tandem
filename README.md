
#### Our AppID is: 78A3DDF9-3396-4088-95C3-A5E8CBDF9AD3
#### Our API_TOKEN is: ff8bf5060352c01ce575287f25def5be4b02fd6d

## (Messaging) Needs to fix - Errors so far:
 - Creating new user with same existing name doesn't show existing user dialogbox, instead it face to bad request Errors
 - If two user with same nickname chats with each other, it is not obvious who is who, need to either show 1 on left and 1 on right or  ...
 - Login to existing user allows you to create temporary new user which should not
 - When you inserting new message into message bar, the previous message which sent replace message bar
 - New messages will store at top of the previous messages instead of bottom

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
