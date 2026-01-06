//Para entrada de dados via terminal
const leia = require('readline-sync');

//Importando ferramenta File System, para conseguir ler,criar e salvar arquivos.
const sistemaDeArquivos = require('fs');

//Definindo o nome do arquivo em que os produtos serão salvos
const nomeDoArquivo = 'inventario.json';

//Criando array vazio para guardar objestos de produtos
let produtos = [];

//Tenta carregar os dados, verifica se o arquivo .json já existe
if (sistemaDeArquivos.existsSync(nomeDoArquivo)) {
  //Lê o conteudo bruto do arquivo
  const dados = sistemaDeArquivos.readFileSync(nomeDoArquivo);
  //Converte o texto JSON de volta para o objeto/array
  produtos = JSON.parse(dados); 
}

//Criando função para salvar a lista atual dentro do arquivo
const salvarDados = () => {
  //Converte o array de produtos em texto JSON, com 2 espaços de indentação
  const dadosConvertidos = JSON.stringify(produtos, null, 2);
  //Escreve o texto no aqrguivo definido na variavel 'nomeDoArquivo'
  sistemaDeArquivos.writeFileSync(nomeDoArquivo, dadosConvertidos);

};

//Função obrigar o usuario a digitar algo
const lerTextoObrigatorio = (pergunta) => {
  let resposta = leia.question(pergunta)

  //enquanto a resposta for vazia ou com espaços exibirá a mesagem de campo obrigatório
  while (!resposta || resposta.trim() === '') {
    console.log('Este campo é obrigatório, tente novamente.')
    resposta = leia.question(pergunta);
  }
  return resposta;

}

//Função para criar um novo produto
const adcProduto = () => {
  console.log('\n--- Adicionar Produto ---');

  //Função para criar ID sequencial para o produto
  let novoId = "1"; //ID inicial caso a lista esteja vazia
  if (produtos.length > 0){
    //Extrai apenas os IDs da lista e converte para números
    const idsNumericos = produtos.map(p => parseInt(p.id));
    //Encontra o maior numero da lista
    const maiorId = Math.max(...idsNumericos);
    //Ao encontar o maior numero o novo ID sera o maior numero + 1, converte de volta para texto
    novoId = (maiorId + 1).toString();
  }

  //Pegando entrada de texto simples
  const nome = lerTextoObrigatorio('Nome do Produto: ');
  const categoria = lerTextoObrigatorio('Categorias: ');

  //Pegando entrada de número inteiro
  const quantidade = leia.questionInt('Quantidade em Estoque: ');
  //Pegando entrada de número decimal
  const preco = leia.questionFloat('Preço: ');

  //Montando objeto do produto
  const novoProduto = {
    id: novoId,  //Utilizando ID gerado sequencialmente
    nome,
    categoria,
    quantidade,
    preco
  };

  //Insere o novo produto no final do array principal
  produtos.push(novoProduto);
  //Chamando a função de salvar para persistir o novo item no arquivo .json
  salvarDados();
  console.log(`Produto adicionado com sucesso, ID: ${novoId} `);

};

//Função para exibir tabela de produtos
const listarProdutos = () => {
  console.log('\n--- Lista de Produtos ---');
  //Se a lista estiver vazia avisa ao usuario
  if (produtos.length === 0) {
    console.log('Nenhum produto cadastrado.');

  }else{
    //Exibe a lista de produtos em formato de tabela no terminal
    console.table(produtos);
  }
  //Pausa a execução para o usuário conseguir ler a tabela antes de limpara a tela
  leia.keyInPause('\nPressione qualquer tecla para voltar.');

};

