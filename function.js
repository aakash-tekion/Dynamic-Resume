export let month = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];

export function MapFromForm(form){
    let formData = new FormData(form);
    let obj = {
    }
    for (let [key, value] of formData) {
        if(key == 'start-year'||key == 'end-year'){
            let temp = value.split('-');
            value = month[temp[1]-1]+', '+temp[0]
        }
        obj[key] = value;
    }
    return obj;
}
export function formClose(personalController,contactController,profileController){
    let forms = ['work-experience-form','skills-form','education-form'];
    forms.map(ele => {
        let form = document.querySelector('.'+ele)
        if(form){
            form.remove();
        }
    })
    let personalInputs = document.querySelectorAll('.input-tag')
    for(let ele of personalInputs){
        let controllerAttribute = ele.getAttribute('data-controller');
        if(controllerAttribute === 'personal-controller'){
            personalController.replacePrevStateHandler(ele.getAttribute('id'));
        }
        else if(controllerAttribute === 'contact-controller'){
            contactController.replacePrevStateHandler(ele.getAttribute('id'))
        }   
        ele.remove();
    };
    let profileInput = document.querySelector('#textarea-tag');
    if(profileInput){
        profileController.replacePrevStateHandler('profile-description')
        profileInput.remove();
    }
}
export function findObj(list,obj){
    let bool=false;
    let objStr = '';
    for(let [key,value] of Object.entries(obj)){
        objStr+=(key+':'+value.toLowerCase());
        objStr+=';'
    }
    list.map(ele => {
        let temp = '';
        for(let [key,value] of Object.entries(ele)){
            temp+=(key+':'+value.toLowerCase());
            temp+=';'
        }
        if(temp === objStr){
            bool = true;
        }
    });
    return bool;
}
export function getElement(selector,element){
    return document.querySelector(selector+element);
}
export function getDataAttribute(event){
    let temp = event.target.getAttribute('data-name').split('-')
    temp.pop();
    return temp.join('-')
}
export function getInputElement(type,value = '',id,classname='',controller=''){
    let input = document.createElement('input');
    input.setAttribute('value',value);
    input.setAttribute('type',type);
    input.setAttribute('id',id);
    input.setAttribute('class',classname);
    input.setAttribute('data-controller',controller)
    // let input = `<input type=${type} id='${id}' placeholder = '${placeholder}'}/>`
    return input
}
export function attachEvent(event,elementid,callfn){
    document.getElementById(elementid).addEventListener(event,callfn);
}
export function formGenerator(elements,class_name,callfn){
    let form = document.createElement('form');
    elements.map((ele)=>{
        let child;
        if(ele[1]=='select'){
            child = document.createElement('select');
            child.setAttribute('name',ele[0]);
            ele[3].map((opt)=>{
                let temp = document.createElement('option');
                temp.setAttribute('value',opt);
                temp.text = opt;
                child.appendChild(temp);
            })
            child.classList.add('form-select');
        }
        else{
            child = document.createElement('input');
            if(ele[1]==='month'){
                let label = document.createElement('label');
                label.textContent = ele[2];
                label.setAttribute('for',ele[0]);
                label.classList.add('form-label');
                form.appendChild(label);
                child.setAttribute('id',ele[0]);
            }
            child.setAttribute('name',ele[0]);
            child.setAttribute('type',ele[1]);
            child.setAttribute('placeholder',ele[2])
            child.classList.add('form-input');
           
        }
        form.appendChild(child);
    });
    let submitBtn = document.createElement('button');
    submitBtn.setAttribute('type','submit');
    submitBtn.classList.add('form-button');
    submitBtn.innerText='Add';
    form.appendChild(submitBtn);
    
    form.addEventListener('submit',callfn);
    form.classList.add(class_name);
    return form;

}
export function getIcon(classname,id,data='',name=''){
    let icon = document.createElement('i');
    icon.setAttribute('id',id);
    icon.setAttribute('data-model',data);
    if(name!==''){
        icon.setAttribute('data-name',name);
    }
    icon.classList.add('fa');
    icon.classList.add(classname);
    return icon
}