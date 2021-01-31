# Firetodos!
Firetodos is simple starter pack to work with firebase (authentication + firestore) alongside vue ecosystem (vuejs2 + vuex) for beginners.
  - Authentication using Firebase's authentication service
  - Create, Read and Delete on todos with Firebase's Firestore.

### Tech

* [VueJS] - The Progressive JavaScript Framework!
* [Vuex] - state management pattern + library for Vue.js applications
* [Firebase] - Firebase helps you build and run successful apps

### Installation
You need node.js installed on your system.
after clonning this repository:

```sh
$ cd firetodos
$ npm install
```
### Environment variables and firebase setup
You have to setup your firebase and config it.
create file named ``.env.local`` in the root folder (where ``package.json`` is and NOT src folder)
set the following environment variables based on what firebase requires.
| Key name | Desc |
| ------ | ------ |
| ``VUE_APP_FB_API_KEY`` | Your Firebase API key |
| ``VUE_APP_FB_PROJECT_ID`` | Your Firebase project id |
| ``VUE_APP_FB_APP_ID`` | Your Firebase app id |
| ``VUE_APP_FB_AUTH_DOMAIN`` | Your Firebase authentication domain (if required) |
| ``VUE_APP_FB_STORAGE_BUCKET`` | Your Firebase storage bucket (if required) |
| ``VUE_APP_FB_MESSAGING_SENDER_ID`` | Your Firebase messaging sender id (if required) |

### Running
After setting environment variables, serve the application in development mode:
```
$ npm run serve
```


### Used libraries

Following libraries have been used in the project:

| Name | Reference |
| ------ | ------ |
| axios | https://github.com/axios/axios |
| vue-toasted | https://github.com/shakee93/vue-toasted |
| vuejs-loading-plugin | https://github.com/noxludio/vuejs-loading-plugin |
| vuelidate | https://vuelidate.js.org/ |


### Development

Want to contribute? Great!

### Todos

 - Write Tests
 - Todo Edit
 - Profile Edit
 - Todo Assignment to users
 - Add Dark Mode

License
----

MIT
