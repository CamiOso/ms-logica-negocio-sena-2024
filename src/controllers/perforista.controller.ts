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
import {Perforista} from '../models';
import {PerforistaRepository} from '../repositories';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';
import {authenticate} from '@loopback/authentication';

export class PerforistaController {
  constructor(
    @repository(PerforistaRepository)
    public perforistaRepository : PerforistaRepository,
  ) {}

  @post('/perforista')
  @response(200, {
    description: 'Perforista model instance',
    content: {'application/json': {schema: getModelSchemaRef(Perforista)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perforista, {
            title: 'NewPerforista',
            exclude: ['id'],
          }),
        },
      },
    })
    perforista: Omit<Perforista, 'id'>,
  ): Promise<Perforista> {
    return this.perforistaRepository.create(perforista);
  }

  @get('/perforista/count')
  @response(200, {
    description: 'Perforista model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Perforista) where?: Where<Perforista>,
  ): Promise<Count> {
    return this.perforistaRepository.count(where);
  }


  @authenticate({
    strategy:'auth',
  options:[ConfiguracionSeguridad.menuPerforistasId,ConfiguracionSeguridad.listarAccion]})
  @get('/perforista')
  @response(200, {
    description: 'Array of Perforista model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Perforista, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Perforista) filter?: Filter<Perforista>,
  ): Promise<Perforista[]> {
    return this.perforistaRepository.find(filter);
  }

  @patch('/perforista')
  @response(200, {
    description: 'Perforista PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perforista, {partial: true}),
        },
      },
    })
    perforista: Perforista,
    @param.where(Perforista) where?: Where<Perforista>,
  ): Promise<Count> {
    return this.perforistaRepository.updateAll(perforista, where);
  }

  @get('/perforista/{id}')
  @response(200, {
    description: 'Perforista model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Perforista, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Perforista, {exclude: 'where'}) filter?: FilterExcludingWhere<Perforista>
  ): Promise<Perforista> {
    return this.perforistaRepository.findById(id, filter);
  }

  @patch('/perforista/{id}')
  @response(204, {
    description: 'Perforista PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Perforista, {partial: true}),
        },
      },
    })
    perforista: Perforista,
  ): Promise<void> {
    await this.perforistaRepository.updateById(id, perforista);
  }

  @put('/perforista/{id}')
  @response(204, {
    description: 'Perforista PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() perforista: Perforista,
  ): Promise<void> {
    await this.perforistaRepository.replaceById(id, perforista);
  }

  @del('/perforista/{id}')
  @response(204, {
    description: 'Perforista DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.perforistaRepository.deleteById(id);
  }
}
