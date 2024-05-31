export const itemInit = {
    id: null,
    name: "",
    avatar: "",
    qty: 1,
};

export const STATUS_DICUCI = "Dicuci";
export const STATUS_SELESAI = "Selesai";
export const STATUS_DIKEMBALIKAN = "Dikembalikan";

export const orderInit = {
    id: null,
    createdAt: new Date(),
    items: [],
    customerName: "",
    customerPhone: "",
    customerAddress: "",
    total: 0,
    dibayar: 0,
    kembali: 0,
    totalKg: 1,
    hargaPerKg: 10000,
    status: STATUS_DICUCI,
};
