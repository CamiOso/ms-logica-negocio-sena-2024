import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Equipo, EquipoRelations, Perforista, PerforistaPerforacion} from '../models';
import {PerforistaPerforacionRepository} from './perforista-perforacion.repository';
import {PerforistaRepository} from './perforista.repository';

export class EquipoRepository extends DefaultCrudRepository<
  Equipo,
  typeof Equipo.prototype.id,
  EquipoRelations
> {

  public readonly perforistas: HasManyThroughRepositoryFactory<Perforista, typeof Perforista.prototype.id,
          PerforistaPerforacion,
          typeof Equipo.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PerforistaPerforacionRepository') protected perforistaPerforacionRepositoryGetter: Getter<PerforistaPerforacionRepository>, @repository.getter('PerforistaRepository') protected perforistaRepositoryGetter: Getter<PerforistaRepository>,
  ) {
    super(Equipo, dataSource);
    this.perforistas = this.createHasManyThroughRepositoryFactoryFor('perforistas', perforistaRepositoryGetter, perforistaPerforacionRepositoryGetter,);
    this.registerInclusionResolver('perforistas', this.perforistas.inclusionResolver);
  }
}
