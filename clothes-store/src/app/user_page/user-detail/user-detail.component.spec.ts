import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailComponent } from './user-detail.component';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from '../../../services/user.service';
import { BehaviorSubject } from 'rxjs';
import { userDetails } from '../../../modules/user.module';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let spyUserService: jasmine.SpyObj<UserService>
  let userDetailBehaviorSubj = new BehaviorSubject<userDetails | null>(null)
  

  beforeEach(async () => {

    spyUserService = jasmine.createSpyObj('UserService', ['updateUserDetails'],
      {
        userDetail$: userDetailBehaviorSubj.asObservable()
      }
    )

    await TestBed.configureTestingModule({
      providers: [provideHttpClient(),
        {provide: UserService, useValue: spyUserService}

      ],
      imports: [UserDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it("Should make button save edition visible", () =>{

    component.editUserInfoButton()

    expect(component.editionMode).toBeTrue()
    expect(component.readOnlyInputs).toBeFalse()

  })

  it("Should check userDetails$", () =>{
    const user = {
      idusers: 1,
      username: 'vini' ,
      email: 'string' ,
      ammount: 1 ,
      purchases: 1 ,
      address: {
        country: 'string' ,
        street: 'string' ,
        houseNumber: 2 ,
        city: 'string' ,
        zipCode: 2 ,
        state: 'string' ,
        apartment: 'string'
      }
    }

    userDetailBehaviorSubj.next(user)

    component.userDetails$.subscribe(res => expect(res).toEqual(user))
  })

  it("Should be a successful edition", () =>{

    component.userForm.controls['username'].setValue('vini')
    component.userForm.controls['email'].setValue('vinic')
    component.userForm.controls['country'].setValue('djfkl')
    component.userForm.controls['street'].setValue('djfkl')
    component.userForm.controls['houseNumber'].setValue(3)
    component.userForm.controls['city'].setValue('djfkl')
    component.userForm.controls['zipCode'].setValue(9)
    component.userForm.controls['state'].setValue('djfkl')
    component.userForm.controls['apartment'].setValue('djfkl')



    component.saveEditionButton()

    fixture.detectChanges()

    expect(component.userForm.valid).toBeTrue()

    expect(component.editionMode).toBeFalse()
    expect(component.readOnlyInputs).toBeTrue()
  })


});
