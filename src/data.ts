import { MenuItem, LocationBranch, BlogPost, Testimonial, GalleryItem } from './types';

import heroChayaPuttu from './assets/images/puka_hero_chaya_puttu_1780713067104.png';
import cozyChayakkada from './assets/images/puka_cozy_chayakkada_1780713083652.png';
import storefrontNight from './assets/images/puka_storefront_night_1780713101369.png';
import teaStretching from './assets/images/puka_tea_stretching_1780713122585.png';

export const PUKA_IMAGES = {
  heroChayaPuttu,
  cozyChayakkada,
  storefrontNight,
  teaStretching,
};

export const MENU_ITEMS: MenuItem[] = [
  // Specials & Signatures
  {
    id: 'spec_1',
    name: 'Chicken Kondattom Puttu',
    description: 'Slow-cooked spicy stir-fried chicken kondattom layered inside soft, steaming traditional puttu. A perfect blast of flavor.',
    price: 180,
    category: 'specials',
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=600&auto=format&fit=crop',
    isSignature: true,
    spicyLevel: 2
  },
  {
    id: 'spec_2',
    name: 'Erachi Puttu (Beef)',
    description: 'A traditional masterpiece with flavorful spiced minced beef layered inside soft, warm stone-ground red rice puttu.',
    price: 170,
    category: 'specials',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600&auto=format&fit=crop',
    isSignature: true,
    spicyLevel: 2
  },
  {
    id: 'spec_3',
    name: 'Biryani Chaya',
    description: 'Our iconic tea experience. Infused with aromatic premium local spices (cardamom, cinnamon, cloves) and finished with a rich frothy crown.',
    price: 60,
    category: 'tea',
    image: PUKA_IMAGES.teaStretching,
    isSignature: true,
    spicyLevel: 0
  },
  {
    id: 'spec_4',
    name: 'Porotta & Curry Combo',
    description: 'Two layers of flaky, crispy, beautifully hand-stretched Malabar Porottas served with our signature spice-laden Kerala chicken curry.',
    price: 70,
    category: 'specials',
    image: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?q=80&w=600&auto=format&fit=crop',
    isSignature: true,
    spicyLevel: 3
  },
  {
    id: 'spec_5',
    name: 'Kadala Curry',
    description: 'Spiced black chickpeas slowly boiled in a thick roasted coconut gravy with tempered mustard seeds and curry leaves. Best with Puttu.',
    price: 60,
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600&auto=format&fit=crop',
    isSignature: true,
    spicyLevel: 1
  },

  // Breakfast items
  {
    id: 'brk_1',
    name: 'Classic Podi Puttu (White)',
    description: 'Traditional cylindrical steamed rice cake made with roasted white rice flour and layers of freshly grated coconut.',
    price: 40,
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600&auto=format&fit=crop',
    isSignature: false
  },
  {
    id: 'brk_2',
    name: 'Ghee Roast Dosa',
    description: 'Paper-thin, golden crispy savory pancake cooked with aromatic pure ghee, served with traditional sambar and coconut chutneys.',
    price: 80,
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=600&auto=format&fit=crop',
    isSignature: false
  },
  {
    id: 'brk_3',
    name: 'Idiyappam with Egg Roast',
    description: 'Soft, delicate steamed rice string hoppers served alongside rich, tomato-onion gravy baked with local hard boiled eggs.',
    price: 110,
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600&auto=format&fit=crop',
    isSignature: false,
    spicyLevel: 2
  },

  // Teas & Coffees
  {
    id: 'tea_1',
    name: 'Kattan Chaya',
    description: 'Traditional hot black tea brewed with crushed ginger, fresh cardamom buds, and local Nilgiri tea leaves.',
    price: 15,
    category: 'tea',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop',
    isSignature: false
  },
  {
    id: 'tea_2',
    name: 'Sulaimani Tea',
    description: 'Brewed black tea infused with refreshing fresh mint leaves, cinnamon bark, dynamic spices, and a splash of sour lime.',
    price: 25,
    category: 'tea',
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4589d718?q=80&w=600&auto=format&fit=crop',
    isSignature: false
  },
  {
    id: 'tea_3',
    name: 'Filter Coffee',
    description: 'Traditional South Indian chicory-blend filter coffee, served foaming and frothed using standard steel dabarah with hot rich milk.',
    price: 30,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop',
    isSignature: false
  },

  // Snacks
  {
    id: 'snk_1',
    name: 'Pazham Pori (Banana Fritters)',
    description: 'A benchmark Kerala snack. Ripe Ethapazham (nendran banana) slices battered in wheat-rice flour with black sesame and fried crisp.',
    price: 20,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600&auto=format&fit=crop',
    isSignature: false
  },
  {
    id: 'snk_2',
    name: 'Crispy Parippu Vada',
    description: 'Crunchy, spice-tempered deep-fried patties made of coarse red lentils, styled with curry leaves, ginger, and green chilies.',
    price: 15,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600&auto=format&fit=crop',
    isSignature: false,
    spicyLevel: 1
  },
  {
    id: 'snk_3',
    name: 'Flaky Egg Puff',
    description: 'Freshly baked puff pastry with hundreds of layers of flaky butter encasing a sweet and spicy caramelized onion masala with half egg.',
    price: 30,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1608797178974-15b35a61d121?q=80&w=600&auto=format&fit=crop',
    isSignature: false,
    spicyLevel: 1
  },

  // Meals & Dinner
  {
    id: 'mel_1',
    name: 'Malabar Chicken Biryani',
    description: 'Fragrant short-grain Jeerakasala rice cooked on dum with succulent spiced chicken parts, ghee, fried shallots, and cashews.',
    price: 210,
    category: 'meals',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop',
    isSignature: true,
    spicyLevel: 2
  },
  {
    id: 'mel_2',
    name: 'Nadan Beef Ularthiyathu',
    description: 'Classic Kerala beef fry slow-roasted with pure coconut oil, slivers of coconut (thenga kothu), fresh ginger-garlic, and robust spices.',
    price: 190,
    category: 'meals',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600&auto=format&fit=crop',
    isSignature: false,
    spicyLevel: 3
  }
];

