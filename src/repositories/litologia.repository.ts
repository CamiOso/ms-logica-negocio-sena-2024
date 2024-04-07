import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Litologia, LitologiaRelations, Roca, LitologiaRoca} from '../models';
import {LitologiaRocaRepository} from './litologia-roca.repository';
import {RocaRepository} from './roca.repository';

export class LitologiaRepository extends DefaultCrudRepository<
  Litologia,
  typeof Litologia.prototype.id,
  LitologiaRelations
> {

  public readonly rocas: HasManyThroughRepositoryFactory<Roca, typeof Roca.prototype.id,
          LitologiaRoca,
          typeof Litologia.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('LitologiaRocaRepository') protected litologiaRocaRepositoryGetter: Getter<LitologiaRocaRepository>, @repository.getter('RocaRepository') protected rocaRepositoryGetter: Getter<RocaRepository>,
  ) {
    super(Litologia, dataSource);
    this.rocas = this.createHasManyThroughRepositoryFactoryFor('rocas', rocaRepositoryGetter, litologiaRocaRepositoryGetter,);
    this.registerInclusionResolver('rocas', this.rocas.inclusionResolver);
  }
}
