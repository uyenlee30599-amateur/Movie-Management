# Movie App

Ứng dụng xem/tìm phim kiểu Netflix, xây dựng bằng React, lấy dữ liệu từ
[The Movie Database API (TMDB)](https://developers.themoviedb.org/3/getting-started/introduction).

## 1. Cài đặt

```bash
npm install
```

## 2. Cấu hình API Key

1. Đăng ký tài khoản và lấy API Key tại
   https://developers.themoviedb.org/3/getting-started/introduction
2. Copy `.env.example` thành `.env`:
   ```bash
   cp .env.example .env
   ```
3. Mở `.env` và dán API Key của bạn vào:
   ```
   REACT_APP_TMDB_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
4. Kiểm tra Key hoạt động bằng cách mở:
   `https://api.themoviedb.org/3/movie/550?api_key=<Token>`

> Lưu ý: Create React App chỉ nhúng các biến môi trường có tiền tố
> `REACT_APP_`, và bạn cần khởi động lại `npm start` sau khi tạo/sửa `.env`.

## 3. Chạy ứng dụng

```bash
npm start
```

Mở http://localhost:3000

## Cấu trúc dự án

```
src/
  api/
    axios.js         # axios instance trỏ tới https://api.themoviedb.org/3
    requests.js       # tất cả các endpoint TMDB dùng trong app
  components/
    NavBar/           # thanh điều hướng, đổi nền khi cuộn > 100px
    Banner/            # banner phim ngẫu nhiên từ Netflix Originals
    MovieList/          # hàng phim cuộn ngang (poster hoặc backdrop)
    MovieDetail/         # modal chi tiết phim + trailer YouTube
    SearchForm/           # form nhập từ khóa tìm kiếm
    ResultList/            # lưới kết quả tìm kiếm (poster)
  pages/
    browse/Browse.jsx    # trang chủ: NavBar + Banner + các danh mục phim
    search/Search.jsx     # trang tìm kiếm: NavBar + SearchForm + ResultList
```

## Các chức năng đã triển khai

- **NavBar**: logo "Movie App" (link "/"), icon Search (link "/search"),
  nền trong suốt chuyển sang màu đen khi `window.scrollY > 100`.
- **Banner**: lấy dữ liệu từ `fetchNetflixOriginals`, chọn ngẫu nhiên 1 phim,
  hiển thị ảnh backdrop, tên phim, mô tả rút gọn, nút Play/My List.
- **Danh sách phim theo danh mục**: Original (poster dọc), Xu hướng,
  Xếp hạng cao, Hành động, Hài, Kinh dị, Lãng mạn, Tài liệu — mỗi danh sách
  cuộn ngang được và có animation phóng to khi hover.
- **Chi tiết phim**: click vào một phim sẽ mở modal hiển thị trailer
  (ưu tiên `type=Trailer`, sau đó `type=Teaser`, chỉ lấy video `site=YouTube`;
  nếu không có video phù hợp sẽ hiển thị ảnh backdrop thay thế). Click lại
  vào phim đang mở sẽ đóng modal; click phim khác sẽ chuyển sang phim đó.
- **Trang Search**: form tìm kiếm (RESET / SEARCH), gọi
  `/search/movie?api_key=...&language=en&query=...`, hiển thị kết quả dạng
  lưới poster, và hỗ trợ xem chi tiết + trailer giống trang chủ (yêu cầu
  nâng cao #9).

## Build production

```bash
npm run build
```

## Deploy lên GitHub Pages

Ứng dụng được deploy tự động bằng GitHub Actions mỗi khi có commit mới trên
nhánh `main`.

1. Vào **Settings → Secrets and variables → Actions** của repository và tạo
   repository secret `REACT_APP_TMDB_API_KEY`.
2. Vào **Settings → Pages** và chọn **Source: GitHub Actions**.
3. Push code lên nhánh `main`, sau đó theo dõi workflow tại tab **Actions**.

Địa chỉ website:
`https://uyenlee30599-amateur.github.io/Movie-Management/`

Ứng dụng dùng `HashRouter` để các route hoạt động ổn định trên GitHub Pages;
trang tìm kiếm có địa chỉ kết thúc bằng `/#/search`.
