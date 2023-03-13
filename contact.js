import {getIcon,formGenerator,attachEvent,getInputElement,getElement,getDataAttribute,MapFromForm,findObj,month} from './function.js';
export let contactInfoElements = ['#email-icon','#address-icon','#phone-icon']
//model
export class ContactInfo{
    constructor(){
        this.user = {
        'email':'',
        'phone':'',
        'address':''
        }
    }
    setContactDetails(key,value){
        this.user[key] = value;
    }
    resetContactDetails(key){
        this.user[key]='';
    }
}
//view
export class ContactView{ 
    constructor(){
        this.icons = {
            'email':'fa-envelope',
            'phone':'fa-phone',
            'address':'fa-address-book'
        }
    }
    removeIcon(model){
        for(let key of Object.keys(model.user)){
            let element = document.querySelector(`#${key}-icon`);
            if(element){
                element.remove()
            }
        }

    }
    addIcon(className='',model){
        this.removeIcon(model);
        let flag = 0;
        if(className === ''){
            flag = 1;
        }
        for(let key of Object.keys(model.user)){
            if(flag === 1){
                className = this.icons[key];
            }
            let parent = document.querySelector(`.${key}`);
            let icon = getIcon(className,`${key}-icon`,'',`${key}-icon`,'');
            parent.insertBefore(icon,parent.firstChild);
        }
    }
    addDeleteIcon(model){
        this.addIcon('fa-trash',model);    
    }
    removeElement(element,model){
        model.resetContactDetails(element);
        let htmlElement = getElement('.',element);
        let firstChild = htmlElement.firstChild;
        htmlElement.innerHTML = '';
        htmlElement.appendChild(firstChild);
        let span = document.createElement('span');
        span.appendChild(document.createTextNode(element.charAt(0).toUpperCase()+element.slice(1)+" : "));
        htmlElement.appendChild(span);
    }
    replacePrevstate(elementId,model){
        elementId = elementId.split('-')[0];
        let element = document.querySelector('.'+elementId).lastChild;
        let parent = document.querySelector('.'+elementId)
        element.remove()
        parent.appendChild(document.createTextNode(elementId.charAt(0).toUpperCase()+elementId.slice(1)+" : "+model.user[elementId]));   
    }
    elementHandler(element,model){
        let prev = element;
        element = getElement('.',element);
        let elementId = '#'+prev+'-icon';
        let iconElement = getElement('#',prev+'-icon');
        if(!getElement('#',prev+'-input')){
            element.innerHTML = ''
            element.appendChild(iconElement)
            let span = document.createElement('span');
            span.appendChild(document.createTextNode(prev.charAt(0).toUpperCase()+prev.slice(1)+" : "));
            
            span.appendChild(getInputElement('text',model.user[prev] === ''?'':model.user[prev],prev+'-input','input-tag','contact-controller'))
            element.appendChild(span);
            attachEvent('blur',prev+'-input',function(event){
                console.log(event.target.value)
                element.innerHTML = '';
                element.appendChild(iconElement);
                // element.appendChild(document.createTextNode());
                if(event.target.value !== ''){
                    model.setContactDetails(prev,event.target.value); 
                }
                let span = document.createElement('span');
                span.appendChild(document.createTextNode(prev.charAt(0).toUpperCase()+prev.slice(1)+" : "+model.user[prev]));
                span.classList.add('text');
                element.appendChild(span);
            })
        }
        else{
            getElement('#',prev+'-input').remove();
            element.lastChild.innerHTML = '';
            element.lastChild.appendChild(document.createTextNode(prev.charAt(0).toUpperCase()+prev.slice(1)+" : "+model.user[prev]));
        }
    }
}
export class contactController{
    constructor(model,view){
        this.model = model,
        this.view = view
    }
    contactInfoHandler(element){
        this.view.elementHandler(element,this.model);
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
        this.view.addIcon('',this.model);
    }
    addDeleteIconHandler(){
        this.view.addDeleteIcon(this.model);
    }
}