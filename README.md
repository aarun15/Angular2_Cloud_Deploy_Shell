
A simple starter project demonstrating the basic concepts of Angular 2.


### Usage
- Clone or fork this repository
- Make sure you have [node.js](https://nodejs.org/) installed version 6+
- Make sure you have NPM installed version 3+
- npm install


### AOT Compilation
### BUILD
    grunt compile_aot
### SERVER RUN
    npm run server_aot:prod
    open browser to [`http://localhost:8080`](http://localhost:8080)

### Development Cloud deploy
    grunt compile_aot
    grunt generateJar
    cf login
    >username
    >password
    cf push -f manifest-dev.yml -p build/libs/*.jar
