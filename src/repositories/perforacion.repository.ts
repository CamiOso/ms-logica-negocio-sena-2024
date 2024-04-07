import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Perforacion, PerforacionRelations, Pozo, Perforista, PerforistaPerforacion} from '../models';
import {PozoRepository} from './pozo.repository';
import {PerforistaPerforacionRepository} from './perforista-perforacion.repository';
import {PerforistaRepository} from './perforista.repository';

export class PerforacionRepository extends DefaultCrudRepository<
  Perforacion,
  typeof Perforacion.prototype.id,
  PerforacionRelations
> {

  public readonly pozo: BelongsToAccessor<Pozo, typeof Perforacion.prototype.id>;

  public readonly perforistas: HasManyThroughRepositoryFactory<Perforista, typeof Perforista.prototype.id,
          PerforistaPerforacion,
          typeof Perforacion.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PozoRepository') protected pozoRepositoryGetter: Getter<PozoRepository>, @repository.getter('PerforistaPerforacionRepository') protected perforistaPerforacionRepositoryGetter: Getter<PerforistaPerforacionRepository>, @repository.getter('PerforistaRepository') protected perforistaRepositoryGetter: Getter<PerforistaRepository>,
  ) {
    super(Perforacion, dataSource);
    this.perforistas = this.createHasManyThroughRepositoryFactoryFor('perforistas', perforistaRepositoryGetter, perforistaPerforacionRepositoryGetter,);
    this.registerInclusionResolver('perforistas', this.perforistas.inclusionResolver);
    this.pozo = this.createBelongsToAccessorFor('pozo', pozoRepositoryGetter,);
    this.registerInclusionResolver('pozo', this.pozo.inclusionResolver);
  }
}
