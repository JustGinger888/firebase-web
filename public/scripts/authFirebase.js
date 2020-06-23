// Listen for auth state change
firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log('User logged in: ', user);
      db.collection("guides").onSnapshot(querySnapshot => {
        setupGuides(querySnapshot.docs);
        setupUI(user);
      }, error => {
        console.log(error.message);
      });
    } else {
      setupGuides([]);
      setupUI();
    }
});

// Create New Guide
const createForm = document.querySelector('#create-form');

createForm.addEventListener('submit', (e) => {
  e.preventDefault();

  db.collection("guides").add({
    title: createForm['title'].value,
    content: createForm['content'].value,
  }).then(() => {
    const modal =document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(error => {
    console.log('Insufficient Permissions');
  });
});

// Sign Up
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  //Sign Up the User
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      bio: signupForm['signup-bio'].value
    });
  }).then(() => {
    console.log(signupForm['signup-bio'].value)
    const modal =document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

//Logout
const logout = document.querySelector('#logout');

logout.addEventListener('click', (e) => {
    e.preventDefault();
    
    //Sign out the User
    auth.signOut()
});

// Login
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    
    //Sign Up the User
    auth.signInWithEmailAndPassword(email, password).then(cred => {
            const modal =document.querySelector('#modal-login');
            M.Modal.getInstance(modal).close();
            loginForm.reset();
        });
});