import { PersonalInfo,personalController,PersonalView } from "./personal.js";
import { EducationInfo,EducationView,educationController } from "./education.js";
import { SkillsView,SkillsInfo,skillsController } from "./skills.js";
import { WorkExperienceInfo,WorkExperienceView,workExperienceController } from "./work.js";
import { attachEvent,getDataAttribute ,getElement,formClose} from "./function.js";
import { personalInfoElements,contactInfoElements } from "./personal.js";
import { ContactInfo,ContactView,contactController } from "./contact.js";
import { profileController,ProfileInfo,ProfileView } from "./profiledescription.js";
let fileInputBtn = document.querySelector('#file-input');
let personalModel = new PersonalInfo();
let personalView = new PersonalView();
let educationModel = new EducationInfo();
let educationView = new EducationView();
let skillsView = new SkillsView();
let skillsModel = new SkillsInfo();
let workModel = new WorkExperienceInfo();
let workView = new WorkExperienceView();
let profileInfo = new ProfileInfo();
let profileView = new ProfileView();
let contactModel = new ContactInfo();
let contactView = new ContactView();
let contactInfoController = new contactController(contactModel,contactView);
let skillsInfoController = new skillsController(skillsModel,skillsView);
let personalInfoController = new personalController(personalModel,personalView);
let educationInfoController = new educationController(educationModel,educationView);
let profileDescriptionController = new profileController(profileInfo,profileView);
let workInfoController = new workExperienceController(workModel,workView);
personalInfoElements.map((ele)=>{
    let element = document.querySelector(ele);
    element.addEventListener('click',function(event){
        if(element.classList.contains('fa-pencil')){
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
            contactInfoController.contactInfoHandler(getDataAttribute(event));
        }
        else if(element.classList.contains('fa-trash')){
            contactInfoController.deleteHandler(getDataAttribute(event));
        }
    });
});
document.querySelector('#file-btn').addEventListener('click',function(){
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
attachEvent('click','profile-description-icon',function(event){
    if(event.target.classList.contains('fa-pencil')){
        profileDescriptionController.profileDescriptionHandler(getDataAttribute(event));
    }
    else if(event.target.classList.contains('fa-trash')){
        profileDescriptionController.deleteHandler(getDataAttribute(event));
    }

})
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
    formClose(personalInfoController,contactInfoController,profileDescriptionController);
    personalInfoElements.map((ele)=>{
        let icon = document.querySelector(ele);
        if(icon){
            icon.classList.remove('fa-pencil');
            icon.classList.add('fa-trash');
        }
    })
    contactInfoElements.map((ele)=>{
        let icon = document.querySelector(ele);
        if(icon){
            icon.classList.remove('fa-pencil');
            icon.classList.add('fa-trash');
        }
    })
    let profileElement = getElement('#','profile-description-icon');
    profileElement.classList.remove('fa-pencil');
    profileElement.classList.add('fa-trash');
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

