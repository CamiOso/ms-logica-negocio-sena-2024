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
Roca,
LitologiaRoca,
Litologia,
} from '../models';
import {RocaRepository} from '../repositories';

export class RocaLitologiaController {
  constructor(
    @repository(RocaRepository) protected rocaRepository: RocaRepository,
  ) { }

  @get('/rocas/{id}/litologias', {
    responses: {
      '200': {
        description: 'Array of Roca has many Litologia through LitologiaRoca',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Litologia)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Litologia>,
  ): Promise<Litologia[]> {
    return this.rocaRepository.litologias(id).find(filter);
  }

  @post('/rocas/{id}/litologias', {
    responses: {
      '200': {
        description: 'create a Litologia model instance',
        content: {'application/json': {schema: getModelSchemaRef(Litologia)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Roca.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Litologia, {
            title: 'NewLitologiaInRoca',
            exclude: ['id'],
          }),
        },
      },
    }) litologia: Omit<Litologia, 'id'>,
  ): Promise<Litologia> {
    return this.rocaRepository.litologias(id).create(litologia);
  }

  @patch('/rocas/{id}/litologias', {
    responses: {
      '200': {
        description: 'Roca.Litologia PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Litologia, {partial: true}),
        },
      },
    })
    litologia: Partial<Litologia>,
    @param.query.object('where', getWhereSchemaFor(Litologia)) where?: Where<Litologia>,
  ): Promise<Count> {
    return this.rocaRepository.litologias(id).patch(litologia, where);
  }

  @del('/rocas/{id}/litologias', {
    responses: {
      '200': {
        description: 'Roca.Litologia DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Litologia)) where?: Where<Litologia>,
  ): Promise<Count> {
    return this.rocaRepository.litologias(id).delete(where);
  }
}
