const btn = document.querySelector('#mainBtn')
const gBtn = document.querySelector('#showAll')
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
    div.setAttribute('id',tododata.id)
    div.textContent = tododata.todo

    let btn3 = document.createElement('button');
    btn3.innerHTML = 'deleteTodo';
    
    const input2 = document.createElement('input')
    input2.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const todos = {
                "todo": e.target.value
            }
            const id = tododata.id
       
            const data = await fetch(`http://localhost:8000/todo/patch/${id}`, {
             method: "PATCH",
             headers: {
                 'Content-type': 'application/json'
             },
             body: JSON.stringify(todos)
         });
         let json = await data.json();
        console.log(json)
        
           
        }
        
    })


    appendDivToContainer(div)
    appendDivToContainer(btn3)
    appendDivToContainer(input2)

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
        input2.remove()
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

const appendTocontainer = (data) => {
    const div = document.createElement('h1')
    div.setAttribute('id',data.id)
    div.textContent = data.todo
    container.appendChild(div)
    console.log(data.id)
}


// gBtn.addEventListener('click', async (e) => {
//     const data = await fetch('http://localhost:8000/todo')
//     const json = await data.json()
   
//     Object.keys(json).forEach((key) => {
//         appendTocontainer((json[key]))
//     })
    
// })


 const getAll =  async () => {
    const data = await fetch('http://localhost:8000/todo')
    const json = await data.json()
   
    Object.keys(json).forEach((key) => {
        appendTocontainer((json[key]))
    })
    
}

getAll();