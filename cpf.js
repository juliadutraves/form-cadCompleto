
// Quando o formulário é enviado, a função fornecida é executada
document.getElementById('cpfForm').addEventListener('submit', function(event){
    event.preventDefault(); // Previne o comportamento padrão de submissão do formulário (que recarregaria a página)

    console.log('teste'); // Log para depuração, indicando que o evento de submissão foi acionado

    // Obtém o valor do campo de entrada do CPF e o elemento para exibir a mensagem
    const cpf = document.getElementById('cpf').value;
    const msg = document.getElementById('message');

    // Chama a função de validação do CPF e atualiza a mensagem de acordo com o resultado
    if(validarCPF(cpf)){
        msg.textContent = 'O CPF é válido!'; // Mensagem para CPF válido
        msg.style.color = 'green'; // Define a cor do texto como verde
    }else{
        msg.textContent = 'O CPF é inválido!'; // Mensagem para CPF inválido
        msg.style.color = 'red'; // Define a cor do texto como vermelho
    }
});

// Função que valida o CPF
function validarCPF(cpf){
    // Remove todos os caracteres que não são dígitos usando uma expressão regular
    cpf = cpf.replace(/[^\d]+/g, '');

    // Verifica se o CPF tem exatamente 11 dígitos e se todos os dígitos são iguais (ex: 111.111.111-11)
    // Se a condição for verdadeira, o CPF é inválido
    if(cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)){
        return false; // Retorna falso se a condição de validade não for satisfeita
    }
   
    let soma = 0; // Variável para armazenar a soma ponderada dos dígitos
    let resto; // Variável para armazenar o resto da divisão para verificação dos dígitos verificadores

    // Valida o 10º dígito do CPF, que é o primeiro dígito verificador
    // Calcula a soma ponderada dos 9 primeiros dígitos do CPF
    for(let i = 1; i <= 9; i++){
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    // Calcula o resto da divisão da soma por 11 e ajusta o valor se for 10 ou 11
    resto = (soma * 10) % 11;

    if(resto === 10 || resto === 11){
        resto = 0; // Ajusta o resto para 0 se for 10 ou 11
    }
    
    // Verifica se o primeiro dígito verificador está correto comparando com o valor calculado
    if(resto !== parseInt(cpf.substring(9, 10))){
        return false; // Retorna falso se o primeiro dígito verificador não estiver correto
    }

    // Valida o 11º dígito do CPF, que é o segundo dígito verificador
    soma = 0; // Reinicia a soma para o cálculo do segundo dígito verificador
    // Calcula a soma ponderada dos 10 primeiros dígitos do CPF
    for(let i = 1; i <= 10; i++){
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    // Calcula o resto da divisão da soma por 11 e ajusta o valor se for 10 ou 11
    resto = (soma * 10) % 11;

    if(resto === 10 || resto === 11){
        resto = 0; // Ajusta o resto para 0 se for 10 ou 11
    }
   
    // Verifica se o segundo dígito verificador está correto comparando com o valor calculado
    if(resto !== parseInt(cpf.substring(10, 11))){
        return false; // Retorna falso se o segundo dígito verificador não estiver correto
    }

    return true; // Retorna verdadeiro se todos os testes de validação forem passados
}
