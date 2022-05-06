const products = [
    {
        name: 'Ghế tập Gym đa năng DDS-1201',
        image: '/images/productsghe-tap-gym-dds-1201.jpg',
        description:
            'Ghế tập Gym đa năng DDS-12Ghế tập Gym đa năng DDS-1201 được thiết kế nhỏ gọn, có thể điều chỉnh độ dốc dễ dàng khi sử dụng và tích hợp nhiều bài tập thể hình hiệu quả cho Gymer. Đây là mẫu ghế phù hợp để sử dụng cho các bạn đang có nhu cầu tham gia tập thể hình tại nhà. Hãy liên hệ ngay với Dụng Cụ Thể Dục qua số hotline 0939 987 456 để được tư vấn và đặt mua ghế tập Gym DDS-1201 nhanh nhất. Khung sườn của ghế tập làm từ chất liệu thép dẹt, có khả năng chịu lực cực tốt và bề mặt vật liệu được phủ sơn tĩnh điện cao cấp siêu bền. Theo tính toán của các nhà sản xuất, ghế tập Gym DDS-1201 có khả năng chịu được tải trọng tập tối đa lên đến 180 kg. Thanh cố định chân được bọc mút cực dày. Bộ phận hỗ trợ tập hít đất được làm chắc chắn, có khả năng chịu lực tốt và đảm bảo an toàn khi sử dụng. ',
        price: 2100000,
        quantity: 120,
        rating: 4,
        numReviews: 4,
        trademark: 'Khác',
        category: 'Dụng cụ tập gym',
    },
    {
        name: 'Ghế tập bụng Ben Pro 601003 ',
        image: '/images/productsghe-tap-bung-601003.jpg',
        description:
            'Khung chính của ghế được làm từ thép hộp 30 x 60mm, 40 x 40mm, 50 x 50mm, có độ dày lên tới 1.2mm và sơn tĩnh điện cao cấp giúp chống rỉ sét. Yên nằm tập được bọc nệm mút cực dày tới 2.5cm mang lại cảm giác thoải mái cho người tập. Yên ghế có thể điều chỉnh độ cao dễ dàng khi sử dụng.',
        price: 1460000,
        quantity: 27,
        rating: 5,
        numReviews: 2,
        trademark: 'Vifa Sport',
        category: 'Dụng cụ tập gym',
    },
    {
        name: 'Ghế tập bụng đa năng DDS-104 ',
        image: '/images/productsghe-tap-bung-dds-104.jpg',
        description:
            'Ghế tập bụng DDS-104 được thiết kế đa năng, hỗ trợ tập cơ bụng; cơ lưng và tập thể lực hiệu quả, phù hợp sử dụng để rèn luyện tại nhà cho cả nam lẫn nữ. Với kích thước nhỏ gọn và đi kèm theo đó là nhiều chức năng tập luyện, mẫu ghế này đang được rất nhiều bạn yêu thích, lựa chọn. DỤNG CỤ THỂ DỤC xin giới thiệu tới Quý khách hàng thông tin chi tiết của chiếc ghế tập bụng đa năng DDS-104 này !',
        price: 1450000,
        quantity: 22,
        rating: 3.5,
        numReviews: 3,
        trademark: 'Khác',
        category: 'Dụng cụ tập gym',
    },
    {
        name: 'Ghế tập Gym đa năng Miking PS-031 ',
        image: '/images/productsghe-tap-gym-miking-ps-031.jpg',
        description:
            'Ghế tập Gym đa năng Miking PS-031 được thiết kế chắc chắn, hỗ trợ rất nhiều bài tập thể hình hiệu quả và phù hợp sử dụng để tập luyện tại nhà cho Gymer. Đây là mẫu ghế tập có kích thước khá nhỏ gọn và có giá bán tương đối rẻ nhưng lại tích hợp rất nhiều các bài tập Gym cho hầu hết các nhóm cơ trên cơ thể. Nếu đang có nhu cầu mua ghế tập Gym Miking PS-031 chính hãng, hãy liên hệ với Dụng Cụ Thể Dục qua số hotline 0939987456 để được hỗ trợ nhanh nhất.',
        price: 2150000,
        quantity: 10,
        rating: 5,
        numReviews: 9,
        trademark: 'Miking',
        category: 'Dụng cụ tập gym',
    },
    {
        name: 'Ghế tập tạ đa năng Thanh Xuân',
        image: '/images/productsghe-tap-ta-da-nang-thanh-xuan.jpg',
        description:
            'Ghế tập tạ đa năng Thanh Xuân được làm chắc chắn, hỗ trợ tập đẩy ngực, kéo xô, ép ngực, tập chân hiệu quả và chuyên sử dụng để tập tại nhà cho Gymer. Dụng cụ Thể dục xin giới thiệu tới toàn thể quý khách hàng thông tin chi tiết của mẫu ghế tập Gym tại nhà này!',
        price: 2250000,
        quantity: 7,
        rating: 3,
        numReviews: 2,
        trademark: 'Khác',
        category: 'Dụng cụ tập gym',
    },
    {
        name: 'Ghế tập tạ đa năng Xuki',
        image: '/images/productsghe-tap-ta-da-nang-xuki-0.jpg',
        description:
            'Ghế tập tạ đa năng Xuki chính hãng được thiết kế chắc chắn, hỗ trợ tập đẩy tạ + kéo xô + ép ngực + tập chân hiệu quả và phù hợp dùng tại nhà cho Gymer. Đây là mẫu ghế tập tạ được sản xuất tại Việt Nam và hiện nay đang được rất nhiều bạn yêu thích, mua về để tập luyện thể hình tại nhà. Dụng cụ Thể dục xin giới thiệu tới Quý khách hàng thông tin chi tiết của chiếc ghế tập tạ Xuki này!',
        price: 1850000,
        quantity: 4,
        rating: 0,
        numReviews: 0,
        trademark: 'Xuki Sport',
        category: 'Dụng cụ tập gym',
    },
];

export default products;
