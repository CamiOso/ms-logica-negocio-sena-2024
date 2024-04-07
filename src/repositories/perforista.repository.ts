import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Perforista, PerforistaRelations, Equipo, EquipoPerforista, Perforacion, PerforistaPerforacion} from '../models';
import {EquipoPerforistaRepository} from './equipo-perforista.repository';
import {EquipoRepository} from './equipo.repository';
import {PerforistaPerforacionRepository} from './perforista-perforacion.repository';
import {PerforacionRepository} from './perforacion.repository';

export class PerforistaRepository extends DefaultCrudRepository<
  Perforista,
  typeof Perforista.prototype.id,
  PerforistaRelations
> {

  public readonly equipos: HasManyThroughRepositoryFactory<Equipo, typeof Equipo.prototype.id,
          EquipoPerforista,
          typeof Perforista.prototype.id
        >;

  public readonly perforaciones: HasManyThroughRepositoryFactory<Perforacion, typeof Perforacion.prototype.id,
          PerforistaPerforacion,
          typeof Perforista.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('EquipoPerforistaRepository') protected equipoPerforistaRepositoryGetter: Getter<EquipoPerforistaRepository>, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>, @repository.getter('PerforistaPerforacionRepository') protected perforistaPerforacionRepositoryGetter: Getter<PerforistaPerforacionRepository>, @repository.getter('PerforacionRepository') protected perforacionRepositoryGetter: Getter<PerforacionRepository>,
  ) {
    super(Perforista, dataSource);
    this.perforaciones = this.createHasManyThroughRepositoryFactoryFor('perforaciones', perforacionRepositoryGetter, perforistaPerforacionRepositoryGetter,);
    this.registerInclusionResolver('perforaciones', this.perforaciones.inclusionResolver);
    this.equipos = this.createHasManyThroughRepositoryFactoryFor('equipos', equipoRepositoryGetter, equipoPerforistaRepositoryGetter,);
    this.registerInclusionResolver('equipos', this.equipos.inclusionResolver);
  }
}
