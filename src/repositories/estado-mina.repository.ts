import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {EstadoMina, EstadoMinaRelations} from '../models';

export class EstadoMinaRepository extends DefaultCrudRepository<
  EstadoMina,
  typeof EstadoMina.prototype.id,
  EstadoMinaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(EstadoMina, dataSource);
  }
}
