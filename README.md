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

## Probar

En este repo hay dos proyectos. Uno con WebPack y otro con Parcel. Para probar los resultados tan solo es necesario realizar:

```bash
cd app-webpack
npm install
npm start
```

o

```bash
cd app-parcel
npm install
npm start
```

## Guía paso a paso de construcción del proyecto WebPack

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

## 4. Contenido HTML

Para facilitar el uso de contenido HTML en el bundle instalamos el plugin correspondiente

```bash
npm install html-webpack-plugin --save-dev
```

## 5. Estilos

Para gestionar estilos CSS y SASS en el bundle instalamos los loader y plugin correspondiente

```bash
npm install style-loader css-loader mini-css-extract-plugin sass sass-loader --save-dev
```

## 6. Imagenes

Para gestionar imagenes en el bundle instalamos los siguientes loaders

```bash
npm install url-loader file-loader html-loader --save-dev
```

## 7. React

Para la utilización de React dentro del bundle hemos insalado estos paquetes

```bash
npm install @babel/preset-react --save-dev
npm install @types/react @types/react-dom --save-dev
npm install react react-dom --save
```

## 8. Todo junto

Finalmente el fichero `package.json` debería de contener las siguientes dependencias:

```json
  "devDependencies": {
    // dependencias para Babel
    "@babel/cli": "^7.8.4",
    "@babel/core": "^7.9.0",
    "@babel/preset-env": "^7.9.5",
    "@babel/preset-react": "^7.10.1",
    "@babel/preset-typescript": "^7.9.0",
    // Dependencia de Typescript
    "typescript": "^3.8.3",
    // Dependencia para Sass
    "sass": "^1.26.8",
    // dependencias para tipos de React
    "@types/react": "^16.9.36",
    "@types/react-dom": "^16.9.8",
    // Loaders
    "babel-loader": "^8.1.0",
    "style-loader": "^1.2.1",
    "css-loader": "^3.5.3",
    "file-loader": "^6.0.0",
    "html-loader": "^1.1.0",
    "url-loader": "^4.1.0",
    "sass-loader": "^8.0.2",
    // Plugins
    "html-webpack-plugin": "^4.2.1",
    "mini-css-extract-plugin": "^0.9.0",
    // Utilidad para borrar el directorio dist en cada build
    "rimraf": "^3.0.2",
    // Dependencias de WebPack
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.11",
    "webpack-dev-server": "^3.10.3"
  },
  "dependencies": {
    // dependencias para ejecución de React
    "react": "^16.13.1",
    "react-dom": "^16.13.1"
  }
```

Una alternativa a instalar cada paquete paso a paso es simplemente meter todas las dependencias manualmente en el `package.json` y hacer un `npm install`

 En el directorio raiz del proyecto creamos el fichero `.babelrc` (contiene las definiciones de los preset que se utilicen) y el fichero `webpack.config.js` asi como el fichero `tsconfig.json` (configuración del transpilador typescript).

Para tener las cosas ordenadas comenzamos por crear la carpeta `src` y dentro un simple fichero javascript `index.tsx` que será el punto de entrada de nuestra aplicación. Además tendremos un fichero `index.html`que actuará como la página principal. posteriormente podremos crear más ficheros `.tsx`, `.ts` o `js` a nuestra conveniencia. Vamos a gestionar todos los tipos dentro del WebPack.

Para la gestión de las imagenes usamos la carpeta `src/content`. Esta carpeta contendrá todas las imágenes.

El fichero más importante para explicar es el `webpack.config.js`. Es un fichero estandar javascript. Las primeras líneas son las declaraciones de los objetos Plugin y de ayuda que usaremos a lo largo del fichero.

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const basePath = __dirname;
```

Posteriormente tendremos un único `module.export` en el que iremos declarando todas las propiedades del bundle.

```javascript
module.exports = {
  ...
}
```

De entre ellas las propiedades más importantes son `entry`, `output`, `module.rules` y `plugins`.

En el caso de entry usamos el fichero `index.tsx` como entrada a la app y el fichero de estilos Sass `styles.scss` como estilo principal de la app.

```javascript
entry: {
  app: "./index.tsx",
  appStyles: ["./styles/styles.scss"],
}
```

En los plugins utilizamos el `HtmlWebpackPlugin` indicando que el fichero de entrada es el `index.html`. También configuramos el plugin de minificación de CSS.

```javascript
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html", // Salida a ./dist/
      template: "index.html", // Entrada desde ./src
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
```

Por último tenemos las siguientes reglas. Es importante señalar que las reglas se ejecutan en secuencia de abajo hacia arriba. De manera que en algunos casos el resultado de la ejecución de una regla es material de entrada de otra.

```javascript
    rules: [
      {
        // regla para ficheros js (los pasamos al loader de Babel)
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        // regla para ficheros tsx (los pasamos al loader de Babel)
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        // regla para ficheros scss (los pasamos al loader de SASS)
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        // regla para ficheros css (los pasamos al loader de CSS)
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        // regla para imagenes (los pasamos al loader de URL)
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        loader: "url-loader?limit=5000",
      },
      {
        // regla para ficheros html (los pasamos al loader de HTML)
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
```