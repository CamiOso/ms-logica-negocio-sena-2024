import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Perforista,
PerforistaPerforacion,
Perforacion,
} from '../models';
import {PerforistaRepository} from '../repositories';

export class PerforistaPerforacionController {
  constructor(
    @repository(PerforistaRepository) protected perforistaRepository: PerforistaRepository,
  ) { }

  @get('/perforistas/{id}/perforacions', {
    responses: {
      '200': {
        description: 'Array of Perforista has many Perforacion through PerforistaPerforacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Perforacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Perforacion>,
  ): Promise<Perforacion[]> {
    return this.perforistaRepository.perforaciones(id).find(filter);
  }

  @post('/perforistas/{id}/perforacions', {
    responses: {
      '200': {
        description: 'create a Perforacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Perforacion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Perforista.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perforacion, {
            title: 'NewPerforacionInPerforista',
            exclude: ['id'],
          }),
        },
      },
    }) perforacion: Omit<Perforacion, 'id'>,
  ): Promise<Perforacion> {
    return this.perforistaRepository.perforaciones(id).create(perforacion);
  }

  @patch('/perforistas/{id}/perforacions', {
    responses: {
      '200': {
        description: 'Perforista.Perforacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perforacion, {partial: true}),
        },
      },
    })
    perforacion: Partial<Perforacion>,
    @param.query.object('where', getWhereSchemaFor(Perforacion)) where?: Where<Perforacion>,
  ): Promise<Count> {
    return this.perforistaRepository.perforaciones(id).patch(perforacion, where);
  }

  @del('/perforistas/{id}/perforacions', {
    responses: {
      '200': {
        description: 'Perforista.Perforacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Perforacion)) where?: Where<Perforacion>,
  ): Promise<Count> {
    return this.perforistaRepository.perforaciones(id).delete(where);
  }
}
