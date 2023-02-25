export interface NavbarProps{
    access: "public" | "register_login" | "private" | undefined,
    addBackToHomePage: boolean | undefined
}

export interface Response{
    success: boolean,
    message: string,
    data: any
}