import { PersonalInfo,personalController,PersonalView } from "./personal.js";
import { EducationInfo,EducationView,educationController } from "./education.js";
import { SkillsView,SkillsInfo,skillsController } from "./skills.js";
import { WorkExperienceInfo,WorkExperienceView,workExperienceController } from "./work.js";
import { attachEvent,getDataAttribute ,getElement,formClose} from "./function.js";
import { personalInfoElements } from "./personal.js";
import { contactInfoElements } from "./contact.js";
import { ContactInfo,ContactView,contactController } from "./contact.js";
import { profileController,ProfileInfo,ProfileView } from "./profiledescription.js";
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
function eventHandlers(){
    if(document.querySelector('#file-btn')){
        document.querySelector('#file-btn').addEventListener('click',function(){
            personalInfoController.profileImageHandler(document.querySelector('#file-input'));
        });
    }
    if(document.querySelector('#file-input')){
        document.querySelector('#file-input').addEventListener('change',function(event){
            personalInfoController.setProfileImageHandler(event.target);
        });
    }
    if(document.querySelector('#file-delete')){
        document.querySelector('#file-delete').addEventListener('click',function(){
            personalInfoController.resetProfileImageHandler();
        });
    }
    personalInfoElements.forEach((ele)=>{
        let element = document.querySelector(ele);
        element.addEventListener('click',function(event){
            if(element.classList.contains('fa-trash')){
                personalInfoController.deleteHandler(getDataAttribute(event));
            }
            else{
                personalInfoController.personalInfoHandler(getDataAttribute(event));
            }
        });   
    })
    contactInfoElements.forEach((ele)=>{
        let element = document.querySelector(ele);
        element.addEventListener('click',function(event){
            if(element.classList.contains('fa-trash')){
                contactInfoController.deleteHandler(getDataAttribute(event));
            }
            else{
                contactInfoController.contactInfoHandler(getDataAttribute(event));
            }
        });
    });
    attachEvent('click','education-icon',function(){
        let element = getElement('.','education-form');
        if(!element){
            educationInfoController.educationInfoHandler();
        }
        else{
            element.remove();
        }
    });
    attachEvent('click','profile-description-icon',function(event){
        if(event.target.classList.contains('fa-trash')){
            profileDescriptionController.deleteHandler(getDataAttribute(event));
        }
        else{
            profileDescriptionController.profileDescriptionHandler(getDataAttribute(event));
        }
    });
    attachEvent('click','skills-icon',function(){
        let element = getElement('.','skills-form');
        if(!element){
            skillsInfoController.skillsInfoHandler();
        }
        else{
            element.remove();
        }       
    });
    attachEvent('click','work-icon',function(){
        let element = getElement('.','work-experience-form');
        if(!element){
            workInfoController.WorkExperienceInfoHandler();
        }
        else{
            element.remove();
        }   
    });
}
attachEvent('click','main-delete-btn',function(){
    formClose(personalInfoController,contactInfoController,profileDescriptionController);
    personalInfoController.addDeleteIconHandler();
    profileDescriptionController.addDeleteIconHandler();
    contactInfoController.addDeleteIconHandler();
    skillsInfoController.addDeleteIconHandler();
    educationInfoController.addDeleteIconHandler();
    workInfoController.addDeleteIconHandler();
    for(let trash of document.querySelectorAll('#delete-icon')){
        trash.addEventListener('click',function(event){
            let model = event.target.getAttribute('data-model');
            if(model === 'work'){
                let data = event.target.parentElement.parentElement.getAttribute('data-obj');
                event.target.parentElement.parentElement.remove();
                workInfoController.deleteElementFromModel(data);
            }
            else if(model === 'skills'){
                let data = event.target.parentElement.getAttribute('data-obj');
                event.target.parentElement.remove();
                skillsInfoController.deleteElementFromModel(data);
            }
            else if(model === 'education'){
                let data = event.target.parentElement.parentElement.getAttribute('data-obj');
                event.target.parentElement.parentElement.remove();
                educationInfoController.deleteElementFromModel(data);
            }
        })
    }
    eventHandlers();
})
attachEvent('click','main-edit-btn',function(){
    personalInfoController.addEditIconHandler();
    contactInfoController.addEditIconHandler();
    profileDescriptionController.addEditIconHandler();
    workInfoController.addEditIconHandler();
    educationInfoController.addEditIconHandler();
    skillsInfoController.addEditIconHandler();
    eventHandlers();
})
attachEvent('click','main-preview-btn',function(){
    formClose(personalInfoController,contactInfoController,profileDescriptionController);
    personalInfoController.removeIconHandler();
    contactInfoController.removeIconHandler();
    educationInfoController.removeIconHandler();
    workInfoController.removeIconHandler();
    skillsInfoController.removeIconHandler();
    profileDescriptionController.removeIconHandler();
})
eventHandlers();