export const BRANCHES: LocationBranch[] = [
  {
    id: 'loc_1',
    name: 'Kaichoondi Branch',
    slug: 'kaichoondi',
    address: 'Kaichoondi Junction, National Highway Bypass, Alappuzha, Kerala - 688006',
    city: 'Alappuzha',
    phone: '+91 90377 13344',
    email: 'kaichoondi@pukateashop.com',
    timings: '10:00 AM – 1:00 AM (Daily)',
    mapUrl: 'https://maps.google.com/maps?q=Kaichoondi%20Junction,%20Alappuzha&t=&z=13&ie=UTF8&iwloc=&output=embed',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop',
    isUpcoming: false,
    coords: { x: 38, y: 72 }
  },
  {
    id: 'loc_2',
    name: 'Punnapra Branch',
    slug: 'punnapra',
    address: 'Near Carmel Engineering College, National Highway 66, Punnapra, Alappuzha, Kerala - 688004',
    city: 'Alappuzha',
    phone: '+91 90377 13344',
    email: 'punnapra@pukateashop.com',
    timings: '11:00 AM – midnight (Daily)',
    mapUrl: 'https://maps.google.com/maps?q=Punnapra,%20Alappuzha&t=&z=13&ie=UTF8&iwloc=&output=embed',
    image: PUKA_IMAGES.storefrontNight,
    isUpcoming: false,
    coords: { x: 36, y: 80 }
  },
  {
    id: 'loc_3',
    name: 'SRM University Chennai Branch',
    slug: 'srm-chennai',
    address: 'Near SRM Main Gate, Potheri, Kattankulathur, Chennai, Tamil Nadu - 603203',
    city: 'Chennai',
    phone: '+91 94467 11444',
    email: 'srmchennai@pukateashop.com',
    timings: '9:00 AM – 2:00 AM (Late Night Service)',
    mapUrl: 'https://maps.google.com/maps?q=SRM%20University,%20Kattankulathur,%20Chennai&t=&z=13&ie=UTF8&iwloc=&output=embed',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop',
    isUpcoming: false,
    coords: { x: 86, y: 24 }
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog_1',
    title: 'The Magic of Meter Chaya: Engineering the Perfect Froth',
    slug: 'magic-of-meter-chaya',
    excerpt: 'Find out why stretching tea is more than a show—it changes the oxygenation, texture, and taste of your traditional cup of Chaya.',
    content: 'In Kerala, a tea stall is known as a Chayakkada. It is the original social network. At the center of this social hub is the Chaya master, a performance artist who pulls tea through the air. This "Meter Chaya" stretches tea between containers up to a meter apart. But why? This high-attitude pour cools the boiling tea instantly to a drinkable temperature while aerating the mixture, turning the boiling milk into a silky, sweet, and heavily frothed elixir. Inside this post, we explore this physical science with our tea master, demonstrating how we select our robust high-grown dust grades and thick jersey milk to ensure every frothy sip at PuKa tells the story of old-world Kerala with modern precision.',
    date: 'May 18, 2026',
    author: {
      name: 'Prakashan "Chaya Master"',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop',
      role: 'Master Brew Specialist'
    },
    image: PUKA_IMAGES.teaStretching,
    tags: ['Tea Culture', 'Traditional Brewing', 'Kerala Lore'],
    readTime: '4 min read'
  },
  {
    id: 'blog_2',
    title: 'Puttu Redefined: Layering History and Spice',
    slug: 'puttu-redefined-history-and-spice',
    excerpt: 'Explore the origins of Kerala’s steamed rice cylinder and how Chicken Kondattom added a spicy modern chapter to its delicious legacy.',
    content: 'Puttu is perhaps the most wholesome breakfast in the subcontinent. Steamed inside hollow bamboo structures (Moongil Kutti) or metal cylinders with freshly grated white coconut, this rice-and-coconut cylinder has fueled farmers, scholars, and children for centuries. Traditionally enjoyed with sweet yellow bananas or coconut-tempered black chickpea gravy (Kadala Curry), we wondered: How do we bring Kerala’s bold meat fries into this delicate frame? The result was Erachi Puttu and the legendary Chicken Kondattom Puttu. Slowly frying local farm-fresh chicken in traditional sun-dried chili paste (kondattom), we layer it perfectly inside our flour mix before steaming. The steam cooks the meat further, rendering the spices directly into the fluffy rice grains. It is nostalgic yet entirely new.',
    date: 'June 02, 2026',
    author: {
      name: 'Ammu K. Nair',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
      role: 'Head Culinary Archivist'
    },
    image: PUKA_IMAGES.heroChayaPuttu,
    tags: ['Food History', 'Signature Specials', 'Kerala Recipes'],
    readTime: '6 min read'
  },
  {
    id: 'blog_3',
    title: 'Chayakkada Chronicles: The Return of Slow Conversations',
    slug: 'chayakkada-chronicles-slow-conversations',
    excerpt: 'In the speed-run world of smartphone notifications, we built PuKa to revive the art of long, analog, over-the-cup conversations.',
    content: 'Before instant messages, the Chayakkada wooden bench was where revolutions were planned, cricket matches were debated, and friendships were forged for life. With rain beating down on the clay tile roof, we designed PuKa to look and feel exactly like that cozy sanctuary: using dark natural wood, high-contrast typography, warm lanterns, and a relaxed, nostalgic tempo. Since we opened our branches in Kaichoondi, Punnapra, and on the bustling campus of SRM University in Chennai, we’ve watched visitors put down their screens, hold a steaming glass of ginger tea, and talk for hours. Rediscover the comfort of unhurried human connection.',
    date: 'June 05, 2026',
    author: {
      name: 'Unni Madhav',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      role: 'Founder & Cultural Lead'
    },
    image: PUKA_IMAGES.cozyChayakkada,
    tags: ['Branch Life', 'Community', 'Nostalgia'],
    readTime: '3 min read'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't_1',
    name: 'Akhil Raj',
    rating: 5,
    review: 'The absolute best puttu and tea combo in Alappuzha. The Chicken Kondattom Puttu was steaming hot, incredibly flavorful, and perfectly matched with a frothy hot glass of Biryani Chaya. Always a delightful, feel-good place.',
    date: '2 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
    location: 'Kaichoondi'
  },
  {
    id: 't_2',
    name: 'Nandu S.',
    rating: 5,
    review: 'Late-night cravings? PuKa is always the answer! The Porotta with Chicken Curry is flaky and crispy beyond words. The ambiance has this absolute Chayakkada nostalgia blended into premium architecture.',
    date: '3 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
    location: 'Punnapra'
  },
  {
    id: 't_3',
    name: 'Fathima N',
    rating: 5,
    review: 'Being a student at SRM, PuKa is a blessing! It represents authentic Kerala taste without any compromise. The tea is perfectly spiced, and the Erachi Puttu gives me instant hometown vibes.',
    date: '1 month ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    location: 'SRM Chennai'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g_1',
    image: PUKA_IMAGES.teaStretching,
    title: 'Brewing Biryani Chaya',
    category: 'The Craft',
    likes: 312
  },
  {
    id: 'g_2',
    image: PUKA_IMAGES.heroChayaPuttu,
    title: 'Signature Specials Combo',
    category: 'Our Plates',
    likes: 420
  },
  {
    id: 'g_3',
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=600&auto=format&fit=crop',
    title: 'Steaming Chicken Kondattom Puttu',
    category: 'Our Plates',
    likes: 214
  },
  {
    id: 'g_4',
    image: PUKA_IMAGES.cozyChayakkada,
    title: 'A Warm Conversation',
    category: 'Ambiance',
    likes: 189
  },
  {
    id: 'g_5',
    image: PUKA_IMAGES.storefrontNight,
    title: 'PuKa Storefront at Night',
    category: 'Ambiance',
    likes: 541
  },
  {
    id: 'g_6',
    image: 'https://images.unsplash.com/photo-1613292443284-8d10ef9383fe?q=80&w=600&auto=format&fit=crop',
    title: 'Freshly stretched Malabar Porotta',
    category: 'Preparation',
    likes: 388
  },
  {
    id: 'g_7',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600&auto=format&fit=crop',
    title: 'Authentic Kerala Coconut Kadala Spicy Curry',
    category: 'Our Plates',
    likes: 295
  }
];
