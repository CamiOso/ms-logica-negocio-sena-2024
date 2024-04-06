import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Resultados, ResultadosRelations} from '../models';

export class ResultadosRepository extends DefaultCrudRepository<
  Resultados,
  typeof Resultados.prototype.id,
  ResultadosRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Resultados, dataSource);
  }
}
