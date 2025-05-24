import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsComponent } from './clients.component';
import { provideHttpClient } from '@angular/common/http';
import { SocketService } from '../../../../services/socket.service';
import { MockService } from '../../../_mocks_/socket.mock';
import { Socket } from 'ngx-socket-io';


fdescribe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let spySocketIoService: jasmine.SpyObj<SocketService>
  let mockService: MockService


  beforeEach(async () => {
    spySocketIoService = jasmine.createSpyObj('SocketService', [''])
    mockService = new MockService()


    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {provide: SocketService, useValue: spySocketIoService},
        {provide: Socket, useValue: mockService}
      ],
      imports: [ClientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
