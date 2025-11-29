const products = [
    {
        id: 1,
        name: "Classic Cotton T-Shirt",
        category: "mens",
        price: 24.99,
        description: "100% cotton crew neck t-shirt. Soft, breathable fabric perfect for everyday wear. Available in multiple colors.",
        image: "👕"
    },
    {
        id: 2,
        name: "Slim Fit Denim Jeans",
        category: "mens",
        price: 79.99,
        description: "Premium stretch denim with slim fit. Features five-pocket styling and durable construction for lasting comfort.",
        image: "👖"
    },
    {
        id: 3,
        name: "Floral Print Summer Dress",
        category: "womens",
        price: 89.99,
        description: "Lightweight floral maxi dress with adjustable straps. Perfect for warm weather and special occasions.",
        image: "👗"
    },
    {
        id: 4,
        name: "Leather Crossbody Bag",
        category: "accessories",
        price: 129.99,
        description: "Genuine leather crossbody bag with adjustable strap. Multiple compartments for organized storage.",
        image: "👜"
    },
    {
        id: 5,
        name: "Running Sneakers",
        category: "mens",
        price: 94.99,
        description: "Lightweight athletic shoes with cushioned sole. Breathable mesh upper and responsive cushioning for all-day comfort.",
        image: "👟"
    },
    {
        id: 6,
        name: "Wool Blend Cardigan",
        category: "womens",
        price: 69.99,
        description: "Cozy wool blend cardigan with button closure. Classic fit perfect for layering in cooler weather.",
        image: "🧥"
    },
    {
        id: 7,
        name: "Oxford Button-Down Shirt",
        category: "mens",
        price: 54.99,
        description: "Classic oxford shirt in wrinkle-resistant fabric. Perfect for business casual or smart casual occasions.",
        image: "👔"
    },
    {
        id: 8,
        name: "High-Waisted Yoga Pants",
        category: "womens",
        price: 49.99,
        description: "Moisture-wicking yoga pants with four-way stretch. High waistband for comfort and support during workouts.",
        image: "👖"
    },
    {
        id: 9,
        name: "Aviator Sunglasses",
        category: "accessories",
        price: 149.99,
        description: "Classic aviator style with polarized lenses. UV400 protection and durable metal frame construction.",
        image: "🕶️"
    },
    {
        id: 10,
        name: "Quilted Puffer Jacket",
        category: "mens",
        price: 169.99,
        description: "Insulated puffer jacket with water-resistant outer shell. Features zip pockets and adjustable hood.",
        image: "🧥"
    },
    {
        id: 11,
        name: "Cashmere Sweater",
        category: "womens",
        price: 189.99,
        description: "Luxurious 100% cashmere sweater with ribbed trim. Ultra-soft and warm for cold weather styling.",
        image: "🧶"
    },
    {
        id: 12,
        name: "Chino Shorts",
        category: "mens",
        price: 44.99,
        description: "Classic fit chino shorts in stretch cotton twill. Perfect for casual summer days with a 9-inch inseam.",
        image: "🩳"
    },
    {
        id: 13,
        name: "Silk Blouse",
        category: "womens",
        price: 119.99,
        description: "Elegant silk blouse with button front. Lightweight and breathable with a sophisticated drape.",
        image: "👚"
    },
    {
        id: 14,
        name: "Canvas Backpack",
        category: "accessories",
        price: 64.99,
        description: "Durable canvas backpack with leather accents. Padded laptop compartment and multiple organizational pockets.",
        image: "🎒"
    },
    {
        id: 15,
        name: "Wool Peacoat",
        category: "mens",
        price: 249.99,
        description: "Classic double-breasted peacoat in warm wool blend. Timeless style with anchor buttons and side pockets.",
        image: "🧥"
    },
    {
        id: 16,
        name: "Athletic Tank Top",
        category: "womens",
        price: 29.99,
        description: "Moisture-wicking tank with built-in shelf bra. Ideal for gym workouts or casual athletic wear.",
        image: "👚"
    },
    {
        id: 17,
        name: "Leather Belt",
        category: "accessories",
        price: 39.99,
        description: "Full-grain leather belt with classic buckle. Versatile design suitable for both casual and formal wear.",
        image: "🔗"
    },
    {
        id: 18,
        name: "Hooded Sweatshirt",
        category: "mens",
        price: 59.99,
        description: "Comfortable cotton-blend hoodie with kangaroo pocket. Soft fleece lining for extra warmth.",
        image: "👘"
    },
    {
        id: 19,
        name: "Pencil Skirt",
        category: "womens",
        price: 54.99,
        description: "Professional pencil skirt in stretch fabric. Sits at natural waist with back vent for easy movement.",
        image: "👗"
    },
    {
        id: 20,
        name: "Knit Beanie",
        category: "accessories",
        price: 24.99,
        description: "Soft knit beanie with fold-up cuff. One size fits most, perfect for cold weather.",
        image: "🧢"
    },
    {
        id: 21,
        name: "Flannel Shirt",
        category: "mens",
        price: 49.99,
        description: "Soft cotton flannel in traditional plaid pattern. Button-down collar and chest pocket details.",
        image: "👕"
    },
    {
        id: 22,
        name: "Wrap Dress",
        category: "womens",
        price: 94.99,
        description: "Flattering wrap dress with tie waist. Versatile style perfect for office or evening events.",
        image: "👗"
    },
    {
        id: 23,
        name: "Canvas Sneakers",
        category: "womens",
        price: 54.99,
        description: "Classic low-top canvas sneakers. Comfortable cushioned insole and durable rubber outsole.",
        image: "👟"
    },
    {
        id: 24,
        name: "Bomber Jacket",
        category: "mens",
        price: 139.99,
        description: "Nylon bomber jacket with ribbed cuffs and hem. Zip closure with side pockets and quilted lining.",
        image: "🧥"
    },
    {
        id: 25,
        name: "Scarf",
        category: "accessories",
        price: 34.99,
        description: "Lightweight scarf in soft fabric. Versatile accessory that adds style to any outfit.",
        image: "🧣"
    },
    {
        id: 26,
        name: "Athletic Shorts",
        category: "mens",
        price: 34.99,
        description: "Moisture-wicking athletic shorts with elastic waistband. Quick-dry fabric with mesh panels for ventilation.",
        image: "🩳"
    },
    {
        id: 27,
        name: "Denim Jacket",
        category: "womens",
        price: 84.99,
        description: "Classic denim jacket with button closure. Timeless style with chest pockets and adjustable waist tabs.",
        image: "🧥"
    },
    {
        id: 28,
        name: "Leather Wallet",
        category: "accessories",
        price: 44.99,
        description: "Bi-fold leather wallet with multiple card slots. Includes ID window and bill compartment.",
        image: "💼"
    },
    {
        id: 29,
        name: "Polo Shirt",
        category: "mens",
        price: 39.99,
        description: "Classic pique polo with ribbed collar and cuffs. Comfortable cotton blend perfect for casual wear.",
        image: "👕"
    },
    {
        id: 30,
        name: "Ankle Boots",
        category: "womens",
        price: 129.99,
        description: "Stylish ankle boots with side zip closure. Comfortable block heel and durable leather construction.",
        image: "👢"
    }
];
