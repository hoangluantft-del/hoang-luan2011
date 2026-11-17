export type WishCategory =
  | 'Thầy Cô Chủ Nhiệm'
  | 'Thầy Cô Bộ Môn'
  | 'Kỷ Niệm Mái Trường'
  | 'Cựu Học Sinh Nhắn Gửi';

export interface TributeWish {
  id: string;
  teacherName: string;
  senderName: string;
  cohort: string;
  category: WishCategory;
  message: string;
  imageDataUrl?: string;
  authorUid?: string;
  createdAt: string;
  createdAtMs?: number;
}

export interface ClassroomMomentItem {
  id: string;
  index: string;
  category: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  caption: string;
  excerpt: string;
  paragraphs: string[];
  quote: string;
  quoteAuthor: string;
  suggestedCategory: WishCategory;
}

export interface CardTemplate {
  id: 'rose' | 'blush' | 'chalkboard';
  name: string;
  subtitle: string;
  bgHex: string;
  borderHex: string;
  textHex: string;
  mutedHex: string;
  accentHex: string;
}

export interface PoemItem {
  id: string;
  title: string;
  author: string;
  yearNote: string;
  verses: string[];
  reflection: string;
}

// 100% Real Photos & Official Crest of Trường THPT Nguyễn Trãi – Phan Rang
export const SCHOOL_LOGO = '/assets/aistudio/images__4__582dab1a.jpg';
export const SCHOOL_HERO_BG = '/assets/aistudio/images__3__044e685a.jpg';
export const SCHOOL_TEACHERS_CELEBRATION =
  '/assets/aistudio/482051672_981528617523931_2105918957699460004_n_6fac7df6.jpg';
export const TEACHERS_CHARITY_PHOTO =
  '/assets/aistudio/846120126_1078717148381379_1826933418665789923_n_cff2b83b.jpg';
export const SCHOOL_STATUE_TEACHERS =
  '/assets/aistudio/481078517_981528530857273_2242691621429303589_n_874477e9.jpg';
export const SCHOOL_CLASSROOM_STUDENTS = '/assets/aistudio/81_dce001a7.jpg';
export const SCHOOL_MEETING_FLOWERS =
  '/assets/aistudio/481083493_981528554190604_3041176800614461349_n_7b851601.jpg';
export const SCHOOL_GATE_COURTYARD =
  '/assets/aistudio/484453593_4046700708987880_5607684098088346661_n_d47f391e.jpg';
export const SCHOOL_QUIZ_COMPETITION =
  '/assets/aistudio/645333472_890649470521482_8288425864662074846_n_32f35fad.jpg';
export const TEACHERS_RED_AODAI_STATUE =
  '/assets/aistudio/512667006_3509301422546223_6413151248524953051_n_2364db20.jpg';
export const TEACHERS_RED_AODAI_COURTYARD =
  '/assets/aistudio/513325045_3509301859212846_6604561026056962610_n_7ed752e9.jpg';

// 6 Newly Added Real School Photos
export const TEACHER_GUIDING_DESK = '/assets/aistudio/images__5__6f7bb46e.jpg';
export const SCHOOL_ANNIVERSARY_FLOWERS = '/assets/aistudio/images__6__d3201079.jpg';
export const SCHOOL_CEREMONY_RIBBON = '/assets/aistudio/images__7__f83bbce2.jpg';
export const SCHOOL_OPENING_FLAGS = '/assets/aistudio/img_7042_20260905093138_72253312.webp';
export const SCHOOL_AWARDS_CEREMONY =
  '/assets/aistudio/lanh_dao_nha_truong_khen_thuong_cac_em_co_thanh_tich_cao_trong_hoc_tap_20260525203532_9d7a1_17b9196a.jpg';
export const TEACHER_LIBRARY_GUIDANCE =
  '/assets/aistudio/sgk_3_20260911150349_copy_20260913181623_a369f621.webp';

