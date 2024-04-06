import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Trayectoria, TrayectoriaRelations} from '../models';

export class TrayectoriaRepository extends DefaultCrudRepository<
  Trayectoria,
  typeof Trayectoria.prototype.id,
  TrayectoriaRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Trayectoria, dataSource);
  }
}
