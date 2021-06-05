<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>
        ShivaniReminderApp
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn color="blue" @click="addNote">
        New Reminder
      </v-btn>
    </v-app-bar>

    <v-main>
        <notes-component ref="noteRef"/>
    </v-main>
  </v-app>
</template>

<script>
import NotesComponent from './components/NotesComponent';

export default {
  name: 'App',

  components: {
    NotesComponent,
  },

  data: () => ({
    //
  }),
  
  methods:{
    async addNote(){
        this.$refs.noteRef.addNote()
    }
  }
};
</script>
<style>
.color { border: 1px solid silver; vertical-align:middle; margin-right:5px; min-width: 10px;}
</style>
