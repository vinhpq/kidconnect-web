const classInfoTest = [
    {classId: 0, name: "Rabbit", total: 14, phone1: '0398900426@nbs.com', phone2: '0348560000@nbs.com'},
    {classId: 1, name: "Chicken", total: 17, phone1: '0328524938@nbs.com', phone2: '000000000@nbs.com'},
    {classId: 2, name: "Elephant", total: 25, phone1: '0986228299@nbs.com', phone2: '0356186278@nbs.com'},
    {classId: 3, name: "Zebra", total: 21, phone1: '0981683792@nbs.com', phone2: '0367989894@nbs.com'},
    {classId: 4, name: "Mickey", total: 11, phone1: '0383687298@nbs.com', phone2: '0966047659@nbs.com'},
    // {classId: 5, name: "Monkey", total: 35, phone1: '0383687298@nbs.com', phone2: '0966047659@nbs.com'},
    {classId: 6, name: "Lion", total: 13, phone1: '0982918276@nbs.com', phone2: '0368483679@nbs.com'},
    {classId: 7, name: "Panda", total: 18, phone1: '0365639522@nbs.com', phone2: '0968622630@nbs.com'},
    {classId: 8, name: "Kangaroo", total: 6, phone1: '0326721796@nbs.com', phone2: '0975180359@nbs.com'},
    {classId: 9, name: "Donald", total: 5, phone1: '0355557869@nbs.com', phone2: '0326670097@nbs.com'},
    // {classId: 10, name: "Bear", total: 10, phone1: '0383687298@nbs.com', phone2: '0966047659@nbs.com'},
    // {classId: 11, name: "Kitty", total: 5, phone1: '0383687298@nbs.com', phone2: '0966047659@nbs.com'},
];

