//MAIN
const main = document.querySelector('main')

//ONDE FICARÁ A IMAGEM ILUSTRATIVA DA PIZZA ESQUERDA
const pizzaHeaderEsquerda = document.querySelector('.pizza-esquerda')

//ONDE FICARÁ A IMAGEM ILUSTRATIVA DA PIZZA DIREITA
const pizzaHeaderDireita = document.querySelector('.pizza-direita')

//ARRAY PARA ARMAZENAR MÚLTIPLAS PIZZAS
let pizzas = [];

//ARRAY PARA ARMAZENAR BEBIDAS
let bebidas = [];

// Botão para adicionar nova pizza
const btnAddNovaPizza = document.createElement('button');

// Função para resetar as bordas do botão
function resetBorderButton(lado){
    const buttons = document.querySelectorAll(`.add-to-card-btn[data-lado='${lado}']`);

    buttons.forEach(button => {
        //button.style.borderColor='red';
    });
}



// Função para lidar com a seleção de pizza
function handlePizzaSelection(button, lado) {
    const img = button.getAttribute('data-img');
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    // Pega a última pizza, ou cria uma nova se a última estiver completa
    let pizzaAtual = pizzas[pizzas.length - 1];
    if (!pizzaAtual || (pizzaAtual.saborEsquerdo.length > 0 && pizzaAtual.saborDireito.length > 0)) {
        pizzaAtual = { saborEsquerdo: [], saborDireito: [] };
        pizzas.push(pizzaAtual);
    }

    // Verifica o lado e ajusta o sabor correspondente
    if (lado === 'esquerdo') {
        if (pizzaAtual.saborEsquerdo.length > 0 && pizzaAtual.saborEsquerdo[0].name === name) {
            pizzaAtual.saborEsquerdo = [];
        } else {
            pizzaAtual.saborEsquerdo = [{ img, name, price }];
        }
    } else {
        if (pizzaAtual.saborDireito.length > 0 && pizzaAtual.saborDireito[0].name === name) {
            pizzaAtual.saborDireito = [];
        } else {
            pizzaAtual.saborDireito = [{ img, name, price }];
        }
    }

    // Atualiza as quantidades nos botões de ambos os lados
    updateButtonQuantity('esquerdo');
    updateButtonQuantity('direito');

    // Atualiza a pizza e o carrinho
    updatePizza();
    uptadetoCardModal();
    checkPizzaComplete();
}


//FUNÇÃO PARA IDENTIFICAR QUE CLICOU NO BOTÃO DE ADICIONAR ESPECÍFICO
main.addEventListener('click', function(event) { 
    let parentButton = event.target.closest(".add-to-card-btn");

    if (parentButton) {
        const lado = parentButton.dataset.lado; // 'esquerdo' ou 'direito'
        handlePizzaSelection(parentButton, lado);
    }
});

function checkPizzaComplete() {
    const pizzaAtual = pizzas[pizzas.length - 1];
    btnAddNovaPizza.disabled = !(pizzaAtual && pizzaAtual.saborEsquerdo.length > 0 && pizzaAtual.saborDireito.length > 0);
}

btnAddNovaPizza.addEventListener('click', function() {
    pizzas.push({ saborEsquerdo: [], saborDireito: [] });
    updatePizza();
    uptadetoCardModal();
    btnAddNovaPizza.disabled = true;
});


// Selecionar o contêiner da pizza visual
const pizzaContainer = document.querySelector('.pizza-header-container');

// Função para criar botão de remoção para pizza
function createRemoveButtonForPizza(index) {
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remover Pizza';
    removeButton.classList.add('remove-pizza-btn');
    removeButton.onclick = () => removePizza(index);
    return removeButton;
}

// Função para remover pizza e atualizar a quantidade no botão
function removePizza(index) {
    const pizzaRemovida = pizzas[index]; // Salva a pizza que será removida
    pizzas.splice(index, 1); // Remove a pizza

    // Atualiza a quantidade nos botões baseados nos sabores removidos
    if (pizzaRemovida.saborEsquerdo.length > 0) {
        updateButtonQuantity('esquerdo');
    }
    if (pizzaRemovida.saborDireito.length > 0) {
        updateButtonQuantity('direito');
    }

    // Atualiza a exibição das pizzas e outras funcionalidades
    updatePizza();
    uptadetoCardModal();
    checkPizzaComplete();
}

