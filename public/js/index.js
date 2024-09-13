

//MAIN
const main = document.querySelector('main')

//ONDE FICARÁ A IMAGEM ILUSTRATIVA DA PIZZA ESQUERDA
const pizzaHeaderEsquerda = document.querySelector('.pizza-esquerda')

//ONDE FICARÁ A IMAGEM ILUSTRATIVA DA PIZZA DIREITA
const pizzaHeaderDireita = document.querySelector('.pizza-direita')


//FUNÇÃO PARA IDENTIFICAR QUE CLICOU NO BOTÃODE ADICIONAR ESPECÍFICO
main.addEventListener('click', function(event){ 
    let parentButton = event.target.closest(".add-to-card-btn");
   
    if (parentButton) {
        const lado = parentButton.dataset.lado;
        const img = parentButton.getAttribute("data-img");
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        
        if (lado === 'esquerdo') {
             // Verifica se já existe algum item no array ladoEsquerdo
             
            if (saborEsquerdo.length > 0) {
                // Remove informações do array (reseta o array)
                saborEsquerdo.length = 0;
               
                parentButton.style.borderColor = 'red'; // Reseta a borda
                //console.log('Informações removidas do array saborEsquerdo.');
                updatePizza();
                uptadetoCardModal();
            } else {
                // Adiciona informações ao array ladoEsquerdo
                ladoEsquerdo(img, name, price);
                parentButton.style.borderColor = 'green'; // Reseta a borda
                //console.log('Informações adicionadas ao array saborEsquerdo.');
                gsap.fromTo(".pizza-esquerda", { opacity: 0 }, { opacity: 1, duration: .5 });
            }
        } else {
             // Verifica se já existe algum item no array ladoDireito
            if (saborDireito.length > 0) {
                // Remove informações do array (reseta o array)
                saborDireito.length = 0;
                parentButton.style.borderColor = 'red'; // Reseta a borda
                //console.log('Informações removidas do array saborDireito.');
                updatePizza();
                uptadetoCardModal();
            } else {
                // Adiciona informações ao array ladoDireito
                ladoDireito(img, name, price);
                parentButton.style.borderColor = 'green'; // Reseta a borda
                //console.log('Informações adicionadas ao array saborDireito.');
                gsap.fromTo(".pizza-direita", { opacity: 0 }, { opacity: 1, duration: .5 });
            }
        }
    }
});

// ARRAY ONDE ARMAZENARÁ OS DADOS DA PIZZA ESQUERDA
let saborEsquerdo = [];

// FUNÇÃO PARA MANDAR OS DADOS IDENTIFICADOS ONDE CLICOU PARA O ARRAY ESQUERDO
function ladoEsquerdo(img, name, price){
    saborEsquerdo = [{ 
        img,
        name, 
        price
    }]; // Substitui o conteúdo do array
    localStorage.setItem('saborEsquerdo', JSON.stringify(saborEsquerdo));
    updatePizza();
    uptadetoCardModal();
    // console.log(saborEsquerdo);
}

// ARRAY ONDE ARMAZENARÁ OS DADOS DA PIZZA DIREITA
let saborDireito = [];

// FUNÇÃO PARA MANDAR OS DADOS IDENTIFICADOS ONDE CLICOU PARA O ARRAY DIREITO
function ladoDireito(img, name, price){
    saborDireito = [{ 
        img,
        name, 
        price
    }]; // Substitui o conteúdo do array
    localStorage.setItem('saborDireito', JSON.stringify(saborDireito));
    updatePizza();
    uptadetoCardModal();
    // console.log(saborDireito);
}




//FAZER APARECER A ILUSTRAÇÃO
function updatePizza(){
    pizzaHeaderEsquerda.innerHTML = ``
    pizzaHeaderDireita.innerHTML = ``
    //console.log(pizzaHeader)
    saborEsquerdo.forEach(item =>{
        
        pizzaHeaderEsquerda.innerHTML = `
         <img class="pizza-esquerda" src="${item.img}" alt="${item.name}">
         <p>${item.name}</p>
        `
       
        
        
    })
    saborDireito.forEach(item =>{
     
       
        pizzaHeaderDireita.innerHTML = `
        <img class="pizza-direita" src="${item.img}" alt="${item.name}">
        <p>${item.name}</p>
        `
        
        
    })

    
}



//-------------------------------------------- B E B I D A

const btnAddBebida = document.querySelector('.add-to-card-btn-bebidas')

const bebidasHeader = document.querySelector('.bebidas-header-container')

const mainContainer = document.querySelector('.cards-container')




