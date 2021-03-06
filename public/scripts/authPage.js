const guideList = document.querySelector('.guides')
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

//Setup UI
const setupUI = (user) => {
  if (user) {
    if (user.admin) {
      adminItems.forEach(item => item.style.display = 'block');
    }
    //Add Account Info
    db.collection('users').doc(user.uid).get().then(doc => {
              
        const html = `
        <div>Logged in as: ${user.email}</div>
        <div>Bio: ${doc.data().bio}</div>
        <div class="pink-text">${user.admin ? 'Admin' : 'Standard'}</div>
        `
        accountDetails.innerHTML = html;
    }).catch(function (error) {
      console.log(error.message);
    })

    //Toggle Nav Elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    adminItems.forEach(item => item.style.display = 'none');
    //Remove Account Info
    accountDetails.innerHTML = '';

    //Toggle Nav Elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

//Setup Grid
const setupGuides = (data) => {
  if (data.length) {
    let html = '';
    data.forEach(doc => {
      console.log(doc.data)
      const guide = doc.data();
      const li = `
      <li>
          <div class="collapsible-header grey lighten-4">${guide.title}</div>
          <div class="collapsible-body white">${guide.content}</div>
      </li>
      `;
      html += li;
    });

    guideList.innerHTML = html;

  } else {
    guideList.innerHTML = '<h5 class="center-align">Sign in to view Docs<h5>';
  }
}

// Modal Setup
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });

