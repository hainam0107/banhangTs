import { urlserver, TCate } from './common.js';
export const form_AddCate = () => {
    return `
    <h3>THÊM DANH MỤC</h3>
    <form class="form mt-3">
        <div class="mb-3">
            <input type="text" id="cate_name" class="form-control" placeholder="Tên danh mục">
        </div>
        <div class="mb-3">
            <input type="file" id="cate_img" class="form-control" placeholder="Ảnh">
        </div>
        <div class="mb-3 showOption" >Ẩn hiện <br>
            <div class="option"><input type="radio"  value="0" name="show">Ẩn</div>
            <div class="option"><input type="radio"  value="1" name="show" checked>Hiện</div>
            
        </div>
        <div class="admin_form_button">
            <button type="button" id="btn" class="btn btn-primary">Thêm</button>
        </div>
    </form>
    `
};
export const AddCate = async () => {
    let cate_name: string = (document.querySelector("#cate_name") as HTMLInputElement).value
    let cate_image: string = (document.querySelector("#cate_img") as HTMLInputElement).value
    let show: number = Number((document.querySelector("[name=show]:checked") as HTMLInputElement).value)

    let data = { cate_name: cate_name, cate_image: cate_image, show: show }
    let option = {
        method: 'post', body: JSON.stringify(data), headers: { 'Content-type': 'Application/json' }
    }
    let kq = await fetch(urlserver + "/categories", option)
        .then(response => response.json())
        .then(dt => dt)
    document.location = 'cate_list.html';
}
export const list_cate = async () => {
    let data = await fetch(urlserver + "/categories")
        .then(response => response.json())
        .then(data => data)
    let arr: TCate[] = data as TCate[];
    let str = ``;
    arr.forEach(cate => str += oneCate(cate));
    str = `
    <div id="listCate" class="listCate align-items-center">
        <div class="row">
            <div class="col-md-10"><h2>Quản lí danh mục</h2></div>
            <div class="col-md-2"> <button>
            <a href="cate_Add.html">Thêm danh mục </a>
            </button></div>
        </div>
        <div id="data">
        <table class="table mt-3">
            <thead>
                <tr class="">
                    <th>ID</th>
                    <th style="width:300px">Tên danh mục</th>
                    <th class="text-center">Hình ảnh</th>
                    <th>Ẩn | Hiện</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                ${str}
            </tbody>
        </table>
        </div
    </div>`
    return str;
}
const oneCate = (cate: TCate) => `
        <tr>
            <td class="fw-bold">${cate.id}</td>
            <td>${cate.cate_name}</td>
            <td class="text-center"><img src="image/banner/${cate.cate_image}" alt = "" width = "100px" > </td>
            <td>${cate.show == 0 ? 'Đang ẩn' : 'Đang hiện'}</td>
            <td>
            <a href="cate_Edit.html?id=${cate.id}"><i class="text-warning mx-3 fa-regular fa-pen-to-square" > </i></a >
                <button idCate="${cate.id}" class="btnDelete"><i class="text-danger mx-1 fa-solid fa-trash" > </i></button >
            </td>
        </tr>
`;

export const delete_Cate = async (btn: HTMLButtonElement) => {
    let id: string = btn.getAttribute('idCate');
    let hoi: boolean = window.confirm("Bạn đồng ý xóa");
    if (hoi == false) return;
    let option = { method: 'delete' };
    let kq = await fetch(urlserver + `/categories/${id}`, option);
    document.location = 'cate_List.html'
}

export const form_EditCate = async (id: string) => {
    let url: string = urlserver + `/categories/?id=${id}`;
    let cate = await fetch(url)
        .then(response => response.json())
        .then(data => data[0])
    return `
    <h3>SỬA DANH MỤC</h3>
    <form class="form mt-3">
        <div class="mb-3">
            <input type="text" value="${cate.cate_name}" id="cate_name" class="form-control" placeholder="Tên danh mục">
        </div>
        <div class="mb-3">
            <input type="file" value="${cate.cate_image} id="cate_img" class="form-control" placeholder="Ảnh">
        </div>
        <div class="mb-3 showOption" >Ẩn hiện <br>
            <div class="option"><input type="radio"  value="0" name="show" ${cate.show == 0 ? 'checked' : ''}>Ẩn</div>
            <div class="option"><input type="radio"  value="1" name="show" ${cate.show == 1 ? 'checked' : ''}>Hiện</div> 
        </div>
        <input type="hidden" value="${id}" name="" id="id">
        <div class="admin_form_button">
            <button type="button" id="btn" class="btn btn-primary">Cập nhật</button>
        </div>
    </form>
    `
};
export const editCate = async () => {
    let id: number = Number((document.querySelector("#id") as HTMLInputElement).value);
    let cate_name: string = (document.querySelector("#cate_name") as HTMLInputElement).value;
    // let cate_image: string = (document.querySelector("#cate_image") as HTMLInputElement).value;
    let show: number = Number((document.querySelector("[name=show]:checked") as HTMLInputElement).value);

    // let data = { cate_name: cate_name, cate_image: cate_image, show: show }
    let data = { cate_name: cate_name, show: show }
    let option = {
        method: "put",
        body: JSON.stringify(data),
        headers: { 'Content-type': 'Application/json' }
    }
    let kq = await fetch(urlserver + `/categories/${id}`, option)
        .then(response => response.json())
        .then(data => data)
    document.location='cate_List.html'
}