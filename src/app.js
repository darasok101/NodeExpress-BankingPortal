/*jslint node: true*/
/*jslint esnext: true*/

'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, resp) => {
    return resp.render('index', { title: 'Index' });
});

app.listen(3000,  ()=>{
    console.log('PS Project Running');
});