export const SCHOOL_PHOTOS = [
  {
    src: TEACHER_GUIDING_DESK,
    alt: 'Thầy giáo tận tình cúi xuống hướng dẫn học sinh làm bài ngay tại bàn học',
    caption: 'Thầy giáo ân cần hướng dẫn học sinh ngay tại bàn học',
  },
  {
    src: SCHOOL_CEREMONY_RIBBON,
    alt: 'Quý thầy cô Trường THPT Nguyễn Trãi trong Lễ Khánh thành và Kỷ niệm Ngày Nhà giáo Việt Nam',
    caption: 'Lễ kỷ niệm trang trọng Ngày Nhà giáo Việt Nam tại trường',
  },
  {
    src: TEACHER_LIBRARY_GUIDANCE,
    alt: 'Cô giáo áo dài xanh hướng dẫn học sinh và phụ huynh tại thư viện trường',
    caption: 'Cô giáo tận tình hỗ trợ học sinh và phụ huynh tại thư viện',
  },
  {
    src: SCHOOL_AWARDS_CEREMONY,
    alt: 'Lãnh đạo nhà trường khen thưởng học sinh có thành tích cao trong Lễ Tổng kết năm học 2025-2026',
    caption: 'Khen thưởng học sinh đạt thành tích cao tại Lễ Tổng kết 2025–2026',
  },
  {
    src: SCHOOL_OPENING_FLAGS,
    alt: 'Học sinh các lớp xếp hàng trang nghiêm cầm cờ Tổ quốc dưới sân trường',
    caption: 'Các chi đoàn học sinh trang nghiêm trong lễ khai giảng',
  },
  {
    src: SCHOOL_ANNIVERSARY_FLOWERS,
    alt: 'Đại biểu và lãnh đạo nhà trường bên lẵng hoa chúc mừng Lễ Kỷ niệm',
    caption: 'Lẵng hoa tươi thắm chúc mừng trong ngày lễ kỷ niệm của trường',
  },
  {
    src: TEACHERS_RED_AODAI_COURTYARD,
    alt: 'Tập thể quý cô giáo Trường THPT Nguyễn Trãi trong tà áo dài đỏ dưới dòng chữ Hiền tài là nguyên khí quốc gia',
    caption: 'Quý cô giáo rạng rỡ trong tà áo dài đỏ dưới sân trường rợp cờ hoa',
  },
  {
    src: TEACHERS_RED_AODAI_STATUE,
    alt: 'Quý cô giáo Trường THPT Nguyễn Trãi mặc áo dài đỏ giơ cao cờ Tổ quốc trước tượng danh nhân Nguyễn Trãi',
    caption: 'Tập thể quý cô giáo trước tượng danh nhân Nguyễn Trãi',
  },
  {
    src: SCHOOL_QUIZ_COMPETITION,
    alt: 'Học sinh Trường THPT Nguyễn Trãi - Phan Rang tham gia Cuộc thi Tri thức học đường năm học 2025-2026',
    caption: 'Cuộc thi Tri thức học đường năm học 2025–2026 tại hội trường',
  },
  {
    src: SCHOOL_TEACHERS_CELEBRATION,
    alt: 'Quý thầy cô Trường THPT Nguyễn Trãi nhận hoa chúc mừng Ngày Nhà giáo Việt Nam 20-11',
    caption: 'Khoảnh khắc tri ân Ngày Nhà giáo Việt Nam 20-11 tại trường',
  },
  {
    src: TEACHERS_CHARITY_PHOTO,
    alt: 'Quý cô giáo Trường THPT Nguyễn Trãi tham gia quyên góp ủng hộ Quỹ Biển Đảo Việt Nam',
    caption: 'Quý cô giáo duyên dáng trong tà áo dài tham gia hoạt động thiện nguyện',
  },
  {
    src: SCHOOL_CLASSROOM_STUDENTS,
    alt: 'Thầy giáo và các bạn học sinh đứng trang nghiêm trong giờ học tại lớp',
    caption: 'Giờ học trang nghiêm và thân thương cùng thầy cô trên lớp',
  },
  {
    src: SCHOOL_STATUE_TEACHERS,
    alt: 'Tập thể giáo viên chụp ảnh lưu niệm trước tượng danh nhân Nguyễn Trãi',
    caption: 'Tập thể quý thầy cô bên tượng danh nhân Nguyễn Trãi',
  },
  {
    src: SCHOOL_MEETING_FLOWERS,
    alt: 'Hội đồng sư phạm nhà trường trong buổi họp mặt kỷ niệm 20-11',
    caption: 'Buổi họp mặt ấm áp của quý thầy cô nhân dịp 20-11',
  },
  {
    src: SCHOOL_GATE_COURTYARD,
    alt: 'Học sinh và thầy cô tập trung tại sân trường THPT Nguyễn Trãi',
    caption: 'Những buổi sinh hoạt tập thể dưới mái trường Nguyễn Trãi',
  },
  {
    src: SCHOOL_HERO_BG,
    alt: 'Toàn cảnh cổng chính Trường THPT Nguyễn Trãi',
    caption: 'Toàn cảnh mặt tiền Trường THPT Nguyễn Trãi',
  },
];