// Função para atualizar a quantidade de sabores selecionados para cada lado no botão
function updateButtonQuantity(lado) {
    const buttons = document.querySelectorAll(`.add-to-card-btn[data-lado='${lado}']`);

    buttons.forEach(button => {
        let count = 0;
        pizzas.forEach(pizza => {
            if (lado === 'esquerdo' && pizza.saborEsquerdo.length > 0 && pizza.saborEsquerdo[0].name === button.getAttribute('data-name')) {
                count++;
            } else if (lado === 'direito' && pizza.saborDireito.length > 0 && pizza.saborDireito[0].name === button.getAttribute('data-name')) {
                count++;
            }
        });
        button.innerHTML = `<i class="fa-solid fa-pizza-slice"></i> Adicionar ${count}`;
    });
}

// Resto do código permanece o mesmo...


// Função para atualizar a visualização das pizzas
function updatePizza() {
    pizzaContainer.innerHTML = '';  // Limpar o contêiner antes de adicionar as novas pizzas

    pizzas.forEach((pizza, index) => {
        const pizzaElement = document.createElement('div');
        pizzaElement.classList.add('pizza-element');
        pizzaElement.style.display = 'flex';  // Adicionar estilo flex para exibir as metades lado a lado
        pizzaElement.style.marginBottom = '20px';  // Espaço entre as pizzas

        const pizzaEsquerda = document.createElement('div');
        pizzaEsquerda.classList.add('pizza-esquerda');
        pizzaEsquerda.style.flex = '1';  // Definir largura flexível
        if (pizza.saborEsquerdo.length > 0) {
            pizzaEsquerda.innerHTML = `
                <img src="${pizza.saborEsquerdo[0].img}" alt="${pizza.saborEsquerdo[0].name}" style="width: 100%;">
                <p>${pizza.saborEsquerdo[0].name}</p>
            `;
        }

        const pizzaDireita = document.createElement('div');
        pizzaDireita.classList.add('pizza-direita');
        pizzaDireita.style.flex = '1';  // Definir largura flexível
        if (pizza.saborDireito.length > 0) {
            pizzaDireita.innerHTML = `
                <img src="${pizza.saborDireito[0].img}" alt="${pizza.saborDireito[0].name}" style="width: 100%;">
                <p>${pizza.saborDireito[0].name}</p>
            `;
        }

        pizzaElement.appendChild(pizzaEsquerda);
        pizzaElement.appendChild(pizzaDireita);

        if (pizza.saborEsquerdo.length > 0 && pizza.saborDireito.length > 0) {
            
            const removeButton = createRemoveButtonForPizza(index);
            pizzaElement.appendChild(removeButton);
        }
        
        pizzaContainer.appendChild(pizzaElement);  // Adicionar o elemento da pizza ao contêiner
    });
}

//-------------------------------------------- B E B I D A

const btnAddBebida = document.querySelector('.add-to-card-btn-bebidas')

const bebidasHeader = document.querySelector('.bebidas-header-container')

const mainContainer = document.querySelector('.cards-container')

//FUNÇÃO PARA IDENTIFICAR QUE CLICOU NO BOTÃODE ADICIONAR ESPECÍFICO
main.addEventListener('click', function(event){
    let parentButton = event.target.closest(".add-to-card-btn-bebidas");
   
    if (parentButton) {
        const img = parentButton.getAttribute("data-img");
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        if(bebidas.length > 0){
         
            //btnAddBebida.style.borderColor = 'red'
            btnAddBebida.innerHTML = 'Adicionar'
            bebidas.length = 0
            updateBebidas();
            uptadetoCardModal();
        }else{
            //btnAddBebida.style.borderColor = 'green'
           
            btnAddBebida.innerHTML = 'Remover'
            mandarBebidas(img, name, price)
           
            updateBebidas();
            uptadetoCardModal();
        }
      
       
        gsap.fromTo(".bebidas-header-container", { opacity: 0 }, { opacity: 1, duration: .5 });
    }
});

