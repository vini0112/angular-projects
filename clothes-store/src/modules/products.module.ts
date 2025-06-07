
export interface productModule{
    id?: number
    name: string,
    price: number,
    isFavorite: boolean,
    image: string,
    section: string,
    info: string,
    sexo: string 
    isBestseller: boolean
    quantity: number
}


export interface EditingProduct{
    id: number
    name: string
    section: string
    info: string
    quantity: number
    price: number
    sexo: string
}

export interface productSize{
    product_id: number
    label: string
}
