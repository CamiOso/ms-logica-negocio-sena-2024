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
Pozo,
Diseno,
Planeador,
} from '../models';
import {PozoRepository} from '../repositories';

export class PozoPlaneadorController {
  constructor(
    @repository(PozoRepository) protected pozoRepository: PozoRepository,
  ) { }

  @get('/pozos/{id}/planeadors', {
    responses: {
      '200': {
        description: 'Array of Pozo has many Planeador through Diseno',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Planeador)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Planeador>,
  ): Promise<Planeador[]> {
    return this.pozoRepository.planeadores(id).find(filter);
  }

  @post('/pozos/{id}/planeadors', {
    responses: {
      '200': {
        description: 'create a Planeador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Planeador)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Pozo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planeador, {
            title: 'NewPlaneadorInPozo',
            exclude: ['id'],
          }),
        },
      },
    }) planeador: Omit<Planeador, 'id'>,
  ): Promise<Planeador> {
    return this.pozoRepository.planeadores(id).create(planeador);
  }

  @patch('/pozos/{id}/planeadors', {
    responses: {
      '200': {
        description: 'Pozo.Planeador PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planeador, {partial: true}),
        },
      },
    })
    planeador: Partial<Planeador>,
    @param.query.object('where', getWhereSchemaFor(Planeador)) where?: Where<Planeador>,
  ): Promise<Count> {
    return this.pozoRepository.planeadores(id).patch(planeador, where);
  }

  @del('/pozos/{id}/planeadors', {
    responses: {
      '200': {
        description: 'Pozo.Planeador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Planeador)) where?: Where<Planeador>,
  ): Promise<Count> {
    return this.pozoRepository.planeadores(id).delete(where);
  }
}
