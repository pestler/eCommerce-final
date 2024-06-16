export type AddPromoCodeDto = {
    version: number;
    actions: PromoCodeAction[];
};

export type PromoCodeAction = {
    action: 'addDiscountCode';
    code: string;
};
