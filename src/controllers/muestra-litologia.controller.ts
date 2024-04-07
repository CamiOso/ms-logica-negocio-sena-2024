import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Muestra,
  Litologia,
} from '../models';
import {MuestraRepository} from '../repositories';

export class MuestraLitologiaController {
  constructor(
    @repository(MuestraRepository)
    public muestraRepository: MuestraRepository,
  ) { }

  @get('/muestras/{id}/litologia', {
    responses: {
      '200': {
        description: 'Litologia belonging to Muestra',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Litologia),
          },
        },
      },
    },
  })
  async getLitologia(
    @param.path.number('id') id: typeof Muestra.prototype.id,
  ): Promise<Litologia> {
    return this.muestraRepository.litologia(id);
  }
}
