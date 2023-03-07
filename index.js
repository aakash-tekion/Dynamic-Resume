import { PersonalInfo,personalController,PersonalView } from "./personal.js";
import { EducationInfo,EducationView,educationController } from "./education.js";
import { SkillsView,SkillsInfo,skillsController } from "./skills.js";
import { WorkExperienceInfo,WorkExperienceView,workExperienceController } from "./work.js";
import { attachEvent,getDataAttribute ,getElement,formClose} from "./function.js";
import { personalInfoElements,contactInfoElements } from "./personal.js";
let fileInputBtn = document.querySelector('#file-input');
let personalModel = new PersonalInfo();
let personalView = new PersonalView();
let educationModel = new EducationInfo();
let educationView = new EducationView();
let skillsView = new SkillsView();
let skillsModel = new SkillsInfo();
let workModel = new WorkExperienceInfo();
let workView = new WorkExperienceView();
let skillsInfoController = new skillsController(skillsModel,skillsView);
let personalInfoController = new personalController(personalModel,personalView);
let educationInfoController = new educationController(educationModel,educationView);
let workInfoController = new workExperienceController(workModel,workView);
personalInfoElements.map((ele)=>{
    let element = document.querySelector(ele);
    element.addEventListener('click',function(event){
        if(element.classList.contains('fa-pencil')){
            // //formClose();
            personalInfoController.personalInfoHandler(getDataAttribute(event));
        }
        else if(element.classList.contains('fa-trash')){
            personalInfoController.deleteHandler(getDataAttribute(event));
        }
    });   
})
contactInfoElements.map((ele)=>{
    let element = document.querySelector(ele);
    element.addEventListener('click',function(event){
        if(element.classList.contains('fa-pencil')){
            //formClose();
            personalInfoController.personalInfoHandler(getDataAttribute(event));
        }
        else if(element.classList.contains('fa-trash')){
            personalInfoController.deleteHandler(getDataAttribute(event));
        }
        // personalInfoController.personalInfoHandler(getDataAttribute(event),personalInfoController);
    });

});
document.querySelector('#file-btn').addEventListener('click',function(){
    //formClose();
    personalInfoController.profileImageHandler(fileInputBtn);
});
fileInputBtn.addEventListener('change',function(event){
    document.querySelector('.profile-img').src = URL.createObjectURL(event.target.files[0]);
});
document.getElementById('education-icon').addEventListener('click',function(){
    let element = getElement('.','education-form');
    if(!element){
        //formClose();
        educationInfoController.educationInfoHandler();
    }
    else{
        element.remove();
    }
    
});
attachEvent('click','skills-icon',function(){
    let element = getElement('.','skills-form');
    if(!element){
        //formClose();
        skillsInfoController.skillsInfoHandler();
    }
    else{
        element.remove();
    }
        
});
attachEvent('click','work-icon',function(){
    let element = getElement('.','work-experience-form');
    if(!element){
        //formClose();
        workInfoController.WorkExperienceInfoHandler();
    }
    else{
        element.remove();
    }
    
});
attachEvent('click','main-delete-btn',function(){
    formClose(personalInfoController);
    personalInfoElements.map((ele)=>{
        let icon = document.querySelector(ele);
        if(icon){
            icon.classList.remove('fa-pencil');
            icon.classList.add('fa-trash');
            icon.setAttribute('data-model','personal')
        }
        
    })
    contactInfoElements.map((ele)=>{
        let icon = document.querySelector(ele);
        if(icon){
            icon.classList.remove('fa-pencil');
            icon.classList.add('fa-trash');
            icon.setAttribute('data-model','personal')
        }
        
    })
    let iconRemove = ['#education-icon','#skills-icon','#work-icon'];
    iconRemove.map(ele=>{
        let icon = document.querySelector(ele);
        icon.classList.remove('fa-pencil');
    })
    skillsInfoController.addDeleteHandler();
    educationInfoController.addDeleteHandler();
    workInfoController.addDeleteHandler();
    for(let trash of document.querySelectorAll('#delete-icon')){
        trash.addEventListener('click',function(event){
            let model = event.target.getAttribute('data-model');
            let data = event.target.parentElement.getAttribute('data-obj');
            
            if(model === 'personal'){
                
            }
            else{
                event.target.parentElement.remove();
                if(model === 'work'){
                    workInfoController.deleteElementFromModel(data);
                }
                else if(model === 'skills'){
                    skillsInfoController.deleteElementFromModel(data);
                }
                else if(model === 'education'){
                    educationInfoController.deleteElementFromModel(data);
                }
            }
        })
    }
})
attachEvent('click','main-edit-btn',function(){
    //formClose();
    let icons = document.getElementsByTagName('i');
    for(let ele of icons){
        ele.classList.add('fa-pencil');
        ele.classList.remove('fa-trash');
    };
})