// FUNÇÃO PARA MANDAR OS DADOS IDENTIFICADOS ONDE CLICOU PARA O ARRAY DE BEBIDAS
function mandarBebidas(img, name, price){
    bebidas = [{ 
        img,
        name, 
        price
    }]; // Substitui o conteúdo do array
    localStorage.setItem('bebidas', JSON.stringify(bebidas));
    updateBebidas()
    uptadetoCardModal()
}

// Função para remover bebida
function removeBebida(index) {
    bebidas.splice(index, 1);
    updateBebidas();
    uptadetoCardModal();
}

//FAZER APARECER A ILUSTRAÇÃO
function updateBebidas(){
    bebidasHeader.innerHTML = ``
    
    bebidas.forEach((item, index) => {
        const bebidaElement = document.createElement('div');
      
        bebidaElement.innerHTML = `
            <img src="${item.img}" alt="">
            <p>${item.name}</p>
        `;

        const removeBebidaButton = document.createElement('button');
        removeBebidaButton.textContent = 'Remover';
        removeBebidaButton.onclick = () => removeBebida(index);
        bebidaElement.appendChild(removeBebidaButton);

        bebidasHeader.appendChild(bebidaElement);
    });
}

//--------------------------------------------

const carrinhoContainer = document.querySelector('.carrinho-modal-container')

const btnCarrinho = document.querySelector('.carrinho')
const btnFecharModal = document.querySelector('.btn-fechar-modal')

const carrinhoItens = document.querySelector('.carrinho-itens')

const cardTotal = document.querySelector('.card-total')

const buyBtn = document.querySelector('.buy-btn')

const inputAddress = document.querySelector('#address')

const btnExpand = document.querySelector('.btn-expand-card')
const header = document.querySelector('.header')
btnExpand.addEventListener('click', function(){
    
    const translateY = header.style.transform

    if(translateY === 'translateY(470px)'){
        header.style.transform = ' translateY(0px)'
        btnExpand.style.transform = 'rotateX(180deg)'
       
   
    }else{
        header.style.transform = 'translateY(470px)'
        btnExpand.style.transform = 'rotateX(0deg)'
    }
 
})

//ABRIR MODAL CLICANDO NO BOTÃO
btnCarrinho.addEventListener('click', function(){
    carrinhoContainer.style.display = 'flex'
})
//FECHAR MODAL CLICANDO FORA DO MODAL 
carrinhoContainer.addEventListener('click', function(event){
   
    if(event.target === carrinhoContainer ){
        carrinhoContainer.style.display = 'none'
    }
})
//FECHAR MODAL CLICANDO NO BOTÃO "FECHAR"
document.querySelector('.btn-fechar-modal').addEventListener('click', function(){
    carrinhoContainer.style.display = 'none'
})

