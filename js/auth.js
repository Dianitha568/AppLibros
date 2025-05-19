//import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBgV5MZbTzOrufUlxfJ2IL-9GNG2knnAk0",
  authDomain: "arbolibros-61c48.firebaseapp.com",
  projectId: "arbolibros-61c48",
  //storageBucket: "arbolibros-61c48.firebasestorage.app",
  storageBucket: "arbolibros-61c48.appspot.com", 
  messagingSenderId: "698471236794",
  appId: "1:698471236794:web:6e157e2fa5dc3b90d2ee83"
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();

function loginConGoogle() {
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const usuario = result.user;
      alert(`Bienvenido ${usuario.displayName}`);
      localStorage.setItem("usuario", JSON.stringify(usuario));
    })
    .catch(error => console.error(error));
}

// Mostrar el nombre del usuario si ya está logueado
firebase.auth().onAuthStateChanged(user => {
  const nav = document.querySelector('.navbar-nav.ml-auto');
  if (user && nav) {
    nav.innerHTML = `
      <span class="nav-item nav-link">Hola, ${user.displayName}</span>
      <a href="#" class="nav-item nav-link" onclick="logout()">Cerrar sesión</a>
    `;
  }
});

// Función para cerrar sesión
function logout() {
  firebase.auth().signOut().then(() => {
    localStorage.clear();
    location.reload();
  });
}