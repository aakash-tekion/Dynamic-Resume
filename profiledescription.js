import {getIcon,attachEvent,getElement} from './function.js';
import { BasicModel } from './parentmodel.js';
export let personalInfoElements = ['#name-icon','#role-icon','#profile-description-icon'];
export let contactInfoElements = ['#email-icon','#address-icon','#phone-icon']
//model
export class ProfileInfo extends BasicModel{
    constructor(){
        super();
        this.user = {
        'profile-description':''
        }
    }
    setPersonalDescription(key,value){
        super.setDetails(this.user,key,value);
    }
    resetPersonalDescription(key){
        super.resetDetails(this.user,key);
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
    removeIcon(){
        let icon = document.querySelector('#profile-description-icon');
        if(icon){
            icon.remove()
        }
    }
    addIcon(className){
        let parent = document.querySelector('.profile-container');
        this.removeIcon();
        let icon = getIcon(className,'profile-description-icon','','profile-description-icon');
        let firstChild = parent.firstChild.nextSibling;
        firstChild.insertBefore(icon,firstChild.firstChild);
    }
    addDeleteIcon(className,model){
        this.removeIcon(model);
        this.addIcon(className);
    }
    elementHandler(element,model){
        let prev = element;
        element = getElement('.',element);
        console.log(prev,element)
        if(!getElement('#','textarea-tag')){
            element.innerHTML = `<textarea rows="5" cols="50" id='textarea-tag'>${model.user['profile-description']}</textarea>`;
            attachEvent('blur','textarea-tag',function(event){
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
    removeIconHandler(){
        this.view.removeIcon();
    }
    addEditIconHandler(){
        this.view.addIcon('fa-pencil');
    }
    addDeleteIconHandler(){
        this.view.addDeleteIcon('fa-trash',this.model);
    }
}
