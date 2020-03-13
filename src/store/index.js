import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
var firebase = require("firebase/app");

import db from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: '',
    error: '',
    tareas: [],
    tarea: {nombre: '', id: ''}
  },
  mutations: {
    setUsuario(state, payload) {
      state.usuario = payload
    },

    setError(state, payload) {
      state.error = payload
    },
    //agregadas del crud 
    setTareas(state, tareas) {
      state.tareas = tareas
    },

    setTarea(state, tarea) {
      state.tarea = tarea
    },

    eliminarTarea(state, id) {
      state.tareas = state.tareas.filter( t => {
        return t.id != id
      })
    }
  },
  actions: {
    crearUsuario({commit}, payload){
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.pass)
        .then( res => {
          console.log(res)
          commit('setUsuario', {email: res.user.email, uid: res.user.uid})
          //crear una colletion
          db.collection(res.user.email).add({
            name: 'Tarea de ejemplo'
          })
          .then( () => {
            router.push({name: 'home'})
          })

          
        })
        .catch( err => {
          console.log(err.message);
          commit('setError', err.message)
        })
    },
    ingresoUsuario({commit}, payload){
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.pass)
        .then(res => {
          commit('setUsuario', {email: res.user.email, uid: res.user.uid})
          router.push({name: 'home'})
        })
        .catch( err => {
          commit('setError', err.message)
        })
    },

    detectarUsuario({commit}, payload){
      if(payload != null){
        commit('setUsuario', {email:payload.email, uid:payload.uid})
      }else{
        commit('setUsuario', null)
      }
    },

    cerrarSesion({commit}){
      firebase.auth().signOut()
      commit('setUsuario', null)
      router.push({name: 'ingreso'})
    },

    //agregadas del crud
    getTareas ({commit}) {
      const usuario = firebase.auth().currentUser
      const tareas = []
      db.collection(usuario.email).get()
      .then(snapshot => {
        snapshot.forEach( doc => {
          //console.log(doc.id);
          //console.log(doc.data());
          let tarea = doc.data()
          tarea.id = doc.id
          tareas.push(tarea)
        })
      })
      //cambio la state local
      commit('setTareas', tareas)
    },

    getTarea ({commit}, id) {
      const usuario = firebase.auth().currentUser
      db.collection(usuario.email).doc(id).get()
      .then( doc => {
        let tarea = doc.data()
        tarea.id = doc.id
        commit('setTarea', tarea)
      })
    },

    editarTarea({commit}, tarea) {
      const usuario = firebase.auth().currentUser
      db.collection(usuario.email).doc(tarea.id).update({
        name: tarea.name
      })
      .then( ()=> {
        router.push({name: 'inicio'})
      })
    },

    agregarTarea({commit}, name) {
      const usuario = firebase.auth().currentUser
      db.collection(usuario.email).add({
        name: name
      })
      .then( () => {
        router.push({name: 'inicio'})
      })
    },

    eliminarTarea({commit, dispatch}, id) {
      const usuario = firebase.auth().currentUser
      db.collection(usuario.email).doc(id).delete()
      .then( () => {
        console.log(`tarea fue eliminada`)
        //dispatch('getTareas') no tan elegante pero funciona de llamar a una accion
        commit('eliminarTarea', id)
      })
    },

  },
  getters: {
    existeUsuari(state) {
      if(state.usuario === null || state.usuario === '' || state.usuario === undefined  ){
        return false
      }else{
        return true
      }
    }
  },
  modules: {
  }
})
