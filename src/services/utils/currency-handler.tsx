

export const currencyProcessor = (figure: number, currency?: any) => {

}
export const pickCurrency = (enforceCurrency?: string) => {
    if(enforceCurrency) {
        return enforceCurrency;
    }
    return '$'
}
