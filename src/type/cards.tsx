export type Produk = {
    id: string,
    namaProduk: string,
    detailProduk: string,
    gambarProduk: string,
    lokasiProduk: string,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
};

export type User = {
    id: string,
    username: string,
    email: string,
    photoProfile: string,
    whatsappContact: string,
    lineContact: string,
    instagramContact: string,
    createdAt: string,
    updatedAt: string,
    produks: Produk[]    
}

export interface CardsProps{
    data: User[] | undefined,
    setClick: React.Dispatch<React.SetStateAction<boolean | undefined>>
}

export interface MyProductProps{
    data: Produk[] | undefined
}