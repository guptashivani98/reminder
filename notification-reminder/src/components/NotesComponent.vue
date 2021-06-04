<template>
    <v-container :fill-height="items==null">
        <v-row dense v-if="items!=null">
            <v-col  sm="4"  
            v-for="(item, i) in items"
            :key="i"
            cols="12"
            >
                <note-card :item="item" @load="loadNotes"></note-card>
            </v-col>
        </v-row>
        <v-row align="center"
        justify="center" v-else>
            <v-col cols="6" sm="2" align="center">
                <p>No Reminders Found</p>
                <v-btn color="blue" @click="addNote">New Reminder</v-btn>
            </v-col>
        </v-row>
    </v-container>    
</template>

<script>
import * as dataService from '../dataService'
import NoteCard from './NoteCard'
// import notification from '../notification';

export default {
    components:{
        NoteCard,
    },
    data(){
        return{
            items:[],
            note:{
                id:0,
                title:'',
                text:'',
                color:'white',
                date:'',
                time:''
            },
        }
    },
    created(){
        this.loadNotes();
    },
    methods:{
        async addNote(){
            await dataService.addNote(this.note);
            this.loadNotes();            
        },
        async loadNotes(){
            this.items = await dataService.getNotes();
            // notification();
        }
    }
}
</script>

