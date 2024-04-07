import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Muestra, MuestraRelations, Litologia} from '../models';
import {LitologiaRepository} from './litologia.repository';

export class MuestraRepository extends DefaultCrudRepository<
  Muestra,
  typeof Muestra.prototype.id,
  MuestraRelations
> {

  public readonly litologia: BelongsToAccessor<Litologia, typeof Muestra.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('LitologiaRepository') protected litologiaRepositoryGetter: Getter<LitologiaRepository>,
  ) {
    super(Muestra, dataSource);
    this.litologia = this.createBelongsToAccessorFor('litologia', litologiaRepositoryGetter,);
    this.registerInclusionResolver('litologia', this.litologia.inclusionResolver);
  }
}
