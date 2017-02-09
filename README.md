# SendBird for Tandem 👌
######TODO: Remove before/if we merge! 

## Prototype Basics - Initialization

We want to be able to create a basic web chat app prototype. We won't worry about integrating it with the existing Users and Profiles which are being done in parallel. We will just worry about the sending and receiving of messages in a completely unformatted way-- *we will have no design or css at this point.* Where we can get away with it we will try to stay with unformatted HTML, but in some cases some basic boxes or something.

We're going to have to set up things on the SendBird side. This will get us an APP_ID we can hardcode into our app so that it can communicate with SendBird servers. We need to initialize like this:

```javascript
var sb = new SendBird({ 
    appId: APP_ID 
}); 
```

We won't worry about authentication at this stage so our app will use the default UserID connection. This means we don't need to worry about setting up users for now, the servers will *let our test app connect with no access token.* All we need to connect will be a UserID which will be a primary key from our database such as an email or uid. If there is no user with the UserID given, a new one is created at that point.

```javascript
sb.connect(USER_ID, function(user, error){
  if (error) {
    return;
  } else {
    initPage(user);
  }
});
```

Now we're connected! This is all we need to start talking to the servers and doing all the *good stuff*. For the prototype it's probably a good idea we keep it simple. Let's try to:

- Have a list of *currently active* users
- Be able to select a user and send a message to them
- be able to go back to the list of users, and repeat

n/b It'll probably be a good idea to set our new user's `is_online` boolean to "true" so that in a demonstration we can run two clients and hopefully send messages between them.

### Quick Note on React Components

The SendBird example is pretty spaghetti. It would be cool and great if we can put all the pieces of separate logic into individual React components so that we do not have spaghetti, like how the Udemy React course shows. E.g.:

- A component called "UserList" for the list
  - Containing many instances of a "UserRow" component
- A component called "UserConvo" for a conversation with a single user
  - Containing many instances of a "Message" component
- A component called "Nav" which lets us move between the two and always displays; a navigation bar.

For more info check out [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html).

## List Users