export const WISH_CATEGORIES: Array<'Tất cả' | WishCategory> = [
  'Tất cả',
  'Thầy Cô Chủ Nhiệm',
  'Thầy Cô Bộ Môn',
  'Kỷ Niệm Mái Trường',
  'Cựu Học Sinh Nhắn Gửi',
];

export const CLASSROOM_MOMENTS: ClassroomMomentItem[] = [
  {
    id: 'guiding-desk',
    index: '01',
    category: 'Tận tình trên lớp',
    title: 'Thầy giáo ân cần chỉ bảo từng bài học tại bàn',
    subtitle: 'Sự kiên nhẫn và gần gũi giúp học trò vững bước mỗi ngày',
    image: TEACHER_GUIDING_DESK,
    imageAlt: 'Thầy giáo cúi xuống hướng dẫn học sinh làm bài ngay tại bàn học trên lớp',
    caption: 'Ảnh 01 — Thầy giáo tận tâm hướng dẫn học sinh trên lớp học.',
    excerpt:
      'Những giờ học trên lớp luôn đọng lại hình ảnh người thầy kiên nhẫn cúi xuống bên từng bàn học, giải đáp tận tình từng câu hỏi cho học trò.',
    paragraphs: [
      'Không khoảng cách, không ngần ngại, thầy luôn sẵn sàng đến tận bàn học để lắng nghe vướng mắc và gợi mở cách giải bài cho từng học sinh.',
      'Chính sự tận tâm thầm lặng ấy đã giúp biết bao thế hệ học trò Trường THPT Nguyễn Trãi thêm yêu thích việc học và trưởng thành từng ngày.',
      'Nhân kỷ niệm Ngày Nhà giáo Việt Nam 20/11, hãy cùng nhau viết lời chúc gửi đến thầy giáo, cô giáo mà bạn yêu quý nhất trên bức tường tri ân.',
    ],
    quote: '“Mỗi trang vở hôm nay đều mang dấu ấn tận tâm của thầy cô trên bục giảng.”',
    quoteAuthor: 'Học sinh Trường THPT Nguyễn Trãi',
    suggestedCategory: 'Thầy Cô Bộ Môn',
  },
  {
    id: 'ceremony-20-11',
    index: '02',
    category: 'Lễ kỷ niệm 20/11',
    title: 'Khoảnh khắc trang trọng ngày Hiến chương Nhà giáo',
    subtitle: 'Quý thầy cô hội tụ dưới mái trường truyền thống Nguyễn Trãi',
    image: SCHOOL_CEREMONY_RIBBON,
    imageAlt: 'Quý thầy cô Trường THPT Nguyễn Trãi trong Lễ Khánh thành và Kỷ niệm Ngày Nhà giáo Việt Nam',
    caption: 'Ảnh 02 — Lễ kỷ niệm trang trọng Ngày Nhà giáo Việt Nam tại Trường THPT Nguyễn Trãi.',
    excerpt:
      'Trong không khí hân hoan của ngày lễ kỷ niệm, hình ảnh tập thể quý thầy cô trong tà áo dài và sơ mi trắng đứng chung khung hình thật trang nghiêm và ấm áp.',
    paragraphs: [
      'Dưới mái trường mang tên danh nhân văn hóa Nguyễn Trãi, đội ngũ thầy cô giáo luôn đoàn kết, giữ vững ngọn lửa nhiệt huyết vì sự nghiệp trồng người.',
      'Nhân dịp 20/11, tập thể học sinh xin gửi lời cảm ơn sâu sắc nhất đến toàn thể quý thầy cô đã luôn yêu thương, lắng nghe và đồng hành cùng chúng em.',
    ],
    quote: '“Ơn dạy dỗ cao dường hơn núi, nghĩa thầy trò như nước biển khơi.”',
    quoteAuthor: 'Lưu bút học trò Nguyễn Trãi',
    suggestedCategory: 'Kỷ Niệm Mái Trường',
  },
  {
    id: 'library-guidance',
    index: '03',
    category: 'Tấm lòng người cô',
    title: 'Cô giáo áo dài xanh ân cần hướng dẫn bên trang sách',
    subtitle: 'Sự chu đáo và dịu dàng trong từng hoạt động nhà trường',
    image: TEACHER_LIBRARY_GUIDANCE,
    imageAlt: 'Cô giáo mặc áo dài xanh ân cần hướng dẫn học sinh và phụ huynh tại thư viện trường',
    caption: 'Ảnh 03 — Cô giáo tận tình hướng dẫn học sinh và phụ huynh tại thư viện.',
    excerpt:
      'Từ bục giảng đến thư viện trường, sự chu đáo và nụ cười hiền hậu của cô luôn mang lại cảm giác bình yên, tin cậy cho học sinh và phụ huynh.',
    paragraphs: [
      'Mỗi khi chuẩn bị bước vào năm học mới hay những kỳ thi quan trọng, cô luôn tận tình hướng dẫn từng thủ tục, từng đầu sách để các em có hành trang tốt nhất.',
      'Kính chúc quý thầy cô ngày 20/11 thật nhiều sức khỏe, niềm vui và mãi tự hào về những thế hệ học trò Trường THPT Nguyễn Trãi – Phan Rang.',
    ],
    quote: '“Tri thức thầy cô gieo mầm hôm nay sẽ là hành trang vững chắc cho ngày mai.”',
    quoteAuthor: 'Học sinh Trường THPT Nguyễn Trãi – Phan Rang',
    suggestedCategory: 'Thầy Cô Chủ Nhiệm',
  },
];

