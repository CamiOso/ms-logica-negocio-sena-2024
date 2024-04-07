import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Mineral, MineralRelations, Roca, RocaMineral} from '../models';
import {RocaMineralRepository} from './roca-mineral.repository';
import {RocaRepository} from './roca.repository';

export class MineralRepository extends DefaultCrudRepository<
  Mineral,
  typeof Mineral.prototype.id,
  MineralRelations
> {

  public readonly rocas: HasManyThroughRepositoryFactory<Roca, typeof Roca.prototype.id,
          RocaMineral,
          typeof Mineral.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('RocaMineralRepository') protected rocaMineralRepositoryGetter: Getter<RocaMineralRepository>, @repository.getter('RocaRepository') protected rocaRepositoryGetter: Getter<RocaRepository>,
  ) {
    super(Mineral, dataSource);
    this.rocas = this.createHasManyThroughRepositoryFactoryFor('rocas', rocaRepositoryGetter, rocaMineralRepositoryGetter,);
    this.registerInclusionResolver('rocas', this.rocas.inclusionResolver);
  }
}
