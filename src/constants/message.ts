export const messageResponse = {
  system: {
    badRequest: 'bad_request',
    emailNotInvalid: 'email_invalid',
    phoneNumberInvalid: 'phone_number_invalid',
    missingData: 'missing_data',
    notFound: 'not_found',
    duplicateData: 'duplicate_data',
    idInvalid: 'id_invalid',
    dataInvalid: 'data_invalid',
  },
  auth: {
    userNotFound: 'user_not_found',
    password_wrong: 'password_wrong',
    userHasBlocked: 'user_has_blocked',
    cannot_access_cms: 'cannot_access_cms',
  },
  group: {
    notFound: 'group_not_found',
    missingData: 'missing_data',
    duplicate: 'duplicate_group',
  },
  payment: {
    paymentTypeIdNotFound: 'payment_type_not_found',
    bankNotFound: 'bank_not_found',
    bankHasExist: 'bank_has_exist',
  },
  paymentTransaction: {
    transactionHasUpdate: 'transaction_has_update',
  },
  banks: {
    numberBanksMax: 'number_banks_max',
  },
  giftCode: {
    cannotUse: 'cannot_use',
    giftCodeHasUse: 'gift_code_has_use',
    codeInvalid: 'gif_code_invalid',
  },
};
