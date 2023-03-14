import {getIcon,formGenerator,getElement,MapFromForm,findObj} from './function.js';
import { BasicModel } from './parentmodel.js';
import { BasicView } from './parentview.js';
//model
export class WorkExperienceInfo extends BasicModel{
    constructor(){
        super();
        this.WorkExperienceList = [];
    }
    setWorkExperience(form){
        super.setDetails(this.WorkExperienceList,form)
    }
    removeWorkDetails(obj){  
        this.WorkExperienceList = super.removeDetails(this.WorkExperienceList,obj);
    }
}
//View
export class WorkExperienceView extends BasicView{
    constructor(){
        super();
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
    
    removeWorkIcon(id){
        super.removeIcon(id,this.WorkExperienceList)
    }
    addWorkIcon(className,id){
        super.removeIcon(id,this.WorkExperienceList);
        super.addIcon(className,id,this.WorkExperienceContainer,this.WorkExperienceList)
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
        super.addDeleteIcon('work-icon',className,this.WorkExperienceList)
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
        this.view.removeWorkIcon('work-icon');
    }
    addEditIconHandler(){
        this.view.addWorkIcon('fa-briefcase','work-icon');
    }
}