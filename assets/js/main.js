const inputItens= document.querySelector('.input-itens')
const botaoItens = document.querySelector('.botao-itens')
const itens = document.querySelector('.itens')

function criaLi() {
    const li = document.createElement('li')
    return li
}

inputItens.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        if (!inputItens.value) return
        criaItens(inputItens.value)
    }
})

function limpaInput() {
    inputItens.value = ''
    inputItens.focus()
}

function Apagar(li) {
    li.innerText += ' '
    const botaoApagar = document.createElement('button')
    botaoApagar.innerText = 'x'
    botaoApagar.setAttribute('class', 'apagar')
    botaoApagar.setAttribute('title', 'Apagar item')
    li.appendChild(botaoApagar)
}

function criaItens(textoInput) {
    const li = criaLi()
    li.innerText = textoInput
    itens.appendChild(li)
    limpaInput()
    Apagar(li)
    salvarItens()
}

botaoItens.addEventListener('click', function() {
    if (!inputItens.value) return
    criaItens(inputItens.value)
})

document.addEventListener('click', function(e) {
    const el = e.target

    if (el.classList.contains('apagar')) {

        el.parentElement.remove()
        salvarItens()

        const mensagem = document.querySelector('.mensagem')
        mensagem.innerText = '⚠ O item foi removido da lista'

        setTimeout(() => {
        mensagem.innerText = ''
    }, 2000)
    }
    
})

function salvarItens() {
    const liItens = itens.querySelectorAll('li')
    const listaDeItens = []

    for (let itens of liItens) {
        let itensTexto = itens.innerText
        itensTexto = itensTexto.replace('Apagar', '').trim()
        listaDeItens.push(itensTexto)
    }

    const itensJSON = JSON.stringify(listaDeItens)
    localStorage.setItem('itens', itensJSON)
}

function adicionaItens() {
    const itensSalvos = localStorage.getItem('itens')
    const listaDeItens = JSON.parse(itensSalvos)

    for (let item of listaDeItens) {
        criaItens(item)
    }
}

adicionaItens()