//FUNÇÃO QUE PEGA O QUE TEM NO ARRAY E FAZER UM INNERHTML NO MODAL DO CARRINHO 
function uptadetoCardModal(){
    carrinhoItens.innerHTML=``;

    //VALOR TOTAL
    let total = 0;

    //ENQUANTO SE NAVEGA NO ARRAY "CARD" É CRIADO UMA DIV COM INFORMAÇÕES QUE ESTÃO NO CARD
    pizzas.forEach((pizza, index) => {
        const divPizza = document.createElement('div');
        divPizza.classList.add('carrinho-item');
        divPizza.innerHTML = `<p>Pizza ${index + 1}</p>`;

        if (pizza.saborEsquerdo.length > 0) {
            const divEsquerdo = document.createElement('div');
            
            divEsquerdo.innerHTML = `
                <p>Metade Esquerda: ${pizza.saborEsquerdo[0].name}</p>
                <p>R$${pizza.saborEsquerdo[0].price.toFixed(2)}</p>
            `;
            divPizza.appendChild(divEsquerdo);
            total += pizza.saborEsquerdo[0].price;
        }

        if (pizza.saborDireito.length > 0) {
            const divDireito = document.createElement('div');
          
            divDireito.innerHTML = `
                <p>Metade Direita: ${pizza.saborDireito[0].name}</p>
                <p>R$${pizza.saborDireito[0].price.toFixed(2)}</p>
            `;
            divPizza.appendChild(divDireito);
            total += pizza.saborDireito[0].price;
        }

        if (pizza.saborEsquerdo.length > 0 && pizza.saborDireito.length > 0) {
            
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            
            removeButton.onclick = () => removePizza(index);
            divPizza.appendChild(removeButton);
        }

        carrinhoItens.appendChild(divPizza);
    });

    bebidas.forEach((item, index) => {
        const divCard = document.createElement('div')
        divCard.classList.add('carrinho-item')
        divCard.innerHTML=`
        <p>Bebida: ${item.name}</p>
        <p>R$:${item.price.toFixed(2)}</p>
        `;

        const removeBebidaButton = document.createElement('button');
        removeBebidaButton.textContent = 'Remover';
        removeBebidaButton.onclick = () => removeBebida(index);
        divCard.appendChild(removeBebidaButton);

        //DEFINIR INNERHTML
        carrinhoItens.appendChild(divCard)

        //SOMAR TOTAL DOS ITENS
        total += item.price;
    });
    //DEFINIR VALOR TOTAL DOS ITENS SOMADOS
    cardTotal.textContent = total.toFixed(2);
}

//EVENTO PARA FAZER SUMIR A MENSAGEM DE ENDEREÇO VAZIO SE FOR PREENCHIDO
inputAddress.addEventListener('click', function(event){
    let inputValue = event.target.value
    if(inputValue.value !== ""){
        document.querySelector('.address-vazio-message').style.display = 'none'
        inputAddress.style.borderColor = 'whitesmoke'
    }
})

//FUNÇÃO PARA AO CLICAR EM FAZER PEDIDO 
buyBtn.addEventListener('click', function(){
    if(pizzas.length === 0 || pizzas[pizzas.length - 1].saborEsquerdo.length === 0){
        Toastify({
            text: "Está faltando o pedaço esquerdo!",
            className: "info",
            style: {
              background: "red",
            }
          }).showToast();
        return;
    }
    if(pizzas.length === 0 || pizzas[pizzas.length - 1].saborDireito.length === 0){
        Toastify({
            text: "Está faltando o pedaço direito!",
            className: "info",
            style: {
              background: "red",
            }
          }).showToast();
        return;
    }
    if(bebidas.length === 0){
        if(!confirm("Deseja adicionar uma bebida ao pedido?")) {
            // Se o usuário não quiser adicionar bebida, continuamos com o pedido
        } else {
            // Se o usuário quiser adicionar bebida, interrompemos o processo de compra
            return;
        }
    }
    if(inputAddress.value === ""){
        document.querySelector('.address-vazio-message').style.display = 'block'
        inputAddress.style.borderColor = 'red'
        Toastify({
            text: "Endereço vazio!",
            className: "info",
            style: {
              background: "red",
            }
          }).showToast();
          return;
    }

    let message = "Boa noite! Gostaria de pedir:\n";
    let total = 0;

    pizzas.forEach((pizza, index) => {
        message += `Pizza ${index + 1}:\n`;
        if (pizza.saborEsquerdo.length > 0) {
            message += `Metade Esquerda: ${pizza.saborEsquerdo[0].name}\n`;
            total += pizza.saborEsquerdo[0].price;
        }
        if (pizza.saborDireito.length > 0) {
            message += `Metade Direita: ${pizza.saborDireito[0].name}\n`;
            total += pizza.saborDireito[0].price;
        }
        message += "\n";
    });

    bebidas.forEach(item => {
        message += `Bebida: ${item.name}\n`;
        total += item.price;
    });

    message += `Total R$: ${total.toFixed(2)}\n`;
    message += `Endereço: ${inputAddress.value}`;

    const encodedMessage = encodeURIComponent(message);
    const phone = "61998497382";

    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
})

// Inicializar a primeira pizza
pizzas.push({ saborEsquerdo: [], saborDireito: [] });
updatePizza();