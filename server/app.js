const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname , 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });
  
  app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/about.html'));
  });
  
  app.get('/product', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/product.html'));
  });
  
  app.get('/shop', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/shop.html'));
  });

  app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/cart.html'));
  });

  app.get('/exclusive', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/exclusive.html'));
  });


app.use((req, res) =>{
    res.status(404);
    res.send('<h1>Error 404:Resource not found</h1>');
})

app.listen(3000, ()=>{
    console.group("App listening on port 3000");
})