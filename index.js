let personalInfoElements = ['#name-icon','#role-icon','#profile-description-icon'];
let contactInfoElements = ['#email-icon','#address-icon','#phone-icon']
let fileInputBtn = document.querySelector('#file-input');
function getElement(selector,element){
    console.log(selector+element)
    return document.querySelector(selector+element);
}
function getDataAttribute(event){
    let temp = event.target.getAttribute('data-name').split('-')
    temp.pop();
    return temp.join('-')
}
function getInputElement(type,placeholder=''){
    let input = `<input type=${type} id='input-tag' placeholder = '${placeholder}'}/>`
    return input
}
function attachEvent(event,elementid,callfn){
    document.getElementById(elementid).addEventListener(event,callfn);
}
function formGenerator(elements,class_name,callfn){
    let form = document.createElement('form');
    elements.map((ele)=>{
        let child;
        if(ele[1]=='select'){
            child = document.createElement('select');
            ele[3].map((opt)=>{
                let temp = document.createElement('option');
                temp.setAttribute('value',opt);
                child.appendChild(temp)
            })
        }
        else{
            child = document.createElement('input');
            child.setAttribute('name',ele[0]);
            child.setAttribute('type',ele[1]);
            child.setAttribute('placeholder',ele[2])
        }
        form.appendChild(child);
    });
    form.addEventListener('submit',callfn);
    form.classList.add(class_name);
    return form;

}
//model
class PersonalInfo{
    constructor(){
        this.user = {
        'name' :'',
        'role':'',
        'profile-description':'',
        'email':'',
        'phone':'',
        'address':'',
        'profile-image-url':''
        }
    }
    setPersonalDetails(key,value){
        this.user[key] = value;
    }
}
class EducationInfo{
    constructor(){
        this.educationList = [];
    }
    setEducationDetails(){
        let obj = {
            'institution_name':'',

        }
    }
}
//view
class PersonalView{
    constructor(){
        this.placeholderMapping = {
            'name':'e.g. Aakash',
            'role':'e.g. Software Engineer',
            'email':'e.g. aakash@gmail.com',
            'phone':'e.g. +91',
            'address':'e.g. ACS layout,Bengaluru'
        }
    }   
    elementHandler(element,model){
        // console.log(element)
        let prev = element;
        element = getElement('.',element);
        let elementId = '#'+prev+'-icon';
        let iconElement = getElement('#',prev+'-icon');
        if(contactInfoElements.includes(elementId)){
            element.innerHTML = `<i class="fa fa-pencil ${prev+"-icon"}" data-name=${prev+"-icon"}></i>`+prev.charAt(0).toUpperCase()+prev.slice(1)+' : '+getInputElement('text',this.placeholderMapping[prev])
            attachEvent('change','input-tag',function(event){
                model.setPersonalDetails(prev,event.target.value);
                element.innerHTML = '';
                element.appendChild(iconElement);
                element.appendChild(document.createTextNode(prev.charAt(0).toUpperCase()+prev.slice(1)+" : "));
                element.appendChild(document.createTextNode(model.user[prev]));
            })
        
        }
        else if(personalInfoElements.includes(elementId)){
            if (prev!=='profile-description'){
                element.innerHTML = getInputElement('text', this.placeholderMapping[prev])
                attachEvent('change','input-tag',function(event){
                    model.setPersonalDetails(prev,event.target.value);
                    element.innerHTML = '';
                    element.appendChild(iconElement);
                    element.appendChild(document.createTextNode(model.user[prev]));
                })
            }
            else{
                element.innerHTML = `<textarea rows="5" cols="50" id='textarea-tag'>
                </textarea>`
                attachEvent('change','textarea-tag',function(event){
                    model.setPersonalDetails(prev,event.target.value);
                    element.innerHTML = '';
                    element.appendChild(document.createTextNode(model.user[prev]));
                });
            }
        }
    } 
}
class EducationView{
    constructor(){
        this.educationListElement = getElement('.','education-list');
        this.formContents = [
            ['institution-name','text','Institution Name'],
            ['degree','select','Degree',['Higher Secondary Education','Bachelor of Arts','Bachelor of Science',
            'Bachelor of Engineering','Master of Engineering','Master of Arts','Master of Science','BBA','MBA',
            'Ph.D.']],
            ['field-of-study','text','Field of study'],
            ['location','text','Location'],
            ['start-year','month','Start'],
            ['end-year','month','End']
        ]
    }
    EducationFormBind(model){

        let educationForm = formGenerator(this.formContents,'education-form',function(event){
            event.preventDefault();
        });
        this.educationListElement.appendChild(educationForm);
    }

}
//Controller
class personalController{
    constructor(model,view){
        this.model = model,
        this.view = view
    }
    personalInfoHandler(element){
        this.view.elementHandler(element,this.model);
    }
    profileImageHandler(selector){
        selector.click();
    }
    contactInfoHandler(element){
        this.view.contactElementHandler(element,this.model);
    }
}
class educationController{
    constructor(model,view){
        this.model = model,
        this.view = view
    }
    educationInfoHandler(){
        this.view.EducationFormBind(this.model);
    }
}
let personalModel = new PersonalInfo();
let personalView = new PersonalView();
let educationModel = new EducationInfo();
let educationView = new EducationView();
let personalInfoController = new personalController(personalModel,personalView);
let educationInfoController = new educationController(educationModel,educationView)
personalInfoElements.map((ele)=>{
    document.querySelector(ele).addEventListener('click',function(event){
        personalInfoController.personalInfoHandler(getDataAttribute(event));
    });
})
contactInfoElements.map((ele)=>{
    document.querySelector(ele).addEventListener('click',function(event){
        personalInfoController.personalInfoHandler(getDataAttribute(event));
    });

});
document.querySelector('#file-btn').addEventListener('click',function(){
    personalInfoController.profileImageHandler(fileInputBtn);
});
fileInputBtn.addEventListener('change',function(event){
    document.querySelector('.profile-img').src = URL.createObjectURL(event.target.files[0]);
});
document.getElementById('education-icon').addEventListener('click',function(){
    educationInfoController.educationInfoHandler();
});
