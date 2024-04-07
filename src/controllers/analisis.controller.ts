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
import {Analisis} from '../models';
import {AnalisisRepository} from '../repositories';

export class AnalisisController {
  constructor(
    @repository(AnalisisRepository)
    public analisisRepository : AnalisisRepository,
  ) {}

  @post('/analisis')
  @response(200, {
    description: 'Analisis model instance',
    content: {'application/json': {schema: getModelSchemaRef(Analisis)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Analisis, {
            title: 'NewAnalisis',
            exclude: ['id'],
          }),
        },
      },
    })
    analisis: Omit<Analisis, 'id'>,
  ): Promise<Analisis> {
    return this.analisisRepository.create(analisis);
  }

  @get('/analisis/count')
  @response(200, {
    description: 'Analisis model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Analisis) where?: Where<Analisis>,
  ): Promise<Count> {
    return this.analisisRepository.count(where);
  }

  @get('/analisis')
  @response(200, {
    description: 'Array of Analisis model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Analisis, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Analisis) filter?: Filter<Analisis>,
  ): Promise<Analisis[]> {
    return this.analisisRepository.find(filter);
  }

  @patch('/analisis')
  @response(200, {
    description: 'Analisis PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Analisis, {partial: true}),
        },
      },
    })
    analisis: Analisis,
    @param.where(Analisis) where?: Where<Analisis>,
  ): Promise<Count> {
    return this.analisisRepository.updateAll(analisis, where);
  }

  @get('/analisis/{id}')
  @response(200, {
    description: 'Analisis model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Analisis, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Analisis, {exclude: 'where'}) filter?: FilterExcludingWhere<Analisis>
  ): Promise<Analisis> {
    return this.analisisRepository.findById(id, filter);
  }

  @patch('/analisis/{id}')
  @response(204, {
    description: 'Analisis PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Analisis, {partial: true}),
        },
      },
    })
    analisis: Analisis,
  ): Promise<void> {
    await this.analisisRepository.updateById(id, analisis);
  }

  @put('/analisis/{id}')
  @response(204, {
    description: 'Analisis PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() analisis: Analisis,
  ): Promise<void> {
    await this.analisisRepository.replaceById(id, analisis);
  }

  @del('/analisis/{id}')
  @response(204, {
    description: 'Analisis DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.analisisRepository.deleteById(id);
  }
}
