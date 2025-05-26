import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const config: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {
    transports: ['websocket'],
    autoConnect: false
  },
} 

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        importProvidersFrom(SocketIoModule.forRoot(config)),

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
      imports: [ResetPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });



});
