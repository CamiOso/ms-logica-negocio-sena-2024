import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Pozo, PozoRelations, Planeador, Diseno, Veta, PozoVeta} from '../models';
import {DisenoRepository} from './diseno.repository';
import {PlaneadorRepository} from './planeador.repository';
import {PozoVetaRepository} from './pozo-veta.repository';
import {VetaRepository} from './veta.repository';

export class PozoRepository extends DefaultCrudRepository<
  Pozo,
  typeof Pozo.prototype.id,
  PozoRelations
> {

  public readonly planeadores: HasManyThroughRepositoryFactory<Planeador, typeof Planeador.prototype.id,
          Diseno,
          typeof Pozo.prototype.id
        >;

  public readonly vetas: HasManyThroughRepositoryFactory<Veta, typeof Veta.prototype.id,
          PozoVeta,
          typeof Pozo.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('DisenoRepository') protected disenoRepositoryGetter: Getter<DisenoRepository>, @repository.getter('PlaneadorRepository') protected planeadorRepositoryGetter: Getter<PlaneadorRepository>, @repository.getter('PozoVetaRepository') protected pozoVetaRepositoryGetter: Getter<PozoVetaRepository>, @repository.getter('VetaRepository') protected vetaRepositoryGetter: Getter<VetaRepository>,
  ) {
    super(Pozo, dataSource);
    this.vetas = this.createHasManyThroughRepositoryFactoryFor('vetas', vetaRepositoryGetter, pozoVetaRepositoryGetter,);
    this.registerInclusionResolver('vetas', this.vetas.inclusionResolver);
    this.planeadores = this.createHasManyThroughRepositoryFactoryFor('planeadores', planeadorRepositoryGetter, disenoRepositoryGetter,);
    this.registerInclusionResolver('planeadores', this.planeadores.inclusionResolver);
  }
}
