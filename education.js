import {getIcon,formGenerator,getElement,findObj,month, MapFromForm} from './function.js';
import { BasicModel } from './parentmodel.js';
import { BasicView } from './parentview.js';
//model
export class EducationInfo extends BasicModel{
    constructor(){
        super();
        this.educationList = [];
    }
    setEducationDetails(form){
        super.setDetails(this.educationList,form)
    }
    removeEducationDetails(obj){
        this.educationList = super.removeDetails(this.educationList,obj);
    }
}
//View
export class EducationView extends BasicView{
    constructor(){
        super();
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
    removeEducationIcon(id){
        super.removeIcon(id,this.educationListElement)
    }
    addEducationIcon(className,id){
        super.removeIcon(id,this.educationListElement);
        super.addIcon(className,id,this.educationContainer,this.educationListElement)
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
        super.addDeleteIcon('work-icon',className,this.educationListElement);
        
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
        this.view.removeEducationIcon('education-icon');
    }
    addEditIconHandler(){
        this.view.addEducationIcon('fa-university','education-icon');
    }
}


