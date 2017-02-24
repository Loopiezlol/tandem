# SendBird for Tandem 👌
######TODO: Remove before we merge!

#### Our AppID is: 78A3DDF9-3396-4088-95C3-A5E8CBDF9AD3
#### Our API_TOKEN is: ff8bf5060352c01ce575287f25def5be4b02fd6d

## What we've got so far...

We have our basic prototype. It's split into the three Reflux objects: the Store (sbStore.js) which does the actual logic, keeps track of our state; the actions (sbActions.js) which just define what actions can be fired from the UI or elsewhere; and our components (sbMessaging.jsx, sbUserList.jsx, sbChat.jsx) which are the UI components which get rendered into unformatted HTML, for now.

Looking at the UIs that people have shown off at our meetings, it looks like we're going to be using Google's Material UI. This is great and really easy to use, so check it out at [their website](http://www.material-ui.com/). We won't be doing too much serious UI stuff at this point but I thought it would be cool for it to look at least like a kind of product when/if we show it to the client, and make it look cohesive with the other parts of the prototype.

In this branch I'm going to add some more dependencies which allow us to use Material UI, like:

- ````material-ui````
- ````react-tap-event-plugin````
- The [Roboto](https://fonts.google.com/?selection.family=Roboto:300,400,500) font
- ...and maybe more later?

Things that we might want to start implementing at this stage as well as a basic UI could be:

- Typing indicators
- More proper login (passwords), integration with our user directory on the server side
- look into sending other types of message, such as images?
- online/offline event handlers so we get real time updating of friends' statuses
- how / what we need to do when we port this mobile with cordova

That's all I can think of for now, more to come as we think of it.

### Links for Future Reference:

- [SendBird React Native Tutorial (old SDK but still useful)](https://blog.sendbird.com/tutorial-build-a-messaging-app-using-react-native/)
- [Official SendBird JS and React Native sample repo](https://github.com/smilefam/SendBird-Javascript)
- [SendBird JS Documentation](https://docs.sendbird.com/javascript)
- [SendBird Platform API documentation](https://docs.sendbird.com/platform)
- [Material UI](http://www.material-ui.com/)

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
