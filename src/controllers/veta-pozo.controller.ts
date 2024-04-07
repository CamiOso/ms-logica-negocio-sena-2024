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
Veta,
PozoVeta,
Pozo,
} from '../models';
import {VetaRepository} from '../repositories';

export class VetaPozoController {
  constructor(
    @repository(VetaRepository) protected vetaRepository: VetaRepository,
  ) { }

  @get('/vetas/{id}/pozos', {
    responses: {
      '200': {
        description: 'Array of Veta has many Pozo through PozoVeta',
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
    return this.vetaRepository.pozos(id).find(filter);
  }

  @post('/vetas/{id}/pozos', {
    responses: {
      '200': {
        description: 'create a Pozo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pozo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Veta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pozo, {
            title: 'NewPozoInVeta',
            exclude: ['id'],
          }),
        },
      },
    }) pozo: Omit<Pozo, 'id'>,
  ): Promise<Pozo> {
    return this.vetaRepository.pozos(id).create(pozo);
  }

  @patch('/vetas/{id}/pozos', {
    responses: {
      '200': {
        description: 'Veta.Pozo PATCH success count',
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
    return this.vetaRepository.pozos(id).patch(pozo, where);
  }

  @del('/vetas/{id}/pozos', {
    responses: {
      '200': {
        description: 'Veta.Pozo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pozo)) where?: Where<Pozo>,
  ): Promise<Count> {
    return this.vetaRepository.pozos(id).delete(where);
  }
}
