import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Litologia, LitologiaRelations} from '../models';

export class LitologiaRepository extends DefaultCrudRepository<
  Litologia,
  typeof Litologia.prototype.id,
  LitologiaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Litologia, dataSource);
  }
}
