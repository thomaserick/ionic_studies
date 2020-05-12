# Getting Started Ionic

### Em construção

For help getting started with Ionic, view our online [documentation](https://ionicframework.com/docs).

For help getting started with Angular, view our online [documentation](https://angular.io/docs).

### Instalação

- [Instalar](https://ionicframework.com/docs/intro/installation)
  - NodeJs
  - Ionic CLI
  - Cordova

## Resumo

### Comandos

- Criar aplicação
  - ionic start
- Criar página
  - ionic generate page "Nome_da_página"
- Start API
  - ionic serve
- Plataforma Browser

  - ionic cordova platform add browser --save

- Instala o plug da camera
  - ionic cordova plugin add cordova-plugin-camera

### Downgrade

A seguir a sequência de comandos necessária para efetuar o downgrade:

1 - Remova o plugin

ionic cordova plugin remove cordova-plugin-camera

2 - Adicione novamente

ionic cordova plugin add cordova-plugin-camera

3 - Instale a versão 4.20.0

npm install @ionic-native/camera@4.20.0

### Dependencias

- npm install @angular/http@latest
- Instalar biblioteca para manipular token jwt:
  - npm install --save angular2-jwt
- npm install --save @ionic-native/camera
  -

# Apps Desenvolvidos e conceitos utilizados.

- [Sistema_de_Pedido:](https://github.com/thomaserick/ionic_studies/tree/CursoSpringIonic) Lazy_Loading,@Ngmodule,@IonicPage,io-item,io-label,io-button,binding,push(pilha de tela),setRoot,ionViewWillEnter,ionViewDidLeave,HttpClient,Interceptor

**Helpers**

- [Format GitHub](https://help.github.com/en/articles/basic-writing-and-formatting-syntax)
