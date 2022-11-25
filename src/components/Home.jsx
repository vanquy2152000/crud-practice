import React from 'react'

const Home = () => {
    return (
        <div className="d-flex flex-column ">
            <h1>Các Chức Năng (Api trên reqres.in): </h1>
            <span>1.Đăng nhập</span>
            <span>2.Thêm User</span>
            <span>3.Sửa User</span>
            <span>4.Xoá User</span>
            <span>5.Hiển thị tất cả các User</span>
            <span>6.Tìm kiếm User theo Email</span>
            <span>7.Sắp xếp theo FirstName,Id</span>
            <span>8.Import User từ file .csv</span>
            <span>9.Export User ra file .csv</span>
            <span>10.Using Redux</span>
            <span>11.Đăng xuất</span>
        </div>
    )
}

export default Home