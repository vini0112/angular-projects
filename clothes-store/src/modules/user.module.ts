
export interface userDetails{
    idusers: number
    username: string 
    email: string 
    ammount: number 
    purchases: number 
    address: Address
}

interface Address{
    username: string
    email: string
    country: string 
    street: string 
    houseNumber: number 
    city: string 
    zipCode: number 
    state: string 
    apartment: string
}

