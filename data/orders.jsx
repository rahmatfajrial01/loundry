export const orderInit = {
  total: 0,
  dibayar: 0,
  kembali: 0,
  pajak: 11 / 100,
  totalBeforePajak: 0,
  customerName: "",
  customerPhone: "",
};

export const orderValidationInit = {
  dibayar: {
    isValid: false,
    required: false,
    message: "",
  },
  customerName: {
    isValid: false,
    required: true,
    message: "",
  },
  customerPhone: {
    isValid: false,
    required: true,
    message: "",
  },
};
