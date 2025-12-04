const products = [
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
        id: 3,
        name: "Floral Print Summer Dress",
        category: "womens",
        price: 89.99,
        description: "Lightweight floral maxi dress with adjustable straps. Perfect for warm weather and special occasions.",
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop"
    },
    {
        id: 31,
        name: "Happiness",
        category: "accessories",
        price: 999.99,
        description: "Pure, bottled happiness. A limited edition item that brings instant joy. One size fits all emotions. No refunds on used happiness.",
        image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=500&h=600&fit=crop"
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
        id: 6,
        name: "Wool Blend Cardigan",
        category: "womens",
        price: 69.99,
        description: "Cozy wool blend cardigan with button closure. Classic fit perfect for layering in cooler weather.",
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop"
    },
    {
        id: 7,
        name: "Oxford Button-Down Shirt",
        category: "mens",
        price: 54.99,
        description: "Classic oxford shirt in wrinkle-resistant fabric. Perfect for business casual or smart casual occasions.",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=600&fit=crop"
    },
    {
        id: 8,
        name: "High-Waisted Yoga Pants",
        category: "womens",
        price: 49.99,
        description: "Moisture-wicking yoga pants with four-way stretch. High waistband for comfort and support during workouts.",
        image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&h=600&fit=crop"
    },
    {
        id: 9,
        name: "Aviator Sunglasses",
        category: "accessories",
        price: 149.99,
        description: "Classic aviator style with polarized lenses. UV400 protection and durable metal frame construction.",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&h=600&fit=crop"
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
        id: 10,
        name: "Quilted Puffer Jacket",
        category: "mens",
        price: 169.99,
        description: "Insulated puffer jacket with water-resistant outer shell. Features zip pockets and adjustable hood.",
        image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&h=600&fit=crop"
    },
    {
        id: 11,
        name: "Cashmere Sweater",
        category: "womens",
        price: 189.99,
        description: "Luxurious 100% cashmere sweater with ribbed trim. Ultra-soft and warm for cold weather styling.",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=600&fit=crop"
    },
    {
        id: 12,
        name: "Chino Shorts",
        category: "mens",
        price: 44.99,
        description: "Classic fit chino shorts in stretch cotton twill. Perfect for casual summer days with a 9-inch inseam.",
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=600&fit=crop"
    },
    {
        id: 13,
        name: "Silk Blouse",
        category: "womens",
        price: 119.99,
        description: "Elegant silk blouse with button front. Lightweight and breathable with a sophisticated drape.",
        image: "https://images.unsplash.com/photo-1564257577809-749e328484e4?w=500&h=600&fit=crop"
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
        id: 14,
        name: "Canvas Backpack",
        category: "accessories",
        price: 64.99,
        description: "Durable canvas backpack with leather accents. Padded laptop compartment and multiple organizational pockets.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop"
    },
    {
        id: 15,
        name: "Wool Peacoat",
        category: "mens",
        price: 249.99,
        description: "Classic double-breasted peacoat in warm wool blend. Timeless style with anchor buttons and side pockets.",
        image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&h=600&fit=crop"
    },
    {
        id: 16,
        name: "Athletic Tank Top",
        category: "womens",
        price: 29.99,
        description: "Moisture-wicking tank with built-in shelf bra. Ideal for gym workouts or casual athletic wear.",
        image: "https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=500&h=600&fit=crop"
    },
    {
        id: 17,
        name: "Leather Belt",
        category: "accessories",
        price: 39.99,
        description: "Full-grain leather belt with classic buckle. Versatile design suitable for both casual and formal wear.",
        image: "https://images.unsplash.com/photo-1624222247344-550fb60583b8?w=500&h=600&fit=crop"
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
        id: 18,
        name: "Hooded Sweatshirt",
        category: "mens",
        price: 59.99,
        description: "Comfortable cotton-blend hoodie with kangaroo pocket. Soft fleece lining for extra warmth.",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop"
    },
    {
        id: 19,
        name: "Pencil Skirt",
        category: "womens",
        price: 54.99,
        description: "Professional pencil skirt in stretch fabric. Sits at natural waist with back vent for easy movement.",
        image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&h=600&fit=crop"
    },
    {
        id: 20,
        name: "Knit Beanie",
        category: "accessories",
        price: 24.99,
        description: "Soft knit beanie with fold-up cuff. One size fits most, perfect for cold weather.",
        image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500&h=600&fit=crop"
    },
    {
        id: 21,
        name: "Flannel Shirt",
        category: "mens",
        price: 49.99,
        description: "Soft cotton flannel in traditional plaid pattern. Button-down collar and chest pocket details.",
        image: "https://images.unsplash.com/photo-1598032895397-b9c0c921749e?w=500&h=600&fit=crop"
    },
    {
        id: 35,
        name: "Peace of Mind",
        category: "accessories",
        price: 899.99,
        description: "Tranquility in its purest form. Zen-certified and meditation-approved. Free from all worries and anxieties.",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=600&fit=crop"
    },
    {
        id: 22,
        name: "Wrap Dress",
        category: "womens",
        price: 94.99,
        description: "Flattering wrap dress with tie waist. Versatile style perfect for office or evening events.",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop"
    },
    {
        id: 23,
        name: "Canvas Sneakers",
        category: "womens",
        price: 54.99,
        description: "Classic low-top canvas sneakers. Comfortable cushioned insole and durable rubber outsole.",
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=600&fit=crop"
    },
    {
        id: 24,
        name: "Bomber Jacket",
        category: "mens",
        price: 139.99,
        description: "Nylon bomber jacket with ribbed cuffs and hem. Zip closure with side pockets and quilted lining.",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=600&fit=crop"
    },
    {
        id: 25,
        name: "Scarf",
        category: "accessories",
        price: 34.99,
        description: "Lightweight scarf in soft fabric. Versatile accessory that adds style to any outfit.",
        image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500&h=600&fit=crop"
    },
    {
        id: 26,
        name: "Athletic Shorts",
        category: "mens",
        price: 34.99,
        description: "Moisture-wicking athletic shorts with elastic waistband. Quick-dry fabric with mesh panels for ventilation.",
        image: "https://images.unsplash.com/photo-1519235106638-30cc49b5dbc5?w=500&h=600&fit=crop"
    },
    {
        id: 27,
        name: "Denim Jacket",
        category: "womens",
        price: 84.99,
        description: "Classic denim jacket with button closure. Timeless style with chest pockets and adjustable waist tabs.",
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&h=600&fit=crop"
    },
    {
        id: 28,
        name: "Leather Wallet",
        category: "accessories",
        price: 44.99,
        description: "Bi-fold leather wallet with multiple card slots. Includes ID window and bill compartment.",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=600&fit=crop"
    },
    {
        id: 29,
        name: "Polo Shirt",
        category: "mens",
        price: 39.99,
        description: "Classic pique polo with ribbed collar and cuffs. Comfortable cotton blend perfect for casual wear.",
        image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=600&fit=crop"
    },
    {
        id: 30,
        name: "Ankle Boots",
        category: "womens",
        price: 129.99,
        description: "Stylish ankle boots with side zip closure. Comfortable block heel and durable leather construction.",
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=600&fit=crop"
    },
    {
        id: 36,
        name: "Henley T-Shirt",
        category: "mens",
        price: 34.99,
        description: "Soft cotton henley with button placket. Classic casual style perfect for layering or wearing alone.",
        image: "https://images.unsplash.com/photo-1618572454481-63b6263c0dab?w=500&h=600&fit=crop"
    },
    {
        id: 37,
        name: "V-Neck Sweater",
        category: "womens",
        price: 74.99,
        description: "Elegant v-neck sweater in soft merino blend. Perfect for both casual and professional settings.",
        image: "https://images.unsplash.com/photo-1596637065346-76bd1d541e2d?w=500&h=600&fit=crop"
    },
    {
        id: 38,
        name: "Cargo Pants",
        category: "mens",
        price: 69.99,
        description: "Durable cargo pants with multiple pockets and drawstring waist. Perfect for outdoor adventures.",
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=600&fit=crop"
    },
    {
        id: 39,
        name: "Maxi Skirt",
        category: "womens",
        price: 79.99,
        description: "Flowing maxi skirt with elastic waist. Comfortable and versatile for any occasion.",
        image: "https://images.unsplash.com/photo-1612336307429-8a88e8d08dbb?w=500&h=600&fit=crop"
    },
    {
        id: 40,
        name: "Work Boots",
        category: "mens",
        price: 159.99,
        description: "Tough leather work boots with steel toe protection. Oil-resistant sole and lace-up closure.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=600&fit=crop"
    },
    {
        id: 41,
        name: "Bandeau Top",
        category: "womens",
        price: 39.99,
        description: "Strapless bandeau top in soft jersey fabric. Versatile piece perfect for layering or beach wear.",
        image: "https://images.unsplash.com/photo-1506253550348-2168b5e5c519?w=500&h=600&fit=crop"
    },
    {
        id: 42,
        name: "Thermal Long Sleeve",
        category: "mens",
        price: 44.99,
        description: "Warm thermal long sleeve with brushed lining. Ideal for layering in cold weather.",
        image: "https://images.unsplash.com/photo-1599193591688-72c63dbdd77f?w=500&h=600&fit=crop"
    },
    {
        id: 43,
        name: "Wide-Brim Hat",
        category: "accessories",
        price: 49.99,
        description: "Classic wide-brim hat in quality fabric. Perfect for sun protection and adding style to any outfit.",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=600&fit=crop"
    },
    {
        id: 44,
        name: "Linen Pants",
        category: "womens",
        price: 89.99,
        description: "Breathable linen pants with relaxed fit. Lightweight and comfortable for warm weather.",
        image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=600&fit=crop"
    },
    {
        id: 45,
        name: "Performance Gloves",
        category: "accessories",
        price: 29.99,
        description: "Insulated gloves with touchscreen compatible fingertips. Waterproof and windproof design.",
        image: "https://images.unsplash.com/photo-1523521213198-776d0908a54f?w=500&h=600&fit=crop"
    },
    {
        id: 46,
        name: "Crew Socks Pack",
        category: "accessories",
        price: 19.99,
        description: "Pack of 3 comfortable crew socks in breathable cotton blend. Perfect for everyday wear.",
        image: "https://images.unsplash.com/photo-1587563871541-e1dfc9f95a27?w=500&h=600&fit=crop"
    },
    {
        id: 47,
        name: "Denim Overalls",
        category: "womens",
        price: 99.99,
        description: "Trendy denim overalls with adjustable straps. Durable construction with front pockets.",
        image: "https://images.unsplash.com/photo-1570933382230-04f09b8bd2eb?w=500&h=600&fit=crop"
    },
    {
        id: 48,
        name: "Rain Jacket",
        category: "mens",
        price: 119.99,
        description: "Waterproof rain jacket with sealed seams. Packable design perfect for travel.",
        image: "https://images.unsplash.com/photo-1578257914639-c5c37eb67de6?w=500&h=600&fit=crop"
    },
    {
        id: 49,
        name: "Crossbody Purse",
        category: "accessories",
        price: 89.99,
        description: "Compact crossbody purse with adjustable strap. Multiple compartments for organization.",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=600&fit=crop"
    },
    {
        id: 50,
        name: "Sports Bra",
        category: "womens",
        price: 59.99,
        description: "High-impact sports bra with adjustable straps. Breathable mesh and excellent support.",
        image: "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=500&h=600&fit=crop"
    }
];
