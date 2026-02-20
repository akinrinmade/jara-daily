import { Post, AdCampaign, UserProfile, Notification, LeaderboardEntry } from '@/types';

const AUTHORS = [
  { id: 'u1', name: 'Chidi Okonkwo', avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Chidi', rank: 'Chairman' as const },
  { id: 'u2', name: 'Amina Bello', avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Amina', rank: 'Odogwu' as const },
  { id: 'u3', name: 'Emeka Nwosu', avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Emeka', rank: 'Learner' as const },
  { id: 'u4', name: 'Fatima Abdullahi', avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Fatima', rank: 'Chairman' as const },
  { id: 'u5', name: 'Tunde Adeyemi', avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Tunde', rank: 'JJC' as const },
  { id: 'u6', name: 'Ngozi Eze', avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Ngozi', rank: 'Odogwu' as const },
  { id: 'u7', name: 'Ibrahim Musa', avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Ibrahim', rank: 'Learner' as const },
  { id: 'u8', name: 'Blessing Okoro', avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Blessing', rank: 'Chairman' as const },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1', title: 'How I Made ₦500K from Forex in 30 Days', slug: 'forex-500k-30-days',
    content: 'The forex market in Nigeria has exploded. With the right strategy, consistent discipline, and proper risk management, making significant returns is possible. Here\'s my step-by-step journey from a ₦50K capital to ₦500K in just one month.\n\nFirst, I started by learning the basics through free YouTube courses and joining Telegram groups of experienced traders. The key was not jumping in blindly but understanding candlestick patterns, support/resistance levels, and money management.\n\nI used a 2% risk per trade rule — never risking more than ₦1,000 on any single trade. This kept my emotions in check and prevented me from blowing my account like many beginners do.\n\nThe breakthrough came in week 3 when I identified a strong trend on GBP/USD. I entered with confidence, set my stop loss tight, and let the trade run. That single trade netted me ₦120K.\n\nBy the end of the month, my account had grown from ₦50K to ₦500K. But remember — this isn\'t financial advice. Trading involves risk, and you should only invest what you can afford to lose.',
    excerpt: 'The forex market in Nigeria has exploded. With the right strategy and discipline, here\'s how I turned ₦50K into ₦500K.',
    category: 'Money', imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
    isPremium: true, createdAt: '2026-02-18T08:00:00Z', readTime: 5, views: 12400, shares: 890, reactionsCount: 2340, commentsCount: 456, author: AUTHORS[0]
  },
  {
    id: 'p2', title: 'Labarin Yadda Ake Samun Nasara a Kasuwa', slug: 'nasara-kasuwa',
    content: 'Kasuwa ita ce ginshikin tattalin arzikin Nijeriya. Ko kana cikin garin Kano, Lagos, ko Aba, fahimtar yadda ake gudanar da kasuwanci zai taimaka maka wajen samun nasara.\n\nAbu na farko shi ne ka san abin da mutane suke bukata. Ba za ka iya siyar da kayan da ba a bukata ba. Ka yi bincike, ka tambayi mutane, ka duba abin da ake nema a social media.\n\nAbu na biyu shi ne ka fara da karamin jari. Ba lallai ka sami miliyoyin Naira ba kafin ka fara kasuwanci. Da ₦10,000 ma za ka iya fara siyar da kayan kwalliya ko abinci.\n\nKuma ka tuna — amana ita ce babbar jari a kasuwanci. Idan mutane sun amince da kai, za su ci gaba da zuwa wurinka.',
    excerpt: 'Koyi yadda ake samun nasara a kasuwa da karamin jari. Bayanai masu amfani ga \'yan kasuwa.',
    category: 'Hausa', imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    isPremium: false, createdAt: '2026-02-17T14:00:00Z', readTime: 4, views: 8900, shares: 1200, reactionsCount: 1890, commentsCount: 234, author: AUTHORS[1]
  },
  {
    id: 'p3', title: 'Lagos Big Boy Lifestyle: What They Don\'t Tell You', slug: 'lagos-big-boy',
    content: 'Everybody wan be Big Boy for Lagos. The flashy cars, designer clothes, VIP sections at clubs — it looks glamorous on Instagram. But what really goes on behind the scenes?\n\nI spent 6 months interviewing some of Lagos\'s most visible socialites, and the truth will shock you. Many of them are living on credit, borrowing money to maintain appearances while their actual income can\'t sustain their lifestyle.\n\nOne guy told me he spends ₦2M monthly on "packaging" — that\'s clothes, car maintenance, club appearances, and social media content creation. His actual salary? ₦350K.\n\nThe pressure to appear wealthy in Lagos is real. Social media has made it worse. Young people are taking dangerous financial risks just to post pictures that make them look successful.\n\nBut there\'s a growing counter-movement of young Nigerians choosing authenticity over appearances. They\'re building real wealth quietly while others are going broke trying to look rich.',
    excerpt: 'The truth about Lagos Big Boy culture — flashy lifestyle vs. financial reality. What really goes on behind the gram.',
    category: 'Gist', imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
    isPremium: true, createdAt: '2026-02-17T10:00:00Z', readTime: 6, views: 23500, shares: 3400, reactionsCount: 5670, commentsCount: 890, author: AUTHORS[2]
  },
  {
    id: 'p4', title: '5 Side Hustles Every Nigerian Should Know About', slug: '5-side-hustles',
    content: 'With inflation hitting hard, having one source of income is no longer enough. Here are 5 proven side hustles that Nigerians are using to make extra money in 2026.\n\n1. **Freelance Writing** — Companies worldwide need content writers. Platforms like Upwork and Fiverr are goldmines.\n\n2. **Mini Importation** — Buy goods from AliExpress and sell locally at 2-3x markup.\n\n3. **Digital Marketing** — Learn Facebook/Instagram ads and offer services to small businesses.\n\n4. **Online Tutoring** — If you\'re good at math, English, or JAMB prep, parents will pay.\n\n5. **Food Business** — Start from your kitchen. Small chops, chin chin, and zobo are always in demand.',
    excerpt: 'Inflation hitting hard? Here are 5 proven side hustles Nigerians are using to make extra money in 2026.',
    category: 'Money', imageUrl: 'https://images.unsplash.com/photo-1553729459-uj1ef3a64b4-klmn?w=600&h=400&fit=crop',
    isPremium: false, createdAt: '2026-02-16T12:00:00Z', readTime: 3, views: 18700, shares: 2100, reactionsCount: 3450, commentsCount: 567, author: AUTHORS[3]
  },
  {
    id: 'p5', title: 'Yadda Ake Kula da Lafiya a Lokacin Rani', slug: 'lafiya-rani',
    content: 'Lokacin rani a Nijeriya yana iya zama mai tsanani sosai. Zazzabi kan kai digiri 40 zuwa 45. Ga yadda za ka kula da lafiyarka.\n\nSha ruwa da yawa — aƙalla lita 3 zuwa 4 a rana. Guje wa shan ruwan sanyi kai tsaye daga firiji domin yana iya sa maka ciwon makogwaro.\n\nCi abinci masu ruwa da yawa kamar watermelon, cucumber, da orange. Wadannan suna taimaka wa jikinka rike ruwa.\n\nSa tufafi masu haske da saukin nauyi. Guje wa tufafi masu duhu domin suna jan zafi.',
    excerpt: 'Lokacin rani ya zo — ga shawarwari kan yadda za ka kula da lafiyarka a wannan yanayi mai zafi.',
    category: 'Hausa', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    isPremium: false, createdAt: '2026-02-16T09:00:00Z', readTime: 3, views: 6700, shares: 890, reactionsCount: 1230, commentsCount: 145, author: AUTHORS[4]
  },
  {
    id: 'p6', title: 'Davido vs Wizkid: The Never-Ending Rivalry', slug: 'davido-wizkid-rivalry',
    content: 'The rivalry between Davido and Wizkid has defined Nigerian pop culture for over a decade. But in 2026, is it still relevant? Let\'s break it down.\n\nDavido — the energetic, generous "People\'s Champion" who connects with fans through grand gestures and hit collaborations. His music appeals to the street, the club, and everywhere in between.\n\nWizkid — the cool, mysterious "Starboy" whose evolution from "Holla at Your Boy" to Grammy winner has been nothing short of legendary. He lets the music speak and rarely engages in public drama.\n\nThe truth is, both artists have elevated Nigerian music globally. Instead of choosing sides, maybe it\'s time we celebrate both for putting Afrobeats on the world map.',
    excerpt: 'The decade-long rivalry that defined Nigerian pop culture. Is it still relevant in 2026?',
    category: 'Gist', imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
    isPremium: false, createdAt: '2026-02-15T16:00:00Z', readTime: 4, views: 34200, shares: 5600, reactionsCount: 8900, commentsCount: 2340, author: AUTHORS[5]
  },
  {
    id: 'p7', title: 'How to Save ₦1 Million in 12 Months on a Nigerian Salary', slug: 'save-1m-12months',
    content: 'Saving ₦1 Million in one year sounds impossible on a Nigerian salary, but with the right strategy, it\'s achievable. Here\'s the math and the plan.\n\nYou need to save approximately ₦83,333 per month. If your salary is ₦200K, that\'s about 42% of your income. Aggressive? Yes. Impossible? No.\n\nStep 1: Track every kobo you spend for one month. You\'ll be shocked at where your money goes.\n\nStep 2: Cut unnecessary expenses. That daily ₦500 coffee? That\'s ₦15,000/month. The DSTV premium? Downgrade to compact.\n\nStep 3: Automate your savings. Set up a standing order to move money to a savings account on salary day — BEFORE you start spending.\n\nStep 4: Find one additional income source. Even ₦30K extra monthly makes the target much more achievable.',
    excerpt: 'Think saving ₦1M is impossible on a Nigerian salary? Here\'s a practical 12-month plan that actually works.',
    category: 'Money', imageUrl: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop',
    isPremium: true, createdAt: '2026-02-15T11:00:00Z', readTime: 5, views: 15600, shares: 1800, reactionsCount: 4560, commentsCount: 678, author: AUTHORS[6]
  },
  {
    id: 'p8', title: 'The Rise of Amapiano in Northern Nigeria', slug: 'amapiano-north',
    content: 'Amapiano, the South African-born genre, has taken Nigeria by storm. But its spread into Northern Nigeria is a cultural phenomenon worth examining.\n\nFrom Kaduna to Kano, young Northerners are embracing Amapiano in ways nobody predicted. DJs in Hausa clubs are mixing Amapiano beats with traditional Hausa melodies, creating a unique fusion.\n\nThe genre\'s infectious log drums and piano melodies transcend language barriers, making it the perfect crossover music. Even at traditional events like weddings and naming ceremonies, Amapiano tracks are becoming staples.',
    excerpt: 'How South African Amapiano conquered Northern Nigerian clubs and weddings — a cultural fusion story.',
    category: 'Gist', imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=400&fit=crop',
    isPremium: false, createdAt: '2026-02-14T15:00:00Z', readTime: 4, views: 11200, shares: 1500, reactionsCount: 2780, commentsCount: 345, author: AUTHORS[7]
  },
  {
    id: 'p9', title: 'Crypto in Nigeria: What EFCC Doesn\'t Want You to Know', slug: 'crypto-efcc',
    content: 'Nigeria is the largest crypto market in Africa, yet the regulatory landscape remains murky. Despite CBN\'s ban on bank-crypto transactions, Nigerians have found creative ways to trade.\n\nP2P platforms have exploded, with billions of naira exchanged monthly. Young Nigerians see crypto as their escape from a depreciating naira and limited traditional investment options.\n\nBut the EFCC has been cracking down, sometimes targeting legitimate traders alongside actual fraudsters. This creates a chilling effect that pushes the industry underground rather than bringing it into the light.\n\nThe real solution? Clear, fair regulation that protects consumers while allowing innovation to flourish.',
    excerpt: 'Nigeria leads Africa\'s crypto market despite bans. What\'s really happening behind the regulatory curtain?',
    category: 'Money', imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop',
    isPremium: true, createdAt: '2026-02-14T10:00:00Z', readTime: 6, views: 28900, shares: 4200, reactionsCount: 6780, commentsCount: 1230, author: AUTHORS[0]
  },
  {
    id: 'p10', title: 'Mene ne Sirrin Nasarar \'Yan Kasuwa na Kano?', slug: 'sirrin-kasuwa-kano',
    content: 'Kano ta shahara da kasuwanci tun zamanin da. \'Yan kasuwa na Kano sun san yadda ake yin kasuwanci da sana\'a. Mene ne sirrinsu?\n\nNa farko, sun koyi kasuwanci tun suna yara. Yawancinsu sun fara taimaka wa iyayensu a shago tun suna da shekaru 10.\n\nNa biyu, suna da haƙuri da juriya. Ba sa son yin gaggawa — suna gina kasuwancinsu sannu a hankali.\n\nNa uku, amana ce babbar jari a gare su. \'Dan kasuwa na Kano zai fi son ya yi hasara kan ya ɓata sunansa.',
    excerpt: 'Sanin sirrin kasuwancin \'yan Kano — amana, haƙuri, da hikimar da suka gada daga kakanni.',
    category: 'Hausa', imageUrl: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=600&h=400&fit=crop',
    isPremium: false, createdAt: '2026-02-13T13:00:00Z', readTime: 4, views: 7800, shares: 1100, reactionsCount: 1670, commentsCount: 234, author: AUTHORS[1]
  },
  {
    id: 'p11', title: 'Nollywood\'s Global Takeover: Behind the Numbers', slug: 'nollywood-global',
    content: 'Nollywood now ranks as the third-largest film industry globally by volume. But in 2026, it\'s not just about quantity — the quality revolution is real.\n\nNetflix, Amazon Prime, and Disney+ are all competing for Nigerian content. Production budgets that were once ₦5M are now ₦500M+. Actors who were earning ₦200K per movie are now commanding ₦50M+.\n\nThe diaspora audience has been crucial. Nigerians abroad are hungry for content that reflects their culture, and streaming platforms are delivering.',
    excerpt: 'From Onitsha VHS to Netflix billions — how Nollywood became a global entertainment powerhouse.',
    category: 'Gist', imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&h=400&fit=crop',
    isPremium: false, createdAt: '2026-02-13T09:00:00Z', readTime: 5, views: 19800, shares: 2900, reactionsCount: 4560, commentsCount: 567, author: AUTHORS[2]
  },
  {
    id: 'p12', title: 'Best Investment Apps for Nigerians in 2026', slug: 'investment-apps-2026',
    content: 'The fintech revolution has made investing accessible to every Nigerian with a smartphone. Here are the top investment apps you should be using in 2026.\n\n1. **Bamboo** — Access US stocks and ETFs with as little as $1\n2. **Risevest** — Dollar-denominated investments in real estate, stocks, and fixed income\n3. **Cowrywise** — Automated savings and mutual fund investments\n4. **PiggyVest** — The OG savings app, now with investment options\n5. **Trove** — Trade Nigerian and US stocks from one app\n\nThe key is to start small and be consistent. Even ₦5,000 monthly invested wisely can grow significantly over time.',
    excerpt: 'The best apps to grow your money in 2026. Start investing with as little as ₦1,000.',
    category: 'Money', imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&h=400&fit=crop',
    isPremium: false, createdAt: '2026-02-12T14:00:00Z', readTime: 4, views: 22100, shares: 3100, reactionsCount: 5670, commentsCount: 890, author: AUTHORS[3]
  },
  {
    id: 'p13', title: 'Why Jollof Rice Wars Will Never End', slug: 'jollof-wars',
    content: 'Nigeria vs Ghana. The eternal debate. Whose jollof is better? After traveling to both countries and tasting jollof from Accra to Lagos, here\'s my honest verdict.\n\nNigerian jollof — smoky, rich, complex flavors. The party jollof with that distinct "firewood" taste is unmatched. It\'s bold, unapologetic, and never bland.\n\nGhanaian jollof — lighter, more fragrant, with a distinct tomato-forward flavor. It\'s elegant and refined.\n\nThe truth? Both are amazing. But Nigerian party jollof with extra pepper and perfectly charred bottom (the famous "bottom pot") hits different. Sorry Ghana. 🇳🇬',
    excerpt: 'The great jollof debate: Nigeria vs Ghana. One writer travels both countries for the ultimate verdict.',
    category: 'Gist', imageUrl: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&h=400&fit=crop',
    isPremium: false, createdAt: '2026-02-12T10:00:00Z', readTime: 3, views: 41200, shares: 7800, reactionsCount: 12300, commentsCount: 3450, author: AUTHORS[4]
  },
  {
    id: 'p14', title: 'Yadda Za Ka Fara Noman Lambu a Gida', slug: 'noman-lambu',
    content: 'Noman lambu a gida ba wai kawai yana rage kashe kudi ba, yana kuma da amfani ga lafiya. Ga yadda za ka fara.\n\nZabi wurin da rana take kaiwa aƙalla awanni 6 a rana. Shirya ƙasar ta hanyar haɗa taki da yashi.\n\nFara da shuke-shuke masu sauƙin girma kamar tumatir, albasa, tattasai, da ganyen alayyahu. Wadannan ba sa buƙatar kulawa mai yawa.',
    excerpt: 'Koyi yadda za ka fara noman lambu a gidanka — rage kashe kudi ka kuma sami abinci mai gina jiki.',
    category: 'Hausa', imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
    isPremium: false, createdAt: '2026-02-11T11:00:00Z', readTime: 3, views: 5400, shares: 670, reactionsCount: 980, commentsCount: 123, author: AUTHORS[5]
  },
  {
    id: 'p15', title: 'How to Start a POS Business with ₦100K', slug: 'pos-business-100k',
    content: 'POS business remains one of the most profitable small businesses in Nigeria. With as little as ₦100K, you can start generating daily income. Here\'s how.\n\nFirst, register with an agent banking provider like OPay, Moniepoint, or Palmpay. The registration is usually free.\n\nNext, get a POS terminal. Some providers give terminals for free, while others charge ₦10K-₦20K.\n\nLocation is everything. Set up near a market, bus stop, or residential area with limited bank access. Your daily transactions can range from ₦200K to ₦1M, earning you 0.5-1% commission on each.',
    excerpt: 'Start earning daily income with a POS business. Complete guide to starting with just ₦100K capital.',
    category: 'Money', imageUrl: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=600&h=400&fit=crop',
    isPremium: false, createdAt: '2026-02-11T08:00:00Z', readTime: 4, views: 16300, shares: 2400, reactionsCount: 3890, commentsCount: 567, author: AUTHORS[6]
  },
  {
    id: 'p16', title: 'Gen Z Nigerians Are Leaving — But Should They?', slug: 'genz-japa',
    content: 'The "Japa" wave shows no signs of slowing down. Young Nigerians are relocating to Canada, UK, US, and even unexpected destinations like Georgia and Poland.\n\nBut is leaving always the answer? Some returnees share stories of loneliness, racism, and the harsh reality of starting from zero abroad.\n\nMeanwhile, those who stayed are building thriving businesses in tech, agriculture, and entertainment. The rise of remote work means you can earn in dollars while living in Lagos.\n\nThe key insight: it\'s not about leaving or staying — it\'s about having options and making informed decisions.',
    excerpt: 'The Japa debate: is leaving Nigeria always the answer? Stories from those who left and those who stayed.',
    category: 'Gist', imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=600&h=400&fit=crop',
    isPremium: true, createdAt: '2026-02-10T15:00:00Z', readTime: 6, views: 38700, shares: 6200, reactionsCount: 9870, commentsCount: 2100, author: AUTHORS[7]
  },
  {
    id: 'p17', title: 'Understanding Dollar-Cost Averaging for Beginners', slug: 'dca-beginners',
    content: 'Dollar-Cost Averaging (DCA) is the simplest investment strategy that works. Instead of trying to time the market, you invest a fixed amount at regular intervals.\n\nFor example, investing ₦20,000 every month in a stock index fund means you buy more units when prices are low and fewer when prices are high. Over time, this averages out your cost.\n\nHistorically, DCA has beaten timing the market for most retail investors. The key is consistency and patience.',
    excerpt: 'The simplest investment strategy that consistently beats market timing. Perfect for Nigerian beginners.',
    category: 'Money', imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop',
    isPremium: false, createdAt: '2026-02-10T10:00:00Z', readTime: 4, views: 9800, shares: 1300, reactionsCount: 2340, commentsCount: 345, author: AUTHORS[0]
  },
  {
    id: 'p18', title: 'Yadda Ake Shirya Suya Mai Dadi', slug: 'shirya-suya',
    content: 'Suya ita ce abincin Najeriya da kowa ya sani. Ga yadda za ka shirya suya a gida kamar yadda mai-suya ke yi.\n\nAbubuwan da za ka bukata: naman shanu, yaji, albasa, man gyada, da maggi.\n\nYanka namar a sirare-sirare. Zuba yaji mai yawa a kan namar ka barshi tsawon awanni 2 a firiji.\n\nGasa namar a kan garwashi ko a cikin oven a 200°C tsawon minti 15-20. Juya namar a tsakiyar lokaci.\n\nA ƙarshe, yayyafa ƙarin yaji a kai ka ci da albasa da tattasai.',
    excerpt: 'Koyi yadda ake shirya suya mai dadi a gida — kamar yadda mai-suya ke yi.',
    category: 'Hausa', imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop',
    isPremium: false, createdAt: '2026-02-09T12:00:00Z', readTime: 3, views: 8900, shares: 1400, reactionsCount: 2100, commentsCount: 234, author: AUTHORS[2]
  },
  {
    id: 'p19', title: 'BBNaija 2026: Early Predictions and Hot Takes', slug: 'bbnaija-2026',
    content: 'Big Brother Naija remains Nigeria\'s most-watched reality show. As we approach the 2026 season, here are our early predictions.\n\nThe show has evolved from pure entertainment to a launchpad for careers in music, acting, and brand ambassadorship. Past winners have gone on to build multimillion-naira empires.\n\nThis year, expect more diverse contestants, bigger prize money, and even more dramatic house dynamics. The social media wars between fan bases will be legendary as always.',
    excerpt: 'BBNaija 2026 is coming. Our early predictions, hot takes, and what to expect this season.',
    category: 'Gist', imageUrl: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600&h=400&fit=crop',
    isPremium: false, createdAt: '2026-02-09T08:00:00Z', readTime: 3, views: 45600, shares: 8900, reactionsCount: 15600, commentsCount: 4560, author: AUTHORS[3]
  },
  {
    id: 'p20', title: 'Remote Work in Nigeria: The Ultimate Setup Guide', slug: 'remote-work-setup',
    content: 'Working remotely from Nigeria comes with unique challenges — unreliable power, slow internet, and noise. Here\'s how to build the perfect remote work setup.\n\nPower: Get a 3.5KVA inverter with 200Ah batteries. This gives you 8-10 hours of backup. Cost: ₦350K-₦500K.\n\nInternet: Starlink is now available and game-changing. 100-200Mbps speeds for ₦38K/month. If budget is tight, combine a Spectranet router with an MTN 5G MiFi as backup.\n\nWorkspace: Invest in a proper desk and ergonomic chair. Your back will thank you. A standing desk converter costs about ₦45K on Jumia.\n\nNoise: ANC headphones are non-negotiable. Sony WH-1000XM5 or the more affordable Soundcore Q45.',
    excerpt: 'The ultimate guide to building a remote work setup in Nigeria — power, internet, workspace, and gear.',
    category: 'Money', imageUrl: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=600&h=400&fit=crop',
    isPremium: true, createdAt: '2026-02-08T14:00:00Z', readTime: 5, views: 21300, shares: 3400, reactionsCount: 5670, commentsCount: 890, author: AUTHORS[4]
  },
];

export const MOCK_ADS: AdCampaign[] = [
  {
    id: 'ad1', title: 'OPay — Send Money, Zero Fees!', description: 'Transfer money to any bank for free. Download OPay now.',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=300&fit=crop',
    targetLink: '#', sponsor: 'OPay Nigeria', category: 'Money'
  },
  {
    id: 'ad2', title: 'Dangote Cement — Build Your Future', description: 'Quality cement for every Nigerian home. Available nationwide.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=300&fit=crop',
    targetLink: '#', sponsor: 'Dangote Group', category: 'Gist'
  },
  {
    id: 'ad3', title: 'Kano State Tourism — Visit Kano!', description: 'Discover the ancient city. Culture, food, and history await.',
    imageUrl: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&h=300&fit=crop',
    targetLink: '#', sponsor: 'Kano State Govt', category: 'Hausa'
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'xp', title: '+10 XP Earned!', description: 'You read "How I Made ₦500K from Forex"', timestamp: '2026-02-18T08:30:00Z', read: false, xpAmount: 10 },
  { id: 'n2', type: 'streak', title: '🔥 3 Day Streak!', description: 'Keep it up! Come back tomorrow for bonus XP.', timestamp: '2026-02-18T07:00:00Z', read: false },
  { id: 'n3', type: 'social', title: 'Amina liked your comment', description: 'On "Lagos Big Boy Lifestyle"', timestamp: '2026-02-17T20:00:00Z', read: true },
  { id: 'n4', type: 'xp', title: '+5 XP Earned!', description: 'You liked "Davido vs Wizkid"', timestamp: '2026-02-17T18:00:00Z', read: true, xpAmount: 5 },
  { id: 'n5', type: 'system', title: 'Welcome to Jara Daily!', description: 'Start reading to earn XP and climb the ranks.', timestamp: '2026-02-17T12:00:00Z', read: true },
  { id: 'n6', type: 'social', title: 'Chidi shared your post', description: '"5 Side Hustles Every Nigerian Should Know"', timestamp: '2026-02-16T14:00:00Z', read: true },
  { id: 'n7', type: 'xp', title: '+10 XP Earned!', description: 'You shared "Jollof Rice Wars"', timestamp: '2026-02-16T10:00:00Z', read: true, xpAmount: 10 },
  { id: 'n8', type: 'streak', title: '🔥 2 Day Streak!', description: 'You\'re building a habit! Keep reading.', timestamp: '2026-02-16T07:00:00Z', read: true },
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, user: { id: 'u2', username: 'Amina Bello', avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Amina', locationState: 'Kano' }, xpPoints: 2450, currentRank: 'Odogwu' },
  { rank: 2, user: { id: 'u6', username: 'Ngozi Eze', avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Ngozi', locationState: 'Enugu' }, xpPoints: 1890, currentRank: 'Odogwu' },
  { rank: 3, user: { id: 'u1', username: 'Chidi Okonkwo', avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Chidi', locationState: 'Lagos' }, xpPoints: 890, currentRank: 'Chairman' },
  { rank: 4, user: { id: 'u8', username: 'Blessing Okoro', avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Blessing', locationState: 'Abuja' }, xpPoints: 780, currentRank: 'Chairman' },
  { rank: 5, user: { id: 'u4', username: 'Fatima Abdullahi', avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Fatima', locationState: 'Kaduna' }, xpPoints: 650, currentRank: 'Chairman' },
  { rank: 6, user: { id: 'u3', username: 'Emeka Nwosu', avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Emeka', locationState: 'Aba' }, xpPoints: 430, currentRank: 'Learner' },
  { rank: 7, user: { id: 'u7', username: 'Ibrahim Musa', avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Ibrahim', locationState: 'Sokoto' }, xpPoints: 320, currentRank: 'Learner' },
  { rank: 8, user: { id: 'u9', username: 'Aisha Yusuf', avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Aisha', locationState: 'Maiduguri' }, xpPoints: 210, currentRank: 'Learner' },
  { rank: 9, user: { id: 'u10', username: 'Segun Alade', avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Segun', locationState: 'Ibadan' }, xpPoints: 150, currentRank: 'Learner' },
  { rank: 10, user: { id: 'u5', username: 'Tunde Adeyemi', avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Tunde', locationState: 'Osogbo' }, xpPoints: 85, currentRank: 'JJC' },
];

export const MOCK_USER: UserProfile = {
  id: 'guest',
  username: 'Guest User',
  avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Guest',
  locationState: 'Lagos',
  xpPoints: 45,
  currentRank: 'JJC',
  streakDays: 3,
  lastLoginDate: '2026-02-18',
  postsRead: 7,
  savedPosts: ['p1', 'p7', 'p12'],
};
