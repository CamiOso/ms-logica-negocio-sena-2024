import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {TipoAnalisis, TipoAnalisisRelations} from '../models';

export class TipoAnalisisRepository extends DefaultCrudRepository<
  TipoAnalisis,
  typeof TipoAnalisis.prototype.id,
  TipoAnalisisRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(TipoAnalisis, dataSource);
  }
}
