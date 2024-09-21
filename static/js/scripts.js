let date = new Date()

let dia = date.getDate()
let mes = date.getMonth()
if (mes < 10) {
    mes++
    mes = `0${mes}`
}
let year = date.getFullYear()

let hora = date.getHours();
let minutos = date.getMinutes();
let segundos = date.getSeconds();

document.querySelector('.horas').innerHTML = `${hora}:${minutos}:${segundos} `
document.querySelector('.data').innerHTML = `${dia} - ${mes} - ${year}`



//add um novo elemento nos nomes

const addElementButton = document.getElementById('addElementButton')
const elementContainer = document.getElementById('elementContainer')
let qtddDeVezesQfoiAddNovoNome = 0

addElementButton.addEventListener('click', function(){
    if(qtddDeVezesQfoiAddNovoNome < 3){

        qtddDeVezesQfoiAddNovoNome++

        //cria o novo elemento
        const newElement = document.createElement('div')
        
        //atribui uma classe
        //newElement.classList.add('new-element');
        
        //modifica o conteundo 
        newElement.innerHTML = `
                    <label for="titulo${qtddDeVezesQfoiAddNovoNome}">Novo nome:</label>
                    <input type="text" id="titulo${qtddDeVezesQfoiAddNovoNome}" placeholder="compromissos..." required>
                    <button type="button" class="get-button" data-id="${qtddDeVezesQfoiAddNovoNome}"> <i class="fa-solid fa-check"></i> </button>
                `
    
        //add o elemento no container
        elementContainer.appendChild(newElement)
    }
    
})

const getButtonNames = document.getElementById('titulo'+qtddDeVezesQfoiAddNovoNome)

elementContainer.addEventListener('click', function(event){
    if(event.target.classList.contains('get-button')) {
        const id = event.target.getAttribute('data-id');
        
        const inputTitulo = document.getElementById(`titulo${id}`);
        const resultadoConteudo = document.querySelector('.resultadoInputNomes');
    
        resultadoConteudo.innerHTML = `${inputTitulo.value} <br>`;
        inputTitulo.value = ''; // Limpa o input após coletar o valor

    }
})

