      
import TweenMax from 'gsap';
import { Power4 } from 'gsap/gsap-core';

export function notificationPopup(message,status){
    const notification = document.querySelector("#notification");
    if(!notification.classList.contains("active")){
        notification.classList.add(status,"active");
        notification.querySelector("p").textContent = message;
        TweenMax.set(notification,{display:"block"});
        TweenMax.from(notification,0.25,{opacity:0,y:200,ease:Power4.easeOut,onComplete:function(){
        TweenMax.to(notification,0.25,{opacity:0,y:100,delay:1,onComplete:function(){
            TweenMax.set(notification,{display:"none",y:0,opacity:1});
            notification.classList.remove("active",status);
        }})
        }});
    }
    else{
        const keepChecking = setInterval(()=>{
        const checkClass = document.querySelector("#notification").classList.contains("active");
        console.log(checkClass);
        if(!checkClass){
            clearInterval(keepChecking);
            notificationPopup(message,status);
        }
        },1000);
    }
}