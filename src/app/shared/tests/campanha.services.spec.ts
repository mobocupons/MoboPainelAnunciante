import { of } from 'rxjs';
import {CampanhaService} from '../services/campanha.service'
import { BaseService } from '../services/base.service';

describe('CampanhaService', () => {
    const expectedRepos: any[] =
    [{ id: 337, name: 'mobo teste' }, { id: 1, name: 'anyone' }];
  
    let service: CampanhaService;
    let httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    let baseService: BaseService = new BaseService(httpClientSpy);
    httpClientSpy.post.and.returnValue(of((expectedRepos)));
    beforeEach(() => { service = new CampanhaService(baseService); });

    it('#getCampanhasAtivasPorAnunciante should return some value', () => {
        expect(service.getCampanhasAtivasPorAnunciante(337)).not.toBeNull();
    });
})