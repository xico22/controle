const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createNotification = ((notification) => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc));
});

exports.projectCreated = functions.firestore
  .document('projects/{projectId}')
  .onCreate(doc => {

    const project = doc.data();
    
    
    const notification = {
      content: 'Adicionado um novo projeto',
      solicitante: `${project.solicitante}`,
      titulo: `${project.titulo}`,
      tipo: `${project.tiposolicitacao}`,
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification);
});

exports.userJoined = functions.auth.user()
  .onCreate(user => {
    
    return admin.firestore().collection('users')
      .doc(user.uid).get().then(doc => {

        const newUser = doc.data();
        const notification = {
          content: 'Entrou no app',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        };

        return createNotification(notification);

      });
});

// My collection is called "incomes"
const incomeRef = functions.firestore.document('projects/{projectId}')
// My counter is allocated in `/counters/incomes`, maybe you wanna follow this structure instead: https://firebase.google.com/docs/firestore/solutions/counters
const counterRef = functions.firestore.document('counters/incomes')
// These references are not the same as Firestore DocumentReferences
// check https://firebase.google.com/docs/reference/functions/functions.firestore.DocumentBuilder

// Perform an increment when income is added
module.exports.incrementIncomesCounter = incomeRef.onCreate(event => {
  const counterRef = event.data.ref.firestore().doc('counters/incomes')

  counterRef.get()
  .then(documentSnapshot => {
    const currentCount = documentSnapshot.exists ? documentSnapshot.data().count : 0

    counterRef.set({
      count: Number(currentCount) + 1
    })
    .then(() => {
      console.log('Incomers counter increased!')
    })
  })
})

// Perform an decrement when income is deleted
module.exports.decrementIncomesCounter = incomeRef.onDelete(event => {
  const counterRef = event.data.ref.firestore.doc('counters/incomes')

  counterRef.get()
  .then(documentSnapshot => {
    const currentCount = documentSnapshot.exists ? documentSnapshot.data().count : 0

    counterRef.set({
      count: Number(currentCount) - 1
    })
    .then(() => {
      console.log('Incomers counter decreased!')
    })
  })
})

// Perform a fresh recount(this is expensive) when the counter is deleted (This is optional as well)
module.exports.recountIncomesCount = counterRef.onDelete(event => {
  const incomesRef = event.data.ref.firestore().collection('incomes')

  return incomesRef.get()
    .then(querySnapshot => {
      counterRef.set({
        count: querySnapshot.docs.length
      })
    })
})