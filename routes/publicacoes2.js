var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Leituras = require('../models').Leituras;
var Maquinas = require('../models').Maquinas;




/* ROTA QUE RECUPERA CRIA UMA PUBLICAÇÃO */
router.post('/publicar2/:idUsuario', function(req, res, next) {
    console.log("Iniciando Publicação...")
    
	let idUsuario = req.params.idUsuario;

    Usereqp.create({
        fkUsuario: idUsuario,
 		fkEquipamento: req.body.fkEquipamento 
    }).then(resultado => {
        console.log("Post realizado com sucesso!!");
        res.send(resultado);
    }).catch(erro => {
        console.log('DEU UM ERRINHO')
        console.error(erro);
        res.status(500).send(erro.message);
    })
})

/* ROTA QUE RECUPERA TODAS AS PUBLICAÇÕES */
router.get('/getLeiturasByUnidade:id_unidade', function(req, res, next) {
	var id_unidade = req.params.id_unidade;
	console.log('Recuperando todas as publicações');
	
	let instrucaoSql = `select 
	maquina.id_maquina, 
	maquina.sistema_operacional, 
    maquina.modelo_processador, 
    disco.modelo_disco, 
    leitura.uso_cpu, 
    leitura.uso_memoria, 
    leitura.data_insercao as insercao_leitura,
	leitura.nvl_alerta,
    (select 
		leitura_disco.uso_disco 
	from 
		tb_leitura_disco as leitura_disco
    where leitura_disco.id_leitura_disco = leitura.id_leitura) as "uso_disco",
    (select 
		leitura_disco.data_insercao 
	from 
		tb_leitura_disco as leitura_disco
    where leitura_disco.id_leitura_disco = leitura.id_leitura) as "data_insercao_disco"
from tb_leitura as leitura 
inner join tb_maquina as maquina
on leitura.id_maquina = maquina.id_maquina
inner join tb_disco as disco 
on disco.id_maquina = maquina.id_maquina
inner join tb_usuario as usuario
on usuario.id_usuario = maquina.id_usuario
inner join tb_unidade as unidade
on usuario.id_unidade = unidade.id_unidade
where unidade.id_unidade = ${id_unidade	} 
order by leitura.nvl_alerta desc
limit 10;`

	sequelize.query(instrucaoSql, {
		model: Leituras,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

router.get('/getLeiturasById:id_maquina', function(req, res, next) {
	console.log('Recuperando todas as publicações');

	var id_maquina = req.params.id_maquina;
	
	let instrucaoSql = `select 
	usuario.nome,
	usuario.setor,
	leitura.id_leitura,
	maquina.id_maquina, 
    maquina.sistema_operacional, 
    maquina.modelo_processador, 
    disco.modelo_disco, 
    leitura.uso_cpu, 
    leitura.uso_memoria, 
    leitura.data_insercao as insercao_leitura
from tb_leitura as leitura 
inner join tb_maquina as maquina
on leitura.id_maquina = maquina.id_maquina
inner join tb_disco as disco 
on disco.id_maquina = maquina.id_maquina
inner join tb_usuario as usuario
on usuario.id_usuario = maquina.id_usuario
where maquina.id_maquina = ${id_maquina}
order by leitura.id_leitura desc
limit 10;`


	sequelize.query(instrucaoSql, {
		model: Leituras,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

router.get('/getUsuarioByMaquina:id_maquina', function(req, res, next) {
	console.log('Recuperando todas as publicações');

	var id_maquina = req.params.id_maquina;
	
	let instrucaoSql = `select 
	usuario.nome,
    usuario.email,
	usuario.setor,
    maquina.sistema_operacional,
    maquina.modelo_processador,
    disco.modelo_disco,
    disco.tamanho_total
from tb_maquina as maquina
inner join tb_usuario as usuario
on maquina.id_usuario = usuario.id_usuario
inner join tb_disco as disco
on maquina.id_maquina = disco.id_maquina 
where maquina.id_maquina = ${id_maquina};`


	sequelize.query(instrucaoSql, {
		model: Leituras,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

router.get('/getLeituraDiscoById:id_maquina', function(req, res, next) {
	console.log('Recuperando todas as publicações');

	var id_maquina = req.params.id_maquina;
	
	let instrucaoSql = `select 
	leitura_disco.uso_disco,
    leitura_disco.data_insercao,
    leitura_disco.nvl_alerta,
    disco.modelo_disco,
    disco.tamanho_total
from tb_leitura_disco as leitura_disco
inner join tb_disco as disco on
leitura_disco.id_disco = disco.id_disco
inner join tb_maquina as maquina
on disco.id_maquina = maquina.id_maquina
where maquina.id_maquina = ${id_maquina}
order by leitura_disco.id_leitura_disco desc
limit 1;`


	sequelize.query(instrucaoSql, {
		model: Leituras,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


router.get('/getMaquinasByUnidade:id_unidade', function(req, res, next) {
	console.log('Recuperando todas as publicações');

	var id_unidade = req.params.id_unidade;
	
	let instrucaoSql = `select 
	maquina.id_maquina,
   maquina.sistema_operacional,
   maquina.modelo_processador,
   maquina.fabricante_processador,
   disco.modelo_disco,
   disco.tamanho_total,
   usuario.nome,
   usuario.setor,
   usuario.email
from tb_maquina as maquina
inner join tb_usuario as usuario
on maquina.id_usuario = maquina.id_usuario
inner join tb_disco as disco
on disco.id_maquina = maquina.id_maquina
where usuario.id_unidade = ${id_unidade};`


	sequelize.query(instrucaoSql, {
		model: Maquinas,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		console.log(`Encontrados: ${resultado}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});



module.exports = router;