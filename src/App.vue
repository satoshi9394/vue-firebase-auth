<template>
  <div id="app" class="container mt-5">
    <div id="nav">
      <router-link :to="{name: 'home'}" v-if="existeUsuari" class="btn btn-info mx-2">
        <b-icon icon="house-fill"></b-icon>
        <span>Home</span>
      </router-link>      
      <router-link :to="{name: 'registro'}" v-if="!existeUsuari" class="btn btn-info mx-2">
        Registro
      </router-link>
      <router-link :to="{name: 'ingreso'}" v-if="!existeUsuari" class="btn btn-info mx-2">
        Ingreso
      </router-link>
      <a @click="cerrarSesion" v-if="existeUsuari" class="btn btn-danger mx-2">
        Cerrar seccion
      </a>  
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions(['cerrarSesion'])
  },
  computed: {
    ...mapGetters(['existeUsuari'])
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
