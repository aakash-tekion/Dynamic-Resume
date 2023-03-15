import { MapFromForm,findObj } from "./function.js";
export class BasicModel{
    setDetails(arr,form){
        let obj = MapFromForm(form)
        if(obj){
            let bool = findObj(arr,obj);
            if(!bool){
                arr.push(obj);
            }
        }
    }
    setDetails(model,key,value){
        model[key] = value;
    }
    resetDetails(model,key){
        model[key]='';
    }
    removeDetails(arr,obj){  
        arr = arr.filter((ele)=>{
            return JSON.stringify(ele)!== obj;
        })
        return arr
    }
}