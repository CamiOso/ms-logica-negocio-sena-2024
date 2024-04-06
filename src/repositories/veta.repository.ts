import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Veta, VetaRelations} from '../models';

export class VetaRepository extends DefaultCrudRepository<
  Veta,
  typeof Veta.prototype.id,
  VetaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Veta, dataSource);
  }
}
