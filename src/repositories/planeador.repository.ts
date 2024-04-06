import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Planeador, PlaneadorRelations} from '../models';

export class PlaneadorRepository extends DefaultCrudRepository<
  Planeador,
  typeof Planeador.prototype.id,
  PlaneadorRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Planeador, dataSource);
  }
}
