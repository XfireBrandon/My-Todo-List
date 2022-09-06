const btn = document.querySelector('#mainBtn')
const cBtn = document.querySelector('#clearButton')
const container = document.querySelector('#container')
let btn3 = document.createElement('button')


const input = document.querySelector('#input')

function deleteTodo() {
    const hideQuote = document.getElementsByClassName('todos')
    $(hideQuote).empty()
}

function makeDiv(obj) {
    const tododata = obj[0]
    const div = document.createElement('h1')
    div.classList.add('todos')
    div.setAttribute('id',tododata.id)
    div.textContent = tododata.todo

    let btn3 = document.createElement('button');
    btn3.innerHTML = 'deleteTodo';
    

    appendDivToContainer(div)
    appendDivToContainer(btn3)

    btn3.addEventListener('click', async (e) => {
       const id = tododata.id
       
       const data = await fetch(`http://localhost:8000/todo/${id}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'text/plain'
        }
    });
        div.remove()
        btn3.remove()
    })
}

function appendDivToContainer(htmlNode) {
    container.appendChild(htmlNode)
}

input.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const todos = {
            "todo": e.target.value
        }
        const response = await fetch('http://localhost:8000/todo/post', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(todos)
        });
        let data = await response.json()
        makeDiv(data)
       
        
       
    }
    
})



cBtn.addEventListener('click', async (e) => {
    const data = await fetch('http://localhost:8000/todo', {
        method: "DELETE",
        headers: {
            'Content-type': 'text/plain'
        }
    });
    btn3.remove()
    deleteTodo();
   
})
