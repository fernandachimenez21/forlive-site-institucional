'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Leitura = sequelize.define('Leitura',{	
		id_leitura: {
			field: 'id_leitura',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},	
		uso_cpu: {
			field: 'uso_cpu',
			type: DataTypes.REAL,
			allowNull: false
		},
		uso_memoria: {
			field: 'uso_memoria',
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		temperatura: {
			field: 'temperatura',
			type: DataTypes.DOUBLE, // NÃO existe DATETIME. O tipo DATE aqui já tem data e hora
			allowNull: false
		},
		data_insercao: {
			field: 'data_insercao',
			type: DataTypes.DATE, // campo 'falso' (não existe na tabela). Deverá ser preenchido 'manualmente' no select
			allowNull: true
		},
		id_maquina: {
			field: 'id_maquina',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		nvl_alerta: {
			field: 'nvl_alerta',
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, 
	{
		tableName: 'tb_leitura', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Leitura;
};