const kidInfoTest = [
    {kidId: "HD494", name: "Lê Đình Tùng  Lâm ", nickname: "Tôm", classId: 0, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD376", name: "Cao Khánh  Linh", nickname: "", classId: 4, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD446", name: "Nguyễn Tuấn Anh ", nickname: "Bo", classId: 1, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD024", name: "Phạm Thành Vinh", nickname: "", classId: 3, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD401", name: "Hoàng Thuận Phong", nickname: "Win", classId: 3, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD019", name: "Nguyễn Phương Ngân", nickname: "", classId: 5, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD470", name: "Nguyễn Trà My", nickname: "", classId: 2, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD141", name: "Nguyễn Hải Linh", nickname: "", classId: 6, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD029", name: "Đào Ngọc Ánh", nickname: "", classId: 8, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD389", name: "Phạm Đức  Anh", nickname: "", classId: 7, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD184", name: "Nguyễn Quyết Thắng", nickname: "Bi", classId: 7, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD121", name: "Trần Bảo Nam", nickname: "", classId: 7, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD302", name: "Phạm Nguyễn Uyên Minh", nickname: "", classId: 6, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD476", name: "Quản  Hoàng Oanh", nickname: "Nhím", classId: 2, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD478", name: "Nguyễn Hữu Khang", nickname: "Zôn", classId: 2, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD327", name: "Phạm Thùy Dương", nickname: "Bống", classId: 5, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD146", name: "Đỗ Mai Phương", nickname: "", classId: 6, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD219", name: "Diệp Anh", nickname: "Xuka", classId: 5, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD175", name: "Nguyễn Khương Duy", nickname: "", classId: 7, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD049", name: "Phan Bảo Lâm", nickname: "", classId: 6, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD055", name: "Nguyễn Lê Phi Yến", nickname: "Dâu Tây", classId: 5, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD471", name: "Trịnh Lan Hương ", nickname: "nghé", classId: 1, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD368", name: "Vũ Gia  An", nickname: "Bông Xù", classId: 3, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD363", name: "Phùng Viết  Thành", nickname: "gạo", classId: 0, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD127", name: "Hà Vũ Thanh Thảo", nickname: "", classId: 9, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD423", name: "Cấn Khánh Chi", nickname: "kem", classId: 3, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD358", name: "Hà Tuấn  Minh", nickname: "Bon", classId: 2, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD406", name: "Đoàn Bảo Lâm", nickname: "Bon", classId: 2, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD131", name: "Nguyễn Đoàn Khánh Vy", nickname: "", classId: 7, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD474", name: "Trường Phúc", nickname: "Mốc", classId: 3, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD278", name: "Đỗ Quỳnh Anh", nickname: "Thỏ", classId: 4, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD373", name: "Gia Hân", nickname: "sóc", classId: 1, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD031", name: "Nguyễn Minh Châu", nickname: "", classId: 8, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD385", name: "Đinh Công Tuấn  Minh", nickname: "", classId: 2, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD028", name: "Vũ Đức Anh", nickname: "", classId: 8, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD130", name: "Nguyễn Nhã Khánh Vy", nickname: "", classId: 5, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD398", name: "Trần Kim Hoài An", nickname: "", classId: 3, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD497", name: "Lê Nhật Minh  Khang", nickname: "Voi", classId: 0, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD377", name: "Đỗ Minh  Anh", nickname: "chíp", classId: 2, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD027", name: "Trịnh Hà Anh", nickname: "", classId: 8, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD294", name: "Trần Huy Tuấn  Kiệt", nickname: "voi", classId: 3, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD045", name: "Nguyễn Trần Phương Chi", nickname: "su", classId: 6, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD182", name: "Lê Thế Sơn", nickname: "", classId: 7, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD280", name: "Ngô Thanh  Tùng", nickname: "Sóc", classId: 4, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD410", name: "Trịnh Hà  Quang", nickname: "", classId: 4, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD425", name: "Ngô Hoài  An", nickname: "kẹo", classId: 3, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD462", name: "Trịnh Hoài Thư", nickname: "Lu", classId: 5, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD170", name: "Nguyễn Ngọc Châu Anh", nickname: "", classId: 7, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD360", name: "Lê Gia  Khang", nickname: "bầu", classId: 2, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD382", name: "Phạm Danh Phú", nickname: "", classId: 5, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD195", name: "Vũ Ngọc Khánh", nickname: "Tôm", classId: 9, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD451", name: "Nguyễn Ngọc Linh ", nickname: "Xuka ", classId: 1, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD449", name: "Chử Khôi Nguyên", nickname: "", classId: 6, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD196", name: "Phạm Kiều Linh", nickname: "Tít", classId: 9, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD466", name: "Chu Thạch Tùng", nickname: "", classId: 4, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD498", name: "Mộc Vân", nickname: "Na", classId: 1, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD284", name: "Nguyễn Đặng Châu Anh", nickname: "Bắp Cải", classId: 3, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD006", name: "Hồ Đức Kiên", nickname: "", classId: 3, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD452", name: "Nguyễn Minh Đăng", nickname: "Sóc", classId: 6, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD405", name: "Đào Ngọc  Anh", nickname: "", classId: 2, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD496", name: "Nông Tuệ Gia  Linh ", nickname: "", classId: 0, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD124", name: "Mạc Nam Phong", nickname: "", classId: 6, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD463", name: "Nguyễn Gia Hưng", nickname: "Voi", classId: 0, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD005", name: "Mai Thu Hương", nickname: "", classId: 3, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD220", name: "Nguyễn Trúc Quỳnh", nickname: "", classId: 4, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD342", name: "Lê Thị Minh  Anh", nickname: "", classId: 6, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD473", name: "Phạm Nguyễn Nhật Minh", nickname: "Sumin", classId: 1, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD306", name: "Tăng Thiên Bảo", nickname: "", classId: 5, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD458", name: "Hà An Ngọc ", nickname: "", classId: 2, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD489", name: "Dương Đoàn Anh  Tú", nickname: "Tú", classId: 0, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD424", name: "Lương Đào Quỳnh Anh", nickname: "chip", classId: 2, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD190", name: "Trần Hữu Đăng", nickname: "", classId: 5, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD501", name: "Nguyễn Đức Duy", nickname: "Tin", classId: 0, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD004", name: "Nguyễn Phương Ngọc Huyền", nickname: "", classId: 5, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD073", name: "Lê Vũ Mộc Trà", nickname: "", classId: 7, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD387", name: "Quảng  Đức", nickname: "", classId: 0, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD443", name: "Phạm Diệu An", nickname: "Thỏ", classId: 1, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD475", name: "Đoàn Bảo Lam", nickname: "Thỏ", classId: 2, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD421", name: "Trần Ngọc Anh  Chi", nickname: "muối", classId: 7, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD210", name: "Lê Bảo An", nickname: "Nấm", classId: 3, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD230", name: "Trần Hoàng Phúc", nickname: "Su", classId: 7, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD303", name: "Thành  Đạt", nickname: "", classId: 5, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD378", name: "Nguyễn Phương Linh", nickname: "", classId: 2, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD502", name: "Nguyễn Nhật Anh ", nickname: "Ôỉ ", classId: 0, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD337", name: "Thái An Nhiên", nickname: "bắp", classId: 3, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD343", name: "Lê Bá  Đức", nickname: "cò", classId: 3, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD503", name: "Minh Khôi", nickname: "Thóc", classId: 4, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD495", name: "Nguyễn Quang  Anh ", nickname: "", classId: 5, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD437", name: "Hà Tú Linh", nickname: "", classId: 6, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD427", name: "Tạ Hoàng Minh Khang", nickname: "KUL", classId: 7, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD218", name: "Anh Đức", nickname: "", classId: 5, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD456", name: "Lê An Nhiên ", nickname: "", classId: 7, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD197", name: "Khương Hữu Nghĩa", nickname: "Ben", classId: 5, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD461", name: "Trịnh Gia Bảo", nickname: "Zôn", classId: 1, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD352", name: "Lê Đức  Minh", nickname: "cà phê", classId: 3, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD465", name: "Nguyễn Minh Khôi", nickname: "Cún", classId: 0, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD430", name: "Nguyễn Hải  Anh", nickname: "thỏ", classId: 1, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD314", name: "Ngọc  Diệp", nickname: "", classId: 3, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD499", name: "Hoàng Thành  Đạt", nickname: "", classId: 8, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD431", name: "Nguyễn Hà  Anh", nickname: "mèo", classId: 1, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD015", name: "Nguyễn Khánh Duy", nickname: "", classId: 5, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD417", name: "Nguyễn Ngọc Hà My", nickname: "Nhím", classId: 2, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD186", name: "Nguyễn Uy Vũ", nickname: "Bảo An", classId: 7, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD071", name: "Lê Hải Phong", nickname: "Tí", classId: 9, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD033", name: "Nguyễn Minh Hùng", nickname: "", classId: 8, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD320", name: "Tuấn  Long", nickname: "", classId: 9, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD332", name: "Nguyễn Hoàng Yến Nhi", nickname: "bống", classId: 7, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD441", name: "Ngô Thị Hồng Mai ", nickname: "", classId: 0, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD467", name: "Nguyễn Hà Bảo Anh ", nickname: "", classId: 2, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD438", name: "Hà Minh Hưng", nickname: "", classId: 2, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD372", name: "Trần Bình  Minh", nickname: "Gấu", classId: 4, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD207", name: "Nguyễn Như Nam Anh", nickname: "Bun", classId: 2, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD445", name: "Phạm Bảo Long", nickname: "Bảo Bối", classId: 1, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD455", name: "Vũ Anh Quân ", nickname: "", classId: 4, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD468", name: "Phạm Đức Minh", nickname: "Khoai", classId: 3, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD340", name: "Nguyễn Ngọc Phương  Anh", nickname: "", classId: 7, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD469", name: "Phạm Ngọc Huyền", nickname: "Dâu", classId: 3, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD490", name: "Đinh Thế Công  Minh", nickname: "", classId: 2, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD311", name: "Đậu Minh  Hưng", nickname: "Bon", classId: 6, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD364", name: "Nguyễn Nhật  Minh", nickname: "bắp", classId: 4, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD148", name: "Đỗ Ngọc Bảo Trâm", nickname: "", classId: 6, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD460", name: "Nguyễn Minh Tuấn ", nickname: "Coca", classId: 1, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD187", name: "Nguyễn Như Việt Anh", nickname: "Thỏ", classId: 5, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD381", name: "Đình  Cường", nickname: "", classId: 6, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD333", name: "Nguyễn Nhật  Linh", nickname: "ỈN", classId: 7, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD400", name: "Nguyễn Đức  Mạnh", nickname: "Tôm", classId: 1, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD325", name: "Nguyễn Gia  Khiêm", nickname: "bo", classId: 5, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD459", name: "Cấn Khánh Linh ", nickname: "Xoài", classId: 0, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD201", name: "Thúy Quỳnh", nickname: "Cún", classId: 5, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD407", name: "Lê Minh Thư", nickname: "SU", classId: 1, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD450", name: "Đặng Gia Hân ", nickname: "Bông", classId: 1, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD464", name: "Lưu Quang Khôi", nickname: "Mỡ ", classId: 4, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD114", name: "Hoàng Quốc Bảo", nickname: "", classId: 7, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD365", name: "Mè Đức  Anh", nickname: "tép", classId: 3, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD433", name: "Chu Sơn  Tùng", nickname: "", classId: 2, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD312", name: "Quỳnh Nhi", nickname: "Lana", classId: 7, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD198", name: "Phạm Nguyễn Bảo Ngọc", nickname: "Nấm", classId: 5, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD492", name: "Nguyễn Bảo  Ngân ", nickname: "", classId: 2, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD046", name: "Trần Diệp Chi", nickname: "", classId: 3, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD457", name: "Nguyễn Khôi  Nguyên ", nickname: "Khoai", classId: 2, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD493", name: "Nguyễn Trần Bảo Trâm", nickname: "mía", classId: 2, attendanceStatus: 0, activeStatus: 0},
    {kidId: "HD009", name: "Đoàn Tất Bảo Lâm", nickname: "coca", classId: 1, attendanceStatus: 0, activeStatus: 0},

]

export { kidInfoTest, classInfoTest }