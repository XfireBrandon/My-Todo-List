const btn = document.querySelector('#mainBtn')

btn.addEventListener('click', async (e) => {
    const data = await fetch('http://localhost:8000/todo');
    const json = await data.json()
    console.log(json)
})

const input = document.querySelector('#input')

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
        // let json  = await data.json();
        // console.log(json)
       
    }
})

const cBtn = document.querySelector('#clearButton')

cBtn.addEventListener('click', async (e) => {
    const data = await fetch('http://localhost:8000/todo', {
        method: "DELETE",
        headers: {
            'Content-type': 'text/plain'
        }
    });
    // const json = await data.json()
    // console.log(json)
})
