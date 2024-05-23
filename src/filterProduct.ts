document.addEventListener("DOMContentLoaded", () => {
    const thanhTruotGia = document.getElementById("price-range") as HTMLInputElement;
    const giaHienTai = document.getElementById("price-value") as HTMLElement;
    const danhSachSanPham = document.querySelector("#getProByCate") as HTMLElement;

    // Cập nhật hiển thị giá trị khi thanh trượt thay đổi
    thanhTruotGia.addEventListener("input", () => {
        giaHienTai.textContent = parseFloat(thanhTruotGia.value).toLocaleString('vi-VN') + "đ";
        locSanPhamTheoGia();
    });

    // Lọc sản phẩm dựa trên khoảng giá
    function locSanPhamTheoGia() {
        const giaDuocChon = parseFloat(thanhTruotGia.value);
        // Lặp qua từng sản phẩm
        const sanPhams = danhSachSanPham.querySelectorAll(".col-md-3");
        sanPhams.forEach((sanPham: HTMLElement) => {
            const giaSanPham = sanPham.querySelector(".product_priceSale")!.innerHTML;
            // Chuyển đổi giá sản phẩm thành số
            const giaSanPhamNumber = parseFloat(giaSanPham.replace(/\D/g, ''));
            // Hiển thị hoặc ẩn sản phẩm dựa trên khoảng giá
            if (!isNaN(giaSanPhamNumber) && giaSanPhamNumber >= giaDuocChon) {
                sanPham.style.display = "block";
            } else {
                sanPham.style.display = "none";
            }
        });
    }
   
    // Gọi hàm ban đầu để hiển thị tất cả sản phẩm
    locSanPhamTheoGia();
});