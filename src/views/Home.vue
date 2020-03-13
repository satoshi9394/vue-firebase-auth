<template>
  <div>
    <h1>Lista de tareas</h1>
    <router-link :to="{ name: 'agregar' }" >
      <button class="btn btn-success btn-block">Agregar Tarea</button>
    </router-link>
    <ul class="list-group mt-5">
      <li 
      v-for="item of tareas" 
      :key="item.id" 
      class="list-group-item"
      >
        {{item.id}} - {{item.name}}
        <div class="float-right">
          <router-link :to="{name: 'editar', params: { id: item.id }}">
            <button class="btn btn-warning btn-sm mr-2">
              Editar
            </button>  
          </router-link>
          <button @click="eliminarTarea(item.id)"
          class="btn btn-danger btn-sm"
          >
            Eliminar
          </button>
        </div>  
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  //importar action desde la store de vuex
  methods: {
    ...mapActions(['getTareas', 'eliminarTarea'])
  },
  //ejecutarlo desde la creacion del dom
  created() {
    this.getTareas()
  },
  computed: {
    ...mapState(['usuario', 'tareas'])
  },
}
</script>