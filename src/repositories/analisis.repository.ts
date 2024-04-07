import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Analisis, AnalisisRelations, TipoAnalisis, Muestra} from '../models';
import {TipoAnalisisRepository} from './tipo-analisis.repository';
import {MuestraRepository} from './muestra.repository';

export class AnalisisRepository extends DefaultCrudRepository<
  Analisis,
  typeof Analisis.prototype.id,
  AnalisisRelations
> {

  public readonly tipoAnalisis: BelongsToAccessor<TipoAnalisis, typeof Analisis.prototype.id>;

  public readonly muestra: BelongsToAccessor<Muestra, typeof Analisis.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TipoAnalisisRepository') protected tipoAnalisisRepositoryGetter: Getter<TipoAnalisisRepository>, @repository.getter('MuestraRepository') protected muestraRepositoryGetter: Getter<MuestraRepository>,
  ) {
    super(Analisis, dataSource);
    this.muestra = this.createBelongsToAccessorFor('muestra', muestraRepositoryGetter,);
    this.registerInclusionResolver('muestra', this.muestra.inclusionResolver);
    this.tipoAnalisis = this.createBelongsToAccessorFor('tipoAnalisis', tipoAnalisisRepositoryGetter,);
    this.registerInclusionResolver('tipoAnalisis', this.tipoAnalisis.inclusionResolver);
  }
}
