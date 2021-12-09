'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Unidade = sequelize.define('Unidade',{
		id_unidade: {
			field: 'id_unidade',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		nome: {
			field: 'nome',
			type: DataTypes.STRING,
			allowNull: false
		},
		endereco: {
			field: 'endereco',
			type: DataTypes.STRING,
			allowNull: false
		},
		id_empresa: {
			field: 'id_empresa',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		id_gerente: {
			field: 'id_gerente',
			type: DataTypes.INTEGER,
			allowNull: false
		},
        id_empresa: {
            field: 'id_empresa',
            type: DataTypes.STRING,
            allowNull: false
        }
	}, 
	{
		tableName: 'tb_unidade', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Unidade;
};
