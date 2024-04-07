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
import {Laboratorio} from '../models';
import {LaboratorioRepository} from '../repositories';

export class LaboratorioController {
  constructor(
    @repository(LaboratorioRepository)
    public laboratorioRepository : LaboratorioRepository,
  ) {}

  @post('/laboratorio')
  @response(200, {
    description: 'Laboratorio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Laboratorio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Laboratorio, {
            title: 'NewLaboratorio',
            exclude: ['id'],
          }),
        },
      },
    })
    laboratorio: Omit<Laboratorio, 'id'>,
  ): Promise<Laboratorio> {
    return this.laboratorioRepository.create(laboratorio);
  }

  @get('/laboratorio/count')
  @response(200, {
    description: 'Laboratorio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Laboratorio) where?: Where<Laboratorio>,
  ): Promise<Count> {
    return this.laboratorioRepository.count(where);
  }

  @get('/laboratorio')
  @response(200, {
    description: 'Array of Laboratorio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Laboratorio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Laboratorio) filter?: Filter<Laboratorio>,
  ): Promise<Laboratorio[]> {
    return this.laboratorioRepository.find(filter);
  }

  @patch('/laboratorio')
  @response(200, {
    description: 'Laboratorio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Laboratorio, {partial: true}),
        },
      },
    })
    laboratorio: Laboratorio,
    @param.where(Laboratorio) where?: Where<Laboratorio>,
  ): Promise<Count> {
    return this.laboratorioRepository.updateAll(laboratorio, where);
  }

  @get('/laboratorio/{id}')
  @response(200, {
    description: 'Laboratorio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Laboratorio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Laboratorio, {exclude: 'where'}) filter?: FilterExcludingWhere<Laboratorio>
  ): Promise<Laboratorio> {
    return this.laboratorioRepository.findById(id, filter);
  }

  @patch('/laboratorio/{id}')
  @response(204, {
    description: 'Laboratorio PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Laboratorio, {partial: true}),
        },
      },
    })
    laboratorio: Laboratorio,
  ): Promise<void> {
    await this.laboratorioRepository.updateById(id, laboratorio);
  }

  @put('/laboratorio/{id}')
  @response(204, {
    description: 'Laboratorio PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() laboratorio: Laboratorio,
  ): Promise<void> {
    await this.laboratorioRepository.replaceById(id, laboratorio);
  }

  @del('/laboratorio/{id}')
  @response(204, {
    description: 'Laboratorio DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.laboratorioRepository.deleteById(id);
  }
}
