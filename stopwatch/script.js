let[hours,minutes,seconds]=[0,0,0];
let showtime=document.getElementById("watchtime");
let timer=null;
let start=document.getElementById("start");
let stop=document.getElementById("stop");
let reset=document.getElementById("reset");
function updateClock(){
    seconds++;
    if(seconds==60){
        seconds=0;
        minutes++;
    }
    if(minutes==60){
        minutes=0;
        hours++;}
    let h=hours<10?"0"+hours:hours;
    let m=minutes<10?"0"+minutes:minutes;
    let s=seconds<10?"0"+seconds:seconds;
    showtime.innerHTML= h+":"+m+":"+s;
}

function starttimer(){
    if(timer!=null){
        clearInterval(timer);
    }
    timer=setInterval(updateClock,1000); // here timer stores a unique id for running timer so that it can be cleared later by another function like stoptimer or resettimer 
    // if it is not clear than multiple timer will run in background and will change the time in screen each time timer will call updateClock function and app will start creating problems like leg and wasting cpu cycles.
}

function stoptimer(){
    clearInterval(timer);
}

function resettimer(){
    clearInterval(timer);
    [hours,minutes,seconds]=[0,0,0];
    showtime.innerHTML="00:00:00";
}