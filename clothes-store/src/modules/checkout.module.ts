
export interface userInfo{
    userId: number
    email: string
    username: string
}

export interface checkoutProduct{
    id: number
    quantity: number 

}


export interface userPurchaseDataModule{
    clientSecret: string
    amount: number 
    quantity: number
}

