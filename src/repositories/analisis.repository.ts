import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Analisis, AnalisisRelations} from '../models';

export class AnalisisRepository extends DefaultCrudRepository<
  Analisis,
  typeof Analisis.prototype.id,
  AnalisisRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Analisis, dataSource);
  }
}
