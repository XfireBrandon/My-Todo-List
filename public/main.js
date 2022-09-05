const btn = document.querySelector('#mainBtn')

btn.addEventListener('click', async (e) => {
    const data = await fetch('http://localhost:8000/todo');
    const json = await data.json()
    console.log(json)
})

const input = document.querySelector('#input')

input.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const data = await fetch('http://localhost:8000/todo/post', {
            method: 'POST',
            headers:{
                'Content-Type': 'text/plain;charset=utf-8'
            },
            body: JSON.stringify(e.target.value)
        });
        let json  = await data.json();
        alert(json)
        console.log(e.target.value)
    }
})

