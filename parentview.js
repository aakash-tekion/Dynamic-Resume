import { getIcon } from "./function.js";
export class BasicView{
    removeIcon(id,list){
        let icon = document.querySelector('#'+id);
        if(icon){
            icon.remove()
        }
        for(let div of list.childNodes){
            if(div.firstChild.firstChild.tagName === 'I'){
                div.firstChild.firstChild.remove();
            }  
        }
    }
    addIcon(className,id,container,list){
        this.removeIcon(id,list);
        let newIcon = getIcon(className,id);
        let header = container.firstChild.nextSibling;
        header.insertBefore(newIcon,header.firstChild);
    }
    addDeleteIcon(id,className,list){
        let icon = document.querySelector('#'+id);
        if(icon){
            icon.remove();
        }
        if(list.hasChildNodes()){
            for(let div of list.childNodes){
                if(div.firstChild.firstChild && div.firstChild.firstChild.tagName !== 'I'){
                    let icon = getIcon(className,'delete-icon',id.split('-')[0]);
                    icon.style.display = 'inline-block';
                    div.firstChild.insertBefore(icon,div.firstChild.firstChild);
                } 
            }
        }
    }

}