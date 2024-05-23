document.addEventListener("DOMContentLoaded", () => {
    const thanhTruotGia = document.getElementById("price-range");
    const giaHienTai = document.getElementById("price-value");
    const danhSachSanPham = document.querySelector("#getProByCate");
    thanhTruotGia.addEventListener("input", () => {
        giaHienTai.textContent = parseFloat(thanhTruotGia.value).toLocaleString('vi-VN') + "đ";
        locSanPhamTheoGia();
    });
    function locSanPhamTheoGia() {
        const giaDuocChon = parseFloat(thanhTruotGia.value);
        const sanPhams = danhSachSanPham.querySelectorAll(".col-md-3");
        sanPhams.forEach((sanPham) => {
            const giaSanPham = sanPham.querySelector(".product_priceSale").innerHTML;
            const giaSanPhamNumber = parseFloat(giaSanPham.replace(/\D/g, ''));
            if (!isNaN(giaSanPhamNumber) && giaSanPhamNumber >= giaDuocChon) {
                sanPham.style.display = "block";
            }
            else {
                sanPham.style.display = "none";
            }
        });
    }
    locSanPhamTheoGia();
});
