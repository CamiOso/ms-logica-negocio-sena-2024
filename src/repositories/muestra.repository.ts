import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Muestra, MuestraRelations} from '../models';

export class MuestraRepository extends DefaultCrudRepository<
  Muestra,
  typeof Muestra.prototype.id,
  MuestraRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Muestra, dataSource);
  }
}