export const WISH_PRESETS = [
  {
    label: 'Chúc Thầy/Cô tận tâm',
    text: 'Nhân ngày Nhà giáo Việt Nam 20/11, em kính chúc Thầy/Cô luôn mạnh khỏe, hạnh phúc và mãi giữ ngọn lửa nhiệt huyết với sự nghiệp trồng người. Cảm ơn Thầy/Cô đã luôn tận tâm dìu dắt chúng em.',
  },
  {
    label: 'Chúc Thầy/Cô rạng rỡ',
    text: 'Kính chúc Thầy/Cô có một ngày 20/11 thật trang trọng và ấm áp, ngập tràn hoa tươi cùng tiếng cười bên học trò. Mong Thầy/Cô luôn bình an và gặt hái nhiều niềm vui mới.',
  },
  {
    label: 'Cựu học sinh tri ân',
    text: 'Dù đã rời xa mái trường THPT Nguyễn Trãi, những bài học và lời khuyên ân cần của Thầy/Cô vẫn luôn theo em trên chặng đường trưởng thành. Kính chúc Thầy/Cô thật nhiều sức khỏe!',
  },
  {
    label: 'Thơ tặng Thầy/Cô 20/11',
    text: 'Tháng mười một nở hoa hồng thắm, / Gửi về Thầy Cô trọn vẹn tri ân. / Chúc Thầy Cô sức khỏe muôn phần, / Đưa bao thế hệ tới gần ước mơ.',
  },
];

