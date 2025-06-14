import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthLoginService } from '../../../services/auth.login.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let spyAuthLoginService: jasmine.SpyObj<AuthLoginService>

  beforeEach(async () => {

    spyAuthLoginService = jasmine.createSpyObj('AuthLoginService', [''])

    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {provide: AuthLoginService, useValue: spyAuthLoginService},

        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({}),
            snapshot: {
              paramMap: {
                get: (key: string) => null,
              },
                queryParamMap: {
                get: (key: string) => null,
              }
            }
          }
        }

      ],
      imports: [FooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  


});
