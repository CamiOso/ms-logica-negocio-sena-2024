import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Roca, RocaRelations, TipoRoca, Mineral, RocaMineral, Litologia, LitologiaRoca} from '../models';
import {TipoRocaRepository} from './tipo-roca.repository';
import {RocaMineralRepository} from './roca-mineral.repository';
import {MineralRepository} from './mineral.repository';
import {LitologiaRocaRepository} from './litologia-roca.repository';
import {LitologiaRepository} from './litologia.repository';

export class RocaRepository extends DefaultCrudRepository<
  Roca,
  typeof Roca.prototype.id,
  RocaRelations
> {

  public readonly tipoRoca: BelongsToAccessor<TipoRoca, typeof Roca.prototype.id>;

  public readonly minerales: HasManyThroughRepositoryFactory<Mineral, typeof Mineral.prototype.id,
          RocaMineral,
          typeof Roca.prototype.id
        >;

  public readonly litologias: HasManyThroughRepositoryFactory<Litologia, typeof Litologia.prototype.id,
          LitologiaRoca,
          typeof Roca.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('TipoRocaRepository') protected tipoRocaRepositoryGetter: Getter<TipoRocaRepository>, @repository.getter('RocaMineralRepository') protected rocaMineralRepositoryGetter: Getter<RocaMineralRepository>, @repository.getter('MineralRepository') protected mineralRepositoryGetter: Getter<MineralRepository>, @repository.getter('LitologiaRocaRepository') protected litologiaRocaRepositoryGetter: Getter<LitologiaRocaRepository>, @repository.getter('LitologiaRepository') protected litologiaRepositoryGetter: Getter<LitologiaRepository>,
  ) {
    super(Roca, dataSource);
    this.litologias = this.createHasManyThroughRepositoryFactoryFor('litologias', litologiaRepositoryGetter, litologiaRocaRepositoryGetter,);
    this.registerInclusionResolver('litologias', this.litologias.inclusionResolver);
    this.minerales = this.createHasManyThroughRepositoryFactoryFor('minerales', mineralRepositoryGetter, rocaMineralRepositoryGetter,);
    this.registerInclusionResolver('minerales', this.minerales.inclusionResolver);
    this.tipoRoca = this.createBelongsToAccessorFor('tipoRoca', tipoRocaRepositoryGetter,);
    this.registerInclusionResolver('tipoRoca', this.tipoRoca.inclusionResolver);
  }
}
