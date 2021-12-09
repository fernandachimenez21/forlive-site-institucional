var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Usuario = require('../models').Usuario;
var Gerente = require('../models').Gerente;

let sessoes = [];

/* Recuperar usuário por login e senha */
router.post('/autenticar', function(req, res, next) {
	console.log('Recuperando usuário por login e senha');

	var login = req.body.email; // depois de .body, use o nome (name) do campo em seu formulário de login
	var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login	
	
	let instrucaoSql = `select * from tb_usuario where email='${login}' and senha='${senha}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Usuario
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);

		if (resultado.length == 1) {
			sessoes.push(resultado[0].dataValues.email);
			console.log('sessoes: ',sessoes);
			res.json(resultado[0]);
		} else if (resultado.length == 0) {
			res.status(403).send('Login e/ou senha inválido(s)');
		} else {
			res.status(403).send('Mais de um usuário com o mesmo login e senha!');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});


/* Alteração de perfil */
router.put('/alterarNome:id_usuario', function(req, res, next) {
	Usuario.update (
		{nome: req.body.nome},
		{where: {id_usuario: req.params.id_usuario}}
	).then(function (rowUpdate) {
		res.json(rowUpdate)
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

router.put('/alterarEmail:id_usuario', function(req, res, next) {
	Usuario.update (
		{email: req.body.email},
		{where: {id_usuario: req.params.id_usuario}}
	).then(function (rowUpdate) {
		res.json(rowUpdate)
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

router.put('/alterarSenha:id_usuario', function(req, res, next) {
	Usuario.update (
		{senha: req.body.senha},
		{where: {id_usuario: req.params.id_usuario}}
	).then(function (rowUpdate) {
		res.json(rowUpdate)
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});
	
router.put('/alterarTelefone:id_usuario', function(req, res, next) {
	Usuario.update (
		{telefone: req.body.telefone},
		{where: {id_usuario: req.params.id_usuario}}
	).then(function (rowUpdate) {
		res.json(rowUpdate)
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

/* Cadastrar usuário */
router.post('/cadastrar', function(req, res, next) {
	console.log('Criando um usuário');
	
	Usuario.create({
		nome: req.body.nome,
		setor: req.body.setor,
		email: req.body.email,
		senha: req.body.senha,
		telefone: req.body.telefone,
		id_unidade: req.body.unidade,
		nivel_acesso: req.body.nivel_acesso,
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

router.post('/cadastrarGerente', function(req, res, next) {
	console.log('Criando um gerente');
	
	Gerente.create({
		nome: req.body.nome,
		email: req.body.email,
		senha: req.body.senha,
		telefone: req.body.telefone,
		id_unidade: req.body.unidade,
		nvl_acesso: req.body.nivel_acesso,
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});


/* Verificação de usuário */
router.get('/sessao/:login', function(req, res, next) {
    let login = req.params.email;
    console.log(`Verificando se o usuário ${login} tem sessão`);

    let tem_sessao = false;
    for (let u=0; u<sessoes.length; u++) {
        if (sessoes[u] == login) {
            tem_sessao = true;
            break;
        }
    }

    if (tem_sessao) {
        let mensagem = `Usuário ${login} possui sessão ativa!`;
        console.log(mensagem);
        res.send(mensagem);
    } else {
        res.sendStatus(403);
    }

});


/* Logoff de usuário */
router.get('/sair/:login', function(req, res, next) {
	let login = req.params.login;
	console.log(`Finalizando a sessão do usuário ${login}`);
	let nova_sessoes = []
	for (let u=0; u<sessoes.length; u++) {
		if (sessoes[u] != login) {
			nova_sessoes.push(sessoes[u]);
		}
	}
	sessoes = nova_sessoes;
	res.send(`Sessão do usuário ${login} finalizada com sucesso!`);
});


/* Recuperar todos os usuários */
router.get('/', function(req, res, next) {
	console.log('Recuperando todos os usuários');
	Usuario.findAndCountAll().then(resultado => {
		console.log(`${resultado.count} registros`);

		res.json(resultado.rows);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
  	});
});

module.exports = router;
