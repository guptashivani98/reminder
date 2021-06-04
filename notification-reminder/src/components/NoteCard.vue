<template>
    <v-card :color="item.color">
        <v-card-title class="headline">
            <v-text-field
                background-color="transparent"
                placeholder="Enter Title"
                solo
                flat
                dense
                full-width
                hide-details
                v-on:change="updateNote"
                v-model="item.title"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-menu 
                absolute
                close-on-click
                close-on-content-click
                offset-y
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-icon  v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
                </template>
                <v-list >
                    <v-list-item @click="updateNote">
                        <v-list-item-content>
                            <v-list-item-subtitle>change background</v-list-item-subtitle>
                            <v-list-item-title>
                                <a href="javascript:void(0);" @click="item.color = '#EF9A9A'">
                                    <span class="color" style="background-color:#EF9A9A">{{'\u00A0\u00A0\u00A0\u00A0'}}</span>
                                </a>
                                <a href="javascript:void(0);"  @click="item.color = '#90CAF9'">
                                    <span class="color" style="background-color:#90CAF9">{{'\u00A0\u00A0\u00A0\u00A0'}}</span>
                                </a>
                                <a href="javascript:void(0);"  @click="item.color = '#F48FB1'">
                                    <span class="color" style="background-color:#F48FB1">{{'\u00A0\u00A0\u00A0\u00A0'}}</span>
                                </a>
                                <a href="javascript:void(0);"  @click="item.color = '#80CBC4'">
                                    <span class="color" style="background-color:#80CBC4">{{'\u00A0\u00A0\u00A0\u00A0'}}</span>
                                </a>
                                <a href="javascript:void(0);" @click="item.color = '#E6EE9C'">
                                    <span class="color" style="background-color:#E6EE9C">{{'\u00A0\u00A0\u00A0\u00A0'}}</span>
                                </a>
                                <a href="javascript:void(0);"  @click="item.color = '#CE93D8'">
                                    <span class="color" style="background-color:#CE93D8">{{'\u00A0\u00A0\u00A0\u00A0'}}</span>
                                </a>
                                <a href="javascript:void(0);"  @click="item.color = '#FFF59D'">
                                    <span class="color" style="background-color:#FFF59D">{{'\u00A0\u00A0\u00A0\u00A0'}}</span>
                                </a>
                                <a href="javascript:void(0);"  @click="item.color = '#FFCC80'">
                                    <span class="color" style="background-color:#FFCC80">{{'\u00A0\u00A0\u00A0\u00A0'}}</span>
                                </a>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item @click="deleteNote">
                      <v-list-item-title>delete</v-list-item-title>                      
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-textarea
                solo
                auto-grow
                flat
                label="Enter Text"
                background-color="transparent"
                v-model="item.text"
                v-on:change="updateNote"
            ></v-textarea>
            <v-menu
                ref="datemenu"
                v-model="datemenu"
                :close-on-content-click="false"
                :return-value.sync="item.date"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
            <template v-slot:activator="{ on, attrs }">
            <v-chip class="ma-2" @color="item.color" outlined v-bind="attrs" v-on="on">
                {{item.date==''?"Set Time":item.date+' '+item.time}}
            </v-chip>
            </template>
            <v-date-picker
                v-model="item.date"
                no-title
                v-on:change="updateNote"                
                >
                
            </v-date-picker>
            <v-time-picker
          v-if="datemenu"
          v-model="item.time"
          format="24hr"
          full-width
          @click:minute="$refs.datemenu.save(item.date)"
                v-on:change="updateNote"          
        ></v-time-picker>
        </v-menu>
        </v-card-text>
    </v-card>
</template>

<script>
import * as dataService from "../dataService";

export default {
  props: {
    item: {
      type: Object
    }
  },
  data(){
      return{
      datemenu:false,
      istimeout:''
      }
  },
  methods: {
    async updateNote() {
      await dataService.updateNote(this.item.id, this.item);
      if(this.item.time)
      {
            var a = this.item.time.split(':');
            var t = new Date(this.item.date);
            t.setHours(a[0]);
            t.setMinutes(a[1]);
            var dts = t.getTime();
            var options = {
            body: this.item.text,
            }
            clearTimeout(this.istimeout);
            this.istimeout=setTimeout(() => {
                new Notification(this.item.title,options);
            }, dts-new Date().getTime()); 
      }
    },
    async deleteNote() {
      await dataService.deleteNote(this.item.id);
      this.$parent.loadNotes();
    }
  }
};
</script>
