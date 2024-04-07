import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Perforacion,
  Pozo,
} from '../models';
import {PerforacionRepository} from '../repositories';

export class PerforacionPozoController {
  constructor(
    @repository(PerforacionRepository)
    public perforacionRepository: PerforacionRepository,
  ) { }

  @get('/perforacions/{id}/pozo', {
    responses: {
      '200': {
        description: 'Pozo belonging to Perforacion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pozo),
          },
        },
      },
    },
  })
  async getPozo(
    @param.path.number('id') id: typeof Perforacion.prototype.id,
  ): Promise<Pozo> {
    return this.perforacionRepository.pozo(id);
  }
}
