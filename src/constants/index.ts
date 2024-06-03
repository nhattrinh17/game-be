export const Status = {
  Active: 'ACTIVE',
  Inactive: 'INACTIVE',
};

export enum Gender {
  MALE = 'MALE',
  GIRL = 'FEMALE',
  OTHER = 'OTHER',
}

export const Environment = {
  Development: 'development',
  Production: 'production',
};

export enum CreateCategoryKind {
  Product = 'product',
  Blog = 'blog',
}

export const TypeUser = {
  Normal: 'Normal',
  Admin: 'Admin-CMS',
};

export const TypePermissionCategory = {
  Single: 'SINGLE',
  Multilevel: 'MUlTILEVEL',
};

export const TypePayment = {
  showPopup: 'showPopup',
  showMessage: 'showMessage',
};

export const binBanks = {
  970400: 'Ngân hàng TMCP Sài Gòn Công Thương',
  970403: 'Ngân hàng TMCP Sài Gòn Thương Tín',
  970405: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn Việt Nam',
  970406: 'Ngân hàng TMCP Đông Á',
  970407: 'Ngân hàng TMCP Kỹ Thương Việt Nam',
  970408: 'Ngân hàng TNHH Một Thành Viên Dầu Khí Toàn Cầu',
  970409: 'Ngân hàng TMCP Bắc Á',
  970410: 'Ngân hàng TNHH Một Thành Viên Standard Chartered',
  970412: 'Ngân hàng TMCP Đại Chúng Việt Nam',
  970414: 'Ngân hàng TNHH Một Thành Viên Đại Dương',
  970415: 'Ngân hàng TMCP Công Thương Việt Nam',
  970416: 'Ngân hàng TMCP Á Châu',
  970418: 'Ngân hàng Đầu tư và Phát triển Việt Nam',
  970419: 'Ngân hàng TMCP Quốc Dân',
  970421: 'Ngân hàng Liên doanh Việt Nga',
  970422: 'Ngân hàng TMCP Quân Đội',
  970423: 'Ngân hàng TMCP Tiên Phong',
  970424: 'Ngân hàng TNHH Một Thành Viên Shinhan Việt Nam',
  970425: 'Ngân hàng TMCP An Bình',
  970426: 'Ngân hàng TMCP Hàng Hải',
  970427: 'Ngân hàng TMCP Việt Á',
  970428: 'Ngân hàng TMCP Nam Á',
  970429: 'Ngân hàng TMCP Sài Gòn',
  970430: 'Ngân hàng TMCP Xăng dầu Petrolimex',
  970431: 'Ngân hàng TMCP Xuất Nhập khẩu Việt Nam',
  970432: 'Ngân hàng TMCP Việt Nam Thịnh Vượng',
  970433: 'Ngân hàng TMCP Việt Nam Thương Tín',
  970434: 'Ngân hàng TNHH Indovina',
  970436: 'Ngân hàng TMCP Ngoại thương Việt Nam',
  970437: 'Ngân hàng TMCP Phát triển TP.HCM',
  970438: 'Ngân hàng TMCP Bảo Việt',
  970439: 'Ngân hàng TNHH Một Thành Viên Public Việt Nam',
  970440: 'Ngân hàng TMCP Đông Nam Á',
  970441: 'Ngân hàng TMCP Quốc Tế Việt Nam',
  970442: 'Ngân hàng TNHH Một Thành Viên Hong Leong Việt Nam',
  970443: 'Ngân hàng TMCP Sài Gòn – Hà Nội',
  970444: 'Ngân hàng TNHH Một Thành Viên Xây Dựng Việt Nam',
  970446: 'Ngân hàng Hợp Tác Xã Việt Nam',
  970448: 'Ngân hàng TMCP Phương Đông',
  970449: 'Ngân hàng TMCP Bưu Điện Liên Việt',
  970452: 'Ngân hàng TMCP Kiên Long',
  970454: 'Ngân hàng TMCP Bản Việt',
  970455: 'Ngân hàng Công nghiệp Hàn Quốc - Chi nhánh Hà Nội',
  970456: 'Ngân hàng Industrial Bank of Korea - Chi nhánh Hồ Chí Minh',
  970457: 'Ngân hàng TNHH Một Thành Viên Woori Bank Việt Nam',
  970458: 'Ngân hàng TNHH Một Thành Viên UOB Việt Nam',
  970459: 'Ngân hàng TNHH Một Thành Viên CIMB Việt Nam',
  970460: 'Công ty Tài chính cổ phần Xi Măng',
  970462: 'Ngân hàng Kookmin - Chi nhánh Hà Nội',
  970463: 'Ngân hàng Kookmin - Chi nhánh Tp. Hồ Chí Minh',
  970464: 'Công ty Tài chính TNHH MTV CỘNG ĐỒNG',
  970465: 'Ngân hàng SINOPAC - Chi nhánh Tp. Hồ Chí Minh',
  970466: 'Ngân hàng KEB HANA - Chi nhánh Tp. Hồ Chí Minh',
  970467: 'Ngân hàng KEB HANA - Chi nhánh Hà Nội',
  970468: 'Công ty Tài chính TNHH MTV Mirae Asset (Việt Nam)',
  970470: 'Công ty Tài chính TNHH MB SHINSEI',
};

export const StatusPaymentTranSaction = {
  processing: 0,
  success: 1,
  cancel: 2,
};

export const TypePaymentTranSaction = {
  deposit: 0,
  withdrawMoney: 1,
};

export const TypeGamePoint = {
  main: 0,
  sub: 1,
};

export const typeNotification = {
  System: 'system',
  User: 'individual',
};

export const StatusGiftCode = {
  Created: 0,
  Used: 1,
  Disable: 2,
};

export * from './message';
