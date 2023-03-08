import {getIcon,formGenerator,attachEvent,getInputElement,getElement,getDataAttribute,MapFromForm,findObj,month} from './function.js';
export let personalInfoElements = ['#name-icon','#role-icon','#profile-description-icon'];
export let contactInfoElements = ['#email-icon','#address-icon','#phone-icon']
//model
export class ProfileInfo{
    constructor(){
        this.user = {
        'profile-description':''
        }
    }
    setPersonalDescription(key,value){
        this.user[key] = value;
    }
    resetPersonalDescription(key){
        this.user[key]='';
    }
}
//view
export class ProfileView{  
    removeElement(element,model){
        model.resetPersonalDescription(element);
        let htmlElement = getElement('.',element);
        htmlElement.innerHTML = '';
    }
    replacePrevstate(elementId,model){
        let element = document.querySelector('.'+elementId);
        if(model.user[elementId]!==''){
            element.appendChild(document.createTextNode(model.user[elementId]));
        }
    }
    
    elementHandler(element,model){
        let prev = element;
        element = getElement('.',element);
        console.log(prev,element)
        if(!getElement('#','textarea-tag')){
            element.innerHTML = `<textarea rows="5" cols="50" id='textarea-tag'>
            </textarea>`;
            attachEvent('change','textarea-tag',function(event){
                model.setPersonalDescription(prev,event.target.value);
                element.innerHTML = '';
                element.appendChild(document.createTextNode(model.user[prev]));
            });
        }
        else{
            getElement('#','textarea-tag').remove();
            if(model.user[prev] != ''){
                element.appendChild(document.createTextNode(model.user[prev]))
            }
        }   
    } 
}

//Controller
export class profileController{
    constructor(model,view){
        this.model = model,
        this.view = view
    }
    profileDescriptionHandler(element){
        this.view.elementHandler(element,this.model);
    }
    deleteHandler(element){
        this.view.removeElement(element,this.model);
    } 
    replacePrevStateHandler(elementId){
        this.view.replacePrevstate(elementId,this.model);
    }
}
