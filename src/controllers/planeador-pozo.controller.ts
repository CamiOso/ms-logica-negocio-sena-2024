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
Planeador,
Diseno,
Pozo,
} from '../models';
import {PlaneadorRepository} from '../repositories';

export class PlaneadorPozoController {
  constructor(
    @repository(PlaneadorRepository) protected planeadorRepository: PlaneadorRepository,
  ) { }

  @get('/planeadors/{id}/pozos', {
    responses: {
      '200': {
        description: 'Array of Planeador has many Pozo through Diseno',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pozo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pozo>,
  ): Promise<Pozo[]> {
    return this.planeadorRepository.pozos(id).find(filter);
  }

  @post('/planeadors/{id}/pozos', {
    responses: {
      '200': {
        description: 'create a Pozo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pozo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Planeador.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pozo, {
            title: 'NewPozoInPlaneador',
            exclude: ['id'],
          }),
        },
      },
    }) pozo: Omit<Pozo, 'id'>,
  ): Promise<Pozo> {
    return this.planeadorRepository.pozos(id).create(pozo);
  }

  @patch('/planeadors/{id}/pozos', {
    responses: {
      '200': {
        description: 'Planeador.Pozo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pozo, {partial: true}),
        },
      },
    })
    pozo: Partial<Pozo>,
    @param.query.object('where', getWhereSchemaFor(Pozo)) where?: Where<Pozo>,
  ): Promise<Count> {
    return this.planeadorRepository.pozos(id).patch(pozo, where);
  }

  @del('/planeadors/{id}/pozos', {
    responses: {
      '200': {
        description: 'Planeador.Pozo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pozo)) where?: Where<Pozo>,
  ): Promise<Count> {
    return this.planeadorRepository.pozos(id).delete(where);
  }
}
