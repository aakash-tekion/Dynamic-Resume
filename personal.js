import {getIcon,formGenerator,attachEvent,getInputElement,getElement,getDataAttribute,MapFromForm,findObj,month} from './function.js';
export let personalInfoElements = ['#name-icon','#role-icon'];
export let contactInfoElements = ['#email-icon','#address-icon','#phone-icon']
//model
export class PersonalInfo{
    constructor(){
        this.user = {
        'name' :'',
        'role':'',
        'profile-image-url':''
        }
    }
    setPersonalDetails(key,value){
        this.user[key] = value;
    }
    resetPersonalDetails(key){
        this.user[key]='';
    }
}
//view
export class PersonalView{
    constructor(){
        this.icons = {
            'name':'fa-user',
            'role':'fa-user-md'
        }
    }
    removeElement(element,model){
        model.resetPersonalDetails(element);
        let htmlElement = getElement('.',element);
        let firstChild = htmlElement.firstChild;
        htmlElement.innerHTML = ''
        htmlElement.appendChild(firstChild)
        let span = document.createElement('span');
        span.appendChild(document.createTextNode(element.charAt(0).toUpperCase()+element.slice(1)));
        htmlElement.appendChild(span);
    }
    addIcon(className=''){
        let flag = 0;
        if(className === ''){
            flag = 1
        }
        for(let key of Object.keys(this.icons)){
            if(flag === 1){
                className = this.icons[key];
            }
            let icon = document.querySelector(`#${key}-icon`);
            let parent = document.querySelector(`.${key}`);
            if(icon){
                icon.remove();
            }
            let newIcon = getIcon(className,`${key}-icon`,'',`${key}-icon`);
            parent.insertBefore(newIcon,parent.firstChild);
        }
    }
    removeIcon(model){
        for(let key of Object.keys(model.user)){
            let element = document.querySelector(`#${key+'-icon'}`);
            if(element){
                element.remove();
            }
        }
    }
    addDeleteIcon(className,model){
        this.removeIcon(model);
        this.addIcon(className);
    }
    replacePrevstate(elementId,model){
        elementId = elementId.split('-')[0];
        let element = document.querySelector('.'+elementId).lastChild;
        let parent = document.querySelector('.'+elementId)
        element.remove()
        // console.log(model)
        if(model.user[elementId]!==''){
            parent.appendChild(document.createTextNode(model.user[elementId]))
        }
        else{
            parent.appendChild(document.createTextNode(elementId.charAt(0).toUpperCase()+elementId.slice(1)))
        }
    }
    elementHandler(element,model){
        let prev = element;
        element = getElement('.',element);
        let iconElement = getElement('#',prev+'-icon');
        if(!getElement('#',prev+'-input')){
            element.innerHTML = '';
            element.appendChild(iconElement);
            element.appendChild(getInputElement('text', model.user[prev] === ''?'':model.user[prev],prev+'-input','input-tag','personal-controller'));
            attachEvent('blur',prev+'-input',function(event){
                model.setPersonalDetails(prev,event.target.value);
                element.innerHTML = '';
                element.appendChild(iconElement);
                let span = document.createElement('span');
                span.appendChild(document.createTextNode(model.user[prev]));
                element.appendChild(span)
            })
        }
        else{
            getElement('#',prev+'-input').remove();
            if(model.user[prev]===''){
                let span = document.createElement('span');
                span.appendChild(document.createTextNode(prev.charAt(0).toUpperCase()+prev.slice(1)));
                element.appendChild(span)
            }
            else{
                element.appendChild(document.createTextNode(model.user[prev]));
            }  
        } 
    } 
}

//Controller
export class personalController{
    constructor(model,view){
        this.model = model,
        this.view = view
    }
    personalInfoHandler(element){
        this.view.elementHandler(element,this.model);
    }
    profileImageHandler(selector){
        selector.click();
    }
    deleteHandler(element){
        this.view.removeElement(element,this.model);
    } 
    replacePrevStateHandler(elementId){
        this.view.replacePrevstate(elementId,this.model);
    }
    removeIconHandler(){
        this.view.removeIcon(this.model);
    }
    addEditIconHandler(){
        this.view.addIcon();
    }
    addDeleteIconHandler(){
        this.view.addDeleteIcon('fa-trash',this.model);
    }
}