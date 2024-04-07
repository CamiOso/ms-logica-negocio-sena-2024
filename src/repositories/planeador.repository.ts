import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Planeador, PlaneadorRelations, Pozo, Diseno} from '../models';
import {DisenoRepository} from './diseno.repository';
import {PozoRepository} from './pozo.repository';

export class PlaneadorRepository extends DefaultCrudRepository<
  Planeador,
  typeof Planeador.prototype.id,
  PlaneadorRelations
> {

  public readonly pozos: HasManyThroughRepositoryFactory<Pozo, typeof Pozo.prototype.id,
          Diseno,
          typeof Planeador.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('DisenoRepository') protected disenoRepositoryGetter: Getter<DisenoRepository>, @repository.getter('PozoRepository') protected pozoRepositoryGetter: Getter<PozoRepository>,
  ) {
    super(Planeador, dataSource);
    this.pozos = this.createHasManyThroughRepositoryFactoryFor('pozos', pozoRepositoryGetter, disenoRepositoryGetter,);
    this.registerInclusionResolver('pozos', this.pozos.inclusionResolver);
  }
}