//FUNÇÃO PARA IDENTIFICAR QUE CLICOU NO BOTÃODE ADICIONAR ESPECÍFICO
main.addEventListener('click', function(event){
    let parentButton = event.target.closest(".add-to-card-btn-bebidas");
   
    if (parentButton) {
        //const lado = parentButton.dataset.lado;
        const img = parentButton.getAttribute("data-img");
        const name = parentButton.getAttribute("data-name");
        const price = parseFloat(parentButton.getAttribute("data-price"));
        if(bebidas.length > 0){
         
            btnAddBebida.style.borderColor = 'red'
               btnAddBebida.innerHTML = 'Adicionar'
            bebidas.length = 0
            updateBebidas();
            uptadetoCardModal();
        }else{
            btnAddBebida.style.borderColor = 'green'
            btnAddBebida.innerHTML = 'Remover'
            mandarBebidas(img, name, price)
           
            updateBebidas();
            uptadetoCardModal();
        }
      
       
        gsap.fromTo(".bebidas-header-container", { opacity: 0 }, { opacity: 1, duration: .5 });
        
       
    }
});

// ARRAY ONDE ARMAZENARÁ OS DADOS DA PIZZA ESQUERDA
let bebidas = [];

// FUNÇÃO PARA MANDAR OS DADOS IDENTIFICADOS ONDE CLICOU PARA O ARRAY ESQUERDO
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
//FAZER APARECER A ILUSTRAÇÃO
function updateBebidas(){
    bebidasHeader.innerHTML = ``
    
    //console.log(pizzaHeader)
    bebidas.forEach(item =>{
        bebidasHeader.innerHTML = `
        <img src="${item.img}" alt="">
        <p>${item.name}</p>
        `
    })

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

btnExpand.addEventListener('click', function(){

    if( document.querySelector('.header').style.transform === 'translateX(-100%) translateY(-360px)'){
        document.querySelector('.header').style.transform = 'translateX(-100%) translateY(0)'
        
    }else{
        document.querySelector('.header').style.transform = 'translateX(-100%) translateY(-360px)'
    }
    console.log('bacana')
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
    saborEsquerdo.forEach(item => {
        const divCard = document.createElement('div')
        divCard.classList.add('carrinho-item')
        divCard.innerHTML=`
        <p>Metade: ${item.name}</p>
        <p>R$:${item.price.toFixed(2)}</p>
        `;
        //DEFINIR INNERHTML
        carrinhoItens.appendChild(divCard)

        //SOMAR TOTAL DOS ITENS
        totalEsquerdo = item.price
        total += totalEsquerdo
        

    });
    saborDireito.forEach(item => {
        const divCard = document.createElement('div')
        divCard.classList.add('carrinho-item')
        divCard.innerHTML=`
        <p>Metade: ${item.name}</p>
        <p>R$:${item.price.toFixed(2)}</p>
        `;
        //DEFINIR INNERHTML
        carrinhoItens.appendChild(divCard)

        //SOMAR TOTAL DOS ITENS
        totalDireito = item.price
        total += totalDireito;
        

    });
    bebidas.forEach(item => {
        const divCard = document.createElement('div')
        divCard.classList.add('carrinho-item')
        divCard.innerHTML=`
        <p>Bebida: ${item.name}</p>
        <p>R$:${item.price.toFixed(2)}</p>
        `;
        //DEFINIR INNERHTML
        carrinhoItens.appendChild(divCard)

        //SOMAR TOTAL DOS ITENS
        totalDireito = item.price
        total += totalDireito;
        

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
    if(saborEsquerdo.length === 0){
        Toastify({
            text: "Está faltando o pedaço esquerdo!",
            className: "info",
            style: {
              background: "red",
            }
          }).showToast();
    }
    if(saborDireito.length === 0){
        Toastify({
            text: "Está faltando o pedaço direito!",
            className: "info",
            style: {
              background: "red",
            }
          }).showToast();
    }
    if(bebidas.length === 0){
        confirm("deseja adicionar bebida")
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
          return
    }

    const itemEsquerdo = saborEsquerdo.map((item) =>{
        let total = 0
        total += item.price * item.quantity;
        return (
            `Metade: ${item.name}\n`
        )

    }).join("")
    const itemDireito = saborDireito.map((item) =>{
        let total = 0
        total += item.price * item.quantity;
        return (
            `Metade: ${item.name}\n`
        )

    }).join("")
    const bebida = bebidas.map((item) =>{
        let total = 0
        total += item.price * item.quantity ;
        return (
            `Bebida: ${item.name}\n`
        )

    }).join("")
    const combinedPrice = saborEsquerdo[0].price + bebidas[0].price + saborDireito[0].price;

    const message = encodeURIComponent("Boa noite! Gostaria de pedir uma pizza\n" +itemEsquerdo + itemDireito + bebida + "Total R$:" + combinedPrice.toFixed(2))
    const phone = "61998497382"

    window.open(`https://wa.me/${phone}?text=${message}  Endereço:${inputAddress.value}`,
        "_blank"
    )
})

