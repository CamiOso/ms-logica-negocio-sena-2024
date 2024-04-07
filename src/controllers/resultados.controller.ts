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
import {Resultados} from '../models';
import {ResultadosRepository} from '../repositories';

export class ResultadosController {
  constructor(
    @repository(ResultadosRepository)
    public resultadosRepository : ResultadosRepository,
  ) {}

  @post('/resultado')
  @response(200, {
    description: 'Resultados model instance',
    content: {'application/json': {schema: getModelSchemaRef(Resultados)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resultados, {
            title: 'NewResultados',
            exclude: ['id'],
          }),
        },
      },
    })
    resultados: Omit<Resultados, 'id'>,
  ): Promise<Resultados> {
    return this.resultadosRepository.create(resultados);
  }

  @get('/resultado/count')
  @response(200, {
    description: 'Resultados model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Resultados) where?: Where<Resultados>,
  ): Promise<Count> {
    return this.resultadosRepository.count(where);
  }

  @get('/resultado')
  @response(200, {
    description: 'Array of Resultados model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Resultados, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Resultados) filter?: Filter<Resultados>,
  ): Promise<Resultados[]> {
    return this.resultadosRepository.find(filter);
  }

  @patch('/resultado')
  @response(200, {
    description: 'Resultados PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resultados, {partial: true}),
        },
      },
    })
    resultados: Resultados,
    @param.where(Resultados) where?: Where<Resultados>,
  ): Promise<Count> {
    return this.resultadosRepository.updateAll(resultados, where);
  }

  @get('/resultado/{id}')
  @response(200, {
    description: 'Resultados model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Resultados, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Resultados, {exclude: 'where'}) filter?: FilterExcludingWhere<Resultados>
  ): Promise<Resultados> {
    return this.resultadosRepository.findById(id, filter);
  }

  @patch('/resultado/{id}')
  @response(204, {
    description: 'Resultados PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resultados, {partial: true}),
        },
      },
    })
    resultados: Resultados,
  ): Promise<void> {
    await this.resultadosRepository.updateById(id, resultados);
  }

  @put('/resultado/{id}')
  @response(204, {
    description: 'Resultados PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() resultados: Resultados,
  ): Promise<void> {
    await this.resultadosRepository.replaceById(id, resultados);
  }

  @del('/resultado/{id}')
  @response(204, {
    description: 'Resultados DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.resultadosRepository.deleteById(id);
  }
}
