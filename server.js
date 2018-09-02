const express = require('express');
const path = require('path');

const app = express();

//server routes always to be present here...

if(process.env.NODE_ENV !== 'production'){
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config.js');

    app.use(webpackMiddleware(webpack(webpackConfig)));
}
else{
    app.use(express.static('dist')); //opens up dist for public
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    }); // Implemented for React Router
} 


app.listen(process.env.PORT || 3050, () => console.log('Listening'));