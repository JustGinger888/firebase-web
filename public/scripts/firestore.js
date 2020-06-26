const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// Create element and render cafe
function renderCafe(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.preventDefault();
        let id = e.target.parentElement.getAttribute('data-id');
        db
            .collection('cafes')
            .doc(id)
            .delete()
            .then(function (doc) {
                
            })
            .catch(err => {
        
            });
    });
}

// Getting Data
// db
//     .collection("cafes")
//     //.where('city', '==', 'CafeVille')
//     //.orderBy('name')
//     .get()
//     .then((snapshot) => {
//         snapshot.forEach(doc => {
//             renderCafe(doc);
//             console.log(doc.data());
//         });
//     }).catch(err => {

//     }
// );



// Saving Data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection("cafes").add({
        name: form.name.value,
        city: form.city.value,
    }).then( () => {
        form.name.value = '';
        form.city.value = '';

    })
    .catch(function (error) {

    });    
})

// Real Time Listener
db
     .collection("cafes")
     .orderBy('name')
     .onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type =='added') {
                renderCafe(change.doc)
            } else if (change.type == 'removed') {
                let li = cafeList.querySelector('[data-id='+change.doc.id+']');
                cafeList.removeChild(li);
            }           
        });
     });

// Updating data via updat changes one specific value
db
    .collection('cafes')
    .doc('doc id')
    .update({
        attribute: value,
    }).catch(function (error) {

    });


// Updating data via set changes overrides all values
db
    .collection('cafes')
    .doc('doc id')
    .set({
        attribute: value,
    }).catch(function (error) {
 
    });