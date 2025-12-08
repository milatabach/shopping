const products = [
    // Keep only 5 real products
    {
        id: 1,
        name: "Classic Cotton T-Shirt",
        category: "mens",
        price: 24.99,
        description: "100% cotton crew neck t-shirt. Soft, breathable fabric perfect for everyday wear. Available in multiple colors! Transform your experience - buy today!",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop"
    },
    {
        id: 2,
        name: "Slim Fit Denim Jeans",
        category: "mens",
        price: 79.99,
        description: "Premium stretch denim with slim fit. Features five-pocket styling and durable construction for lasting comfort! Best value - act fast!",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop"
    },
    {
        id: 4,
        name: "Leather Crossbody Bag",
        category: "accessories",
        price: 129.99,
        description: "Genuine leather crossbody bag with adjustable strap. Multiple compartments for organized storage! Premium quality - order now!",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=600&fit=crop"
    },
    {
        id: 5,
        name: "Running Sneakers",
        category: "mens",
        price: 94.99,
        description: "Lightweight athletic shoes with cushioned sole. Breathable mesh upper and responsive cushioning for all-day comfort! Premium quality - order now!",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop"
    },
    {
        id: 20,
        name: "Knit Beanie",
        category: "accessories",
        price: 24.99,
        description: "Soft knit beanie with fold-up cuff. One size fits most, perfect for cold weather! Best value - act fast!",
        image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500&h=600&fit=crop"
    },
    // Conceptual/Quirky Products
    {
        id: 31,
        name: "1 month of Happiness",
        category: "accessories",
        price: 999.99,
        description: "Pure, bottled happiness. A limited edition item that brings instant joy. One size fits all emotions. No refunds on used happiness! Exclusive offer - limited stock!",
        image: "https://images.pexels.com/photos/1070536/pexels-photo-1070536.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop"
    },
    {
        id: 32,
        name: "Time",
        category: "accessories",
        price: 1299.99,
        description: "Extra time in a convenient package. Add more hours to your day. Warning: May cause temporal paradoxes. Handle with care! Limited edition - get yours today!",
        image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=500&h=600&fit=crop"
    },
    {
        id: 33,
        name: "Dreams",
        category: "accessories",
        price: 799.99,
        description: "Premium quality dreams. Lucid and vivid. Choose your own adventure every night. Batteries not included! Limited time offer - order now!",
        image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop"
    },
    {
        id: 34,
        name: "Confidence",
        category: "accessories",
        price: 549.99,
        description: "Instant confidence boost. Wear it proudly. Guaranteed to make you feel unstoppable. Effects may vary! Transform your experience - buy today!",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop"
    },
    {
        id: 35,
        name: "Peace of Mind",
        category: "accessories",
        price: 899.99,
        description: "Tranquility in its purest form. Zen-certified and meditation-approved. Free from all worries and anxieties! Premium quality - order now!",
        image: "https://media.istockphoto.com/id/1564441923/photo/stack-of-stones-in-calm-ocean.jpg?s=612x612&w=0&k=20&c=KoGh7oy5ZaBsfdNEe9phv20VWH800WFEkMcZIwMG3BY="
    },

    // Mom Category Products - Normal to Crazy
    {
        id: 36,
        name: "Elegant Wool Jacket",
        category: "mom",
        price: 189.99,
        description: "Sophisticated wool jacket perfect for mom. Classic tailoring with modern comfort. She deserves to look amazing! Premium quality - order now!",
        image: "https://m.media-amazon.com/images/I/71EhO0e2KOL._AC_SY879_.jpg"
    },
    {
        id: 97,
        name: "Cashmere Sweater",
        category: "mom",
        price: 189.99,
        description: "Luxurious 100% cashmere sweater with ribbed trim. Ultra-soft and warm for cold weather styling! Transform your life today!",
        image: "data:image/jpeg;base64,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"
    },
    {
        id: 37,
        name: "Comfortable Walking Shoes",
        category: "mom",
        price: 124.99,
        description: "Supportive walking shoes designed for mom's busy lifestyle. Cushioned insole and arch support for all-day comfort! Premium quality - order now!",
        image: "https://m.media-amazon.com/images/I/61FABOBX8UL._AC_SY695_.jpg"
    },
    {
        id: 38,
        name: "Pearl Necklace",
        category: "mom",
        price: 299.99,
        description: "Timeless pearl necklace that mom will treasure forever. Genuine freshwater pearls with sterling silver clasp! Transform your experience - buy today!",
        image: "https://m.media-amazon.com/images/I/61wr27PeWpL._AC_SY695_.jpg"
    },
    {
        id: 39,
        name: "Luxury Handbag",
        category: "mom",
        price: 349.99,
        description: "Premium leather handbag with multiple compartments. Perfect size for all of mom's essentials and then some! Exclusive design - don't miss out!",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&h=600&fit=crop"
    },
    {
        id: 40,
        name: "Cozy Reading Blanket",
        category: "mom",
        price: 79.99,
        description: "Super soft throw blanket for mom's reading corner. Machine washable and irresistibly cuddly! Limited time offer - order now!",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgpjrGM9XeREPLJfxBO4IML262wwmNYuVTEA&s"
    },
    {
        id: 41,
        name: "Spa Day Experience",
        category: "mom",
        price: 199.99,
        description: "Full spa day package for the mom who deserves pampering. Massage, facial, and relaxation included! Limited time offer - order now!",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&h=600&fit=crop"
    },
    {
        id: 42,
        name: "Gourmet Cooking Class",
        category: "mom",
        price: 149.99,
        description: "Professional cooking class for mom to learn new culinary skills. Wine pairing included, of course! Exclusive offer - limited stock!",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=600&fit=crop"
    },
    {
        id: 43,
        name: "Custom Photo Album",
        category: "mom",
        price: 89.99,
        description: "Personalized photo album filled with family memories. Mom will cry happy tears, guaranteed! Limited edition - get yours today!",
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=600&fit=crop"
    },
    {
        id: 44,
        name: "Weekend Getaway",
        category: "mom",
        price: 599.99,
        description: "Two-night weekend escape for mom. She needs a break from taking care of everyone else! Exclusive design - don't miss out!",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=600&fit=crop"
    },
    {
        id: 45,
        name: "Personal Assistant for a Day",
        category: "mom",
        price: 299.99,
        description: "Someone else to handle mom's to-do list for once. Grocery shopping, errands, and organization included! Exclusive design - don't miss out!",
        image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=500&h=600&fit=crop"
    },
    {
        id: 46,
        name: "Uninterrupted Sleep",
        category: "mom",
        price: 2499.99,
        description: "Eight full hours of sleep without anyone asking where anything is. Revolutionary concept for moms everywhere! Transform your experience - buy today!",
        image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&h=600&fit=crop"
    },
    {
        id: 101,
        name: "Peace and Quiet Package (3 Hours)",
        category: "mom",
        price: 499.99,
        description: "Three uninterrupted hours of complete silence. No questions, no requests, no interruptions. Mom deserves this moment of pure tranquility! Premium quality - order now!",
        image: "https://static.vecteezy.com/system/resources/thumbnails/040/723/811/small/ai-generated-solitary-morning-yoga-practice-by-secluded-lake-bathed-in-golden-sunlight-embraced-by-peaceful-nature-free-photo.jpg"
    },
    {
        id: 47,
        name: "Children Who Listen",
        category: "mom",
        price: 4999.99,
        description: "Kids who actually do what mom asks the first time. Includes automatic room cleaning and homework completion! Transform your life today!",
        image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=500&h=600&fit=crop"
    },
    {
        id: 48,
        name: "Self-Esteem",
        category: "mom",
        price: 7499.99,
        description: "Pure confidence in a convenient package. Mom will finally believe she's as amazing as everyone knows she is! Exclusive offer - limited stock!",
        image: "https://cdn.prod.website-files.com/61258807d2d4f9553cc9d3e6/652705a011eb8d5bee370e87_frame-48108136-6527054637783.webp"
    },
    {
        id: 53,
        name: "Appreciation",
        category: "mom",
        price: 9999.99,
        description: "Recognition for everything mom does. Includes gratitude for midnight feedings, endless laundry, and emotional support! Premium quality - order now!",
        image: "https://www.drcarlamanly.com/wp-content/uploads/2019/03/appreciation-thank-you-945x628.jpg"
    },
    {
        id: 50,
        name: "Time Machine",
        category: "mom",
        price: 24999.99,
        description: "Go back to when mom's biggest worry was which crayon to use. Batteries definitely not included! Limited edition - get yours today!",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEDxz9JCBrM4a4QLz3Dr1YxKcHW_evgXjaVg&s"
    },
    {
        id: 51,
        name: "1 month of Happiness",
        category: "mom",
        price: 49999.99,
        description: "Pure, concentrated joy specifically formulated for moms. Side effects include spontaneous smiling and contentment! Premium quality - order now!",
        image: "https://images.pexels.com/photos/1070536/pexels-photo-1070536.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop"
    },
    {
        id: 49,
        name: "Grandchildren",
        category: "mom",
        price: 9999999.99,
        description: "Adorable grandchildren who call regularly. These incredibly cute and friendly little ones will bring endless joy, laughter, and warmth to your life. Warning: May result in excessive bragging and wallet full of photos! Limited time offer - order now!",
        image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=600&fit=crop"
    },
    {
        id: 99,
        name: "Baby Boy (health checked, vaccinated)",
        category: "mom",
        price: 450000,
        description: "Deluxe grandson subscription with weekly video calls. Includes adorable giggles, first steps updates, and unlimited bragging rights! Premium selection - shop now!",
        image: "https://m.media-amazon.com/images/I/71IsdR+cmtL._AC_SX679_.jpg"
    },
    {
        id: 100,
        name: "Baby Girl (health checked, vaccinated)",
        category: "mom",
        price: 450000,
        description: "Exclusive granddaughter membership featuring tea party invitations, dress-up sessions, and heartwarming 'I love Grandma' moments! Premium quality - order now!",
        image: "https://images.pexels.com/photos/31528390/pexels-photo-31528390.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop"
    },
    {
        id: 96,
        name: "Weekly Call Subscription (Annual Plan)",
        category: "mom",
        price: 2999,
        description: "Premium connection package: Two guaranteed phone calls per week for one year. Includes thoughtful check-ins and 'how are you doing' conversations! Premium quality - order now!",
        image: "https://images.squarespace-cdn.com/content/v1/55d35604e4b08af97dadd334/81f5b33b-eb02-46ff-96e1-2846664a9397/senior-woman-talking-on-phone.png"
    },
    {
        id: 52,
        name: "Love",
        category: "mom",
        price: 99999999.99,
        description: "Unlimited, unconditional love in its purest form. Mom has been giving this away for free her whole life! Premium quality - order now!",
        image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&h=600&fit=crop"
    },
    {
        id: 55,
        name: "The Meaning of Life & More Overall Purpose",
        category: "mom",
        price: 999999999.99,
        description: "Discover your true purpose and unlock unlimited potential! This exclusive package includes profound life insights, enhanced clarity, and a deeper sense of meaning. Transform your existence with this premium life-enhancement solution. Limited time offer - act now!",
        image: "https://www.happiness.com/community/uploads/monthly_2020_05/how-to-find-meaning-in-life.jpg.a52d2ddc8f855da358d4aaba7a1a8a47.jpg"
    },
    // Dad Category Products - Normal to Impossible
    {
        id: 56,
        name: "Premium Golf Clubs",
        category: "dad",
        price: 799.99,
        description: "Professional-grade golf clubs that will definitely improve his game. Comes with optimism about lowering his handicap! Transform your life today!",
        image: "https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?w=500&h=600&fit=crop"
    },
    {
        id: 57,
        name: "Classic Polo Shirts",
        category: "dad",
        price: 149.99,
        description: "Comfortable polo shirts perfect for weekend barbecues and 'I'm not working today' vibes! Premium quality guaranteed!",
        image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=600&fit=crop"
    },
    {
        id: 58,
        name: "Leather Wallet",
        category: "dad",
        price: 89.99,
        description: "A wallet he'll use for the next 20 years, complete with space for pictures of the family he never shows anyone! Limited edition - get yours today!",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=600&fit=crop"
    },
    {
        id: 59,
        name: "Barbecue Tool Set",
        category: "dad",
        price: 199.99,
        description: "Professional grilling tools for the man who takes his weekend barbecue responsibilities very seriously! Transform your experience - buy today!",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&h=600&fit=crop"
    },
    {
        id: 60,
        name: "Vintage Whiskey",
        category: "dad",
        price: 299.99,
        description: "Smooth whiskey for contemplating life choices and telling stories about 'back in my day.'! Premium quality guaranteed!",
        image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=500&h=600&fit=crop"
    },
    {
        id: 61,
        name: "Peace and Quiet Package (3 Hours)",
        category: "dad",
        price: 399.99,
        description: "Three uninterrupted hours in the garage where nobody asks him to fix anything or explain where he put something! Transform your life today!",
        image: "https://media.istockphoto.com/id/1391812172/photo/relaxed-man-breathing-fresh-air.jpg?s=612x612&w=0&k=20&c=mTdbcJpbUfC7k7EgviY8eXtRio3AloXninT6tZHIQ8k="
    },
    {
        id: 62,
        name: "Sports Knowledge",
        category: "dad",
        price: 599.99,
        description: "Instant expertise on all sports statistics from 1987 to present. Comes with the ability to predict draft picks! Transform your experience - buy today!",
        image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=500&h=600&fit=crop"
    },
    {
        id: 63,
        name: "Perfect Dad Joke Timing",
        category: "dad",
        price: 999.99,
        description: "Impeccable comedic timing for maximum eye-rolls and groans. Guaranteed to embarrass teenagers! Premium selection - shop now!",
        image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=500&h=600&fit=crop"
    },
    {
        id: 64,
        name: "Thermostat Control",
        category: "dad",
        price: 1499.99,
        description: "Absolute authority over the house temperature. Nobody else is allowed to touch it. Ever! Best value - act fast!",
        image: "https://blackhawksupply.com/cdn/shop/articles/Guide_on_Central_Heating_Temperature_Controls_1024x1024.jpg?v=1618496361"
    },
    {
        id: 65,
        name: "Tool Recognition",
        category: "dad",
        price: 2499.99,
        description: "The ability for family members to correctly identify and hand him the right tool the first time! Premium selection - shop now!",
        image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=500&h=600&fit=crop"
    },
    {
        id: 66,
        name: "Respect from Teenagers",
        category: "dad",
        price: 4999.99,
        description: "Genuine acknowledgment that dad might actually know what he's talking about. Extremely rare! Transform your experience - buy today!",
        image: "https://www.liahonaacademy.com/wp-content/uploads/2024/09/shutterstock_23623477.jpg"
    },
    {
        id: 67,
        name: "Back Pain Relief",
        category: "dad",
        price: 9999.99,
        description: "Complete elimination of that mysterious back pain that started in his thirties for no apparent reason! Limited edition - get yours today!",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8-g4qmZzC1OThNfgcom0wDiFYU-Z8aJgKKA&s"
    },
    {
        id: 68,
        name: "Hair Growth",
        category: "dad",
        price: 19999.99,
        description: "Full head of hair from his twenties, exactly as thick and stylish as he remembers it being! Transform your experience - buy today!",
        image: "https://i.pinimg.com/736x/65/81/dd/6581dd816a6bdfe36748e6be7b82eaaf.jpg"
    },
    {
        id: 98,
        name: "Eternal Youth Serum (Annual Subscription)",
        category: "dad",
        price: 15900,
        description: "Premium age-reversal treatment. Rollback the years and feel like you're in your twenties again. Results may vary, confidence guaranteed! Exclusive offer - limited stock!",
        image: "https://img4.dhresource.com/webp/m/260x260/f3/albu/jc/y/28/abc8c40e-f418-4387-b91c-d297ab27beba.jpg"
    },
    {
        id: 69,
        name: "Pride",
        category: "dad",
        price: 49999.99,
        description: "Deep satisfaction knowing his children turned out okay despite his questionable parenting decisions! Transform your experience - buy today!",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQXtKfI6ADzOsnPf55qHryvPnG0kdfg4YSgA&s"
    },
    {
        id: 70,
        name: "Legacy",
        category: "dad",
        price: 99999.99,
        description: "The knowledge that he made a lasting positive impact and his wisdom will live on through generations! Premium quality - order now!",
        image: "https://lesliespeas.com/wp-content/uploads/2023/03/legacy.jpeg"
    },
    {
        id: 71,
        name: "Fresh Start",
        category: "dad",
        price: 499999.99,
        description: "The chance to do it all over again, but this time knowing what he knows now. No regrets, just wisdom! Limited edition - get yours today!",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=600&fit=crop"
    },
    {
        id: 72,
        name: "Time with Dad",
        category: "dad",
        price: 9999999.99,
        description: "One more day with his own father, to say all the things he never got the chance to say! Premium quality guaranteed!",
        image: "https://forgingbonds.org/assets/images/general/167/father_holding_hands_silouete__869x576.jpg"
    },
    {
        id: 73,
        name: "Perfect Father",
        category: "dad",
        price: 99999999.99,
        description: "The impossible dream of being exactly the dad his kids needed, when they needed it most! Best value - act fast!",
        image: "https://assets.brighthorizons.co.uk/-/media/BH/Solutions-At-Work/Resources/the-art-of-being-a-dad.jpg"
    },
    // Sibling Category Products - Normal to Impossible
    {
        id: 74,
        name: "Board Game Collection",
        category: "sibling",
        price: 89.99,
        description: "Classic board games for sibling bonding time. Warning: May cause temporary alliances and inevitable arguments! Exclusive offer - limited stock!",
        image: "https://m.media-amazon.com/images/I/813J0DBqCTL._AC_UF894,1000_QL80_.jpg"
    },
    {
        id: 75,
        name: "Matching Hoodies",
        category: "sibling",
        price: 79.99,
        description: "Comfortable hoodies that prove you're related even when you pretend not to know each other in public! Premium quality guaranteed!",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop"
    },
    {
        id: 76,
        name: "Shared Snack Stash",
        category: "sibling",
        price: 49.99,
        description: "Secret snacks that are somehow always gone when you want them. Includes accusations and denials! Best value - act fast!",
        image: "https://images.unsplash.com/photo-1559656914-a30970c1affd?w=500&h=600&fit=crop"
    },
    {
        id: 77,
        name: "Concert Tickets",
        category: "sibling",
        price: 299.99,
        description: "Music experience to share together. Creates memories and inside jokes that will last decades! Premium quality - order now!",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=600&fit=crop"
    },
    {
        id: 78,
        name: "Sibling Telepathy",
        category: "sibling",
        price: 599.99,
        description: "Ability to communicate without words. Especially useful for coordinating against parents! Best value - act fast!",
        image: "https://cdn.cdnparenting.com/articles/2021/11/10152339/Twin-Telepathy.jpg"
    },
    {
        id: 79,
        name: "Fair Room Assignment",
        category: "sibling",
        price: 999.99,
        description: "Equal bedroom sizes and window access. No more arguments about who got the better deal! Best value - act fast!",
        image: "https://cdn.mos.cms.futurecdn.net/v2/t:0,l:373,cw:2197,ch:1648,q:80,w:2197/XKp7rdEZA5f8xnDagx46S.jpg"
    },
    {
        id: 80,
        name: "Sibling Rivalry Resolution",
        category: "sibling",
        price: 2499.99,
        description: "Permanent end to the eternal question of who is mom's favorite. Spoiler: it's neither of you! Limited edition - get yours today!",
        image: "https://carpediempreschool.com/wp-content/uploads/2017/07/Blog-Post-30-Sibling-Rivalry.jpg"
    },
    {
        id: 81,
        name: "Borrowed Item Return",
        category: "sibling",
        price: 4999.99,
        description: "All your stuff that mysteriously disappeared into their room. Finally returned in original condition! Premium selection - shop now!",
        image: "https://www.onepartsunshine.com/wp-content/uploads/2010/04/child-wearing-jewelry.jpg"
    },
    {
        id: 82,
        name: "Mutual Respect",
        category: "sibling",
        price: 9999.99,
        description: "Recognition that you're both amazing in your own ways. No more comparisons or competition! Best value - act fast!",
        image: "https://clfroseburg.com/wp-content/uploads/2021/03/MutualRespect.jpg"
    },
    {
        id: 83,
        name: "Childhood Innocence",
        category: "sibling",
        price: 49999.99,
        description: "Return to the days when your biggest worry was who got the last cookie, not adult responsibilities! Transform your life today!",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7Gx9yltVnpTSmcbOsZPVRYLz3B5Q7bZuSNw&s"
    },
    {
        id: 84,
        name: "Perfect Sibling Bond",
        category: "sibling",
        price: 99999999.99,
        description: "Unbreakable connection that survives distance, time, and even that incident with your diary! Premium selection - shop now!",
        image: "https://miro.medium.com/1*SFxliIpWVim2AqspiT5zJQ.jpeg"
    },
    // Friends Category Products - Normal to Impossible
    {
        id: 85,
        name: "Coffee Date Vouchers",
        category: "friends",
        price: 39.99,
        description: "Ten coffee dates to catch up on life, gossip, and complain about work together! Transform your experience - buy today!",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=600&fit=crop"
    },
    {
        id: 86,
        name: "Pizza Night Kit",
        category: "friends",
        price: 59.99,
        description: "Everything needed for the perfect friends' pizza night. Movies and bad decisions included! Premium selection - shop now!",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=600&fit=crop"
    },
    {
        id: 87,
        name: "Friendship Bracelet Set",
        category: "friends",
        price: 24.99,
        description: "Classic friendship bracelets that prove you're best friends forever, or at least until next year! Premium quality guaranteed!",
        image: "https://i.ebayimg.com/images/g/CbsAAOSwnTVj-4~~/s-l400.jpg"
    },
    {
        id: 88,
        name: "Road Trip Adventure",
        category: "friends",
        price: 899.99,
        description: "Epic road trip with your crew. Includes terrible music, inside jokes, and questionable food choices! Premium quality - order now!",
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=600&fit=crop"
    },
    {
        id: 89,
        name: "Group Chat Wisdom",
        category: "friends",
        price: 199.99,
        description: "The ability to give perfect advice in the group chat instead of just sending memes and confusion! Limited time offer - order now!",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&h=600&fit=crop"
    },
    {
        id: 90,
        name: "Schedule Synchronization",
        category: "friends",
        price: 1499.99,
        description: "All your friends are free at the same time. No more 'let me check my calendar' for three weeks! Premium quality - order now!",
        image: "https://www.yesware.com/wp-content/uploads/2021/07/yesware-how-to-schedule-a-meeting.jpg"
    },
    {
        id: 91,
        name: "No Drama Guarantee",
        category: "friends",
        price: 2999.99,
        description: "Friend group completely free of petty arguments, passive aggression, and 'I'm fine' situations! Transform your experience - buy today!",
        image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=500&h=600&fit=crop"
    },
    {
        id: 92,
        name: "Loyal Friendship",
        category: "friends",
        price: 9999.99,
        description: "Friends who stick by you through thick and thin, bad haircuts, and questionable dating choices! Exclusive offer - limited stock!",
        image: "https://geediting.com/wp-content/uploads/2024/02/ways-to-recognize-a-truly-loyal-friend-according-to-psychology.png"
    },
    {
        id: 93,
        name: "True Understanding",
        category: "friends",
        price: 49999.99,
        description: "Friends who truly get you without explanation. They understand your weird jokes and support your dreams! Best value - act fast!",
        image: "https://dy7glz37jgl0b.cloudfront.net/advice/images/dad739e5cc62aff56c77c1cff2736da8-woman-leads-on-another-woman-in-group-setting_l.jpeg"
    },
    {
        id: 94,
        name: "Lifelong Friendship",
        category: "friends",
        price: 99999.99,
        description: "Friendship that survives distance, time zones, marriage, kids, and all of life's changes! Limited edition - get yours today!",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=600&fit=crop"
    },
    {
        id: 95,
        name: "Soul Connection",
        category: "friends",
        price: 9999999.99,
        description: "That rare soul-deep connection where you found your chosen family. Priceless but we had to put a price anyway! Exclusive design - don't miss out!",
        image: "https://cdn.powerofpositivity.com/wp-content/uploads/2016/01/soulmate-relationship.jpg"
    }
];
