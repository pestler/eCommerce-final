export type RemovePromoCodeDto = {
  version: number;
  actions: RemovePromoCodeAction[];
};

export type RemovePromoCodeAction = {
  action: 'removeDiscountCode';
  discountCode: {
    typeId: 'discount-code';
    id: string;
  };
};
