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
Litologia,
LitologiaRoca,
Roca,
} from '../models';
import {LitologiaRepository} from '../repositories';

export class LitologiaRocaController {
  constructor(
    @repository(LitologiaRepository) protected litologiaRepository: LitologiaRepository,
  ) { }

  @get('/litologias/{id}/rocas', {
    responses: {
      '200': {
        description: 'Array of Litologia has many Roca through LitologiaRoca',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Roca)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Roca>,
  ): Promise<Roca[]> {
    return this.litologiaRepository.rocas(id).find(filter);
  }

  @post('/litologias/{id}/rocas', {
    responses: {
      '200': {
        description: 'create a Roca model instance',
        content: {'application/json': {schema: getModelSchemaRef(Roca)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Litologia.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roca, {
            title: 'NewRocaInLitologia',
            exclude: ['id'],
          }),
        },
      },
    }) roca: Omit<Roca, 'id'>,
  ): Promise<Roca> {
    return this.litologiaRepository.rocas(id).create(roca);
  }

  @patch('/litologias/{id}/rocas', {
    responses: {
      '200': {
        description: 'Litologia.Roca PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roca, {partial: true}),
        },
      },
    })
    roca: Partial<Roca>,
    @param.query.object('where', getWhereSchemaFor(Roca)) where?: Where<Roca>,
  ): Promise<Count> {
    return this.litologiaRepository.rocas(id).patch(roca, where);
  }

  @del('/litologias/{id}/rocas', {
    responses: {
      '200': {
        description: 'Litologia.Roca DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Roca)) where?: Where<Roca>,
  ): Promise<Count> {
    return this.litologiaRepository.rocas(id).delete(where);
  }
}
