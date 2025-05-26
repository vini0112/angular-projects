
import { TestBed } from "@angular/core/testing"
import { dashboardService } from "./dashboard.service"
import { provideHttpClient } from "@angular/common/http"
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing"

describe('DashboardService', () =>{
    let service: dashboardService
    let httpMock: HttpTestingController

    
    beforeEach(() =>{

        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()]
        })

        service = TestBed.inject(dashboardService)
        httpMock = TestBed.inject(HttpTestingController)
    })


    it("Should create", () =>{
        expect(service).toBeTruthy()
    })


    it("Should get dashboard data", () =>{
        const info = {
            idDashboard: 1,
            total_sales: 10,
            yearMonthsData: [1, 2],
            weekdays: [2 , 4, 6],
            invoices: [{}],
            revenue: 34,
            currentDay: 1,
            currentMonth: 2
        }

        service.getDashboardData().subscribe(res =>{
            expect(res).toEqual(info)
        })

        const req = httpMock.expectOne(req => req.url.endsWith('/dashboard-data'))
        expect(req.request.method).toBe('GET')
        req.flush(info)

    })


    it("Should get dashboard user data and check if highValueClientsInfo has data", () =>{
        const info = [
            {
                idUsers: 1,
                username: 'vini',
                email: 'vini@gmail.com', 
                ammount: 1000, 
                purchases: 20
            }
        ]

        service.getDashBoardUsersData()

        const req = httpMock.expectOne(req => req.url.endsWith('/dashboard-users'))
        expect(req.request.method).toBe('GET')
        req.flush(info)

        service.usersData$.subscribe(res => {
            console.log(res)
            expect(res).toEqual(info)
        })



        service.highValueClientsInfo$.subscribe(res =>{
            console.log('highValueClientsInfo: ',res)
            expect(res).toEqual(res)
        })


    })


    it("Should delete user", () =>{

        service.deleteUsers(1)

        const req2 = httpMock.expectOne(req => req.url.endsWith('/dashboard-delete/1'))
        expect(req2.request.method).toBe('DELETE')
        req2.flush({})

        service.usersData$.subscribe(res => {
            expect(res).toEqual([])
        })
    })


})
