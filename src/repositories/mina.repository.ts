import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Mina, MinaRelations, Departamento, Estado, EstadoMina} from '../models';
import {DepartamentoRepository} from './departamento.repository';
import {EstadoMinaRepository} from './estado-mina.repository';
import {EstadoRepository} from './estado.repository';

export class MinaRepository extends DefaultCrudRepository<
  Mina,
  typeof Mina.prototype.id,
  MinaRelations
> {

  public readonly departamento: BelongsToAccessor<Departamento, typeof Mina.prototype.id>;

  public readonly estados: HasManyThroughRepositoryFactory<Estado, typeof Estado.prototype.id,
          EstadoMina,
          typeof Mina.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('EstadoMinaRepository') protected estadoMinaRepositoryGetter: Getter<EstadoMinaRepository>, @repository.getter('EstadoRepository') protected estadoRepositoryGetter: Getter<EstadoRepository>,
  ) {
    super(Mina, dataSource);
    this.estados = this.createHasManyThroughRepositoryFactoryFor('estados', estadoRepositoryGetter, estadoMinaRepositoryGetter,);
    this.registerInclusionResolver('estados', this.estados.inclusionResolver);
    this.departamento = this.createBelongsToAccessorFor('departamento', departamentoRepositoryGetter,);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
  }
}
