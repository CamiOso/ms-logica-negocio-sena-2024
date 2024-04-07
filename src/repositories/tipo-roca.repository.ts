import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {TipoRoca, TipoRocaRelations, Roca} from '../models';
import {RocaRepository} from './roca.repository';

export class TipoRocaRepository extends DefaultCrudRepository<
  TipoRoca,
  typeof TipoRoca.prototype.id,
  TipoRocaRelations
> {

  public readonly rocas: HasManyRepositoryFactory<Roca, typeof TipoRoca.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('RocaRepository') protected rocaRepositoryGetter: Getter<RocaRepository>,
  ) {
    super(TipoRoca, dataSource);
    this.rocas = this.createHasManyRepositoryFactoryFor('rocas', rocaRepositoryGetter,);
    this.registerInclusionResolver('rocas', this.rocas.inclusionResolver);
  }
}
