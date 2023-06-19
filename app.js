const express = require('express');
const app = express();

const { products } = require('./data');
// customise small data
// app.get('/', (req, res) => {
//   res.json([
//     { name: 'Ajit', age: 26 },
//     { name: 'hari', age: 20 },
//   ]);
// });

app.get('/', (req, res) => {
  res.send(`<h1>This is home page</h1> <a href="/api/products">products </a>`);
});

app.get('/api/products', (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, price } = product;
    return { id, name, price };
  });
  console.log(newProducts);
  res.json(newProducts);
});

app.get('/api/products/:productID', (req, res) => {
  const { productID } = req.params;
  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );
  if (!singleProduct) {
    res.status(404).send('There is no such product.');
  }
  res.send(singleProduct);
});
// const path = require('path');

// // setup static and middleware
// app.use(express.static('./public'));

// // app.get('/', (req, res) => {
// //   res.sendFile(path.resolve(__dirname, './navbar-app/index.html'));
// // });

app.get('*', (req, res) => {
  res.status.send('resource not found');
});

app.listen(5000, () => console.log('listing at the port 5000...'));