So we have to *GET* the list of active users. No problem: we ask the RESTful SendBird API by sending it a HTTP *GET* request, with the right arguments/parameters, as described at the [Platform API](https://docs.sendbird.com/platform) The server will reply with a JSON Object containing all of the info we want. Thanks, server!

We can do this in a number of ways, but the one I know from the tutorials is [Axios](https://github.com/mzabriskie/axios), which supports JS [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), which is nice, because asking the server for JSON info is asynchronous (ie. we don't know when we'll get that response back.) We can get Axios from npm, and it allows us to ask the server for this info. Check this out:

```javascript
// Make a request for a user with a given ID
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// Optionally the request above could also be done as
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

We want to know all of the users who are *online*. This probably means for the `active_mode` string in the request we need to put `activated`, and also in the reply we need to just care about users with the `is_online` boolean set to true. We can pretty much forget about all other parameters, since they don't really concern us at this point, although we will probably need to deal with [tokens](https://docs.sendbird.com/platform#misc_3_tokens) eventually.

So our request to the server will look something like:

```http
GET https://api.sendbird.com/v3/users?limit=10&active_mode=true
```

(`limit=10` limits the number of users in the response to 10.)

We will then get back a JSON object which looks something like this:

```json
{
  "users": [
    {
      "user_id": "john123",
      "is_active": true,
      "is_online": false,
      "last_seen_at": 1483600233677,
      "nickname": "Johnny",
      "profile_url": "https://sendbird.com/main/img/profiles/profile_05_512px.png"
    },
    {
      "user_id": "panda",
      "is_active": true,
      "is_online": false,
      "last_seen_at": 1483600235022,
      "nickname": "Kung Foo",
      "profile_url": "https://sendbird.com/main/img/profiles/profile_06_512px.png"
    },
    {
      "user_id": "bunny",
      "is_active": true,
      "is_online": true,
      "last_seen_at": 0,
      "nickname": "Bugs",
      "profile_url": "https://sendbird.com/main/img/profiles/profile_07_512px.png"
    }
  ],
  "next": "YXEZR1VVQVErEUBXWFNeF2p3FkFVVA~~"
}
```

Look at all the info we get! We can populate our list with this info, using only the user with `is_online` set to true. Nice!

## Conversation with Another User

How SendBird works with 1-to-1 messaging is actually the same as a group message, but with only two people. Which is actually kind of neat since if we work out how to do this then we can do group messages easily as well. In order to do 1-to-1 messaging we will need to take care of:

- Making the new "group" channel with the current user and the other user.
- Sending and receiving messages form this channel.

### Creating the Channel

Giving the server information is handled using a HTTP *POST* request, again possible through something like Axios. (I hope we all remember some 5CCS2INS!) Axios can do a *POST* like this:

```javascript
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

Unlike a *GET*, a *POST* gives some info to the server in JSON, about what kind of a channel we want and who is in it, et cetera. Our *POST* will go to:

`POST https://api.sendbird.com/v3/group_channels`

and will contain a request body like:

```JSON
{
  "name": "Chat with Lizzy",
  "cover_url": "https://sendbird.com/main/img/cover/cover_08.jpg",
  "custom_type": "personal",
  "data": "",
  "user_ids": ["terry5", "elizabeth2"],
  "is_distinct": true
}
```

So this is pretty simple:

- `name` is the name of the chat.
- `cover_url` is (I think...) some kind of cover photo for the UI.
- `custom_type` is a string used to classify the channel. Since this is 1-on-1, it's personal.
- `data` is additional, optional data we can store about a chat.
- `user_ids` are the users to invite to this channel.
- `is_distinct` *keeps the channel as the only possible 1-to-1 communication between these two users* e.g., if it is set to false, each time they want to chat a new channel is created and all the previous messages will be gone. For 1-to-1 chats we want to set it to *true* so that all 1-to-1 communication between these two users always takes place in the first, original channel we created.

(for more info see the [Platform API](https://docs.sendbird.com/platform#group_channel))

The server will respond to our *POST* request with another JSON object representing our new channel, which will look something like this:

```JSON
{
  "unread_message_count": 0,
  "is_distinct": true,
  "custom_type": "personal",
  "last_message": null,
  "cover_url": "https://sendbird.com/main/img/cover/cover_08.jpg",
  "members": [
    {
      "nickname": "Terry",
      "last_seen_at": 1484794558592,
      "user_id": "terry5",
      "profile_url": "https://sendbird.com/main/img/profiles/profile_26_512px.png",
      "is_online": false
    },
    {
      "nickname": "Lizzy",
      "last_seen_at": 1484792324865,
      "user_id": "elizabeth2",
      "profile_url": "https://sendbird.com/main/img/profiles/profile_05_512px.png",
      "is_online": false
    }
  ],
  "data": "",
  "name": "Chat with Lizzy",
  "member_count": 2,
  "created_at": 1484795671,
  "max_length_message": -1,
  "channel_url": "sendbird_group_channel_24896175_9771eff89d8d2bbdb7269f95a3bf554ef31f9962",
  "channel": {
    // This key has been deprecated and only exists for backward compatibility.
  }
}
```

We can then use this info to do stuff on the client side. Once we have this response though, we're in business. We've made the channel. Yay!

### Sending Messages

You know the drill. It's HTTP *POST* again! See the fields in the JSON above called `custom_type` and `channel_url`? We need those. Our *POST* URL uses them like this:

```
POST https://api.sendbird.com/v3/{channel_type}/{channel_url}/messages
```

And the body of the *POST* takes a JSON object which looks like:

```JSON
{
  "message_type": "MESG",
  "user_id": "terry5",
  "message": "Hey, how are you doing?"
}
```

It's that simple. The response from the server looks like:

```JSON
{
  "created_at": 1484205212493,
  "user": {
    "nickname": "Terry",
    "user_id": "terry5",
    "profile_url": "https://sendbird.com/main/img/profiles/profile_26_512px.png"
  },
  "file": {},
  "custom_type": "",
  "data": "",
  "message": "Hey, how are you doing?",
  "channel_url": "sendbird_group_channel_24901438_c1bc35f5f0d237207bc1cba27351c878fc2f345b",
  "type": "MESG",
  "message_id": 640011362
}
```

Then we know the server got the message. Perfect! Sending done.

### Receiving Messages

This is a bit more tricky. Remember at the top where we made the SendBird object:

```javascript
var sb = new SendBird({ 
    appId: APP_ID 
}); 
```

SendBird has a child object we can instantiate called `ChannelHandler` which handles all of the *PUSH* requests from the servers. We can define the functions of what it does in response to events:

```javascript
var ChannelHandler = new sb.ChannelHandler();

ChannelHandler.onMessageReceived = function(channel, message){
    console.log(channel, message);
    // So in this case it just prints the message into the console.
};

sb.addChannelHandler(UNIQUE_HANDLER_ID, ChannelHandler);
```

The example project on GitHub looks like this:

```javascript
var ChannelHandler = new sb.ChannelHandler();
  ChannelHandler.onMessageReceived = function(channel, message){
    var isCurrentChannel = false;

    if (currChannelInfo == channel) {
      isCurrentChannel = true;
    }

    channel.refresh(function(){
    });

    // update last message
    if (channel.isGroupChannel()) {
      groupChannelLastMessageList[channel.url] = message;
      updateGroupChannelLastMessage(message);
      moveToTopGroupChat(channel.url);
    }

    if (isCurrentChannel && channel.isGroupChannel()) {
      channel.markAsRead();
    } else {
      unreadCountUpdate(channel);
    }

    if (!document.hasFocus()) {
      notifyMessage(channel, message.message);
    }

    if (message.isUserMessage() && isCurrentChannel) {
      setChatMessage(message);
    }

    if (message.isFileMessage() && isCurrentChannel) {
      $('.chat-input-file').removeClass('file-upload');
      $('#chat_file_input').val('');

      if (message.type.match(/^image\/.+$/)) {
        setImageMessage(message);
      } else {
        setFileMessage(message);
      }
    }

    if (message.isAdminMessage() && isCurrentChannel) {
      setBroadcastMessage(message);
    }
  };
```

Obviously, they're doing a lot more functionality than we need at this prototype stage. But basically, we can define actions in `onMessageReceived` which uses the vars `message` and `channel` which contain the message and channel JSON objects for the incoming message. (See how he uses `message.message` to get the actual string of the message contents? It's getting the `message` data from the JSON object representing a message we looked at above under 'sending messages'.)

At this stage all we really care about is updating the "UserConvo" react component's *state* to reflect the newly-received message using the `this.setState()` function. This will cause the component to be re-rendered and show the new message. Perfect.

That should conclude our very basic prototype. Form here we can start adding more interesting features, like read receipts, images, group chats (proper ones), open chats, and more. Go team!

-S 💯 🙌 ☝️

### Links for Future Reference:

- [SendBird React Native Tutorial (old SDK but still useful)](https://blog.sendbird.com/tutorial-build-a-messaging-app-using-react-native/)
- [Official SendBird JS and React Native sample repo](https://github.com/smilefam/SendBird-Javascript)
- [SendBird JS Documentation](https://docs.sendbird.com/javascript)
- [SendBird Platform API documentation](https://docs.sendbird.com/platform)

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

