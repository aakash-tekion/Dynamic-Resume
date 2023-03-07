import {getIcon,formGenerator,attachEvent,getInputElement,getElement,getDataAttribute,MapFromForm,findObj,month} from './function.js';
//model
export class SkillsInfo{
    constructor(){
        this.skillsList = [];
    }
    setSkills(form){
        let obj = MapFromForm(form)
        let bool = findObj(this.skillsList,obj);
        if(!bool){
            this.skillsList.push(obj);
        }
    }
    removeSkillsDetails(obj){
        let objStr = JSON.stringify(obj);
        this.skillsList = this.skillsList.filter((ele)=>{
            return JSON.stringify(ele)!== objStr;
        })
    }
}
//View
export class SkillsView{
    constructor(){
        this.skillsContainer = document.querySelector('.skills-container');
        this.skillsList = document.querySelector('.skills-ul');
        this.skillsList.innerHTML = '';
        this.formContents = [
            ['skill','text','e.g HTML']
        ];
    }
    skillsListUpdate(model){
        this.skillsList.innerHTML = '';
        model.skillsList.map(ele=>{
            let li = document.createElement('li');
            li.innerText = ele['skill'];
            li.setAttribute('data-obj',JSON.stringify(ele));
            this.skillsList.appendChild(li);
        });
    }
    addDeleteElement(){
        if(this.skillsList.hasChildNodes()){
            for(let li of this.skillsList.childNodes){
                let icon = getIcon('fa-trash','delete-icon','skills')
                li.insertBefore(icon,li.firstChild);
            }
        }
        
    }
    skillsFormBind(model){
        if(!document.querySelector('.skills-form')){
            let form = formGenerator(this.formContents,'skills-form',(event)=>{
                event.preventDefault();
                model.setSkills(event.target);
                this.skillsListUpdate(model);
                event.target.remove();
            });
            this.skillsContainer.appendChild(form);
        }
        else{
            document.querySelector('.skills-form').remove();
        }
    }
}
//Controller
export class skillsController{
    constructor(model,view){
        this.model = model,
        this.view = view
    }
    skillsInfoHandler(){
        this.view.skillsFormBind(this.model);
    }
    deleteElementFromModel(obj){
        this.model.removeSkillsDetails(obj);
        console.log(this.model);
    }
    addDeleteHandler(){
        this.view.addDeleteElement()
    }

}