/*
Metas:
- fazer com q mudar a ordem dos elementos fique salva

- mudar o input depois de dar o nome ele remover o input e o label e deixar so o nome

- depois de criar mudar o nome de entrar para ver ou sei la add ou um '+'

- o botao de remover nao esta funcionando quando vc vai ver o que ja foi escrito dos compromissoos

- deixar mais bonito o nome nos nomes e organizado

- colorir o site


*/



// Limpa o localStorage quando a página for carregada
window.onload = function() {
    localStorage.clear();
};


//add um novo elemento nos nomes
const addElementButton = document.getElementById('addElementButton');
const elementContainer = document.getElementById('elementContainer');
const newElementNomeToMensagem = document.getElementById('newElementNomeToMensagem');

let qtddDeVezesQfoiAddNovoNome = 0;

//função que vai permitir alterar a ordem do elementos nomes
var permitirMoverNomes = new Sortable(elementContainer, {
    animation: 150,
    ghostClass: 'sortable-ghost',
});

var permitirMoverComprom = new Sortable(newElementNomeToMensagem, {
    animation: 150,
    filter: '.ContAddCompromissoMSG',
    ghostClass: 'sortable-ghost',
});

// Cria o elemento com nomes e inputs
addElementButton.addEventListener('click', function(event) {
    event.preventDefault(); 

    qtddDeVezesQfoiAddNovoNome++;
    const newElement = document.createElement('div');
    newElement.classList.add('new-element-Nomes');
    newElement.id = `container${qtddDeVezesQfoiAddNovoNome}`;

    newElement.innerHTML = `
        <label class="tituloLabel" id="tituloLabel${qtddDeVezesQfoiAddNovoNome}">Novo nome:</label>
        <section class='deixarJunto'>
            <input type="text" id="titulo${qtddDeVezesQfoiAddNovoNome}" placeholder="compromissos..." required>
            <button type="button" class="removerButton" data-id="${qtddDeVezesQfoiAddNovoNome}">Rem</button>   
            <button type="button" class="get-button" data-id="${qtddDeVezesQfoiAddNovoNome}">enviar</button>   
        </section>
    `;

    elementContainer.appendChild(newElement);
});

// Carrega compromissos e permite criar novos
elementContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('get-button')) {
        const id = event.target.getAttribute('data-id');
        const tituloValor = document.getElementById(`titulo${id}`).value;

        // Exibe o nome do título atual
        const resultadoConteudo = document.querySelector('.resultadoInputNomes');
        resultadoConteudo.innerHTML = `Compromissos para <strong>${tituloValor}</strong>`;

        // Limpa a área de compromissos
        newElementNomeToMensagem.innerHTML = ''; 

        // Carrega compromissos existentes para o nome
        const compromissos = carregarCompromissos(tituloValor);

        // Adiciona compromissos ao container se existirem
        if (compromissos) {
            newElementNomeToMensagem.innerHTML = compromissos;
        }

        // Agora cria um novo botão corretamente
        const titleAserAlterado = document.querySelector('.ContAddCompromissoMSG');
        titleAserAlterado.innerHTML = `<button class="addCompromissoMSG" data-id="${id}">Adicionar Compromisso para <strong>${tituloValor}</strong></button>`;
    }
});



// acao q vai criar os compromisso ela pega o botao no index.html
document.body.addEventListener('click', function(event) {
    if (event.target.classList.contains('addCompromissoMSG')) {
        const id = event.target.getAttribute('data-id');
        const tituloValor = document.getElementById(`titulo${id}`).value;

        // Cria o novo elemento de compromisso
        const newElementMSG = document.createElement('div');
        newElementMSG.classList.add('new-element-Mensagens');
        newElementMSG.innerHTML = `
        <section class="compromisso">
            <label> Digite o horário do seu compromisso </label>
            <input type="time" class="inputHorarioMSG" required> 

            <label> Digite a data do seu compromisso </label>
            <input type="date" class="inputDataMSG" required> 

            <label> Digite o título do seu compromisso </label>
            <input class="inputTituloMSG" required> 

            <label> Digite um resumo do seu compromisso </label>
            <input class="inputResumoMSG" required>

            <section class="soParaDeirarNaDireita">
                <button class="RemovendoCompromissoMSG"> Rem </button>
                <button class="FinalizandoCompromissoMSG"> ADD </button>
            </section>
        </section>
        `;

        newElementNomeToMensagem.appendChild(newElementMSG);
    }
});

// Função para finalizar compromisso e salvar
newElementNomeToMensagem.addEventListener('click', function(event) {
    if (event.target.classList.contains('FinalizandoCompromissoMSG')) {
        const parentSection = event.target.closest('.compromisso');
        const inputHorarioComprom = parentSection.querySelector('.inputHorarioMSG').value;
        const inputDataComprom = parentSection.querySelector('.inputDataMSG').value;
        const inputTituloComprom = parentSection.querySelector('.inputTituloMSG').value;
        const inputResumoComprom = parentSection.querySelector('.inputResumoMSG').value;

        // Monta o HTML do compromisso finalizado
        parentSection.innerHTML = `
        <section class="compromisso-finalizado">
            <p><strong>${inputTituloComprom}</strong></p>
            <section class="deixarJunto">
                <p>${inputDataComprom}</p>
                <p style="margin-left:15px">${inputHorarioComprom}</p>
            </section>
            <p>'${inputResumoComprom}'</p>
            <button class="RemovendoCompromissoMSG">Rem</button>
        </section>
        `;

        const tituloAtual = document.querySelector('.resultadoInputNomes strong').innerText;
        // Salva o compromisso no localStorage
        salvarCompromisso(tituloAtual, parentSection.innerHTML);
    }
});

// Função para remover o compromisso
newElementNomeToMensagem.addEventListener('click', function(event) {
    if (event.target.classList.contains('RemovendoCompromissoMSG')) {
        const parentDiv = event.target.closest('.compromisso');
        parentDiv.remove();
    }
});



// Função para remover o contêiner correspondente
elementContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('removerButton')) {
        const parentDiv = event.target.closest('.new-element-Nomes');
        parentDiv.remove();
    }
});

// Função para salvar compromissos no localStorage
function salvarCompromisso(nome, compromisso) {
    let dadosSalvos = localStorage.getItem('compromissosPorNome');
    dadosSalvos = dadosSalvos ? JSON.parse(dadosSalvos) : {};
    if (!dadosSalvos[nome]) {
        dadosSalvos[nome] = [];
    }
    dadosSalvos[nome].push(compromisso);
    localStorage.setItem('compromissosPorNome', JSON.stringify(dadosSalvos));
}

// Função para carregar compromissos de um nome específico
function carregarCompromissos(nome) {
    let dadosSalvos = localStorage.getItem('compromissosPorNome');
    dadosSalvos = dadosSalvos ? JSON.parse(dadosSalvos) : {};
    return dadosSalvos[nome] ? dadosSalvos[nome].map(comp => `<div>${comp}</div>`).join('') : ''; 
}
