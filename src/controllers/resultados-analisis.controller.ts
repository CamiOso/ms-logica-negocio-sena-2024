import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Resultados,
  Analisis,
} from '../models';
import {ResultadosRepository} from '../repositories';

export class ResultadosAnalisisController {
  constructor(
    @repository(ResultadosRepository)
    public resultadosRepository: ResultadosRepository,
  ) { }

  @get('/resultados/{id}/analisis', {
    responses: {
      '200': {
        description: 'Analisis belonging to Resultados',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Analisis),
          },
        },
      },
    },
  })
  async getAnalisis(
    @param.path.number('id') id: typeof Resultados.prototype.id,
  ): Promise<Analisis> {
    return this.resultadosRepository.analisis(id);
  }
}
