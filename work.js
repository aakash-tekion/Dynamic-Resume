import {getIcon,formGenerator,attachEvent,getInputElement,getElement,getDataAttribute,MapFromForm,findObj,month} from './function.js';
//model
export class WorkExperienceInfo{
    constructor(){
        this.WorkExperienceList = [];
    }
    setWorkExperience(form){
        let obj = MapFromForm(form)
        let bool = findObj(this.WorkExperienceList,obj);
        if(!bool){
            this.WorkExperienceList.push(obj);
        }
    }
    removeWorkDetails(obj){  
        this.WorkExperienceList = this.WorkExperienceList.filter((ele)=>{
            return JSON.stringify(ele)!== obj;
        })
    }
}
//View
export class WorkExperienceView{
    constructor(){
        this.WorkExperienceContainer = getElement('.','work-experience-container');
        this.WorkExperienceList = getElement('.','work-experience-list');
        this.WorkExperienceList.innerHTML = '';
        this.WorkExperienceList.classList.add('skills-ul');
        this.formContents = [
            ['company-name','text','Organization Name'],
            ['role','text','role'],
            ['work-done','input','Work done'],
            ['start-year','month','Form'],
            ['end-year','month','Till']
        ]
    }
    
    removeIcon(){
        let icon = document.querySelector('#work-icon');
        if(icon){
            icon.remove()
        }
        for(let div of this.WorkExperienceList.childNodes){
            if(div.firstChild.firstChild.tagName === 'I'){
                div.firstChild.firstChild.remove();
            }  
        }
    }
    addIcon(className){
        this.removeIcon();
        let newIcon = getIcon(className,'work-icon');
        let header = this.WorkExperienceContainer.firstChild.nextSibling;
        header.insertBefore(newIcon,header.firstChild);
    }
    workListUpdate(model){
        this.WorkExperienceList.innerHTML = '';
        let start;
        model.WorkExperienceList.forEach(ele=>{
            let parent = document.createElement('li');
            let firstchild = document.createElement('div');
            let p = document.createElement('p');
            p.textContent = ele['start-year']+' - '+ele['end-year'];
            p.style.color = '#b27a56';
            p.style.display = 'inline-block';
            p.style.margin=0;
            firstchild.appendChild(p);
            parent.appendChild(firstchild);
            for(let [key,value] of Object.entries(ele)){
                let child;
                if(key!=='start-year'  && key !=='end-year'){
                    child = document.createElement('p');
                    child.innerText = value;
                }
                if(child){
                    parent.appendChild(child);
                }  
            }
            parent.setAttribute('data-obj',JSON.stringify(ele));
            this.WorkExperienceList.appendChild(parent);
        });
    }
    addDeleteIcon(className){
        let icon = document.querySelector('#work-icon');
        if(icon){
            icon.remove();
        }
        if(this.WorkExperienceList.hasChildNodes()){
            for(let div of this.WorkExperienceList.childNodes){
                if(div.firstChild.firstChild && div.firstChild.firstChild.tagName !== 'I'){
                    let icon = getIcon(className,'delete-icon','work');
                    icon.style.display = 'inline-block';
                    div.firstChild.insertBefore(icon,div.firstChild.firstChild);
                } 
            }
        }
    }
    workExperienceFormBind(model){
        if(!document.querySelector('.work-experience-form')){
            let form = formGenerator(this.formContents,'work-experience-form',(event)=>{
                event.preventDefault();
                model.setWorkExperience(event.target);
                this.workListUpdate(model);
                event.target.remove();
            });
            this.WorkExperienceContainer.appendChild(form);
        }
        else{
            document.querySelector('.work-experience-form').remove();
        }
    }
}
//Controller
export class workExperienceController{
    constructor(model,view){
        this.model = model,
        this.view = view
    }
    WorkExperienceInfoHandler(){
        this.view.workExperienceFormBind(this.model);
    }
    addDeleteIconHandler(){
        this.view.addDeleteIcon('fa-trash');
    }
    deleteElementFromModel(obj){
        this.model.removeWorkDetails(obj);
    }
    removeIconHandler(){
        this.view.removeIcon();
    }
    addEditIconHandler(){
        this.view.addIcon('fa-briefcase');
    }
}