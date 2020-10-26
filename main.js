const produtos = [
  {
    id: '1',
    nome: 'JSRaiz para FW',
    preco: 300,
    descricao: 'O melhor curso de JavaScript',
    imagem: 'https://picsum.photos/500/300',
  },
  {
    id: '2',
    nome: 'JSRaiz para NodeJS',
    preco: 500,
    descricao: 'O melhor curso de NodeJS',
    imagem: 'https://picsum.photos/500/300',
  },
  {
    id: '3',
    nome: 'JSRaiz para React',
    preco: 1000,
    descricao: 'O melhor curso de React',
    imagem: 'https://picsum.photos/500/300',
  },
];

const carrinhoItens = {};
function renderizaProduto(produto, index) {
  return `
    <div class="col-sm-4 mb-3">
      <div class="card loja__item">
        <img
          src="${produto.imagem}"
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">${produto.nome}</h5>
          <small>R$${produto.preco}</small>
          <p class="card-text">${produto.descricao}</p>
          <button data-index="${index}" class="btn btn-primary btn-add">Adicionar</button>
        </div>
      </div>
  </div>
  `;
}
function renderizaProdutos() {
  let html = '';
  for (let i = 0; i < produtos.length; i++) {
    html = html + renderizaProduto(produtos[i], i);
  }
  return html;
}

function renderizaItemCarrinho(produto) {
  return `
    <div class="card carrinho__item mb-2">
      <div class="card-body">
        <h5 class="card-title">${produto.nome}</h5>
        <p class="card-text">
          Preço unidade: R$${produto.preco} | Quantidade: ${produto.quantidade}
        </p>
        <p class="card-text">Valor: R$${produto.preco * produto.quantidade}</p>
        <button class="btn btn-danger btn-sm">Remover</button>
      </div>
    </div>
  `;
}
function renderizaCarrinho() {
  let html = '';
  for (let produtoId in carrinhoItens) {
    html = html + renderizaItemCarrinho(carrinhoItens[produtoId]);
  }
  document.querySelector('.carrinho__itens').innerHTML = html;
}

function renderCarrinhoTotal() {
  let total = 0;
  for (let produtoId in carrinhoItens) {
    total =
      total +
      carrinhoItens[produtoId].preco * carrinhoItens[produtoId].quantidade;
  }
  document.querySelector(
    '.carrinho__total'
  ).innerHTML = `<h6>Total: <strong> R$${total}</strong></h6>`;
}

function adicionaItemNoCarrinho(produto) {
  if (!carrinhoItens[produto.id]) {
    carrinhoItens[produto.id] = produto;
    carrinhoItens[produto.id].quantidade = 0;
  }
  ++carrinhoItens[produto.id].quantidade;
  renderizaCarrinho();
  renderCarrinhoTotal();
}

document.body.addEventListener('click', function (event) {
  const elemento = event.target;

  if (elemento.classList.contains('btn-add')) {
    const index = parseInt(elemento.getAttribute('data-index'), 10);
    const produto = produtos[index];

    adicionaItemNoCarrinho(produto);
  }
});

document.querySelector('.loja').innerHTML = renderizaProdutos();