//Função para buscar uym produto pelo ID e permitir alterações
const atualizarProduto = () => {
  //Pergunta o ID do produto a ser editado
  const id = leia.question('Informe o ID do produto para atualizar:');
  //Procura o objeto no array com ID igual ao digitado
  const produto = produtos.find(p => p.id === id);

  //Se não encontrar nada, ele avisa ao usuario
  if (!produto) {
    console.log('Produto não encontado!');
    return;
  }

  console.log(`Edinatando: ${produto.nome} ( Se não quiser alterar deixe em branco)`);

  //Pergunta o novo nome, se usuario deixou em branco fica o nome atual
  const novoNome = leia.question(`Nome [${produto.nome}]:`, {defaultInput: produto.nome});
  const novaCategoria = leia.question(`Categoria [${produto.categoria}]:` , {defaultInput: produto.categoria});

  //Pega a entrada numerica como texto primeiro para validar se hove mudança
  const novaQtdInput = leia.question(`Quantidade [${produto.quantidade}]: `);
  const novoPrecoInput = leia.question(`Preço[${produto.preco}]: `)

  //Atribuindo novos valores ou antigos se não houver mudado nada
  produto.nome = novoNome;
  produto.categoria = novaCategoria;

  //Se o usuario digitou algo na quantidade converte para inteiro e atualiza
  if (novaQtdInput) produto.quantidade = parseInt(novaQtdInput);
  //Se o usuario digitou algo no preço converte para decimal e atualiza
  if (novoPrecoInput) produto.preco = parseFloat(novoPrecoInput);

  //Salva as alteraçoes no arquivo
  salvarDados();
  console.log('Produto atualizado com sucesso!');

};

const excluirProduto = () => {
  //Solicita o ID do produto a ser excluido
  const id = leia.question('Informe o ID do produto que deseja excluir: ');
  //Procura o indice desse produto no array
  const index = produtos.findIndex(p => p.id === id);

  //Se findIndex retornar -1 então o produto não existe na lista
  if (index === -1) {
    console.log('Produto não encontrado!');
    return;
  }

  //Utilizamos KeyInYN para perguntar SIM ou NÃO
  if (leia.keyInYN(`Tem certeza quer deseja excluir ${produtos[index].nome}?`)) {
    //remove 1 item do array a partir da posição index
    produtos.splice(index, 1);
    //Atualiza o JSON após exclusão
    salvarDados();
    console.log('Produto excluido com sucesso.');
  }else {
    console.log('Operação cancelada.');
  }
};

//Função para pesquisar produtos por nome ou Id
const buscarProduto = () => {
  //Recebe o termo da busca
  const termo = leia.question('Digite o ID ou parte do nome para buscar: ')
  //Cria um novo array filtrados com itens que batem com id ou parcial do  nome que contem no termo
  const resultados = produtos.filter(p =>
    p.id === termo || p.nome.toLowerCase().includes(termo.toLowerCase())
  );

  //Se o filtro retornar algum item ele exibe a tabela com resultados
  if (resultados.length > 0) {
    console.table(resultados);
  }else {
    //Se o array filtrado estiver vazio, avisa que não encontou o produto
    console.log('Nenhum produto encontrado.');
  }

  //pausa para visualização do usuario
  leia.keyInPause('\nPressione qualquer tecla para voltar.');

};

//Interface de MENU

const menu = () => {
  const opcoes = [
      'Adicionar Produto', 
      'Listar Produtos', 
      'Atualizar Produto', 
      'Excluir Produto', 
      'Buscar Produto'
  ];
  //Variavel que mantem o programa rodando até que ela vire falsa
  let rodando = true;

  while (rodando) {
    //Limpa o teminal para que o menu sempre fique visivel no topo
    console.clear();
    console.log('\n##> AGILSTORE - GERENCIAMENTO DE ESTOQUE <##' );

    //Exibe o menu numerico e retorna o indece escolhido
    const index  = leia.keyInSelect(opcoes, 'Escolha uma opcao:');

    //Se o usuario escolher a opção '0' Cancelar, retorna -1
    if (index === -1) {
      rodando = false, //ao virar false  interrompe o loop do 'while'
      console.log('Obrigado por utilizar o sistema, até logo!');
      break;
    }

    //de acorodo com o indice do array opcoes chama a função correta
    switch (index) {
      case 0: adcProduto(); break
      case 1: listarProdutos(); break
      case 2: atualizarProduto(); break
      case 3: excluirProduto(); break
      case 4: buscarProduto(); break
    }

    //Se a opçao não for 1 ou 4 que já tem suas pausas, ele pede pra apertar enter
    if ( index !== 1 && index !== 4) {
      leia.question('\nPressione Enter para continuar...');
    }


  }
};

//chama a função principal para iniciar nosso sistema 
menu();




