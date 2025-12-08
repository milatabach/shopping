const products = [
    // Keep only 5 real products
    {
        id: 1,
        name: "Classic Cotton T-Shirt",
        category: "mens",
        price: 24.99,
        description: "100% cotton crew neck t-shirt. Soft, breathable fabric perfect for everyday wear. Available in multiple colors.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop"
    },
    {
        id: 2,
        name: "Slim Fit Denim Jeans",
        category: "mens",
        price: 79.99,
        description: "Premium stretch denim with slim fit. Features five-pocket styling and durable construction for lasting comfort.",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop"
    },
    {
        id: 4,
        name: "Leather Crossbody Bag",
        category: "accessories",
        price: 129.99,
        description: "Genuine leather crossbody bag with adjustable strap. Multiple compartments for organized storage.",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=600&fit=crop"
    },
    {
        id: 5,
        name: "Running Sneakers",
        category: "mens",
        price: 94.99,
        description: "Lightweight athletic shoes with cushioned sole. Breathable mesh upper and responsive cushioning for all-day comfort.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop"
    },
    {
        id: 20,
        name: "Knit Beanie",
        category: "accessories",
        price: 24.99,
        description: "Soft knit beanie with fold-up cuff. One size fits most, perfect for cold weather.",
        image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500&h=600&fit=crop"
    },
    // Conceptual/Quirky Products
    {
        id: 31,
        name: "Happiness",
        category: "accessories",
        price: 999.99,
        description: "Pure, bottled happiness. A limited edition item that brings instant joy. One size fits all emotions. No refunds on used happiness.",
        image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=500&h=600&fit=crop"
    },
    {
        id: 32,
        name: "Time",
        category: "accessories",
        price: 1299.99,
        description: "Extra time in a convenient package. Add more hours to your day. Warning: May cause temporal paradoxes. Handle with care.",
        image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=500&h=600&fit=crop"
    },
    {
        id: 33,
        name: "Dreams",
        category: "accessories",
        price: 799.99,
        description: "Premium quality dreams. Lucid and vivid. Choose your own adventure every night. Batteries not included.",
        image: "https://images.unsplash.com/photo-1518176258769-f227c798150e?w=500&h=600&fit=crop"
    },
    {
        id: 34,
        name: "Confidence",
        category: "accessories",
        price: 549.99,
        description: "Instant confidence boost. Wear it proudly. Guaranteed to make you feel unstoppable. Effects may vary.",
        image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=500&h=600&fit=crop"
    },
    {
        id: 35,
        name: "Peace of Mind",
        category: "accessories",
        price: 899.99,
        description: "Tranquility in its purest form. Zen-certified and meditation-approved. Free from all worries and anxieties.",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=600&fit=crop"
    },
    // Mom Category Products - Normal to Crazy
    {
        id: 36,
        name: "Elegant Wool Jacket",
        category: "mom",
        price: 189.99,
        description: "Sophisticated wool jacket perfect for mom. Classic tailoring with modern comfort. She deserves to look amazing.",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=600&fit=crop"
    },
    {
        id: 37,
        name: "Comfortable Walking Shoes",
        category: "mom",
        price: 124.99,
        description: "Supportive walking shoes designed for mom's busy lifestyle. Cushioned insole and arch support for all-day comfort.",
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&h=600&fit=crop"
    },
    {
        id: 38,
        name: "Pearl Necklace",
        category: "mom",
        price: 299.99,
        description: "Timeless pearl necklace that mom will treasure forever. Genuine freshwater pearls with sterling silver clasp.",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=600&fit=crop"
    },
    {
        id: 39,
        name: "Luxury Handbag",
        category: "mom",
        price: 349.99,
        description: "Premium leather handbag with multiple compartments. Perfect size for all of mom's essentials and then some.",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=600&fit=crop"
    },
    {
        id: 40,
        name: "Cozy Reading Blanket",
        category: "mom",
        price: 79.99,
        description: "Super soft throw blanket for mom's reading corner. Machine washable and irresistibly cuddly.",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=600&fit=crop"
    },
    {
        id: 41,
        name: "Spa Day Experience",
        category: "mom",
        price: 199.99,
        description: "Full spa day package for the mom who deserves pampering. Massage, facial, and relaxation included.",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&h=600&fit=crop"
    },
    {
        id: 42,
        name: "Gourmet Cooking Class",
        category: "mom",
        price: 149.99,
        description: "Professional cooking class for mom to learn new culinary skills. Wine pairing included, of course.",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=600&fit=crop"
    },
    {
        id: 43,
        name: "Custom Photo Album",
        category: "mom",
        price: 89.99,
        description: "Personalized photo album filled with family memories. Mom will cry happy tears, guaranteed.",
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=600&fit=crop"
    },
    {
        id: 44,
        name: "Weekend Getaway",
        category: "mom",
        price: 599.99,
        description: "Two-night weekend escape for mom. She needs a break from taking care of everyone else.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=600&fit=crop"
    },
    {
        id: 45,
        name: "Personal Assistant for a Day",
        category: "mom",
        price: 299.99,
        description: "Someone else to handle mom's to-do list for once. Grocery shopping, errands, and organization included.",
        image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=500&h=600&fit=crop"
    },
    {
        id: 46,
        name: "Uninterrupted Sleep",
        category: "mom",
        price: 2499.99,
        description: "Eight full hours of sleep without anyone asking where anything is. Revolutionary concept for moms everywhere.",
        image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&h=600&fit=crop"
    },
    {
        id: 47,
        name: "Children Who Listen",
        category: "mom",
        price: 4999.99,
        description: "Kids who actually do what mom asks the first time. Includes automatic room cleaning and homework completion.",
        image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&h=600&fit=crop"
    },
    {
        id: 48,
        name: "Self-Esteem",
        category: "mom",
        price: 7499.99,
        description: "Pure confidence in a convenient package. Mom will finally believe she's as amazing as everyone knows she is.",
        image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=500&h=600&fit=crop"
    },
    {
        id: 53,
        name: "Appreciation",
        category: "mom",
        price: 9999.99,
        description: "Recognition for everything mom does. Includes gratitude for midnight feedings, endless laundry, and emotional support.",
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=600&fit=crop"
    },
    {
        id: 50,
        name: "Time Machine",
        category: "mom",
        price: 24999.99,
        description: "Go back to when mom's biggest worry was which crayon to use. Batteries definitely not included.",
        image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=500&h=600&fit=crop"
    },
    {
        id: 51,
        name: "Happiness",
        category: "mom",
        price: 49999.99,
        description: "Pure, concentrated joy specifically formulated for moms. Side effects include spontaneous smiling and contentment.",
        image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=500&h=600&fit=crop"
    },
    {
        id: 54,
        name: "World Peace",
        category: "mom",
        price: 999999.99,
        description: "Mom always said if everyone just listened to their mothers, the world would be a better place. Here's proof.",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=600&fit=crop"
    },
    {
        id: 49,
        name: "Grandchildren",
        category: "mom",
        price: 9999999.99,
        description: "Adorable grandchildren who call regularly. Warning: May result in excessive bragging and wallet full of photos.",
        image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&h=600&fit=crop"
    },
    {
        id: 52,
        name: "Love",
        category: "mom",
        price: 99999999.99,
        description: "Unlimited, unconditional love in its purest form. Mom has been giving this away for free her whole life.",
        image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&h=600&fit=crop"
    },
    {
        id: 55,
        name: "The Meaning of Life",
        category: "mom",
        price: 999999999.99,
        description: "Mom figured it out years ago: it's all about love, family, and making sure everyone eats enough vegetables.",
        image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&h=600&fit=crop"
    },
    // Dad Category Products - Normal to Impossible
    {
        id: 56,
        name: "Premium Golf Clubs",
        category: "dad",
        price: 799.99,
        description: "Professional-grade golf clubs that will definitely improve his game. Comes with optimism about lowering his handicap.",
        image: "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=500&h=600&fit=crop"
    },
    {
        id: 57,
        name: "Classic Polo Shirts",
        category: "dad",
        price: 149.99,
        description: "Comfortable polo shirts perfect for weekend barbecues and 'I'm not working today' vibes.",
        image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=600&fit=crop"
    },
    {
        id: 58,
        name: "Leather Wallet",
        category: "dad",
        price: 89.99,
        description: "A wallet he'll use for the next 20 years, complete with space for pictures of the family he never shows anyone.",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=600&fit=crop"
    },
    {
        id: 59,
        name: "Barbecue Tool Set",
        category: "dad",
        price: 199.99,
        description: "Professional grilling tools for the man who takes his weekend barbecue responsibilities very seriously.",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=600&fit=crop"
    },
    {
        id: 60,
        name: "Vintage Whiskey",
        category: "dad",
        price: 299.99,
        description: "Smooth whiskey for contemplating life choices and telling stories about 'back in my day.'",
        image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=500&h=600&fit=crop"
    },
    {
        id: 61,
        name: "Workshop Time",
        category: "dad",
        price: 399.99,
        description: "Three uninterrupted hours in the garage where nobody asks him to fix anything or explain where he put something.",
        image: "https://images.unsplash.com/photo-1416424312427-baefa2d38007?w=500&h=600&fit=crop"
    },
    {
        id: 62,
        name: "Sports Knowledge",
        category: "dad",
        price: 599.99,
        description: "Instant expertise on all sports statistics from 1987 to present. Comes with the ability to predict draft picks.",
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=500&h=600&fit=crop"
    },
    {
        id: 63,
        name: "Perfect Dad Joke Timing",
        category: "dad",
        price: 999.99,
        description: "Impeccable comedic timing for maximum eye-rolls and groans. Guaranteed to embarrass teenagers.",
        image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=500&h=600&fit=crop"
    },
    {
        id: 64,
        name: "Thermostat Control",
        category: "dad",
        price: 1499.99,
        description: "Absolute authority over the house temperature. Nobody else is allowed to touch it. Ever.",
        image: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa9?w=500&h=600&fit=crop"
    },
    {
        id: 65,
        name: "Tool Recognition",
        category: "dad",
        price: 2499.99,
        description: "The ability for family members to correctly identify and hand him the right tool the first time.",
        image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=500&h=600&fit=crop"
    },
    {
        id: 66,
        name: "Respect from Teenagers",
        category: "dad",
        price: 4999.99,
        description: "Genuine acknowledgment that dad might actually know what he's talking about. Extremely rare.",
        image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=500&h=600&fit=crop"
    },
    {
        id: 67,
        name: "Back Pain Relief",
        category: "dad",
        price: 9999.99,
        description: "Complete elimination of that mysterious back pain that started in his thirties for no apparent reason.",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=600&fit=crop"
    },
    {
        id: 68,
        name: "Hair Restoration",
        category: "dad",
        price: 19999.99,
        description: "Full head of hair from his twenties, exactly as thick and stylish as he remembers it being.",
        image: "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=500&h=600&fit=crop"
    },
    {
        id: 69,
        name: "Pride",
        category: "dad",
        price: 49999.99,
        description: "Deep satisfaction knowing his children turned out okay despite his questionable parenting decisions.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop"
    },
    {
        id: 70,
        name: "Legacy",
        category: "dad",
        price: 99999.99,
        description: "The knowledge that he made a lasting positive impact and his wisdom will live on through generations.",
        image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=500&h=600&fit=crop"
    },
    {
        id: 71,
        name: "Fresh Start",
        category: "dad",
        price: 499999.99,
        description: "The chance to do it all over again, but this time knowing what he knows now. No regrets, just wisdom.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=600&fit=crop"
    },
    {
        id: 72,
        name: "Time with Dad",
        category: "dad",
        price: 9999999.99,
        description: "One more day with his own father, to say all the things he never got the chance to say.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop"
    },
    {
        id: 73,
        name: "Perfect Father",
        category: "dad",
        price: 99999999.99,
        description: "The impossible dream of being exactly the dad his kids needed, when they needed it most.",
        image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=500&h=600&fit=crop"
    },
    // Sibling Category Products - Normal to Impossible
    {
        id: 74,
        name: "Board Game Collection",
        category: "sibling",
        price: 89.99,
        description: "Classic board games for sibling bonding time. Warning: May cause temporary alliances and inevitable arguments.",
        image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=500&h=600&fit=crop"
    },
    {
        id: 75,
        name: "Matching Hoodies",
        category: "sibling",
        price: 79.99,
        description: "Comfortable hoodies that prove you're related even when you pretend not to know each other in public.",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop"
    },
    {
        id: 76,
        name: "Shared Snack Stash",
        category: "sibling",
        price: 49.99,
        description: "Secret snacks that are somehow always gone when you want them. Includes accusations and denials.",
        image: "https://images.unsplash.com/photo-1559656914-a30970c1affd?w=500&h=600&fit=crop"
    },
    {
        id: 77,
        name: "Concert Tickets",
        category: "sibling",
        price: 299.99,
        description: "Music experience to share together. Creates memories and inside jokes that will last decades.",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=600&fit=crop"
    },
    {
        id: 78,
        name: "Sibling Telepathy",
        category: "sibling",
        price: 599.99,
        description: "Ability to communicate without words. Especially useful for coordinating against parents.",
        image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&h=600&fit=crop"
    },
    {
        id: 79,
        name: "Fair Room Assignment",
        category: "sibling",
        price: 999.99,
        description: "Equal bedroom sizes and window access. No more arguments about who got the better deal.",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=600&fit=crop"
    },
    {
        id: 80,
        name: "Sibling Rivalry Resolution",
        category: "sibling",
        price: 2499.99,
        description: "Permanent end to the eternal question of who is mom's favorite. Spoiler: it's neither of you.",
        image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&h=600&fit=crop"
    },
    {
        id: 81,
        name: "Borrowed Item Return",
        category: "sibling",
        price: 4999.99,
        description: "All your stuff that mysteriously disappeared into their room. Finally returned in original condition.",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=600&fit=crop"
    },
    {
        id: 82,
        name: "Mutual Respect",
        category: "sibling",
        price: 9999.99,
        description: "Recognition that you're both amazing in your own ways. No more comparisons or competition.",
        image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&h=600&fit=crop"
    },
    {
        id: 83,
        name: "Childhood Innocence",
        category: "sibling",
        price: 49999.99,
        description: "Return to the days when your biggest worry was who got the last cookie, not adult responsibilities.",
        image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=500&h=600&fit=crop"
    },
    {
        id: 84,
        name: "Perfect Sibling Bond",
        category: "sibling",
        price: 99999999.99,
        description: "Unbreakable connection that survives distance, time, and even that incident with your diary.",
        image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=500&h=600&fit=crop"
    },
    // Friends Category Products - Normal to Impossible
    {
        id: 85,
        name: "Coffee Date Vouchers",
        category: "friends",
        price: 39.99,
        description: "Ten coffee dates to catch up on life, gossip, and complain about work together.",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=600&fit=crop"
    },
    {
        id: 86,
        name: "Pizza Night Kit",
        category: "friends",
        price: 59.99,
        description: "Everything needed for the perfect friends' pizza night. Movies and bad decisions included.",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=600&fit=crop"
    },
    {
        id: 87,
        name: "Friendship Bracelet Set",
        category: "friends",
        price: 24.99,
        description: "Classic friendship bracelets that prove you're best friends forever, or at least until next year.",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=600&fit=crop"
    },
    {
        id: 88,
        name: "Road Trip Adventure",
        category: "friends",
        price: 899.99,
        description: "Epic road trip with your crew. Includes terrible music, inside jokes, and questionable food choices.",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=600&fit=crop"
    },
    {
        id: 89,
        name: "Group Chat Wisdom",
        category: "friends",
        price: 199.99,
        description: "The ability to give perfect advice in the group chat instead of just sending memes and confusion.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=600&fit=crop"
    },
    {
        id: 90,
        name: "Schedule Synchronization",
        category: "friends",
        price: 1499.99,
        description: "All your friends are free at the same time. No more 'let me check my calendar' for three weeks.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=600&fit=crop"
    },
    {
        id: 91,
        name: "No Drama Guarantee",
        category: "friends",
        price: 2999.99,
        description: "Friend group completely free of petty arguments, passive aggression, and 'I'm fine' situations.",
        image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=500&h=600&fit=crop"
    },
    {
        id: 92,
        name: "Loyal Friendship",
        category: "friends",
        price: 9999.99,
        description: "Friends who stick by you through thick and thin, bad haircuts, and questionable dating choices.",
        image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=500&h=600&fit=crop"
    },
    {
        id: 93,
        name: "True Understanding",
        category: "friends",
        price: 49999.99,
        description: "Friends who truly get you without explanation. They understand your weird jokes and support your dreams.",
        image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=500&h=600&fit=crop"
    },
    {
        id: 94,
        name: "Lifelong Friendship",
        category: "friends",
        price: 99999.99,
        description: "Friendship that survives distance, time zones, marriage, kids, and all of life's changes.",
        image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=500&h=600&fit=crop"
    },
    {
        id: 95,
        name: "Soul Connection",
        category: "friends",
        price: 9999999.99,
        description: "That rare soul-deep connection where you found your chosen family. Priceless but we had to put a price anyway.",
        image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=500&h=600&fit=crop"
    }
];
