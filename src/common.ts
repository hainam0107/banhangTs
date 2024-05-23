const urlserver = `http://localhost:3000`;
const tygia = 25000;
interface ISanPham {
    id: number;
    idCate: number;
    name: string;
    price: number;
    price_sale: number;
    image: string;
    hot: boolean;
    view: number;
    brand: string;
    sku: string;
    protype: string;
}
interface IThuocTinh {
    id: number;
    mauMat: string;
    baoHanh: string;
    chongNuoc: string;
    mauDay: string;
    dangMatSo: string;
    gioiTinh: string;
    loaiDay: string;
    loaiKinh: string;
    loaiMay: string;
    size: string;
    hang: string;
    thuongHieu: string;
}
class CSanPham implements ISanPham {
    id: number;
    idCate: number;
    name: string;
    price: number;
    price_sale: number;
    image: string;
    hot: boolean;
    view: number;
    brand: string;
    sku: string;
    protype: string;
    constructor(id, idCate, name, price, price_sale, image, hot, view, brand, sku, protype) {
        this.id = id;
        this.idCate = idCate;
        this.name = name;
        this.price = price;
        this.price_sale = price_sale;
        this.image = image;
        this.hot = hot;
        this.view = view;
        this.brand = brand;
        this.sku = sku;
        this.protype = protype;
    }
    phantramgiam() {
        return (100 * (this.price - this.price_sale) / this.price).toFixed(0) + "%";
    }
    giavnd() {
        return Number(this.price).toLocaleString("vi") + "đ"
    }
    giakm() {
        return Number(this.price_sale).toLocaleString('vi-VN') + "đ";
    }
    giausd() {
        return Number(this.price / tygia).toFixed(0) + "USD";
    }
}
class CThuocTinh extends CSanPham implements IThuocTinh {
    mauMat: string;
    baoHanh: string;
    chongNuoc: string;
    mauDay: string;
    dangMatSo: string;
    gioiTinh: string;
    loaiDay: string;
    loaiKinh: string;
    loaiMay: string;
    size: string;
    hang: string;
    thuongHieu: string;

    constructor(id, idCate, name, price, price_sale, image, hot, view, brand, sku, protype, mauMat, baoHanh, chongNuoc, mauDay, dangMatSo, gioiTinh, loaiDay, loaiKinh,
        loaiMay, size, hang, thuongHieu) {
        super(id, idCate, name, price, price_sale, image, hot, view, brand, sku, protype);
        this.mauMat = mauMat;
        this.baoHanh = baoHanh;
        this.chongNuoc = chongNuoc;
        this.mauDay = mauDay;
        this.dangMatSo = dangMatSo;
        this.gioiTinh = gioiTinh;
        this.loaiDay = loaiDay;
        this.loaiKinh = loaiKinh;
        this.loaiMay = loaiMay;
        this.size = size;
        this.hang = hang;
        this.thuongHieu = thuongHieu;
    }
}
type TCate = { 
    id: number; 
    cate_name: string; 
    cate_image: string; 
    show: number;
}
export { urlserver, ISanPham, CSanPham, CThuocTinh, TCate }