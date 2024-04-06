import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PozoVeta, PozoVetaRelations} from '../models';

export class PozoVetaRepository extends DefaultCrudRepository<
  PozoVeta,
  typeof PozoVeta.prototype.id,
  PozoVetaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(PozoVeta, dataSource);
  }
}
