import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Analisis,
  TipoAnalisis,
} from '../models';
import {AnalisisRepository} from '../repositories';

export class AnalisisTipoAnalisisController {
  constructor(
    @repository(AnalisisRepository)
    public analisisRepository: AnalisisRepository,
  ) { }

  @get('/analises/{id}/tipo-analisis', {
    responses: {
      '200': {
        description: 'TipoAnalisis belonging to Analisis',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TipoAnalisis),
          },
        },
      },
    },
  })
  async getTipoAnalisis(
    @param.path.number('id') id: typeof Analisis.prototype.id,
  ): Promise<TipoAnalisis> {
    return this.analisisRepository.tipoAnalisis(id);
  }
}
