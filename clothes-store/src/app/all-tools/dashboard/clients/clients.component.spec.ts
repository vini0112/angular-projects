import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsComponent } from './clients.component';
import { provideHttpClient } from '@angular/common/http';
import { SocketService } from '../../../../services/socket.service';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { importProvidersFrom } from '@angular/core';
import { dashboardService } from '../../../../services/dashboard.service';
import { BehaviorSubject, map, of } from 'rxjs';
import { dashboardUsersData } from '../../../../modules/dashboard.module';


const config: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {
    transports: ['websocket'],
    autoConnect: false
  },
} 

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let spySocketIoService: jasmine.SpyObj<SocketService>
  let spyDashboardService: jasmine.SpyObj<dashboardService>
  let receivingOnlineUsers = new BehaviorSubject<number>(0)
  let GetUsersData = new BehaviorSubject<dashboardUsersData[]>([])
  

  beforeEach(async () => {
    receivingOnlineUsers = new BehaviorSubject<number>(2)
    GetUsersData = new BehaviorSubject<dashboardUsersData[]>([{
                idUsers: 1,
                username: 'vini',
                email: 'vini@gmail.com', 
                ammount: 1000, 
                purchases: 20}])


    spySocketIoService = jasmine.createSpyObj('SocketService', ['getAllOnlineUsers'],
      {
        onlineUsers$: receivingOnlineUsers.asObservable()
      }
    )

    spyDashboardService = jasmine.createSpyObj('dashboardService', ['getDashBoardUsersData', 'deleteUsers'],
      {
        usersData$: GetUsersData.asObservable()
      }
    )



    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {provide: SocketService, useValue: spySocketIoService},
        {provide: dashboardService, useValue: spyDashboardService},
        importProvidersFrom(SocketIoModule.forRoot(config)),
      
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

  it("Should receive online user number", () =>{ 
    expect(component.onlineUsers).toBe(2)
  })

  it("Should trigger the delete user service action after a click in the button", () =>{

    component.btnDeleteUser(1)

    expect(spyDashboardService.deleteUsers).toHaveBeenCalledWith(1)

  })


  it("Should check if usersData was populated by the dashboard service", () =>{
    const item = [{
                idUsers: 1,
                username: 'vini',
                email: 'vini@gmail.com', 
                ammount: 1000, 
                purchases: 20}]

    component.usersData$.subscribe(res =>{
      expect(res).toEqual(item)
    })

  })


  it("Should check if highValueClients was populated by the dasboard service", () =>{
    const item = [{
                idUsers: 1,
                username: 'vini',
                email: 'vini@gmail.com', 
                ammount: 1000, 
                purchases: 20}]

    component.highValueClients$ = spyDashboardService.usersData$.pipe(
      map(itens => itens.filter(item => item.purchases > 2))
    )

    fixture.detectChanges()

    component.highValueClients$.subscribe(res =>{
      expect(res).toEqual(item)
    })

  })


  it("Should check if usersData receives the data from dashboard service", () =>{
    const item = [{
                idUsers: 1,
                username: 'vini',
                email: 'vini@gmail.com', 
                ammount: 1000, 
                purchases: 20}]

    component.usersData$.subscribe(res => expect(res).toEqual(item))
  })


});
