import {urlserver,ISanPham,CSanPham,CThuocTinh} from './common.js'

const onePro = (pro) => {
  let { id, idCate, name, price, price_sale, image, hot, view, brand, sku, protype } = pro;
  let obj: CSanPham;
  obj = new CSanPham(id, idCate, name, price, price_sale, image, hot, view, brand, sku, protype);
  return ` 
    <div class="product col-md-3 mt-3">
        <a href="details.html?id=${pro.id}&idcate=${pro.idCate}">
        <img src="image/products/${obj.image}" alt="" width="200px">
        </a>
        <p class="product_name w-75 fw-bold">${obj.name}</p>
        <del class="col-md-12 product_price">${obj.giavnd()}</del> <br>
        <p class="product_pre">-${obj.phantramgiam()}</p>
        <strong class="product_priceSale fw-bold">${obj.giakm()}</strong>
     </div>`
}
export const getProRelate = async (idCate: number, currentProductId: number) => {
  return fetch(urlserver + `/products/?idCate=${idCate}`)
    .then(res => res.json())
    .then(data => {
      var relatedProducts = data.filter(product => {
        // console.log(idCate)
        // Lọc ra các sản phẩm có cùng idCate nhưng khác id
        return product.idCate === idCate && product.id !== currentProductId;
        
      });
      let str = ``;
      relatedProducts.forEach(pro => str += onePro(pro));
      str = `
        <div id="proHot" class="listPro">   
          <h2 class="text-center mt-5 fw-bold">SẢN PHẨM CÙNG LOẠI</h2>
          <div id="data" class="row mx-5 mt-5">${str}</div>
        </div>`;
      return str;
    })
};
export const proHot = async (numPro: number) => {
  let data = await fetch(urlserver + `/products/?hot=1&_limit=${numPro}`)
    .then(res => res.json())
    .then(data => data);
  let str = ``;
  data.forEach(pro => str += onePro(pro));
  str = `
    <div id="proHot" class="listPro">   
        <h2 class="text-center mt-5 fw-bold">SẢN PHẨM HOT</h2>
        <div id="data" class="row mx-5 mt-5">${str}</div>
    </div>`
  return str;
}
export const get_cate = async () => {
  let data = await fetch(urlserver + "/categories")
    .then(res => res.json())
    .then(data => data);
  let str = "";
  data.forEach(cate => {
    str += `
        <li>
            <a href="probycate.html?id=${cate.id}">
            ${cate.cate_name}
            </a>
        </li>
        `
  });
  return str;
}

export const getProByCate = async (idCate: number) => {
  let data = await fetch(urlserver + `/products/?idCate=${idCate}`)
    .then(res => res.json())
    .then(data => data);

  // Tạo một mảng chứa tất cả các thương hiệu duy nhất
  let uniqueBrands = [...new Set(data.map(product => product.brand))];

  let str = "";
  uniqueBrands.forEach(brand => {
    // Tạo tiêu đề cho từng thương hiệu
    str += `<h5 class="fw-bold">Đồng hồ ${brand}</h5>`
    // Lọc ra các sản phẩm thuộc thương hiệu này và hiển thị chúng
    let productsByBrand = data.filter(product => product.brand === brand);
    productsByBrand.forEach(pro => str += onePro(pro));
    str = `  
               <div id="data" class="row mx-2 mt-5">${str}</div>
        `;
  });
  return str;

}

export const getOnePro = async (id: number = 0) => {
  let pro = await fetch(urlserver + `/products/?id=${id}`)
    .then(res => res.json())
    .then(data => data[0])
  let thuocTinh = await fetch(urlserver + `/thuocTinh/?idSp=${id}`)
    .then(res => res.json())
    .then(d => d[0])

  let { idCate, name, price, price_sale, image, hot, view, brand, sku, protype } = pro;
  let { mauMat, baoHanh, chongNuoc, mauDay, dangMatSo, gioiTinh, loaiDay, loaiKinh,
    loaiMay, size, hang, thuongHieu } = thuocTinh;
  let obj = new CThuocTinh(id, idCate, name, price, price_sale, image, hot, view, brand, sku, protype,
    mauMat, baoHanh, chongNuoc, mauDay, dangMatSo, gioiTinh, loaiDay, loaiKinh,
    loaiMay, size, hang, thuongHieu)
  let str = `
    <div class="row mt-5">
    <div class="col-md-6">
      <img src="image/products/${obj.image}" alt="" width="450px">
      <div class="row">
        <div>
          <img src="image/products/${obj.image}" alt="" width="100px">
          <img src="image/products/${obj.image}" alt="" width="100px">
          <img src="image/products/${obj.image}" alt="" width="100px">
          <img src="image/products/${obj.image}" alt="" width="100px">
        </div>
      </div>
    </div>
    <div class="col-md-6 product_detail">
      <h4 class="fw-bold">${obj.name}</h4>
      <p class="fw-bold mt-4">Mã sản phẩm: ${obj.sku}</p>
      <p class="fw-bold">Loại: ${obj.protype}</p>
      <p class="fw-bold">Thương hiệu: ${obj.brand} </p>
      <p class="price_details"><del>${obj.giavnd()}</del></p>
      <p class="product_pre ppd">-${obj.phantramgiam()}</p>
      <p class="priceSale_details">${obj.giakm()}</p>
      <button class="btn-d buyNow">Mua ngay</button>
      <button class="btn-d addCart">Thêm vào giỏ hàng</button>
    </div>
  </div>
  <div class="row">
    <table border="1" class="table table-detail">
      <tr>
        <td>Màu mặt</td>
        <td>${obj.mauMat}</td>
      </tr>
      <tr>
        <td>Bảo hành</td>
        <td>${obj.baoHanh}</td>
      </tr>
      <tr>
        <td>Chống nước</td>
        <td>${obj.chongNuoc}</td>
      </tr>
      <tr>
        <td>Màu dây</td>
        <td>${obj.mauDay}</td>
      </tr>
      <tr>
        <td>Dạng mặt số </td>
        <td>${obj.dangMatSo}</td>
      </tr>
      <tr>
        <td>Giới tính</td>
        <td>${obj.gioiTinh}</td>
      </tr>
      <tr>
        <td>Loại dây</td>
        <td>${obj.loaiDay}</td>
      </tr>
      <tr>
        <td>Loại kính</td>
        <td>${obj.loaiKinh}</td>
      </tr>
      <tr>
        <td>Loại máy</td>
        <td>${obj.loaiMay}</td>
      </tr>
      <tr>
        <td>Size</td>
        <td>${obj.size}</td>
      </tr>
      <tr>
        <td>Hãng</td>
        <td>${obj.hang}</td>
      </tr>
      <tr>
        <td>Thương hiệu máy</td>
        <td>${obj.thuongHieu}</td>
      </tr>
    </table>
  </div>`
  return str;
}