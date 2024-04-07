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
  Muestra,
} from '../models';
import {AnalisisRepository} from '../repositories';

export class AnalisisMuestraController {
  constructor(
    @repository(AnalisisRepository)
    public analisisRepository: AnalisisRepository,
  ) { }

  @get('/analises/{id}/muestra', {
    responses: {
      '200': {
        description: 'Muestra belonging to Analisis',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Muestra),
          },
        },
      },
    },
  })
  async getMuestra(
    @param.path.number('id') id: typeof Analisis.prototype.id,
  ): Promise<Muestra> {
    return this.analisisRepository.muestra(id);
  }
}
