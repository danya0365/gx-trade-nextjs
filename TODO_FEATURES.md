# TODO FEATURES - Detailed Implementation Guide

**โปรเจค:** Gold Exchange Trade - ระบบวิเคราะห์ราคาทอง  
**วันที่สร้าง:** 2025-10-15

---

## 📑 สารบัญ

1. [Gold Price Display System](#1-gold-price-display-system)
2. [Community & Social Features](#2-community--social-features)
3. [Gamification System](#3-gamification-system)
4. [Achievements & Challenges](#4-achievements--challenges)
5. [Portfolio & Analytics](#5-portfolio--analytics)
6. [Additional Features](#6-additional-features)

---

## 1. Gold Price Display System

### Routes: `/` และ `/prices`

### Components ที่ต้องสร้าง
- `GoldPriceCard` - แสดงราคาทองคำแท่ง/รูปพรรณ
- `PriceChangeIndicator` - แสดงการเปลี่ยนแปลง
- `PriceChart` - กราฟราคา (recharts)
- `PriceCalculator` - คำนวณราคา
- `TechnicalIndicators` - แสดง indicators

### Zustand Store: `goldPriceStore.ts`
```typescript
interface GoldPriceStore {
  currentPrices: GoldPrice[];
  historicalPrices: HistoricalPrice[];
  fetchPrices: () => Promise<void>;
  refreshPrices: () => void;
}
```

### Mock Data: `public/data/gold-prices.json`
- ราคาปัจจุบัน (ทองคำแท่ง/รูปพรรณ)
- ราคาย้อนหลัง (1D, 1W, 1M, 3M, 6M, 1Y)
- Volume และ technical data

---

## 2. Community & Social Features

### Route: `/community`

### Components
- `PostList` - รายการโพสต์
- `PostCard` - Card โพสต์
- `CreatePostModal` - สร้างโพสต์
- `CommentSection` - ความคิดเห็น
- `ReactionPicker` - Reactions (👍❤️😂😮)

### Zustand Store: `communityStore.ts`
```typescript
interface CommunityStore {
  posts: Post[];
  comments: Record<string, Comment[]>;
  createPost: (post: CreatePostData) => Promise<void>;
  likePost: (postId: string) => void;
  addComment: (postId: string, comment: string) => Promise<void>;
}
```

### Post Categories
- 📊 การวิเคราะห์ (Analysis)
- 📰 ข่าวสาร (News)
- ❓ คำถาม (Question)
- 💬 พูดคุย (Discussion)

---

## 3. Gamification System

### Route: `/gamification`

### Components
- `LevelProgressBar` - Progress bar
- `LevelBadge` - Badge level
- `XPGainAnimation` - Animation XP
- `PointsBalance` - ยอด points
- `RewardsCatalog` - รายการรางวัล
- `LeaderboardTable` - ตารางอันดับ

### Zustand Store: `gamificationStore.ts`
```typescript
interface GamificationStore {
  userLevel: UserLevel;
  points: number;
  xpActivities: XPActivity[];
  addXP: (activity: string, amount: number) => void;
  redeemReward: (rewardId: string) => void;
}
```

### XP Activities
- POST_CREATE: 10 XP
- COMMENT: 5 XP
- DAILY_LOGIN: 20 XP
- PRICE_CHECK: 3 XP
- CHALLENGE_COMPLETE: 50 XP
- ACHIEVEMENT_UNLOCK: 100 XP

### Level Tiers
1. มือใหม่ 🥉 (0 XP)
2. นักลงทุนมือใหม่ 🥈 (500 XP)
3. นักวิเคราะห์ 🥇 (1500 XP)
4. ผู้เชี่ยวชาญ 💎 (3000 XP)
5. ปรมาจารย์ 👑 (5000 XP)

---

## 4. Achievements & Challenges

### Route: `/achievements` และ `/challenges`

### Achievement Components
- `AchievementGallery` - Gallery
- `AchievementCard` - Card achievement
- `AchievementProgressBar` - Progress
- `AchievementNotification` - แจ้งเตือน

### Challenge Components
- `ChallengeList` - รายการ challenges
- `ChallengeCard` - Card challenge
- `ChallengeProgressTracker` - ติดตาม progress
- `ChallengeCompletionModal` - Modal เมื่อทำสำเร็จ

### Stores
```typescript
// achievementStore.ts
interface AchievementStore {
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
}

// challengeStore.ts
interface ChallengeStore {
  activeChallenges: Challenge[];
  completedChallenges: Challenge[];
  acceptChallenge: (id: string) => void;
  completeChallenge: (id: string) => void;
}
```

### Achievement Categories
- 💰 Trading (Price checks, watchlist)
- 👥 Social (Posts, comments, followers)
- 📚 Learning (Courses, quizzes)
- 🌟 Community (Helpful votes, reputation)
- 🏆 Special (Beta tester, anniversaries)

### Challenge Types
- 🌅 Daily (เช้า-ค่ำ)
- 📅 Weekly (7 วัน)
- ⭐ Special (Events)
- 🔥 Limited Time

---

## 5. Portfolio & Analytics

### Portfolio Route: `/portfolio`

### Components
- `PortfolioDashboard` - Dashboard
- `HoldingsTable` - ตารางทอง
- `PortfolioChart` - กราฟมูลค่า
- `ProfitLossCard` - กำไร/ขาดทุน
- `TransactionList` - ธุรกรรม

### Store: `portfolioStore.ts`
```typescript
interface PortfolioStore {
  holdings: Holding[];
  summary: PortfolioSummary;
  addHolding: (holding: Omit<Holding, 'id'>) => void;
  calculatePortfolio: () => void;
}
```

### Analytics Route: `/analytics`

### Components
- `ActivityHeatmap` - Heatmap
- `PerformanceChart` - กราฟประสิทธิภาพ
- `EngagementMetrics` - Metrics
- `MarketOverviewDashboard` - ภาพรวม

---

## 6. Additional Features

### News System (`/news`)
- `NewsFeed` - รายการข่าว
- `NewsCard` - Card ข่าว
- `NewsDetailPage` - รายละเอียด
- Mock: `public/data/news.json`

### Learning Center (`/learn`)
- `CourseCatalog` - คอร์ส
- `CourseDetailPage` - รายละเอียด
- `LessonPlayer` - เล่นบทเรียน
- `QuizComponent` - ทำแบบทดสอบ
- Mock: `public/data/courses.json`

### Watchlist (`/watchlist`)
- `WatchlistTable` - ตาราง
- `AddAlertModal` - สร้าง alert
- `AlertCard` - Card alert
- Store: `watchlistStore.ts`

### Social Trading (`/trading`)
- `TradingIdeasFeed` - Ideas
- `IdeaCard` - Card idea
- `TraderProfileCard` - Profile
- Store: `tradingStore.ts`

### Notifications (`/notifications`)
- `NotificationList` - รายการ
- `NotificationCard` - Card
- `NotificationBadge` - Badge
- Store: `notificationStore.ts`

### Settings (`/settings`)
- `SettingsPage` - หน้าตั้งค่า
- `ProfileSettings` - โปรไฟล์
- `NotificationPreferences` - การแจ้งเตือน
- `ThemeCustomization` - ธีม

---

## 📦 Mock Data Files

### ไฟล์ JSON ที่ต้องสร้าง
1. `gold-prices.json` - ราคาทอง
2. `users.json` - ผู้ใช้
3. `posts.json` - โพสต์ชุมชน
4. `achievements.json` - Achievements
5. `challenges.json` - Challenges
6. `news.json` - ข่าว
7. `courses.json` - คอร์ส
8. `trading-ideas.json` - Trading ideas
9. `notifications.json` - แจ้งเตือน

---

## 🎨 UI/UX Guidelines

### Color Palette (Golden Theme)
- **Primary Gold:** #FFD700, #FFA500, #FF8C00
- **Amber:** #FFC107, #FFB300, #FFA000
- **Rich Gold:** #B8860B, #DAA520, #CD853F
- **Success:** #4CAF50
- **Error:** #F44336
- **Neutral:** #F5F5F5, #E0E0E0, #9E9E9E

### Typography
- **Font:** Modern sans-serif (Inter, Poppins)
- **Headings:** Bold, 700 weight
- **Body:** Regular, 400 weight
- **Numbers:** Tabular figures

### Component Patterns
- **Card-based layouts**
- **Glassmorphism effects**
- **Smooth animations** (framer-motion)
- **Micro-interactions**
- **Skeleton loaders**
- **Toast notifications**
- **Modal dialogs**
- **Bottom sheets** (mobile)

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 🔧 Technical Implementation

### Presenter Pattern (ทุกหน้า)
```typescript
// 1. Create Presenter
class [Feature]Presenter {
  constructor(private supabase: SupabaseClient) {}
  async getViewModel(): Promise<ViewModel> {}
}

// 2. Create Hook
export function use[Feature]Presenter() {
  const [state, setState] = useState();
  return [state, actions];
}

// 3. Create View
export function [Feature]View({ initialViewModel }) {
  const [state, actions] = use[Feature]Presenter();
  return <div>...</div>;
}

// 4. Create Page
export default async function [Feature]Page() {
  const presenter = [Feature]PresenterFactory.createServer();
  const viewModel = await presenter.getViewModel();
  return <[Feature]View initialViewModel={viewModel} />;
}
```

### Zustand Pattern
```typescript
export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // state
      data: [],
      // actions
      fetchData: async () => {
        const data = await fetch('/data/...');
        set({ data });
      },
    }),
    {
      name: 'store-name',
      storage: createJSONStorage(() => localforage),
    }
  )
);
```

---

## ✅ Implementation Checklist

### Phase 1: Foundation
- [ ] Setup project structure
- [ ] Create design system
- [ ] Setup Zustand stores
- [ ] Create mock data files

### Phase 2: Core Features
- [ ] Gold price display
- [ ] Community forum
- [ ] Gamification system
- [ ] Achievements
- [ ] Challenges

### Phase 3: Additional Features
- [ ] Portfolio management
- [ ] News & insights
- [ ] Learning center
- [ ] Watchlist & alerts
- [ ] Social trading

### Phase 4: Polish
- [ ] Animations
- [ ] Responsive design
- [ ] Performance optimization
- [ ] Testing
- [ ] Documentation

---

**หมายเหตุ:** 
- ทุก page ต้องทำตาม `CREATE_PAGE_PATTERN.md`
- ใช้ Presenter Pattern + Zustand
- Mock data ทั้งหมด client-side
- UI ต้องสดใส สวยงาม มีความสุข
- Clean Architecture + SOLID principles

**Last Updated:** 2025-10-15
