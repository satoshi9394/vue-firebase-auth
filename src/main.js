import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//bootstrap librerias
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
//firebase used
var firebase = require("firebase/app");


// Add additional services that you want to use
require("firebase/auth");
// require("firebase/database");
require("firebase/firestore");
// require("firebase/messaging");
// require("firebase/functions");
var firebaseConfig = {
  apiKey: "AIzaSyB5_-5u_rhWGECSH9J9-R5XN-Xx94ydYuc",
  authDomain: "crud-udemy-c1507.firebaseapp.com",
  databaseURL: "https://crud-udemy-c1507.firebaseio.com",
  projectId: "crud-udemy-c1507",
  storageBucket: "crud-udemy-c1507.appspot.com",
  messagingSenderId: "27318282017",
  appId: "1:27318282017:web:4a29bea569c887a4474060",
  measurementId: "G-1G82QQNYB8"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
//pero en versiones actuales 5.x ya no es necesario ejecutar el código:
//firebaseApp.firestore().settings({timestampsInSnapshots: true})
export default firebaseApp.firestore()



Vue.config.productionTip = false

firebase.auth().onAuthStateChanged((user)=>{
  console.log(user)
  if(user){
    store.dispatch('detectarUsuario', {email: user.email, uid: user.uid})
  }else{
    store.dispatch('detectarUsuario', null)
  }
  //se lleva a dentro para que espere a que traiga la info del usuario
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})


