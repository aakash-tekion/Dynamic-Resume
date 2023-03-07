import {getIcon,formGenerator,attachEvent,getInputElement,getElement,getDataAttribute,MapFromForm,findObj,month} from './function.js';
export let personalInfoElements = ['#name-icon','#role-icon','#profile-description-icon'];
export let contactInfoElements = ['#email-icon','#address-icon','#phone-icon']
//model
export class PersonalInfo{
    constructor(){
        this.user = {
        'name' :'',
        'role':'',
        'profile-description':'',
        'email':'',
        'phone':'',
        'address':'',
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
        this.placeholderMapping = {
            'name':'e.g. Aakash',
            'role':'e.g. Software Engineer',
            'email':'e.g. aakash@gmail.com',
            'phone':'e.g. +91',
            'address':'e.g. ACS layout,Bengaluru'
        }

    }   
    removeElement(element,model){
        model.resetPersonalDetails(element);
        console.log(element)
        let htmlElement = getElement('.',element);
        let firstChild = htmlElement.firstChild;
        if(contactInfoElements.includes('#'+element+'-icon')){
            htmlElement.innerHTML = '';
            htmlElement.appendChild(firstChild);
            let span = document.createElement('span');
            span.appendChild(document.createTextNode(element.charAt(0).toUpperCase()+element.slice(1)+" : "));
            htmlElement.appendChild(span);
        }
        else{
            if(element === 'profile-description'){
                htmlElement.remove();
            }
            else{
                htmlElement.innerHTML = ''
                htmlElement.appendChild(firstChild)
                let span = document.createElement('span');
                span.appendChild(document.createTextNode(element.charAt(0).toUpperCase()+element.slice(1)));
                htmlElement.appendChild(span);
            }
        }

    }
    replacePrevstate(elementId,model){
        console.log(model,elementId)
        elementId = elementId.split('-')[0];
        let element = document.querySelector('.'+elementId).lastChild;
        let parent = document.querySelector('.'+elementId)
        element.remove()
        if(contactInfoElements.includes('#'+elementId+'-icon')){
            parent.appendChild(document.createTextNode(elementId.charAt(0).toUpperCase()+elementId.slice(1)+" : "+model.user[elementId]))
        }
        else{
            parent.appendChild(document.createTextNode(model.user[elementId]))
        }  
    }
    
    elementHandler(element,model){
        let prev = element;
        element = getElement('.',element);
        let elementId = '#'+prev+'-icon';
        let iconElement = getElement('#',prev+'-icon');
        if(contactInfoElements.includes(elementId)){
            if(!getElement('#',prev+'-input')){
                element.innerHTML = ''
                element.appendChild(iconElement)
                let span = document.createElement('span');
                span.appendChild(document.createTextNode(prev.charAt(0).toUpperCase()+prev.slice(1)+" : "));
                
                span.appendChild(getInputElement('text',this.placeholderMapping[prev],prev+'-input','input-tag'))
                element.appendChild(span);
                attachEvent('change',prev+'-input',function(event){
                    console.log(event.target.value)
                    element.innerHTML = '';
                    element.appendChild(iconElement);
                    // element.appendChild(document.createTextNode());
                    if(event.target.value !== ''){
                        model.setPersonalDetails(prev,event.target.value); 
                    }
                    let span = document.createElement('span');
                    span.appendChild(document.createTextNode(prev.charAt(0).toUpperCase()+prev.slice(1)+" : "+model.user[prev]));
                    span.classList.add('text');
                    element.appendChild(span);
                })
            }
            else{

                getElement('#',prev+'-input').remove();
                element.lastChild.innerHTML = ''
                // .appendChild(document.createTextNode(element.charAt(0).toUpperCase()+element.slice(1)+" : "));
                element.lastChild.appendChild(document.createTextNode(prev.charAt(0).toUpperCase()+prev.slice(1)+" : "+model.user[prev]));
                
            }
        }
        else if(personalInfoElements.includes(elementId)){
            if (prev!=='profile-description'){
                if(!getElement('#',prev+'-input')){
                    element.innerHTML = '';
                    element.appendChild(iconElement);
                    element.appendChild(getInputElement('text', this.placeholderMapping[prev],prev+'-input','input-tag'));
                    attachEvent('change',prev+'-input',function(event){
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
                    element.lastChild.innerHTML = '';
                    element.lastChild.appendChild(document.createTextNode(model.user[prev]));
                } 
            }
            else{
                if(!getElement('#','textarea-tag')){
                    element.innerHTML = `<textarea rows="5" cols="50" id='textarea-tag'>
                    </textarea>`
                    attachEvent('change','textarea-tag',function(event){
                        model.setPersonalDetails(prev,event.target.value);
                        element.innerHTML = '';
                        element.appendChild(document.createTextNode(model.user[prev]));
                    });
                }
                else{
                    getElement('#','textarea-tag').remove();
                }   
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
}