
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

export interface dashboardUsersData{
    idUsers: number
    username: string
    email: string 
    ammount: number 
    purchases: number
}

export interface dashboardHighValueClient{
    idUsers: number 
    username: string 
    purchases: number
}

export interface userPurchaseDetail{
    userId: number
    username: string
    date: string
    status: string 
    price: number
}


