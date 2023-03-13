import {getIcon,formGenerator,attachEvent,getInputElement,getElement,getDataAttribute,MapFromForm,findObj,month} from './function.js';
export let personalInfoElements = ['#name-icon','#role-icon'];
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
        this.leftTopContainer = document.querySelector('.left-part');
        this.profileImage = document.querySelector('.profile-img');
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
            flag = 1;
        }
        for(let key of Object.keys(this.icons)){
            if(flag === 1){
                className = this.icons[key];
            }
            let parent = document.querySelector(`.${key}`);
            let newIcon = getIcon(className,`${key}-icon`,'',`${key}-icon`);
            parent.insertBefore(newIcon,parent.firstChild);
        }
        if(className!=='fa-trash'){
            if(!document.querySelector('#file-input')){
                let fileInput = document.createElement('input');
                fileInput.setAttribute('id','file-input');
                fileInput.setAttribute('hidden','hidden');
                fileInput.setAttribute('type','file');
                this.leftTopContainer.appendChild(fileInput);
                
            }
            if(!document.querySelector('#file-btn')){
                let fileButton = document.createElement('button');
                fileButton.setAttribute('id','file-btn');
                fileButton.textContent = 'Add'
                this.leftTopContainer.appendChild(fileButton);
            }
        } 
    }
    removeIcon(model){
        for(let key of Object.keys(model.user)){
            let element = document.querySelector(`#${key+'-icon'}`);
            if(element){
                element.remove();
            }
        }
        if(document.querySelector('#file-btn')){
            document.querySelector('#file-btn').remove();
        }
        if(document.querySelector('#file-input')){
            document.querySelector('#file-input').remove();
        }
        if(document.querySelector('#file-delete')){
            document.querySelector('#file-delete').remove();
        }
    }
    addDeleteIcon(className,model){
        this.removeIcon(model);
        this.addIcon(className);
        let fileButton = document.createElement('button');
        fileButton.setAttribute('id','file-delete');
        fileButton.textContent = 'Remove';
        this.leftTopContainer.appendChild(fileButton);
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
    resetProfileImage(){
        document.querySelector('.profile-img').src = './profileavatar.jpeg';
    }
    setProfileImage(file){
        this.profileImage.src = URL.createObjectURL(file);
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
        console.log(selector);
        selector.click();
    }
    setProfileImageHandler(file){
        this.model.setPersonalDetails('profile-image-url',file.files[0]);
        this.view.setProfileImage(file.files[0]);
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
        this.view.removeIcon(this.model);
        this.view.addIcon();
    }
    addDeleteIconHandler(){
        this.view.addDeleteIcon('fa-trash',this.model);
    }
    resetProfileImageHandler(){
        this.model.resetPersonalDetails('profile-image-url');
        this.view.resetProfileImage();
    }
}