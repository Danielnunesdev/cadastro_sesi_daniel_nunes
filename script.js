document.addEventListener('DOMContentLoaded', () => {
    const botaoTema = document.getElementById('alternar-tema');
    const iconeTema = document.getElementById('icone-tema');
    const campoTarefa = document.getElementById('campo-tarefa');
    const botaoAdicionar = document.getElementById('botao-adicionar');
    const listaTarefas = document.getElementById('lista-tarefas');
    const contadorTarefas = document.getElementById('contador-tarefas');

    // 1. Alternar Tema (Modo Escuro / Claro)
    if (botaoTema && iconeTema) {
        botaoTema.addEventListener('click', () => {
            document.body.classList.toggle('modo-escuro');
            if (document.body.classList.contains('modo-escuro')) {
                iconeTema.classList.remove('fa-moon');
                iconeTema.classList.add('fa-sun');
            } else {
                iconeTema.classList.remove('fa-sun');
                iconeTema.classList.add('fa-moon');
            }
        });
    }

    // 2. Atualizar o contador de tarefas no rodapé
    function atualizarContador() {
        if (listaTarefas && contadorTarefas) {
            const total = listaTarefas.querySelectorAll('.item-tarefa').length;
            contadorTarefas.textContent = `${total} tarefa${total !== 1 ? 's' : ''} na lista`;
        }
    }

    // 3. Adicionar Nova Tarefa
    function adicionarTarefa() {
        if (!campoTarefa || !listaTarefas) return;

        const texto = campoTarefa.value.trim();
        if (texto === '') return;

        const item = document.createElement('li');
        item.className = 'item-tarefa';
        item.innerHTML = `
            <span>${texto}</span>
            <div class="acoes-tarefa">
                <button class="botao-acao concluir" title="Concluir tarefa">
                    <i class="fa-regular fa-circle-check"></i>
                </button>
                <button class="botao-acao excluir" title="Excluir tarefa">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        const botaoConcluir = item.querySelector('.concluir');
        if (botaoConcluir) {
            botaoConcluir.addEventListener('click', () => {
                item.classList.toggle('concluida');
            });
        }

        const botaoExcluir = item.querySelector('.excluir');
        if (botaoExcluir) {
            botaoExcluir.addEventListener('click', () => {
                item.remove();
                atualizarContador();
            });
        }

        listaTarefas.appendChild(item);
        campoTarefa.value = '';
        campoTarefa.focus();
        atualizarContador();
    }

    // Vincula os eventos de adicionar se os elementos existirem
    if (botaoAdicionar) {
        botaoAdicionar.addEventListener('click', adicionarTarefa);
    }
    if (campoTarefa) {
        campoTarefa.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                adicionarTarefa();
            }
        });
    }

    // 4. Lógica do Botão Flutuante e Janela de Requisitos
    const btnFlutuante = document.getElementById('btn-flutuante');
    const janelaRequisitos = document.getElementById('janela-requisitos');
    const fecharJanela = document.getElementById('fechar-janela');

    if (btnFlutuante && janelaRequisitos && fecharJanela) {
        btnFlutuante.addEventListener('click', () => {
            janelaRequisitos.classList.toggle('oculta');
        });

        fecharJanela.addEventListener('click', () => {
            janelaRequisitos.classList.add('oculta');
        });
    }
});