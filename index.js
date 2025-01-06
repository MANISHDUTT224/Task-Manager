
tasks=JSON.parse(localStorage.getItem('tasks'))||[];
loadTasks();

let num=tasks.length;
function AddTask(){
    const taskname=document.querySelector('#taskName').value;
    const taskdescription=document.querySelector('#taskDescription').value;
    const taskstatus=document.querySelector('#taskSelect').value;
    let taskobj={};
    

    taskobj.taskno=num++;
    taskobj.taskname=taskname;
    taskobj.taskdescription=taskdescription;
    taskobj.taskstatus=taskstatus;
    tasks.push(taskobj);
   console.log(tasks);
    document.querySelector('#taskName').value="";
    document.querySelector('#taskDescription').value="";
   loadTasks();
}
document.querySelector('.save-button').addEventListener('click',()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks));
});

function loadTasks(){
    let  badges={
        New:'success',
        Completed:'success',
        Cancelled:'danger',
        InProgress:'warning'
    
    }
   
    let taskHtML='';
    if(tasks.length!==0){
        
    tasks.forEach((task)=>{
        const taskStatus=task.taskstatus;
        const taskNo=task.taskno;
        taskHtML+=`<button class="btn btn-${taskNo}" type="button" data-bs-toggle="popover" data-bs-title="${task.taskname}" data-bs-content="${task.taskdescription}" onclick="Selected(${task.taskno})"><li class="list-group-item d-flex justify-content-between align-items-end item-${taskNo}"> ${task.taskname} <span class="badge rounded-pill bg-${badges[taskStatus]} ">${task.taskstatus}</span></li></button>`;
        document.querySelector('.js-taskgroup').innerHTML=taskHtML;

    });
}
    let alltaskHTML='All Tasks will be displayed here.<ul class="list-group list-group-flush mt-3">';
    let completetaskHTML='Completed Tasks will be displayed here.<ul class="list-group list-group-flush mt-3">';
    let pendingtaskHTML='Pending Tasks will be displayed here.<ul class="list-group list-group-flush mt-3">';
    tasks.forEach((task)=>{
        alltaskHTML+=`<li class="list-group-item d-flex justify-content-between align-items-end item-${task.taskNo}"> ${task.taskname}</li></button>`;
        if(task.taskstatus==="Completed"){
            completetaskHTML+=`<li class="list-group-item d-flex justify-content-between align-items-end item-${task.taskNo}"> ${task.taskname}</li></button>`;
        }
        else if(task.taskstatus==="InProgress" || task.taskstatus==="New"){
            pendingtaskHTML+=`<li class="list-group-item d-flex justify-content-between align-items-end item-${task.taskNo}"> ${task.taskname}</li></button>`;
        }
    });
    document.querySelector('.js-taskgroup').innerHTML=taskHtML;

    alltaskHTML+=`</ul>`;
    completetaskHTML+=`</ul>`;
    pendingtaskHTML+=`</ul>`;
    document.querySelector('.alltasks').innerHTML=alltaskHTML;
    document.querySelector('.completedtasks').innerHTML=completetaskHTML;
    document.querySelector('.pendingtasks').innerHTML=pendingtaskHTML;
}
let selected;
function Selected(taskno){
    selected=document.querySelector(`.item-${taskno}`).classList.contains('active');
   if(!selected){ 
  
    document.querySelector(`.item-${taskno}`).classList.add('active');
    console.log("Selected "+taskno);
    selected=true;
   }
   else{
    document.querySelector(`.item-${taskno}`).classList.remove('active');
    console.log("Deselected"+taskno);
    selected=false;
   }
   
}
document.querySelector('.delete-button').addEventListener('click',()=>{
    let i=0;
    tasks.forEach((task)=>{
        
        if(document.querySelector(`.item-${task.taskno}`).classList.contains('active')){
            tasks.splice(i,1);
            console.log("Deleted "+task.taskno);
        }
        else{
            i++;    
        }    
    });
    console.log(tasks); 
    loadTasks();
});
document.querySelector('.complete-button').addEventListener('click',()=>{
    let i=0;
    tasks.forEach((task)=>{  
        if(document.querySelector(`.item-${task.taskno}`).classList.contains('active')){
            task.taskstatus="Completed";
        }
    });
    loadTasks();

});
