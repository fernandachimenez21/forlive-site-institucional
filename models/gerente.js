'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Gerente = sequelize.define('Gerente',{
		id_gerente: {
			field: 'id_gerente',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		nome: {
			field: 'nome',
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			field: 'email',
			type: DataTypes.STRING,
			allowNull: false
		},
		senha: {
			field: 'senha',
			type: DataTypes.STRING,
			allowNull: false
		},
		telefone: {
			field: 'telefone',
			type: DataTypes.STRING,
			allowNull: false
		},
        nvl_acesso: {
            field: 'nvl_acesso',
            type: DataTypes.INTEGER,
            allowNull: false
        }
	}, 
	{
		tableName: 'tb_gerente', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Gerente;
};
