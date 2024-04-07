import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Estado, EstadoRelations, Mina, EstadoMina} from '../models';
import {EstadoMinaRepository} from './estado-mina.repository';
import {MinaRepository} from './mina.repository';

export class EstadoRepository extends DefaultCrudRepository<
  Estado,
  typeof Estado.prototype.id,
  EstadoRelations
> {

  public readonly minas: HasManyThroughRepositoryFactory<Mina, typeof Mina.prototype.id,
          EstadoMina,
          typeof Estado.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('EstadoMinaRepository') protected estadoMinaRepositoryGetter: Getter<EstadoMinaRepository>, @repository.getter('MinaRepository') protected minaRepositoryGetter: Getter<MinaRepository>,
  ) {
    super(Estado, dataSource);
    this.minas = this.createHasManyThroughRepositoryFactoryFor('minas', minaRepositoryGetter, estadoMinaRepositoryGetter,);
    this.registerInclusionResolver('minas', this.minas.inclusionResolver);
  }
}
