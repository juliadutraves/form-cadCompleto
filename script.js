document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const cpf = document.getElementById('cpf').value;
    const dob = document.getElementById('dob').value;
    const address = document.getElementById('address').value;

    if (!validateEmail(email)) {
        displayMessage("Email inválido!");
        return;
    }

    if (!validateCPF(cpf)) {
        displayMessage("CPF inválido!");
        return;
    }

    // Aqui você pode enviar os dados para o servidor ou fazer outras operações
    displayMessage("Cadastro realizado com sucesso!", true);
});

'use strict'; // ativa o mode restrito

 
// função para limpar os campos preenchidos
 
const limparFormulario = () => {
    document.getElementById('logradouro').value = ''; 
    document.getElementById('bairro').value = ''; 
    document.getElementById('localidade').value = ''; 
    document.getElementById('uf').value = ''; 
    document.getElementById('numero').value = '';
    document.getElementById('complemento').value = ''; 
}
 
// verifica se o cep é válido
const eNumero = (numero) => /^[0-9]+$/.test(numero); //  faz com que o usuario possa somente digitar caracteres de 0 á 9, pegando a expressão regular e jogando dentro do argumaneto "numero"
const cepValido = (cep) => cep.length == 8 && eNumero(cep); // identifica a quantos caracteres tem no argumento "cep" e executa a linha anterior "eNumero"
 
// função para preencher formulario
const preencherFormulario = (endereco) => {
    document.getElementById('logradouro').value = endereco.logradouro; // preenche o campo rua pelo id
    document.getElementById('bairro').value = endereco.bairro; // preenche o campo bairro pelo id
    document.getElementById('localidade').value = endereco.localidade; // preenche campo cidade pelo id
    document.getElementById('uf').value = endereco.uf; // preenche o campo estado pelo id
}
 
 // função para consumo de API viaCep, tipo assincrona
 
async function pesquisarCep() { //Async:Declaração cria uma ligação de uma nova função assíncrona a um determinado nome. A palavra-chave await é permitida no corpo da função, permitindo que o comportamento assíncrono e baseado em promessas seja escrito em um estilo mais limpo e evitando a necessidade de configurar explicitamente cadeias de promessas.
    limparFormulario();
    const url = `https://viacep.com.br/ws/${cep.value}/json/`;
 
    if (cepValido(cep.value)) {
        const dados = await fetch(url); // fetch:fornece uma interface JavaScript para acessar e manipular partes do pipeline HTTP, tais como os pedidos e respostas., await: faz a execução de uma função async pausar, para esperar pelo retorno da Promise, e resume a execução da função async quando o valor da Promise é resolvido. Ele então retorna o valor final da Promise. Se esse valor não for uma Promise, ele é convertido para uma Promise resolvida., HTTP Pipelines: é uma técnica que permite o envio de múltiplas requisições HTTP em uma única conexão

        const addres = await dados.json(); //converte para json 
        // json: objeto namespace contém métodos estáticos para analisar valores e convertê-los em JavaScrip
        if (addres.hasOwnProperty('erro')) { // hasOwnProperty: retorna um booleano indiacando se objeto é verdadeiro
            alert('CEP não encontrado');
 
        } else {
            preencherFormulario(addres);
        }
 
    } else {
        alert('CEP incorreto');
    }
}
 
 
 // chama escutador para disparar ação de preenchimento
 
document.getElementById('cep').addEventListener('focusout' , pesquisarCep); //focusout:dispara quando um elemento perde o foco, após o blurevento.

 