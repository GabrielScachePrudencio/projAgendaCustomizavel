
//add um novo elemento nos nomes

const addElementButton = document.getElementById('addElementButton');
const elementContainer = document.getElementById('elementContainer');

//elemetno container das msg
const newElementNomeToMensagem = document.getElementById('newElementNomeToMensagem');

let qtddDeVezesQfoiAddNovoNome = 0;

// Cria o elemento com nomes e inputs
addElementButton.addEventListener('click', function() {
    event.preventDefault(); 
    
    if (qtddDeVezesQfoiAddNovoNome < 3) {
        qtddDeVezesQfoiAddNovoNome++;

        // Cria o novo elemento
        const newElement = document.createElement('div');

        // Atribui uma classe
        newElement.classList.add('new-element-Nomes');
        newElement.id = `container${qtddDeVezesQfoiAddNovoNome}`;

        newElement.innerHTML =
        `
            <label class="tituloLabel" id="tituloLabel${qtddDeVezesQfoiAddNovoNome}">Novo nome:</label>
            <section class='deixarJunto'>
                <input type="text" id="titulo${qtddDeVezesQfoiAddNovoNome}" placeholder="compromissos..." required>
                 <button type="button" class="removerButton" data-id="${qtddDeVezesQfoiAddNovoNome}">
                    Rem
                </button>   
                <button type="button" class="get-button" data-id="${qtddDeVezesQfoiAddNovoNome}">
                    enviar
                </button>               
            </section>
        `;

        // Adiciona o elemento no container
        elementContainer.appendChild(newElement);
    }
});


// Função que recebe as informações ao clicar no botão de adicionar nome
elementContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('get-button')) {
        const id = event.target.getAttribute('data-id');

        const inputTitulo = document.getElementById(`titulo${id}`);
        const labelTitulo = document.getElementById(`tituloLabel${id}`);
        const resultadoConteudo = document.querySelector('.resultadoInputNomes');
        const buttonRemover = document.querySelector('.removerButton')
       
        const tituloValor = inputTitulo.value;

        resultadoConteudo.innerHTML = `${tituloValor} <br>`;

        const parentDiv = inputTitulo.closest('.new-element-Nomes');  

        
        inputTitulo.remove();
        labelTitulo.remove();
        buttonRemover.remove();
        event.target.remove();

        
        parentDiv.innerHTML += `
        <section class='deixarJunto'>
            <button class="removerButton"> Remover </button>
            <h1 class="tituloValorDoTitulo" id="tituloValorDoTitulo${id}"> ${tituloValor} </h1>
        </section>
        `;

        // Adiciona o novo título na seção de mensagens
        const newTitleElement = document.createElement('div');
        newTitleElement.innerHTML = `
        <section class="ContAddCompromissoMSG">
            <button class="addCompromissoMSG" data-id="${id}" >Adicionar Compromisso para <strong>${tituloValor}</strong></button>
        </section>
        `;
        newElementNomeToMensagem.appendChild(newTitleElement);
    }
});


//funcao q cria apos vc clicar em add compromisso
// funcao que cria o compromisso
newElementNomeToMensagem.addEventListener('click', function(event){
    if (event.target.classList.contains('addCompromissoMSG')) {
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

        let horario = `${hora}:${minutos}:${segundos} `
        let dataComp = `${dia}/${mes}/${year}`

        const newElementMSG = document.createElement('div')
        
        newElementMSG.classList.add('new-element-Mensagens')
        newElementMSG.id = `container${qtddDeVezesQfoiAddNovoNome}`

        newElementMSG.innerHTML = `
        
        <section class="compromisso">
            <section class="horaData">
                <p class="horario" id="horario"> ${horario} </p>
                <p class="dataComp" id="dataComp"> ${dataComp}</p>
            </section>
            <label> Digite o horario do seu compromisso </label>
            <input type="time" id="inputHorarioMSG" class="inputHorarioMSG" required> 

            <label> Digite a data do seu compromisso </label>
            <input type="date" id="inputDataMSG" class="inputDataMSG" required> 

            <label> Digite o titulo do seu compromisso </label>
            <input id="inputTituloMSG" class="inputTituloMSG" required> 
            
            <label> Digite um resumo do seu compromisso </label>
            <input id="inputResumoMSG" class="inputResumoMSG" required>
            
            <section class="soParaDeirarNaDireita">
                <button class="RemovendoCompromissoMSG" id="RemovendoCompromissoMSG${qtddDeVezesQfoiAddNovoNome}"> Rem </button>
                <button class="FinalizandoCompromissoMSG" id="addCompromissoMSG${qtddDeVezesQfoiAddNovoNome}"> ADD </button>
            </section>
        </section>
         `    
            

    newElementNomeToMensagem.appendChild(newElementMSG);

    }
})


//função que vai receber o add e colocar no mensagens
newElementNomeToMensagem.addEventListener('click', function(event){
    if (event.target.classList.contains('FinalizandoCompromissoMSG')) {
        const parentSection = event.target.closest('.compromisso'); //pega divisao mae

        const horario = document.getElementById('horario').innerHTML
        const dataComp = document.getElementById('dataComp').innerHTML

        const inputHorarioComprom = parentSection.querySelector('.inputHorarioMSG').value
        const inputDataComprom = parentSection.querySelector('.inputDataMSG').value
        const inputTituloComprom = String(parentSection.querySelector('.inputTituloMSG').value);
        const inputResumoComprom = String(parentSection.querySelector('.inputResumoMSG').value);

        parentSection.querySelector('.inputHorarioMSG').remove()
        parentSection.querySelector('.inputDataMSG').remove()
        parentSection.querySelector('.inputTituloMSG').remove()
        parentSection.querySelector('.inputResumoMSG').remove()
        event.target.remove()
        
        
        
        parentSection.innerHTML =
        `
        <section class="compromisso">
            <section class="horaData">
                <p class="horario" id="horario"> ${horario} </p>
                <p class="dataComp" id="dataComp"> ${dataComp}</p>
            </section>
            <section class="horaDataDoSeuCompromisso">
                <p class="inputHorarioComprom" id="dataComp">  ${inputHorarioComprom}</p>
                <p class="inputDataComprom" id="dataComp">  ${inputDataComprom}</p>
                <p class="inputTituloComprom" id="horario"> <strong>  ${inputTituloComprom} </strong></p>
                <p class="inputResumoComprom" id="dataComp">  '${inputResumoComprom}'</p>
            </section>     
            <section class="soParaDeirarNaDireita">
                <button class="RemovendoCompromissoMSG" id="RemovendoCompromissoMSG${qtddDeVezesQfoiAddNovoNome}"> Rem </button>
            </section>       
        </section>
        `
    }
})

/*
fazer com que cada nome tenha sua proprio compromissos e que pode addionar quantos quiseres

olhar no chat gpt 
*/



//função para remover o compromiss
newElementNomeToMensagem.addEventListener('click', function(event){
    if (event.target.classList.contains('RemovendoCompromissoMSG')) {
        const parentDiv = event.target.closest('.new-element-Mensagens');
        parentDiv.remove();


    }
})



// Função para remover o contêiner correspondente
elementContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('removerButton')) {
       
        const parentDiv = event.target.closest('.new-element-Nomes');  // Acessa o div pai mais próximo que contém o botão "Remover"
        parentDiv.remove();  // Remove o contêiner 

    }
});
