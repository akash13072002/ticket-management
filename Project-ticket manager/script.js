let addBtn = document.querySelector('.add-button');
let modelcont = document.querySelector('.model-container');
let maincont = document.querySelector('.main-container')
let taskArea = document.querySelector('.text-area-container')
let removeBtn=document.querySelector('.remove-buttton')
 

let colors = ["lightpink", "lightgreen", "lightblue", "black"];
let allPriorityColors = document.querySelectorAll(".priority-colors");

let modalPriorityColor = colors[colors.length - 1];

let removeflag=false;
let addFlag = false;

let lockClass='fa-lock'
let unlockClass=  'fa-lock-open'

addBtn.addEventListener('click', function () {
    addFlag = !addFlag;

    if (addFlag == true) {
        modelcont.style.display = "flex";
    }
    else {
        modelcont.style.display = "none";
    }

});

//Select the Priorty Color of The task

allPriorityColors.forEach(function (colorElem) {
    colorElem.addEventListener("click", function (e) {
      allPriorityColors.forEach(function (priorityColorElem) {
        priorityColorElem.classList.remove("active");
      });
      colorElem.classList.add("active");
  
      modalPriorityColor = colorElem.classList[0]; // lightpink
    });
  });
  

modelcont.addEventListener("keydown", function (e) {
    let key = e.key;

    if (key == 'Shift') {
        createTicket(taskArea.value,modalPriorityColor)
        modelcont.style.display = 'none';
        addFlag = false;
        taskArea.value = ''
    }
});

function createTicket(ticketTask,ticketcolor) {
    let id = shortid()
    let ticketcont = document.createElement('div')
    ticketcont.setAttribute('class', 'ticket-container')

    ticketcont.innerHTML = `<div class="ticket-color ${ticketcolor}"></div>
<div class="ticket-id">${id}</div>
<div class="task-area">${ticketTask}</div>
<div class="ticket-lock">
  <i class="fa-solid fa-lock"></i>
</div>`

    maincont.append(ticketcont)
    handleremove(ticketcont);
    handlelock(ticketcont);
    handlecolor(ticketcont);
    
}

removeBtn.addEventListener('click', function(){
    removeflag=!removeflag;

    if(removeflag==true){
        removeBtn.style.color="red";

    }
    else{
        removeBtn.style.color="black";
    }
});

function handleremove(ticket)
{
    ticket.addEventListener('click',function(){
     if(!removeflag) return;
    ticket.remove()       // ui removal
    });
}

function handlelock(ticket){
    let ticketLockEle =ticket.querySelector('.ticket-lock')
    let ticketLockIcon=ticketLockEle.children[0];

    let tickettaskArea =ticket.querySelector('.task-area')

    ticketLockIcon.addEventListener('click',function(){
        if(ticketLockIcon.classList.contains(lockClass)){
            ticketLockIcon.classList.remove(lockClass)
            ticketLockIcon.classList.add(unlockClass)
            tickettaskArea.setAttribute('contenteditable','true')  // in built function to edit

        }
        else{
            ticketLockIcon.classList.remove(unlockClass)
            ticketLockIcon.classList.add(lockClass)
            tickettaskArea.setAttribute('contenteditable','false')

        }

        
    });
}

function handlecolor(ticket){
    let ticketcolorBand=ticket.querySelector('.ticket-color')

  ticketcolorBand.addEventListener('click',function(){
    let currenttickcolor=ticketcolorBand.classList[1]

    let currentcolorindex=colors.findIndex(function(color){
         return currenttickcolor==color
    })
    currentcolorindex++;

let newtickcoloridx=currentcolorindex%colors.length
    let newtickcolor=colors[newtickcoloridx]
    ticketcolorBand.classList.remove(currenttickcolor)
    ticketcolorBand.classList.add(newtickcolor)
  })




}