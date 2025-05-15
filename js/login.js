// Importa las funciones necesarias desde los SDK de Firebase
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

// Configuración de tu proyecto (ya lo tienes)
const firebaseConfig = {
  apiKey: "AIzaSyCQOh1QF2818onXfQ5g0Wk4sckngOmxPi4",
  authDomain: "arbolibros-cd2f6.firebaseapp.com",
  projectId: "arbolibros-cd2f6",
  storageBucket: "arbolibros-cd2f6.firebasestorage.app",
  messagingSenderId: "945561752270",
  appId: "1:945561752270:web:1543450c6b06d106bd769f"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Botón de login
const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      alert(`Bienvenida, ${user.displayName}`);
      console.log(user);
    })
    .catch((error) => {
      console.error("Error al iniciar sesión:", error);
    });
});

// Botón de logout
const logoutBtn = document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => alert("Sesión cerrada"))
    .catch((error) => console.error("Error al cerrar sesión:", error));
});

// Mostrar estado de sesión
const userInfo = document.getElementById("userInfo");
onAuthStateChanged(auth, (user) => {
  if (user) {
    userInfo.innerHTML = `
      <p>Hola, ${user.displayName}</p>
      <p>Email: ${user.email}</p>
      <img src="${user.photoURL}" width="50" />
    `;
  } else {
    userInfo.innerHTML = `<p>No has iniciado sesión</p>`;
  }
});
