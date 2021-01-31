import firebase from './firebaseInit'

const db = firebase.firestore()
const auth = firebase.auth()

const usersCollection = db.collection('users')
const todosCollection = db.collection('todos')

export {
  db,
  auth,
  usersCollection,
  todosCollection
}
