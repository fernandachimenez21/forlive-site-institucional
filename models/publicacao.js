'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Maquina = sequelize.define('Maquina',{	
		id_maquina: {
			field: 'id_maquina',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},	
        sistema_operacional: {
            field: 'sistema_operacional',
            type: DataTypes.STRING,
            allowNull: false
        },
        hostname_maquina: {
            field: 'hostname_maquina',
            type: DataTypes.STRING,
            allowNull: true
        },
        arquitetura_sistema: {
            field: 'arquitetura_sistema',
            type: DataTypes.STRING,
            allowNull: false
        },
        modelo_processador: {
            field: 'modelo_processador',
            type: DataTypes.STRING,
            allowNull: false
        },
        fabricante_processador: {
            field: 'fabricante_processador',
            type: DataTypes.STRING,
            allowNull: true
        },
        cpu_fisica: {
            field: 'cpu_fisica',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cpu_logicas: {
            field: 'cpu_logicas',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        memoria_total: {
            field: 'memoria_total',
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        id_usuario: {
            field: 'id_usuario',
            type: DataTypes.INTEGER,
            allowNull: false
        }
	}, 
	{
		tableName: 'tb_maquina', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Maquina;
};