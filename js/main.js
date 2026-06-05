import ui from "./ui.js"
import api from "./api.js"
document.addEventListener("DOMContentLoaded",() => {
    ui.renderizarPensamentos();

    const formularioPensamento = document.getElementById("pensamento-form");
    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario);

    const btnCancelar = document.getElementById("botao-cancelar");
    btnCancelar.addEventListener("click", manipularCancelamento)

    const inputBusca = document.getElementById("campo-busca");
    inputBusca.addEventListener("input", manipularBusca);
})

async function manipularSubmissaoFormulario(event) {
    event.preventDefault();
    const id = document.getElementById("pensamento-id").value;
    const conteudo = document.getElementById("pensamento-conteudo").value;
    const autoria = document.getElementById("pensamento-autoria").value;
    const data = document.getElementById("pensamento-data").value;

    if(!validarData(data)){
        alert("Não é permitido o cadastro de datas futuras! Selecione outra data!");
    }

    try{
        if(id){
            await api.editarPensamento({id, conteudo, autoria, data});
        }else{
            await api.salvarPensamento({conteudo, autoria, data});
        }
        ui.renderizarPensamentos();
    }catch{
        alert("Erro ao salvar pensamento");
    }
}

function manipularCancelamento() {
    ui.limparFormulario();
}

async function manipularBusca(){
    const termoBusca = document.getElementById("campo-busca").value;
    try{
        const pensamentosFiltrados = await api.buscarPensamentosPorTermo(termoBusca);
        ui.renderizarPensamentos(pensamentosFiltrados);

    } catch (error) {
        alert("Erro ao realizar busca");
    }

}

function validarData(data){
    const dataAtual = new Date();
    const dataInserida = new Date(data);

    return dataInserida <= dataAtual
}