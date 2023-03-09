import {getIcon,formGenerator,attachEvent,getInputElement,getElement,getDataAttribute,MapFromForm,findObj,month} from './function.js';
//model
export class EducationInfo{
    constructor(){
        this.educationList = [];
    }
    setEducationDetails(form){
        let formData = new FormData(form);
        let obj = {
        }
        for (let [key, value] of formData) {
            if(key == 'start-year'||key == 'end-year'){
                let temp = value.split('-');
                value = month[temp[1]-1]+', '+temp[0]
            }
            obj[key] = value;
        }
        let bool = findObj(this.educationList,obj);
        if(!bool){
            this.educationList.push(obj);
        }
    }
    removeEducationDetails(obj){
        this.educationList = this.educationList.filter((ele)=>{
            return JSON.stringify(ele)!== obj;
        })
    }
}
//View
export class EducationView{
    constructor(){
        this.educationContainer = getElement('.','education-container');
        this.educationListElement = getElement('.','education-list');
        this.educationListElement.innerHTML = '';
        this.formContents = [
            ['institution-name','text','Institution Name'],
            ['location','text','Location'],
            ['degree','select','Degree',['Higher Secondary Education','Bachelor of Arts','Bachelor of Science',
            'Bachelor of Engineering','Master of Engineering','Master of Arts','Master of Science','BBA','MBA',
            'Ph.D.']],
            ['field-of-study','text','Field of study'],
            ['start-year','month','From'],
            ['end-year','month','Till']
        ]
    }
    removeIcon(){
        let icon = document.querySelector('#education-icon');
        if(icon){
            icon.remove()
        }
        for(let div of this.educationListElement.childNodes){
            if(div.firstChild.firstChild.tagName === 'I'){
                div.firstChild.firstChild.remove();
            }  
        }
    }
    addIcon(className){
        this.removeIcon();
        let newIcon = getIcon(className,'education-icon');
        let header = this.educationContainer.firstChild.nextSibling;
        header.insertBefore(newIcon,header.firstChild);    
    }
    EducationListUpdate(model){
        this.educationListElement.innerHTML='';
        model.educationList.forEach(ele=>{
            let parent=document.createElement('div');
            let inner=document.createElement('div');
            let ele1 = document.createElement('p');
            let ele2 = document.createElement('p');
            let ele3 = document.createElement('p');
            ele1.innerText = ele['institution-name']+', '+ele['location'];
            ele2.innerText = ele['degree']+', '+ele['field-of-study'];
            ele3.innerText = ele['start-year']+' - '+ele['end-year'];
            ele3.style.color='#b27a56';
            ele3.style.display = 'inline-block';
            ele3.style.margin=0;
            inner.appendChild(ele3);
            parent.appendChild(inner);
            parent.appendChild(ele1);
            parent.appendChild(ele2);
            parent.setAttribute('data-obj',JSON.stringify(ele));
            this.educationListElement.appendChild(parent);      
        });
    }
    
    EducationFormBind(model){
            let educationForm = formGenerator(this.formContents,'education-form',(event)=>{
                event.preventDefault();
                model.setEducationDetails(event.target);
                this.EducationListUpdate(model);
                event.target.remove();
                
            });
            this.educationListElement.appendChild(educationForm);   
    }
    addDeleteElement(className){
        let icon = document.querySelector('#education-icon');
        if(icon){
            icon.remove();
        }
        if(this.educationListElement.hasChildNodes()){
            for(let div of this.educationListElement.childNodes){
                if(div.firstChild.firstChild && div.firstChild.firstChild.tagName !== 'I'){
                    let icon = getIcon(className,'delete-icon','education');
                    icon.style.display = 'inline-block';
                    div.firstChild.insertBefore(icon,div.firstChild.firstChild);
                }
                
            }
        }
    }
}
//Controller
export class educationController{
    constructor(model,view){
        this.model = model,
        this.view = view
    }
    educationInfoHandler(){
        this.view.EducationFormBind(this.model);
    }
    addDeleteIconHandler(){
        this.view.addDeleteElement('fa-trash');
    }
    deleteElementFromModel(obj){
        this.model.removeEducationDetails(obj);
    }    
    removeIconHandler(){
        this.view.removeIcon();
    }
    addEditIconHandler(){
        this.view.addIcon('fa-university');
    }
}


