const buttonadd = document.querySelector(".button-add-task")
const input = document.querySelector(".input-task")
const fullList = document.querySelector(".list-tasks")

let myListOfItems = [] // myListOfItems tradução é minha lista de itens

function addNewTask() { // addNewTask tradução é adicionar nova tarefa
    if (input.value.trim() === "") {
        alert("Você não pode adicionar uma tarefa vazia");
        return;
    }

    
    myListOfItems.push({
        task:input.value,
        concluida:false,
    }) // o push vai adicionar a nova tarefa dentro do array vazio let myListOfItems


     input.value = ""

    showNewTaskInserted()
}

function showNewTaskInserted() { //showNewTaskInserted tradução é mostrar nova tarefa adicionada 
    let novaLi = ""

    myListOfItems.forEach((item, index) => {
        novaLi = novaLi + 
        `
            <li class="task ${item.concluida && "done"}">
                <img src="img/checked.png" alt="check-na-tarefa" onclick="taskCompleted(${index})">
                <p>${item.task}</p>
                <img src="img/trash.png" alt="enviar-tarefa-para-lixeira" onclick="deletarTask(${index})">
            </li>
        `
    })

    fullList.innerHTML = novaLi

    localStorage.setItem('listcompleted', JSON.stringify(myListOfItems))

}

function taskCompleted (index){
    myListOfItems[index].concluida = !myListOfItems[index].concluida

    showNewTaskInserted()
}

function deletarTask(index){
    myListOfItems.splice(index, 1)

    showNewTaskInserted()
}

function reloadTask (){
    const estoreLocationTasks = localStorage.getItem('listcompleted')

    myListOfItems = JSON.parse(estoreLocationTasks)

    
    showNewTaskInserted()
}

reloadTask()

buttonadd.addEventListener('click', addNewTask)