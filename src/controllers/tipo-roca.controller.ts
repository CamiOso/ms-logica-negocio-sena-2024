import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {TipoRoca} from '../models';
import {TipoRocaRepository} from '../repositories';

export class TipoRocaController {
  constructor(
    @repository(TipoRocaRepository)
    public tipoRocaRepository : TipoRocaRepository,
  ) {}

  @post('/tipo-roca')
  @response(200, {
    description: 'TipoRoca model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoRoca)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoRoca, {
            title: 'NewTipoRoca',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoRoca: Omit<TipoRoca, 'id'>,
  ): Promise<TipoRoca> {
    return this.tipoRocaRepository.create(tipoRoca);
  }

  @get('/tipo-roca/count')
  @response(200, {
    description: 'TipoRoca model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoRoca) where?: Where<TipoRoca>,
  ): Promise<Count> {
    return this.tipoRocaRepository.count(where);
  }

  @get('/tipo-roca')
  @response(200, {
    description: 'Array of TipoRoca model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoRoca, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoRoca) filter?: Filter<TipoRoca>,
  ): Promise<TipoRoca[]> {
    return this.tipoRocaRepository.find(filter);
  }

  @patch('/tipo-roca')
  @response(200, {
    description: 'TipoRoca PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoRoca, {partial: true}),
        },
      },
    })
    tipoRoca: TipoRoca,
    @param.where(TipoRoca) where?: Where<TipoRoca>,
  ): Promise<Count> {
    return this.tipoRocaRepository.updateAll(tipoRoca, where);
  }

  @get('/tipo-roca/{id}')
  @response(200, {
    description: 'TipoRoca model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoRoca, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TipoRoca, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoRoca>
  ): Promise<TipoRoca> {
    return this.tipoRocaRepository.findById(id, filter);
  }

  @patch('/tipo-roca/{id}')
  @response(204, {
    description: 'TipoRoca PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoRoca, {partial: true}),
        },
      },
    })
    tipoRoca: TipoRoca,
  ): Promise<void> {
    await this.tipoRocaRepository.updateById(id, tipoRoca);
  }

  @put('/tipo-roca/{id}')
  @response(204, {
    description: 'TipoRoca PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tipoRoca: TipoRoca,
  ): Promise<void> {
    await this.tipoRocaRepository.replaceById(id, tipoRoca);
  }

  @del('/tipo-roca/{id}')
  @response(204, {
    description: 'TipoRoca DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoRocaRepository.deleteById(id);
  }
}
