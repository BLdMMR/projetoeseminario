# Esqueleto do relatório de Projeto

## - Capa
## - Agradecimentos
## - Indíce
## - Introdução
 - Identificação do problema
 - Idealização de uma solução
 - Requisitos do sistema
 - Construção técnica dos requisitos
 - Planeamento da implementação
## - Desenvolvimento
 - Familiarização com as tecnologias
 - Implementação inicial de exemplo
 - Troca de tecnologias: PostgreSQL > Elasticsearch
 - Armazenamento na Cloud: Heroku
    - Desafios do CICD (_Continuous Integration Continuous Deployment_)
    - Soluções para os problemas
 - Desenvoolvmineto de código
    - Construção dos _handlers_
    - Construção do modelo de comunicação com a BD: _Spring Data Elasticsearch_
    - Implementaação do sistema de autenticação
        - Descrição do sistema de autenticação
    - Organização do código
    - _Frontend_: Inicio da construção
    - Criação da estrutura e organização 
    - Definição do _design_
        - _Bootstrap_
        - Logótipo
    - Construção das páginas de _login_, _logout_, e _signup-confirmation_
        - _Backend_: Mail Sender
    - Atualização do _Elasticsearch_: de um _dyno_ com uma imagem _docker_ para uma extensão persistente própria do Heroku
