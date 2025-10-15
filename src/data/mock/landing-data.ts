/**
 * Mock data for landing page
 * ข้อมูล mock สำหรับหน้า Landing
 */

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: "market" | "analysis" | "global" | "thailand";
  publishedAt: string;
  imageUrl?: string;
  source: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface PlatformStats {
  totalUsers: number;
  dailyActiveUsers: number;
  totalPosts: number;
  totalAchievements: number;
}

/**
 * Latest news
 */
export const latestNews: NewsItem[] = [
  {
    id: "news-1",
    title: "ราคาทองคำวันนี้ปรับตัวขึ้น 150 บาท",
    description:
      "ราคาทองคำในประเทศปรับตัวขึ้นตามราคาตลาดโลก หลังดอลลาร์อ่อนค่า และความกังวลเศรษฐกิจโลก",
    category: "market",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    source: "GX Trade News",
  },
  {
    id: "news-2",
    title: "วิเคราะห์แนวโน้มราคาทองสัปดาห์นี้",
    description:
      "ผู้เชี่ยวชาญคาดการณ์ราคาทองมีแนวโน้มปรับตัวขึ้นต่อเนื่อง จับตาประกาศข้อมูลเศรษฐกิจสหรัฐ",
    category: "analysis",
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    source: "Gold Analysis Team",
  },
  {
    id: "news-3",
    title: "ธนาคารกลางสหรัฐขึ้นดอกเบี้ย กระทบตลาดทอง",
    description:
      "FED ประกาศขึ้นอัตราดอกเบี้ย 0.25% ส่งผลให้ราคาทองคำโลกมีความผันผวน",
    category: "global",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    source: "Global Markets",
  },
  {
    id: "news-4",
    title: "ความต้องการทองในไทยเพิ่มขึ้น 15%",
    description:
      "ยอดซื้อทองคำในประเทศเพิ่มขึ้นจากเดือนก่อน สะท้อนความเชื่อมั่นของนักลงทุน",
    category: "thailand",
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    source: "Thailand Gold Association",
  },
];

/**
 * Platform features
 */
export const features: Feature[] = [
  {
    id: "feature-1",
    title: "ราคาทอง Real-time",
    description:
      "ติดตามราคาทองคำแท่งและทองรูปพรรณแบบ real-time อัพเดททุกนาที",
    icon: "TrendingUp",
    color: "from-gold-400 to-amber-500",
  },
  {
    id: "feature-2",
    title: "กราฟวิเคราะห์ขั้นสูง",
    description:
      "เครื่องมือวิเคราะห์กราฟแบบมืออาชีพ พร้อม Technical Indicators",
    icon: "BarChart3",
    color: "from-blue-400 to-indigo-500",
  },
  {
    id: "feature-3",
    title: "ชุมชนนักลงทุน",
    description:
      "แลกเปลี่ยนความคิดเห็น แชร์กลยุทธ์ และเรียนรู้จากผู้เชี่ยวชาญ",
    icon: "Users",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: "feature-4",
    title: "ระบบรางวัล",
    description: "สะสมแต้ม ปลดล็อครางวัล และแข่งขันกับเพื่อนๆ",
    icon: "Award",
    color: "from-orange-400 to-red-500",
  },
  {
    id: "feature-5",
    title: "คอร์สเรียนรู้",
    description: "บทเรียนการลงทุนทองคำจากพื้นฐานถึงขั้นสูง",
    icon: "BookOpen",
    color: "from-green-400 to-emerald-500",
  },
  {
    id: "feature-6",
    title: "แจ้งเตือนราคา",
    description: "ตั้งค่าแจ้งเตือนเมื่อราคาทองถึงระดับที่คุณต้องการ",
    icon: "Bell",
    color: "from-yellow-400 to-orange-500",
  },
];

/**
 * User testimonials
 */
export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "สมชาย ใจดี",
    role: "นักลงทุนทองคำ",
    content:
      "GX Trade ช่วยให้ผมติดตามราคาทองได้สะดวกมาก กราฟวิเคราะห์ก็ใช้งานง่าย แนะนำเลยครับ",
    rating: 5,
  },
  {
    id: "testimonial-2",
    name: "สุดา รักทอง",
    role: "เจ้าของร้านทอง",
    content:
      "ใช้ GX Trade ทุกวันเพื่อเช็คราคาทอง ข้อมูลอัพเดทรวดเร็ว แม่นยำ ช่วยในการตัดสินใจได้ดีมาก",
    rating: 5,
  },
  {
    id: "testimonial-3",
    name: "วิชัย นักวิเคราะห์",
    role: "นักวิเคราะห์การเงิน",
    content:
      "เครื่องมือวิเคราะห์ครบครัน ใช้งานง่าย เหมาะกับทั้งมือใหม่และมืออาชีพ ระบบชุมชนก็น่าสนใจ",
    rating: 4,
  },
];

/**
 * Platform statistics
 */
export const platformStats: PlatformStats = {
  totalUsers: 125430,
  dailyActiveUsers: 45280,
  totalPosts: 89340,
  totalAchievements: 234,
};
