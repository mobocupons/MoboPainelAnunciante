import { of } from 'rxjs';
import {AnuncianteService} from '../services/anunciante.service'
import { BaseService } from '../services/base.service';

describe('AnuncianteService', () => {
    const expectedRepos: any[] =
    [{ id: 337, name: 'mobo teste' }, { id: 1, name: 'anyone' }];
  
    let service: AnuncianteService;
    let httpClientSpy = jasmine.createSpyObj('HttpClient', ['get','post']);
    let baseService: BaseService = new BaseService(httpClientSpy);
    httpClientSpy.get.and.returnValue(of((expectedRepos)));
    httpClientSpy.post.and.returnValue(of((expectedRepos)));
    beforeEach(() => { service = new AnuncianteService(baseService); });

    it('#getAnunciante should return some value', () => {
        expect(service.getAnunciante(337)).not.toBeNull();
    });

    it('#changeStatus should return some value', () => {
        expect(service.changeStatus(2,337)).not.toBeNull();
    });
})