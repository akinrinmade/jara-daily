
# Jara Daily — Phase 1: Addictive Content Feed

## Overview
A mobile-first content platform for Nigerian audiences featuring a TikTok-style vertical feed, gamification hooks, and a soft-gate conversion system. Built with real auth + mock content data.

---

## 1. Brand & Design System
- **Colors**: Money Green (#008751) + White, clean industrial aesthetic
- **Typography**: Inter font family
- **Theme**: Light mode default with dark mode support
- **Animations**: Smooth page transitions, XP toasts, streak confetti effects

## 2. Navigation & Layout
- **Bottom tab bar** (mobile-first): Home, Discover, Create, Notifications, Profile
- **Top bar**: Jara Daily logo + streak flame icon + notification bell
- Fully responsive — mobile-optimized but works on desktop

## 3. Home Feed (Core Experience)
- Infinite vertical scroll loading 4–6 posts per batch
- **PostCard component**: Title, cover image, category badge (Money/Hausa/Gist), author avatar, read time, reactions count, share button
- **Soft-gate blur wall**: After scrolling past 50% of a premium post, content blurs with "Sign up to unlock + earn XP" prompt
- **Trending Ribbon**: Horizontal "Top for You" carousel at the top
- **Ad Cards**: Native-looking sponsored content mixed into the feed (mock data)
- Scroll depth tracking (mock — logs to console)

## 4. Discover Page
- Search bar with category filter tabs (Money, Hausa, Gist, Trending)
- Trending posts grid/carousel
- "AI Picks for You" section (mock personalization)

## 5. Post Detail Page
- Full article view with rich text content and images
- Reaction buttons (🔥❤️😂👏), comment section, share button
- Related posts at the bottom
- XP earned toast on reading completion

## 6. Gamification System
- **XP Engine**: +10 for reading, +5 for liking, +10 for commenting, +10 for sharing
- **Rank system**: JJC (0-100) → Learner (100-500) → Chairman (500-1000) → Odogwu (1000+)
- **Streaks**: Daily login tracking with fire icon, glow effect, and confetti animation
- **XP Toast**: Animated notification when XP is earned
- **Shadow Wallet**: "You've earned 45 XP as a guest — sign up to claim!" prompt

## 7. Profile Page
- User avatar, username, rank badge, XP progress bar, streak counter
- Basic analytics: posts read, XP earned, current rank
- Saved posts list
- Simple leaderboard (Top 10 users)

## 8. Authentication (Real — via Supabase/Lovable Cloud)
- Email signup/login
- Guest browsing mode with soft-gate conversion hooks
- User profiles table (username, avatar, location_state, xp_points, streak_days, rank)

## 9. Create Page (Basic)
- Simple post creation form: title, cover image upload, body text, category selection
- Save as draft functionality
- +50 XP on publish

## 10. Notifications Page
- XP earned feed, streak reminders, social actions (likes, comments on your posts)
- Static/mock data for Phase 1

## 11. Mock Data
- 20+ realistic Nigerian content posts across Money, Hausa, and Gist categories
- Mock user profiles with Nigerian names/locations
- Mock ad campaigns with Nigerian business targeting
- Mock leaderboard and analytics data

---

## What's Deferred to Phase 2+
- Video/audio/AR media support
- AI-powered personalization & content recommendations
- Full admin dashboard with cohort analytics
- Creator economy (tips, revenue sharing, subscriptions)
- Industrial ad engine with real targeting
- Rich text editor (TipTap/Slate)
- Multi-language support
- A/B testing framework
- WebSocket real-time notifications
