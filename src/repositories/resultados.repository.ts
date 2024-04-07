import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Resultados, ResultadosRelations, Analisis} from '../models';
import {AnalisisRepository} from './analisis.repository';

export class ResultadosRepository extends DefaultCrudRepository<
  Resultados,
  typeof Resultados.prototype.id,
  ResultadosRelations
> {

  public readonly analisis: BelongsToAccessor<Analisis, typeof Resultados.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('AnalisisRepository') protected analisisRepositoryGetter: Getter<AnalisisRepository>,
  ) {
    super(Resultados, dataSource);
    this.analisis = this.createBelongsToAccessorFor('analisis', analisisRepositoryGetter,);
    this.registerInclusionResolver('analisis', this.analisis.inclusionResolver);
  }
}
