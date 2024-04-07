import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Roca,
  TipoRoca,
} from '../models';
import {RocaRepository} from '../repositories';

export class RocaTipoRocaController {
  constructor(
    @repository(RocaRepository)
    public rocaRepository: RocaRepository,
  ) { }

  @get('/rocas/{id}/tipo-roca', {
    responses: {
      '200': {
        description: 'TipoRoca belonging to Roca',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TipoRoca),
          },
        },
      },
    },
  })
  async getTipoRoca(
    @param.path.number('id') id: typeof Roca.prototype.id,
  ): Promise<TipoRoca> {
    return this.rocaRepository.tipoRoca(id);
  }
}
