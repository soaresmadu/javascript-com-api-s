const nextBtn = document.getElementById('nextPage');
const lastBtn = document.getElementById('lastPage');
const submitBtn = document.getElementById('submitBtn');
const form = document.getElementById('form');
const personalPage = document.querySelector('.personal');
const enderecoPage = document.querySelector('.endereco');
const nomeCompleto = document.getElementById('nome');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const telefone = document.getElementById('telefone');

window.addEventListener('load', () => {
    if(localStorage.getItem("nome")) nomeCompleto.value = localStorage.getItem("nome");
    if(localStorage.getItem("email")) email.value = localStorage.getItem("email");
    if(localStorage.getItem("password")) password.value = localStorage.getItem("password");
    if(localStorage.getItem("confirmPassword")) confirmPassword.value = localStorage.getItem("confirmPassword");
    if(localStorage.getItem("telefone")) telefone.value = localStorage.getItem("telefone");
    if (localStorage.getItem("cep")) cep.value = localStorage.getItem("cep");
    if (localStorage.getItem("rua")) rua.value = localStorage.getItem("rua");
    if (localStorage.getItem("complemento")) complemento.value = localStorage.getItem("complemento");
    if (localStorage.getItem("numero")) numero.value = localStorage.getItem("numero");
    if (localStorage.getItem("bairro")) bairro.value = localStorage.getItem("bairro");
    if (localStorage.getItem("cidade")) cidade.value = localStorage.getItem("cidade");
    if (localStorage.getItem("uf")) uf.value = localStorage.getItem("uf");
});
nextBtn.addEventListener('click', (event) => {
        event.preventDefault();
        validaFormularioUm();
        if (isValid){
            personalPage.style.display = "none";
            enderecoPage.style.display = "flex";
        }
})
let isValid;
function validaFormularioUm(){

    localStorage.setItem("nome", nomeCompleto.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("password", password.value);
    localStorage.setItem("confirmPassword", confirmPassword.value);
    localStorage.setItem("telefone", telefone.value);

    if (confirmPassword.value == ""){
        isValid = false;
    } else {
        verifyPassword(password.value, confirmPassword.value);
    }

    isValid = true;
    if(nomeCompleto.value == ""){
        nomeCompleto.placeholder = "Preencha este campo.";
        isValid = false;
    }
    if (email.value == ""){
        email.placeholder = "Preencha este campo.";
        isValid = false;
    }
    if (password.value == ""){
        isValid = false;
    }
    if (telefone.value == ""){
        telefone.placeholder = "Preencha este campo."
        isValid = false;
    }

    return isValid;
}

function verifyPassword(pass1, pass2){
    if (pass1 != pass2){
        isValid = false;
        password.value = "";
        password.placeholder = "SENHAS DIFERENTES"
        confirmPassword.value = "";
        confirmPassword.placeholder = "SENHAS DIFERENTES"
    } else if (pass1.length < 8 && pass2.length < 8){
        password.value = "";
        password.placeholder = "SENHA DEVE TER 8 CARACTERES OU MAIS"
        confirmPassword.value = "";
        confirmPassword.placeholder = "SENHA DEVE TER 8 CARACTERES OU MAIS" 
        isValid = false;
    }
}

lastBtn.addEventListener('click', ()=>{
    validaFormularioDois();
    personalPage.style.display = "none";
    enderecoPage.style.display = "flex";  
    
})

//formulario dois:

const cep = document.getElementById('cep');
const rua = document.getElementById('rua');
const complemento = document.getElementById('complemento');
const numero = document.getElementById('numero');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const uf = document.getElementById('uf');

submitBtn.addEventListener('click', (event) =>{
    event.preventDefault();
    validaFormularioDois();
    if(isValid){
        alert("FORMULÁRIO ENVIADO COM SUCESSO");
        localStorage.clear();
        form.reset();
    }
})

function validaFormularioDois(){
    isValid = true;

    localStorage.setItem("cep", cep.value);
    localStorage.setItem("rua", rua.value);
    localStorage.setItem("complemento", complemento.value);
    localStorage.setItem("numero", numero.value);
    localStorage.setItem("bairro", bairro.value);
    localStorage.setItem("cidade", cidade.value);
    localStorage.setItem("uf", uf.value);

    let cepValue = cep.value;
    if (cep.value == "" || cepValue.length != 8){
        cep.placeholder = "Digite um CEP válido";
        isValid = false;
    }
    if (numero.value == ""){
        isValid = false;
    }
}

function buscarCep(){
    const url = `https://viacep.com.br/ws/${cep.value}/json/`;
    fetch(url)
        .then(result => result.json())
        .then(info => {
            if (info){
                rua.value = info.logradouro;
                complemento.value = info.complemento;
                bairro.value = info.bairro;
                cidade.value = info.localidade;
                uf.value = info.uf;
            }
        })
}