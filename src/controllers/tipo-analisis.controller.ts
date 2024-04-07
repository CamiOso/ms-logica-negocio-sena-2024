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
import {TipoAnalisis} from '../models';
import {TipoAnalisisRepository} from '../repositories';

export class TipoAnalisisController {
  constructor(
    @repository(TipoAnalisisRepository)
    public tipoAnalisisRepository : TipoAnalisisRepository,
  ) {}

  @post('/tipo-analisis')
  @response(200, {
    description: 'TipoAnalisis model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoAnalisis)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoAnalisis, {
            title: 'NewTipoAnalisis',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoAnalisis: Omit<TipoAnalisis, 'id'>,
  ): Promise<TipoAnalisis> {
    return this.tipoAnalisisRepository.create(tipoAnalisis);
  }

  @get('/tipo-analisis/count')
  @response(200, {
    description: 'TipoAnalisis model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoAnalisis) where?: Where<TipoAnalisis>,
  ): Promise<Count> {
    return this.tipoAnalisisRepository.count(where);
  }

  @get('/tipo-analisis')
  @response(200, {
    description: 'Array of TipoAnalisis model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoAnalisis, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoAnalisis) filter?: Filter<TipoAnalisis>,
  ): Promise<TipoAnalisis[]> {
    return this.tipoAnalisisRepository.find(filter);
  }

  @patch('/tipo-analisis')
  @response(200, {
    description: 'TipoAnalisis PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoAnalisis, {partial: true}),
        },
      },
    })
    tipoAnalisis: TipoAnalisis,
    @param.where(TipoAnalisis) where?: Where<TipoAnalisis>,
  ): Promise<Count> {
    return this.tipoAnalisisRepository.updateAll(tipoAnalisis, where);
  }

  @get('/tipo-analisis/{id}')
  @response(200, {
    description: 'TipoAnalisis model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoAnalisis, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TipoAnalisis, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoAnalisis>
  ): Promise<TipoAnalisis> {
    return this.tipoAnalisisRepository.findById(id, filter);
  }

  @patch('/tipo-analisis/{id}')
  @response(204, {
    description: 'TipoAnalisis PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoAnalisis, {partial: true}),
        },
      },
    })
    tipoAnalisis: TipoAnalisis,
  ): Promise<void> {
    await this.tipoAnalisisRepository.updateById(id, tipoAnalisis);
  }

  @put('/tipo-analisis/{id}')
  @response(204, {
    description: 'TipoAnalisis PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tipoAnalisis: TipoAnalisis,
  ): Promise<void> {
    await this.tipoAnalisisRepository.replaceById(id, tipoAnalisis);
  }

  @del('/tipo-analisis/{id}')
  @response(204, {
    description: 'TipoAnalisis DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoAnalisisRepository.deleteById(id);
  }
}
