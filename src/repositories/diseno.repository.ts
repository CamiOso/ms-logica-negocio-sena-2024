import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Diseno, DisenoRelations} from '../models';

export class DisenoRepository extends DefaultCrudRepository<
  Diseno,
  typeof Diseno.prototype.id,
  DisenoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Diseno, dataSource);
  }
}
