import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Veta, VetaRelations, Pozo, PozoVeta} from '../models';
import {PozoVetaRepository} from './pozo-veta.repository';
import {PozoRepository} from './pozo.repository';

export class VetaRepository extends DefaultCrudRepository<
  Veta,
  typeof Veta.prototype.id,
  VetaRelations
> {

  public readonly pozos: HasManyThroughRepositoryFactory<Pozo, typeof Pozo.prototype.id,
          PozoVeta,
          typeof Veta.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PozoVetaRepository') protected pozoVetaRepositoryGetter: Getter<PozoVetaRepository>, @repository.getter('PozoRepository') protected pozoRepositoryGetter: Getter<PozoRepository>,
  ) {
    super(Veta, dataSource);
    this.pozos = this.createHasManyThroughRepositoryFactoryFor('pozos', pozoRepositoryGetter, pozoVetaRepositoryGetter,);
    this.registerInclusionResolver('pozos', this.pozos.inclusionResolver);
  }
}
