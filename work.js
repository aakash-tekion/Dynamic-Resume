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
        let objStr = JSON.stringify(obj);
        this.WorkExperienceList = this.WorkExperienceList.filter((ele)=>{
            return JSON.stringify(ele)!== objStr;
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
    workListUpdate(model){
        this.WorkExperienceList.innerHTML = '';
        let start;
        model.WorkExperienceList.map(ele=>{
            let parent = document.createElement('li')
            let firstchild = document.createElement('p');
            firstchild.textContent = ele['start-year']+' - '+ele['end-year'];
            firstchild.style.color = '#b27a56';
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
    addDeleteElement(){
        if(this.WorkExperienceList.hasChildNodes()){
            for(let div of this.WorkExperienceList.childNodes){
                let icon = getIcon('fa-trash','delete-icon','work')
                div.insertBefore(icon,div.firstChild);
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
    addDeleteHandler(){
        this.view.addDeleteElement();
    }
    deleteElementFromModel(obj){
        this.model.removeWorkDetails(obj);
        console.log(this.model);
    }
}