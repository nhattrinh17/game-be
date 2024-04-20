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
  },
  categoryType: {
    notFound: 'category_type_not_found',
    missingData: 'missing_data',
    duplicate: 'duplicate_category_type',
  },
  category: {
    notFound: 'category_not_found',
    categoryTypeNotFound: 'category_type_not_found',
    missingData: 'missing_data',
    duplicate: 'duplicate_category',
  },
  blog: {
    notFound: 'blog_not_found',
    categoryNotFound: 'category_not_found',
    missingData: 'missing_data',
    duplicate: 'duplicate_blog',
  },
  product: {
    notFound: 'product_not_found',
    categoryNotFound: 'category_not_found',
    missingData: 'missing_data',
    duplicate: 'duplicate_product',
  },
  review: {
    notFound: 'review_not_found',
    productNotFound: 'product_not_found',
    missingData: 'missing_data',
    duplicate: 'duplicate_review',
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
};
