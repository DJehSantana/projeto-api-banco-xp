# API Banco NodeJs
**Projeto simulando cadastro e edição de contas em um banco - Bootcamp NodeJs Xp Educação**

Durante o projeto utilizamos a biblioteca Express para executar as funções do servidor.

A biblioteca Winston do Express foi utilizada para a criação de loggers.

Um arquivo JSON foi inserido na aplicação para servir como Banco de dados.

### Tecnologias utilizadas:

<div>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width="50px" height="50px" /> <img src="https://user-images.githubusercontent.com/105378159/188524475-83652b5c-76fa-444e-8c10-faed1d113d7b.png" width="50px" height="50px" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" width="50px" height="50px" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="50px" height="50px"/>
</div>

 ### Configuração do ambiente de desenvolvimento

 1. Clonar o repositório
 1. Instalar as dependências com o gerenciador de pacotes `npm`
 1. Escolher porta do servidor local
 1. Conectar a um banco de dados externo (caso não queira, o arquivo "accounts.json" já está conectado a aplicação e está sendo utilizado como banco de dados)
 1. Ao conectar com um banco de dados externo será necessário alterar a leitura e gravação de dados realizas pelo repository
 1. Rodar o servidor executando o comando `npm start`
 
 ### Rotas e métodos:
 
 <table>
  <thead>
    <th>Endpoint</th>    
    <th>Método</th>
    <th>Função</th>
  </thead>
  <tbody>    
    <td>/account</td>    
    <td>GET</td>
    <td>Lista todas as contas</td>
  </tbody>
  <tbody>
    <td>/account/:id</td>    
    <td>GET</td>
    <td>Lista os dados da conta de ID correspondente ao informado</td>
  </tbody> 
  <tbody>
    <td>/account</td>    
    <td>POST</td>
    <td>Cria o registro de uma nova conta</td>
  </tbody>
  <tbody>
    <td>/account/:id</td>    
    <td>DELETE</td>
    <td>Apaga do BD a conta de ID correspondente ao informado</td>
  </tbody>
  <tbody>
    <td>/account</td>    
    <td>PUT</td>
    <td>Atualiza todos os dados da conta selecionada</td>
  </tbody>
  <tbody>
    <td>/account</td>    
    <td>PATCH</td>
    <td>Atualiza o saldo da conta selecionada</td>
  </tbody>
  <tbody>
    <td>/doc</td>    
    <td>GET</td>
    <td>Documentação da API (em desenvolvimento)</td>
  </tbody>
 </table>
 
 ### Documentação da API
 
 **Swagger** 
 
 Status: Em desenvolvimento
 
 
