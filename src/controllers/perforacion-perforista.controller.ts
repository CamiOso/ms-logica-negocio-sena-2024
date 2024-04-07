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
Perforacion,
PerforistaPerforacion,
Perforista,
} from '../models';
import {PerforacionRepository} from '../repositories';

export class PerforacionPerforistaController {
  constructor(
    @repository(PerforacionRepository) protected perforacionRepository: PerforacionRepository,
  ) { }

  @get('/perforacions/{id}/perforistas', {
    responses: {
      '200': {
        description: 'Array of Perforacion has many Perforista through PerforistaPerforacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Perforista)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Perforista>,
  ): Promise<Perforista[]> {
    return this.perforacionRepository.perforistas(id).find(filter);
  }

  @post('/perforacions/{id}/perforistas', {
    responses: {
      '200': {
        description: 'create a Perforista model instance',
        content: {'application/json': {schema: getModelSchemaRef(Perforista)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Perforacion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perforista, {
            title: 'NewPerforistaInPerforacion',
            exclude: ['id'],
          }),
        },
      },
    }) perforista: Omit<Perforista, 'id'>,
  ): Promise<Perforista> {
    return this.perforacionRepository.perforistas(id).create(perforista);
  }

  @patch('/perforacions/{id}/perforistas', {
    responses: {
      '200': {
        description: 'Perforacion.Perforista PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perforista, {partial: true}),
        },
      },
    })
    perforista: Partial<Perforista>,
    @param.query.object('where', getWhereSchemaFor(Perforista)) where?: Where<Perforista>,
  ): Promise<Count> {
    return this.perforacionRepository.perforistas(id).patch(perforista, where);
  }

  @del('/perforacions/{id}/perforistas', {
    responses: {
      '200': {
        description: 'Perforacion.Perforista DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Perforista)) where?: Where<Perforista>,
  ): Promise<Count> {
    return this.perforacionRepository.perforistas(id).delete(where);
  }
}