export const CARD_TEMPLATES: CardTemplate[] = [
  {
    id: 'rose',
    name: 'Hoa Hồng Phấn 20/11',
    subtitle: 'Sắc hồng cánh sen dịu dàng, nổi bật chữ trắng',
    bgHex: '#9D174D',
    borderHex: '#F9A8D4',
    textHex: '#FFF1F2',
    mutedHex: '#FBCFE8',
    accentHex: '#FDE68A',
  },
  {
    id: 'blush',
    name: 'Giấy Hồng Ngọc Lan',
    subtitle: 'Nền hồng phấn trang nhã cùng chữ đỏ mận',
    bgHex: '#FFF1F5',
    borderHex: '#F472B6',
    textHex: '#2E1021',
    mutedHex: '#831843',
    accentHex: '#BE185D',
  },
  {
    id: 'chalkboard',
    name: 'Bảng Xanh Kỷ Niệm',
    subtitle: 'Nét phấn trắng truyền thống bên nhành hoa',
    bgHex: '#14532D',
    borderHex: '#86EFAC',
    textHex: '#F8FAFC',
    mutedHex: '#BBF7D0',
    accentHex: '#FDE047',
  },
];

export const CHALKBOARD_POEMS: PoemItem[] = [
  {
    id: 'tri-an-thay-co',
    title: 'Đóa hoa gửi quý Thầy Cô',
    author: 'Học sinh Nguyễn Trãi',
    yearNote: 'Lễ Kỷ Niệm 20/11',
    verses: [
      'Nắng sân trường trải vàng qua ô cửa,',
      'Hoa hồng tươi nở rộ đón tháng Mười Một về.',
      'Thầy cô miệt mài bên trang giáo án,',
      'Gieo vào lòng chúng em biết bao điều tử tế.',
      '',
      'Cảm ơn Thầy Cô những buổi chiều ở lại,',
      'Lắng nghe từng ước mơ vụng dại tuổi học trò.',
      'Kính chúc Thầy Cô luôn rạng ngời hạnh phúc,',
      'Vững tay chèo đưa lớp tới bến mơ.',
    ],
    reflection:
      'Những vần thơ trang trọng thay cho lời cảm ơn chân thành nhất gửi tới toàn thể quý Thầy Cô Trường THPT Nguyễn Trãi nhân dịp kỷ niệm Ngày Nhà giáo Việt Nam 20/11.',
  },
  {
    id: 'bui-phan',
    title: 'Bụi phấn trên mái đầu',
    author: 'Cảm tác 20/11',
    yearNote: 'Khúc hát tri ân kinh điển',
    verses: [
      'Khi thầy viết bảng, bụi phấn rơi rơi',
      'Có hạt bụi nào rơi trên bục giảng',
      'Có hạt bụi nào vương trên tóc thầy...',
      '',
      'Em yêu phút giây này, thầy em tóc như bạc thêm',
      'Bạc thêm vì bụi phấn, để cho em bài học hay.',
      'Mai sau lớn nên người, làm sao có thể nào quên',
      'Ngày xưa thầy dạy dỗ, khi em tuổi còn thơ.',
    ],
    reflection:
      'Giai điệu quen thuộc mỗi mùa hiến chương lại vang lên nơi sân trường, nhắc nhớ về sự hy sinh lặng lẽ của những người gieo mầm tri thức.',
  },
  {
    id: 'chuyen-do',
    title: 'Người lái đò thầm lặng',
    author: 'Thảo Nguyên',
    yearNote: 'Thơ lục bát báo tường',
    verses: [
      'Một đời cần mẫn sớm trưa',
      'Chở bao thế hệ sang bờ ước mơ',
      'Phấn rơi điểm bạc mái đầu',
      'Vẫn nguyên ánh mắt ân cần thiết tha.',
      '',
      'Dẫu cho năm tháng đi qua',
      'Lời thầy năm cũ vẫn là hành trang',
      'Hôm nay hoa nở ngập tràn',
      'Kính dâng thầy cô trọn ngàn tri ân.',
    ],
    reflection:
      'Hình ảnh người lái đò cần mẫn vượt sông đã trở thành biểu tượng đẹp đẽ nhất về tình nghĩa thầy trò trong văn hóa Việt Nam.',
  },
];
