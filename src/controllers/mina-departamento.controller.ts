import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Mina,
  Departamento,
} from '../models';
import {MinaRepository} from '../repositories';

export class MinaDepartamentoController {
  constructor(
    @repository(MinaRepository)
    public minaRepository: MinaRepository,
  ) { }

  @get('/minas/{id}/departamento', {
    responses: {
      '200': {
        description: 'Departamento belonging to Mina',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Departamento),
          },
        },
      },
    },
  })
  async getDepartamento(
    @param.path.number('id') id: typeof Mina.prototype.id,
  ): Promise<Departamento> {
    return this.minaRepository.departamento(id);
  }
}
