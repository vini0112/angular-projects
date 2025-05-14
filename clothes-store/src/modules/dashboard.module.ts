
export interface dashboardData{
    idDashboard: number
    total_sales: number
    yearMonthsData: number[]
    weekdays: number[]
    invoices: object
    revenue: number
    currentDay: number
    currentMonth: number
}

export interface userPurchaseDetail{
    userId: number
    username: string
    date: string
    status: string 
    price: number
}


