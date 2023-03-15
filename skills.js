import {getIcon,MapFromForm} from './function.js';
//model
export class SkillsInfo{
    constructor(){
        this.skillsList = [];
    }
    findObj(obj){
        let bool = false;
        this.skillsList.forEach((ele)=> {
            if(ele['skill'].toLowerCase() === obj['skill'].toLowerCase()){
                ele['rate'] = obj['rate'];
                bool = true;
            } 
        });
        return bool;
    }
    setSkills(form){
        let obj = MapFromForm(form);
        let bool = this.findObj(obj);
        if(!bool){
            this.skillsList.push(obj);
        }    
    }
    removeSkillsDetails(obj){
        this.skillsList = this.skillsList.filter((ele)=>{
            return JSON.stringify(ele)!== obj;
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
    addStars(rate){
        let str=''
        for(let i=0;i<rate;i++){
            str+='⭐ '
        }
        return str
    }
    removeIcon(){
        let icon = document.querySelector('#skills-icon');
        if(icon){
            icon.remove()
        }
        for(let div of this.skillsList.childNodes){
            if(div.firstChild.tagName === 'I'){
                div.firstChild.remove();
            }  
        }
    }
    addIcon(className){
        this.removeIcon();
        let newIcon = getIcon(className,'skills-icon');
        let header = this.skillsContainer.firstChild.nextSibling;
        header.insertBefore(newIcon,header.firstChild);
    }
    skillsListUpdate(model){
        this.skillsList.innerHTML = '';
        model.skillsList.forEach(ele=>{
            let li = document.createElement('li');
            let span1 = document.createElement('span');
            span1.innerText = ele['skill'];
            let span2 = document.createElement('span');
            span2.appendChild(document.createTextNode(this.addStars(ele['rate'])));
            span2.style.float='right';
            li.style.width='70%';
            li.appendChild(span1);
            li.appendChild(span2);
            li.setAttribute('data-obj',JSON.stringify(ele));
            this.skillsList.appendChild(li);
        });
    }
    addDeleteElement(className){
        let icon = document.querySelector('#skills-icon');
        if(icon){
            icon.remove();
        }
        if(this.skillsList.hasChildNodes()){
            for(let li of this.skillsList.childNodes){
                if(li.firstChild.tagName !== 'I'){
                    let icon = getIcon(className,'delete-icon','skills');
                    li.insertBefore(icon,li.firstChild);
                }
            }
        }
    }
    skillsFormBind(model){
        if(!document.querySelector('.skills-form')){
            let form  = document.createElement('form');
            form.innerHTML = `
                <input class='form-input' type='text' placeholder='e.g. HTML' name = 'skill' />
                <div class='center-row'>
                    <input type='range' id='rate-input' name='rate' min='1' max='5' value='3' step='1' />
                    <span id='rate-value'>3</span>
                </div>
                <button class='form-button' type='submit'>Add</button>
            `;
            form.addEventListener('submit',(event)=>{
                event.preventDefault();
                if(event.target.skill.value !== ''){
                    model.setSkills(event.target);
                    this.skillsListUpdate(model);
                    event.target.remove();
                }
                else{
                    alert('Enter some skill');
                }
                
            });
            form.classList.add('skills-form');
            this.skillsContainer.appendChild(form);
            let span = document.getElementById('rate-value')
            document.getElementById('rate-input').addEventListener('input',function(event){
                span.textContent = event.target.value;
            })
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
    }
    addDeleteIconHandler(){
        this.view.addDeleteElement('fa-trash');
    }
    removeIconHandler(){
        this.view.removeIcon();  
    }
    addEditIconHandler(){
        this.view.addIcon('fa-star');
    }
}