const guideList = document.querySelector('.guides')
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

//Setup UI
const setupUI = (user) => {
  if (user) {
    //Add Account Info
    const html = `
    <div>Logged in as: ${user.email}</div>
    `
    accountDetails.innerHTML = html;

    //Toggle Nav Elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
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

