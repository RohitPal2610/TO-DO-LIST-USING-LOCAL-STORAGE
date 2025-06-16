const inputbox = document.getElementById("todo-input");
const addbtn =document.getElementById("add-button");
const todoList=document.getElementById("todoList");
function addtodo(){
    let todos=[];
    const inputText=inputbox.value.trim();
    if (inputText === "")
        {
            alert("Write something");
            return;
        } 
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);
    if(localStorage.getItem("todos")===null)
    {
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(inputText);
    localStorage.setItem("todos",JSON.stringify(todos));

    const editbtn = document.createElement("button");
    editbtn.classList.add("edit");
    editbtn.innerHTML = "Edit";
    li.appendChild(editbtn);   

    const deletebtn = document.createElement("button");
    deletebtn.classList.add("btn")
    deletebtn.innerHTML="Remove";
    li.appendChild(deletebtn);

    deletebtn.addEventListener("click",()=>
    {
        li.remove();
        let currenttodos = JSON.parse(localStorage.getItem("todos"));
        currenttodos = currenttodos.filter(todo => todo!== p.innerHTML);
        localStorage.setItem("todos",JSON.stringify(currenttodos));
    })

    editbtn.addEventListener("click",()=>{
    const newText = prompt("Edit your task:",p.innerHTML)
    if (inputText === "")
        {
            alert("Write something");
            return;
        }  
        let currenttodos = JSON.parse(localStorage.getItem("todos"));
        const index = currenttodos.indexOf(p.innerHTML);
        if(index!==-1)
        {
            currenttodos[index] = newText.trim();
            localStorage.setItem("todos",JSON.stringify(currenttodos));
        }
        p.innerHTML = newText;
    })
    todoList.appendChild(li);
    inputbox.value = "";
}
addbtn.addEventListener("click",addtodo);
inputbox.addEventListener("keypress",(e)=>
{
    if(e.key==="Enter")
    {
        addtodo();
    }
})
window.addEventListener("DOMContentLoaded", () => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(todo => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = todo;
        li.appendChild(p);

        const editbtn = document.createElement("button");
        editbtn.classList.add("edit");
        editbtn.innerHTML = "Edit";
        li.appendChild(editbtn);

        const deletebtn = document.createElement("button");
        deletebtn.classList.add("btn");
        deletebtn.innerHTML = "Remove";
        li.appendChild(deletebtn);

        deletebtn.addEventListener("click", () => {
            li.remove();
            let currenttodos = JSON.parse(localStorage.getItem("todos"));
            currenttodos = currenttodos.filter(t => t !== p.innerHTML);
            localStorage.setItem("todos", JSON.stringify(currenttodos));
        });

        editbtn.addEventListener("click", () => {
            const newText = prompt("Edit your task:", p.innerHTML);
            if (newText.trim() === "") {
                alert("Write something");
                return;
            }
            let currenttodos = JSON.parse(localStorage.getItem("todos"));
            const index = currenttodos.indexOf(p.innerHTML);
            if (index !== -1) {
                currenttodos[index] = newText.trim();
                localStorage.setItem("todos", JSON.stringify(currenttodos));
            }
            p.innerHTML = newText.trim();
        });

        todoList.appendChild(li);
    });
});