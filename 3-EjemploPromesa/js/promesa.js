// Promesa
let btn = document.querySelector('button');
let url = 'https://jsonplaceholder.typicode.com';
let metodoHttp = 'get';

let promesa = new Promise((resolve, reject)=>{
    let xhr = new XMLHttpRequest();
    xhr.open(metodoHttp,`${url}/users`);
    xhr.addEventListener('load',()=>{
        if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response));
        }
    });
    xhr.send();
});

promesa
    .then((valor)=>{
        console.log("Promesa 1 Completada");
        let usuario = valor[5];
        let usuario_id = usuario.id
        console.log(valor);
        console.log(usuario);
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(metodoHttp,`${url}/posts?userId=${usuario_id}`)
            xhr.addEventListener('load',()=>{
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.response));
                }
            })
            xhr.send();
        });
    })
    .then((valor)=>{
        console.log("Promesa 2 Completada");
        console.log(valor);
        return new Promise((resolve, reject) => {
            valor.forEach(posteo => {
                let xhr = new XMLHttpRequest();
                xhr.open(metodoHttp,`${url}/comments?postId=${posteo.id}`);
                xhr.addEventListener('load',()=>{
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    }
                })
                xhr.send()
            });
        });
    })
    .then((valor)=>{
        console.log(valor);
    })