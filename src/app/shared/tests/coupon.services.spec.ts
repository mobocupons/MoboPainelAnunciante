import { of } from 'rxjs';
import {CouponService} from '../services/coupon.service'
import { BaseService } from '../services/base.service';

describe('CouponService', () => {
    const expectedRepos: any[] =
    [{ id: 337, name: 'mobo teste' }, { id: 1, name: 'anyone' }];
  
    let service: CouponService;
    let httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    let baseService: BaseService = new BaseService(httpClientSpy);
    httpClientSpy.post.and.returnValue(of((expectedRepos)));
    beforeEach(() => { service = new CouponService(baseService); });

    it('#postValidateCoupon should return some value', () => {
        expect(service.postValidateCoupon(337,2,[''])).not.toBeNull();
    });
})