# Descripción del ejercicio

Implementar una aplicación simple que:

- Tenga el bundling montado con webpack
- Este montada con Typescript
- Tengo el texto de "hola mundo" estilado con SASS
- Muestre un logo

Opcional:

- Que muestre un hola mundo desarrollado con React
- Que tenga una versión de build de producción
- Que tenga variables de entorno para desarrollo producción.
- Que tengamos una forma de medir cuanto ocupa cada librería y nuestro código en el bundle.
- Montar lo mismo con parcel.

## Guía paso a paso

Este es una guía paso a paso de las acciones realizadas para la creación del ejercicio.

Prerequisitos:

- Tener instalado node

## 1. Creación del proyecto

```bash
npm init -y
```

El comando anterior creará el fichero `package.json`. La opción `-y` es para que no nos haga ninguna pregunte y tome las opciones predeterminadas.

## 2. Instalación de webpack

Primer paso, instalamos webpack y webpack-cli:

```bash
npm install webpack webpack-cli --save-dev
```

La opción `--save-dev`es para que la instalación sea solo para desarrollo. De esta manera en el fichero `package.json` la dependencia de estas librerías se establecen dentro de `devDependencies`. Esto es importante para que estas librerías nunca se distribuyan con nuestra aplicación, realmente estas librerías no son necesarias para ejecutar nuestra aplicación, por lo tanto no se deben incorporar al bundle

```json
  "devDependencies": {
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.11"
  }
```

Ya podemos usar webpack dentro de un script definiendolo en el `package.json`. Por ejemplo lanzar webpack en [modo desarrollo](https://webpack.js.org/configuration/mode/).

```json
  "scripts": {
    "build": "webpack --mode development"
  }
```

Podemos ejecutar ese script con `npm run build`. Si se crea una entrada en start no es necesario hacer run y se hace directamente con `npm start`

```json
  "scripts": {
    "start": "webpack --mode development"
  }
```

Si queremos tener un web server con live-reloading en memoria podemos usar webpack-dev-server

```bash
npm install webpack-dev-server --save-dev
```

Con esto podemos cambiar el start a:

```json
  "scripts": {
    "start": "webpack-dev-server --mode development --open"
  }
```

## 3. Usando Typescript

Como el requisito es usar Typescript vamos a instalar `babel` para facilitar la transpilación desde Typescript y ES6/7

```bash
npm install @babel/cli @babel/core @babel/preset-env --save-dev
```

También instalaremos el loader de babel

```bash
npm install babel-loader --save-dev
```

## Contenido HTML

npm install html-webpack-plugin --save-dev

## Estilos

npm install style-loader css-loader mini-css-extract-plugin sass sass-loader --save-dev

## Imagenes

npm install url-loader file-loader html-loader --save-dev

## . Creando ficheros

Para tener las cosas ordenadas comenzamos por crear la carpeta `src` y dentro un simple fichero javascript `index.ts` que será el punto de entrada de nuestra aplicación. También creamos el fichero `.babelrc` y el fichero `webpack.config.js` dentro de la carpeta raiz del proyecto.

Contenido del fichero `.babelrc`

```json
{
    "presets": ["@babel/preset-env"]
}
```
