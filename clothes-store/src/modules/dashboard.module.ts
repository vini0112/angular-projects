
export interface dashboardData{
    id?: number
    total_sales: number
    yearMonthsData: number[]
    invoices: JSON | string[]
    revenue: number
}

export interface userPurchaseDetail{
    id: number
    username: string
    date: string
    status: string 
    price: number
}
