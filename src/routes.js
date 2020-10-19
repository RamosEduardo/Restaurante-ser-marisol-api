const express = require('express');
const routes = express.Router();
routes.use(express.json());

const ServicoController = require('./controllers/ServicoController');
const ServicoOferecidoController = require('./controllers/ServicoOferecidoController');
const InfoController = require('./controllers/InfoController');
const CardapioController = require('./controllers/CardapioController');
const CategoriaCardapioController = require('./controllers/CategoriaCardapioController');
const ProdutoCardapioController = require('./controllers/ProdutoCardapioController');
const EventoController = require('./controllers/EventoController');
const FotosEventoController = require('./controllers/FotosEventoController');
const FotosCasaController = require('./controllers/FotosCasaController');
const EstruturaController = require('./controllers/EstruturaController');
const LogoController = require('./controllers/LogoController');
const UserController = require('./controllers/UserController');

const multer = require('multer');
const multerConfig = require('./config/multer');

// Routes Servicos
routes.post('/servicos/:titulo/:descricao', multer(multerConfig).single('file'), ServicoController.create);
routes.get('/servicos', ServicoController.index);
routes.get('/servico/:id', ServicoController.getById);
routes.delete('/servicos/:id', ServicoController.delete);
// routes.put('/servicos/:id', multer(multerConfig).single('file'), ServicoController.update);
// Routes Servicos Oferecidos
routes.post('/servicosOferecidos', ServicoOferecidoController.create);
routes.get('/servicosOferecidos', ServicoOferecidoController.index);
routes.delete('/servicosOferecidos/:id', ServicoOferecidoController.delete);
routes.put('/servicosOferecidos/:id', ServicoOferecidoController.update);
// Routes Infos
routes.post('/infos', InfoController.create);
routes.get('/infos', InfoController.index);
routes.delete('/infos/:id', InfoController.delete);
routes.put('/infos/:id', InfoController.update);
// Routes Cardápios
routes.post('/cardapios', CardapioController.create);
routes.get('/cardapios', CardapioController.index);
routes.delete('/cardapios/:id', CardapioController.delete);
routes.put('/cardapios/:id', CardapioController.update);
// Categorias Cardápio
routes.post('/categoria-cardapio', CategoriaCardapioController.create);
routes.get('/categoria-cardapio', CategoriaCardapioController.index);
routes.delete('/categoria-cardapio/:id', CategoriaCardapioController.delete);
routes.put('/categoria-cardapio/:id', CategoriaCardapioController.update);
// Produtos Cardápio
routes.post('/produto-cardapio', ProdutoCardapioController.create);
routes.get('/produto-cardapio', ProdutoCardapioController.index);
routes.delete('/produto-cardapio/:id', ProdutoCardapioController.delete);
routes.put('/produto-cardapio/:id', ProdutoCardapioController.update);
// Eventos
routes.post('/eventos', EventoController.create);
routes.get('/eventos', EventoController.index);
routes.get('/all-eventos', EventoController.allEvents);
routes.get('/evento/:id', EventoController.getById);
routes.delete('/eventos/:id', EventoController.delete);
routes.put('/eventos', EventoController.update);
routes.get('/eventos-mes/:mes', EventoController.getByMonth);
// Fotos Eventos
routes.post('/fotos-eventos/:idEvento', multer(multerConfig).single('file'), FotosEventoController.create);
routes.get('/fotos-eventos', FotosEventoController.index);
routes.delete('/fotos-eventos/:id', FotosEventoController.delete);
routes.put('/fotos-eventos/:id', FotosEventoController.update);
// Fotos Eventos
routes.post('/fotos-casa', multer(multerConfig).single('file'), FotosCasaController.create);
routes.get('/fotos-casa', FotosCasaController.index);
routes.delete('/fotos-casa/:id', FotosCasaController.delete);

// Fotos Eventos
routes.post('/estrutura', EstruturaController.create);
routes.get('/estrutura', EstruturaController.index);
routes.delete('/estrutura/:id', EstruturaController.delete);

routes.post('/logo', multer(multerConfig).single('file'), LogoController.create);
routes.get('/logo', LogoController.index);
routes.delete('/logo/:id', LogoController.delete);

// User
routes.post('/user', UserController.create);
routes.post('/login', UserController.login)
routes.get('/user', UserController.index);
// routes.put('/user', UserController.update);
routes.delete('/user', UserController.delete);

module.exports = routes;