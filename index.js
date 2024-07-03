const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const multer = require('multer');

const repeatLine = 100;

const app = express();

const upload = multer(); // Processar o form-data

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware específico para processar form-data antes das rotas que precisam dele
app.post('*', upload.any(), (req, res, next) => {
  next();
});

// Middleware que captura tudo que chega ao servidor
app.use((req, res, next) => {
  console.log('*'.repeat(repeatLine));

  console.log(`Método: ${req.method} | URL: ${req.url}`);

  console.log('*'.repeat(repeatLine));

  console.log('Headers: ', req.headers);
  
  console.log('*'.repeat(repeatLine));


  if (Object.keys(req.params).length > 0) {
    console.log('Parâmetros da rota:', JSON.stringify(req.params, null, 2));
  }

  if (Object.keys(req.query).length > 0) {
    console.log('Query strings:', JSON.stringify(req.query, null, 2));
  }

  if (Object.keys(req.body).length > 0) {
    console.log('Corpo da requisição:', JSON.stringify(req.body, null, 2));
  }

  if (req.files && req.files.length > 0) {
    console.log('Campos do form-data:');
    req.files.forEach(file => {
      console.log(`Nome do campo: ${file.fieldname}, Nome do arquivo: ${file.originalname}`);
    });
  }

  console.log('*'.repeat(repeatLine));
  next();
});

// Rota GET simples
app.get('/', (req, res) => {
  res.json({ message: 'GET request received' });
});

// Rota POST simples
app.post('/', (req, res) => {
  res.json({ message: 'POST request received' });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
