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
        //newElement.classList.add('new-element-Nomes');
        
        //modifica o conteundo 
        newElement.innerHTML = `
                    <label class="tituloLabel" id="tituloLabel${qtddDeVezesQfoiAddNovoNome}">Novo nome:</label>
                    <section class='deixarJunto'>
                        <input type="text" id="titulo${qtddDeVezesQfoiAddNovoNome}" placeholder="compromissos..." required>
                        <button type="button" class="get-button" data-id="${qtddDeVezesQfoiAddNovoNome}">
                            <i class="fa-solid fa-check"></i>
                        </button>               
                    </section>
                    `
        //add o elemento no container
        elementContainer.appendChild(newElement)
    }
    
})


// função que recebe as informações ao clicar no + dos agendaNomes
elementContainer.addEventListener('click', function(event){
    if(event.target.classList.contains('get-button')) {
        const id = event.target.getAttribute('data-id');
        
        const inputTitulo = document.getElementById(`titulo${id}`);
        const labelTitulo = document.getElementById(`tituloLabel${id}`);
        const resultadoConteudo = document.querySelector('.resultadoInputNomes');
        
        // Armazena o valor do input antes de limpar
        const tituloValor = inputTitulo.value;

        // Exibe o texto digitado
        resultadoConteudo.innerHTML = `${tituloValor} <br>`;

        const parentDiv = inputTitulo.parentElement

        // Remove o input e o label do DOM
        inputTitulo.remove();
        labelTitulo.remove();
        
        // Remove o botão
        event.target.remove();

        // add o novo o texto e um buttao
        parentDiv.innerHTML = 
        `
        <button class="removerButton"> Remover </button>
        <h1 class="tituloValorDoTitulo" id="tituloValorDoTitulo"> ${tituloValor} </h1>
        `
    }
})


// faz a função remover 
elementContainer.addEventListener('click', function(event){
    if(event.target.classList.contains('removerButton')) {
        
        const parentDiv = event.target.closest('div');  // Acessa o div pai mais próximo que contém o botão "Remover"
        parentDiv.remove();  // Remove o container completo

    }
})

