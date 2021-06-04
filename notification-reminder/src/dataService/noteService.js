import * as axios from 'axios'
import { API } from './config'


export const getNotes = async function(){
    try {
        if(API == 1)    //to make it false since no api here in this app
        {
            const response = await axios.get(`${API}/notes`);
            return response.data;
        }
        else{
            var data = localStorage.getItem('MyNotes');
            data = data!=null?JSON.parse(data):data;
            data = data!=null?(data.length==0?null:data):data;
            return data;
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}
export const addNote = async function(note){
    try {
        var data = localStorage.getItem('MyNotes');
        data = data!=null?JSON.parse(data):data;
        if(API == 1)    //to make it false since no api here in this app
        {
            const response = await axios.post(`${API}/note/add`,note);
            return response.data;
        }
        else{
            if(data!=null)
            {
                var max=Math.max.apply(Math, data.map(function(o) { return o.id; }))
                note.id = max+1;
                data.push(note);
            }
            else{
                note.id=1;
                data=[];
                data.push(note);
            }
            localStorage.setItem('MyNotes',JSON.stringify(data));
            return 1;
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}
export const updateNote = async function(id,note){
    try {
        var data = localStorage.getItem('MyNotes');
        data = data!=null?JSON.parse(data):data;
        if(API == 1)    //to make it false since no api here in this app
        {
            const response = await axios.post(`${API}/note/update/${id}`,note);
            return response.data;
        }
        else{
            var index = data.map(function(x) {return x.id; }).indexOf(id);
            data.splice(index,1,note);
            localStorage.setItem('MyNotes',JSON.stringify(data));
            return 1;
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}
export const deleteNote = async function(id){
    try {
        var data = localStorage.getItem('MyNotes');
        data = data!=null?JSON.parse(data):data;
        if(API == 1)    //to make it false since no api here in this app
        {
            const response = await axios.get(`${API}/note/delete/${id}`);
            return response.data;
        }
        else{
            var index = data.map(function(x) {return x.id; }).indexOf(id);
            data.splice(index,1);
            localStorage.setItem('MyNotes',JSON.stringify(data));            
            return 1;
        }
    } catch (error) {
        console.error(error);
        return [];
    }
}