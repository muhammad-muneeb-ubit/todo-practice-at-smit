let add = document.getElementById("add");

const addTodo = async () =>{
    let title = document.getElementById("input").value;
    let desc = document.getElementById("desc").value;

    let body = {
        title,
        desc
    }
    let res =  await fetch("http://localhost:3000/createtodo",{
        type: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    let data = await res.json()
    console.log("data", data);
    readTodo();
};
const readTodo = async () =>{
    let res =  await fetch("http://localhost:3000/alltodos");
    let data = await res.json()
    console.log("data", data);
};


window.addTodo = addTodo;
window.readTodo = readTodo;