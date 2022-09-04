const btn = document.querySelector('#mainBtn')

btn.addEventListener('click', async (e) => {
    const data = await fetch('http://localhost:8000/todo');
    console.log(data)
})