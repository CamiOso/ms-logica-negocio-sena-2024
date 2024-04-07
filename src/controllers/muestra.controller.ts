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
import {Muestra} from '../models';
import {MuestraRepository} from '../repositories';
import {ConfiguracionSeguridad} from '../config/configuracion.seguridad';
import {authenticate} from '@loopback/authentication';

export class MuestraController {
  constructor(
    @repository(MuestraRepository)
    public muestraRepository : MuestraRepository,
  ) {}

  @post('/muestra')
  @response(200, {
    description: 'Muestra model instance',
    content: {'application/json': {schema: getModelSchemaRef(Muestra)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Muestra, {
            title: 'NewMuestra',
            exclude: ['id'],
          }),
        },
      },
    })
    muestra: Omit<Muestra, 'id'>,
  ): Promise<Muestra> {
    return this.muestraRepository.create(muestra);
  }

  @get('/muestra/count')
  @response(200, {
    description: 'Muestra model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Muestra) where?: Where<Muestra>,
  ): Promise<Count> {
    return this.muestraRepository.count(where);
  }



  @authenticate({
    strategy:'auth',
  options:[ConfiguracionSeguridad.menuMuestrasId,ConfiguracionSeguridad.listarAccion]})

  @get('/muestra')
  @response(200, {
    description: 'Array of Muestra model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Muestra, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Muestra) filter?: Filter<Muestra>,
  ): Promise<Muestra[]> {
    return this.muestraRepository.find(filter);
  }

  @patch('/muestra')
  @response(200, {
    description: 'Muestra PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Muestra, {partial: true}),
        },
      },
    })
    muestra: Muestra,
    @param.where(Muestra) where?: Where<Muestra>,
  ): Promise<Count> {
    return this.muestraRepository.updateAll(muestra, where);
  }

  @get('/muestra/{id}')
  @response(200, {
    description: 'Muestra model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Muestra, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Muestra, {exclude: 'where'}) filter?: FilterExcludingWhere<Muestra>
  ): Promise<Muestra> {
    return this.muestraRepository.findById(id, filter);
  }

  @patch('/muestra/{id}')
  @response(204, {
    description: 'Muestra PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Muestra, {partial: true}),
        },
      },
    })
    muestra: Muestra,
  ): Promise<void> {
    await this.muestraRepository.updateById(id, muestra);
  }

  @put('/muestra/{id}')
  @response(204, {
    description: 'Muestra PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() muestra: Muestra,
  ): Promise<void> {
    await this.muestraRepository.replaceById(id, muestra);
  }

  @del('/muestra/{id}')
  @response(204, {
    description: 'Muestra DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.muestraRepository.deleteById(id);
  }
}
