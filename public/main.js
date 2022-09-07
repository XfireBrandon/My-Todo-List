const btn = document.querySelector('#mainBtn')
const gBtn = document.querySelector('#showAll')
const container = document.querySelector('#container')




const input = document.querySelector('#input')

function hideTodos() {
    const hideTodo = document.getElementsByClassName('todos')
    $(hideTodo).empty()
}

// function makeContainer() {
// const editContainer = document.createElement('editContainer')
// editContainer.className = 'edit'

// const input2 = document.createElement('input')
// editContainer.appendChild(input2)



// container.appendChild(editContainer)
// }

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
        // getAll()
       window.location.reload()
        
       
    }
    
})

const appendTocontainer = (data) => {
    const div = document.createElement('h1')
    div.className = 'todos'
    div.setAttribute('id',data.id)
    div.textContent = data.todo
    container.appendChild(div)
   
}

// const deleteButton = () => {
//     const btn3 = document.createElement('button')
//     btn3.innerHTML = 'deleteTodo';
    
//     btn3.addEventListener('click', async (e) => {
//         const id = e.target.value
//         const data = await fetch(`http://localhost:8000/todo/${id}`, {
//          method: "DELETE",
//          headers: {
//              'Content-type': 'text/plain'
//          }
//      });
//         const json = await data.json()
//       console.log(json)
//         //  div.remove()
//         //  btn3.remove()
        
//      })
//      appendDivToContainer(btn3)
// }




 const getAll =  async () => {
    const data = await fetch('http://localhost:8000/todo')
    const json = await data.json()
   
    Object.keys(json).forEach((key) => {
        appendTocontainer((json[key]))

        const btn3 = document.createElement('button')
        btn3.innerHTML = 'Delete';
        
        btn3.addEventListener('click', async (e) => {
            
            const id = json[key].id
            const data = await fetch(`http://localhost:8000/todo/${id}`, {
             method: "DELETE",
             headers: {
                 'Content-type': 'text/plain'
             }
         });
         window.location.reload()
         })

         const editBtn = document.createElement('button')
         editBtn.innerHTML = 'Submit'

         editBtn.addEventListener('click', () => {
             document.location.reload()
         })

         const input2 = document.createElement('input')
         input2.addEventListener('keypress', async (e) => {
             if (e.key === 'Enter') {
                
                 const todos = {
                     "todo": e.target.value
                 }
                 const id = json[key].id
            
                 const data = await fetch(`http://localhost:8000/todo/patch/${id}`, {
                  method: "PATCH",
                  headers: {
                      'Content-type': 'application/json'
                  },
                  body: JSON.stringify(todos)
                  
              });
            
            let patchData = await data.json();
             }  
         })
         appendDivToContainer(btn3)
         appendDivToContainer(input2)
         appendDivToContainer(editBtn)
        
    })
    
}

getAll();


