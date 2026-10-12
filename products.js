/**
 * ============================================================================
 * VoltStore - Products Catalog Dataset (products.js)
 * 
 * 44 Real-World Sample Products across 10 Categories with:
 * - Realistic Indian Market Pricing (INR)
 * - Major Brands, High-Resolution Unsplash Images, Star Ratings
 * - Detailed Specifications and Descriptions
 * ============================================================================
 */

const PRODUCTS = [
  // --- Category: Electronics (4 items) ---
  {
    id: 1,
    name: "Sony Bravia 55-inch 4K Ultra HD Smart Google TV",
    category: "Electronics",
    brand: "Sony",
    price: 54990,
    rating: 4.7,
    reviewsCount: 320,
    featured: true,
    bestSeller: true,
    description: "4K HDR processor X1, Dolby Vision & Atmos, Google TV with voice assistant, and 60Hz native refresh rate.",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Canon EOS 1500D 24.1MP Digital SLR Camera",
    category: "Electronics",
    brand: "Canon",
    price: 36990,
    rating: 4.5,
    reviewsCount: 184,
    featured: false,
    bestSeller: false,
    description: "24.1-megapixel APS-C CMOS sensor with EF S18-55 lens, DIGIC 4+ processor, Wi-Fi, and Full HD video recording.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "boAt Aavante Bar 1160 60W Bluetooth Soundbar",
    category: "Electronics",
    brand: "boAt",
    price: 3499,
    rating: 4.3,
    reviewsCount: 420,
    featured: false,
    bestSeller: true,
    description: "2.0 channel soundbar delivering 60W RMS signature boAt sound with multi-compatibility and remote control.",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "SanDisk Extreme 1TB Portable External NVMe SSD",
    category: "Electronics",
    brand: "SanDisk",
    price: 8499,
    rating: 4.8,
    reviewsCount: 145,
    featured: true,
    bestSeller: false,
    description: "Up to 1050MB/s read speed, rugged IP55 water and dust resistance, with USB-C 3.2 Gen 2 interface.",
    image: "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?w=600&q=80&auto=format&fit=crop"
  },

  // --- Category: Mobiles (5 items) ---
  {
    id: 5,
    name: "Apple iPhone 15 (128GB, Blue)",
    category: "Mobiles",
    brand: "Apple",
    price: 69999,
    rating: 4.8,
    reviewsCount: 512,
    featured: true,
    bestSeller: true,
    description: "Dynamic Island, 48MP main camera with 2x Telephoto, A16 Bionic chip, and durable colour-infused back glass.",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Samsung Galaxy S24 Ultra 5G (256GB)",
    category: "Mobiles",
    brand: "Samsung",
    price: 129999,
    rating: 4.9,
    reviewsCount: 230,
    featured: true,
    bestSeller: false,
    description: "Titanium frame, Galaxy AI live translate, 200MP camera with 100x Space Zoom, and built-in S Pen stylus.",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "OnePlus 12R 5G (Cool Blue, 16GB RAM)",
    category: "Mobiles",
    brand: "OnePlus",
    price: 39999,
    rating: 4.6,
    reviewsCount: 310,
    featured: false,
    bestSeller: true,
    description: "Snapdragon 8 Gen 2, 4th Gen LTPO 120Hz ProXDR display, 5500mAh massive battery, and 100W SUPERVOOC charging.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Redmi Note 13 Pro+ 5G (Fusion Purple)",
    category: "Mobiles",
    brand: "Xiaomi",
    price: 29999,
    rating: 4.4,
    reviewsCount: 285,
    featured: false,
    bestSeller: false,
    description: "200MP OIS camera, 3D curved 1.5K AMOLED display, IP68 water resistance, and lightning-fast 120W HyperCharge.",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 9,
    name: "Realme 12 Pro 5G (Submarine Blue)",
    category: "Mobiles",
    brand: "Realme",
    price: 21999,
    rating: 4.3,
    reviewsCount: 198,
    featured: false,
    bestSeller: false,
    description: "Luxury watch design by Ollivier Saveo, 32MP telephoto portrait camera, and 120Hz curved vision AMOLED panel.",
    image: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=600&q=80&auto=format&fit=crop"
  },

  // --- Category: Laptops (5 items) ---
  {
    id: 10,
    name: "Apple MacBook Air M2 (13.6-inch, Midnight)",
    category: "Laptops",
    brand: "Apple",
    price: 89990,
    rating: 4.9,
    reviewsCount: 420,
    featured: true,
    bestSeller: true,
    description: "Strikingly thin design, Apple M2 chip with 8-core CPU, Liquid Retina display, MagSafe 3, and 18hr battery life.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 11,
    name: "ASUS ROG Strix G16 Gaming Laptop",
    category: "Laptops",
    brand: "ASUS",
    price: 98990,
    rating: 4.7,
    reviewsCount: 165,
    featured: true,
    bestSeller: false,
    description: "Intel Core i7 13th Gen, RTX 4060 8GB graphics, 165Hz FHD+ IPS display, and ROG Intelligent Cooling liquid metal.",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 12,
    name: "HP Pavilion 15 (13th Gen Intel Core i5)",
    category: "Laptops",
    brand: "HP",
    price: 54990,
    rating: 4.5,
    reviewsCount: 240,
    featured: false,
    bestSeller: true,
    description: "15.6-inch micro-edge anti-glare display, 16GB DDR4 RAM, 512GB NVMe SSD, B&O audio, and backlit keyboard.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 13,
    name: "Lenovo IdeaPad Slim 3 Thin & Light Laptop",
    category: "Laptops",
    brand: "Lenovo",
    price: 38490,
    rating: 4.3,
    reviewsCount: 190,
    featured: false,
    bestSeller: false,
    description: "Intel Core i3 12th Gen processor, 8GB RAM, 512GB SSD, Rapid Charge, and Dolby Audio stereo speakers.",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 14,
    name: "Dell Inspiron 14 2-in-1 Touchscreen Laptop",
    category: "Laptops",
    brand: "Dell",
    price: 62990,
    rating: 4.6,
    reviewsCount: 110,
    featured: false,
    bestSeller: false,
    description: "AMD Ryzen 5 7000 Series, 14-inch FHD+ 16:10 touch screen with active pen support and 360-degree convertible hinge.",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&q=80&auto=format&fit=crop"
  },

  // --- Category: Headphones (5 items) ---
  {
    id: 15,
    name: "Sony WH-1000XM5 Wireless ANC Headphones",
    category: "Headphones",
    brand: "Sony",
    price: 28990,
    rating: 4.8,
    reviewsCount: 380,
    featured: true,
    bestSeller: false,
    description: "Industry-leading noise cancellation with 8 microphones, Auto NC Optimizer, LDAC high-res audio, and 30hr battery.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 16,
    name: "boAt Rockerz 450 Pro Bluetooth Wireless Headphones",
    category: "Headphones",
    brand: "boAt",
    price: 1499,
    rating: 4.2,
    reviewsCount: 890,
    featured: false,
    bestSeller: true,
    description: "40mm audio drivers, 70 hours playback, ASAP fast charge, cosy padded ear cushions, and Bluetooth 5.0.",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 17,
    name: "OnePlus Bullets Wireless Z2 Bluetooth Neckband",
    category: "Headphones",
    brand: "OnePlus",
    price: 1799,
    rating: 4.5,
    reviewsCount: 750,
    featured: false,
    bestSeller: true,
    description: "12.4mm bass drivers, AI call noise cancellation, 30-hour battery life with 10-minute fast charging.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 18,
    name: "Apple AirPods Pro (2nd Generation, MagSafe USB-C)",
    category: "Headphones",
    brand: "Apple",
    price: 22990,
    rating: 4.9,
    reviewsCount: 460,
    featured: true,
    bestSeller: false,
    description: "H2 headphone chip, up to 2x more Active Noise Cancellation, Adaptive Audio, and Personalized Spatial Audio.",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 19,
    name: "JBL Tune 770NC Wireless Over-Ear NC Headphones",
    category: "Headphones",
    brand: "JBL",
    price: 5999,
    rating: 4.4,
    reviewsCount: 210,
    featured: false,
    bestSeller: false,
    description: "Adaptive Noise Cancelling with Smart Ambient, JBL Pure Bass sound, up to 70-hour battery, and speed charging.",
    image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=600&q=80&auto=format&fit=crop"
  },

  // --- Category: Smart Watches (5 items) ---
  {
    id: 20,
    name: "Apple Watch Series 9 GPS (45mm Starlight)",
    category: "Smart Watches",
    brand: "Apple",
    price: 38990,
    rating: 4.8,
    reviewsCount: 290,
    featured: true,
    bestSeller: false,
    description: "S9 SiP chip, Double Tap gesture, brighter Always-On display, ECG, blood oxygen sensor, and Crash Detection.",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 21,
    name: "Samsung Galaxy Watch 6 LTE (44mm Graphite)",
    category: "Smart Watches",
    brand: "Samsung",
    price: 26999,
    rating: 4.6,
    reviewsCount: 175,
    featured: false,
    bestSeller: false,
    description: "Sapphire crystal glass, personalised heart rate zones, sleep coach, body composition analysis, and Wear OS.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 22,
    name: "Noise ColorFit Pro 5 AMOLED Calling Smartwatch",
    category: "Smart Watches",
    brand: "Noise",
    price: 2999,
    rating: 4.3,
    reviewsCount: 620,
    featured: false,
    bestSeller: true,
    description: "1.85-inch AMOLED display with Always-On screen, Tru Sync BT calling, emergency SOS, and 100+ sports modes.",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 23,
    name: "Fire-Boltt Invincible Plus AMOLED Smartwatch",
    category: "Smart Watches",
    brand: "Fire-Boltt",
    price: 3499,
    rating: 4.2,
    reviewsCount: 430,
    featured: false,
    bestSeller: false,
    description: "1.43-inch AMOLED display, 4GB in-built storage, TWS earbud connectivity, Bluetooth calling, and 300 sports modes.",
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 24,
    name: "boAt Wave Call 2 Bluetooth Calling Smartwatch",
    category: "Smart Watches",
    brand: "boAt",
    price: 1299,
    rating: 4.1,
    reviewsCount: 910,
    featured: false,
    bestSeller: true,
    description: "1.83-inch HD display, advanced Bluetooth calling dialpad, live cricket scores, and IP67 splash resistance.",
    image: "https://images.unsplash.com/photo-1510017803434-a899398421b3?w=600&q=80&auto=format&fit=crop"
  },

  // --- Category: Fashion (5 items) ---
  {
    id: 25,
    name: "Levi's Men's 511 Slim Fit Stretchable Jeans",
    category: "Fashion",
    brand: "Levi's",
    price: 2499,
    rating: 4.6,
    reviewsCount: 340,
    featured: true,
    bestSeller: true,
    description: "Modern slim silhouette with room to move, premium stretch denim construction, and classic 5-pocket styling.",
    image: "https://images.unsplash.com/photo-1542272604-780c96856592?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 26,
    name: "Allen Solly Men's Classic Solid Formal Shirt",
    category: "Fashion",
    brand: "Allen Solly",
    price: 1699,
    rating: 4.4,
    reviewsCount: 220,
    featured: false,
    bestSeller: false,
    description: "Crafted from 100% combed cotton, regular fit with semi-cutaway collar and embroidered crest emblem.",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 27,
    name: "Biba Women's Printed Cotton Anarkali Kurta Set",
    category: "Fashion",
    brand: "Biba",
    price: 2999,
    rating: 4.7,
    reviewsCount: 295,
    featured: true,
    bestSeller: true,
    description: "Elegant floral printed Anarkali silhouette with matching churidar and lightweight chiffon dupatta.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 28,
    name: "Zara Men's Casual Heavyweight Oversized Hoodie",
    category: "Fashion",
    brand: "Zara",
    price: 3290,
    rating: 4.5,
    reviewsCount: 160,
    featured: false,
    bestSeller: false,
    description: "Boxy relaxed cut made from soft organic fleece, kangaroo pocket, ribbed cuffs, and drawstring hood.",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 29,
    name: "W for Woman Festive Jacquard Straight Kurta",
    category: "Fashion",
    brand: "W",
    price: 3599,
    rating: 4.5,
    reviewsCount: 140,
    featured: false,
    bestSeller: false,
    description: "Rich woven jacquard detailing with mandarin neckline and side slits, tailored for festive celebrations.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80&auto=format&fit=crop"
  },

  // --- Category: Footwear (5 items) ---
  {
    id: 30,
    name: "Nike Air Max SC Men's Lightweight Sneakers",
    category: "Footwear",
    brand: "Nike",
    price: 6495,
    rating: 4.7,
    reviewsCount: 310,
    featured: true,
    bestSeller: true,
    description: "Heritage athletics design with visible Max Air cushioning, breathable mesh, and durable genuine leather overlays.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 31,
    name: "Puma Smash v2 Leather Men's Low-Top Sneakers",
    category: "Footwear",
    brand: "Puma",
    price: 2799,
    rating: 4.3,
    reviewsCount: 540,
    featured: false,
    bestSeller: true,
    description: "Clean court-inspired tennis silhouette, soft genuine leather upper, and grippy durable rubber outsole.",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 32,
    name: "Adidas Runfalcon 3.0 Men's Running Shoes",
    category: "Footwear",
    brand: "Adidas",
    price: 3499,
    rating: 4.4,
    reviewsCount: 390,
    featured: false,
    bestSeller: false,
    description: "Cloudfoam midsole for instant step-in comfort, textile lining, and durable high-traction rubber outsole.",
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 33,
    name: "Red Tape Men's Casual Suede Chelsea Boots",
    category: "Footwear",
    brand: "Red Tape",
    price: 2299,
    rating: 4.2,
    reviewsCount: 180,
    featured: false,
    bestSeller: false,
    description: "High-grade suede leather upper, elasticated side gores for easy slip-on, and cushioned TPR sole.",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 34,
    name: "Woodland Men's Camel Leather Trekking Shoes",
    category: "Footwear",
    brand: "Woodland",
    price: 3995,
    rating: 4.6,
    reviewsCount: 260,
    featured: false,
    bestSeller: false,
    description: "Heavy-duty nubuck leather outdoor boots with deep lugged rubber tread for superior mountain terrain grip.",
    image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&q=80&auto=format&fit=crop"
  },

  // --- Category: Home Appliances (5 items) ---
  {
    id: 35,
    name: "Philips Digital Air Fryer HD9200 (4.1 Litre)",
    category: "Home Appliances",
    brand: "Philips",
    price: 6999,
    rating: 4.6,
    reviewsCount: 410,
    featured: true,
    bestSeller: true,
    description: "Rapid Air technology fries with up to 90% less fat, easy-to-use digital timer and temperature presets.",
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 36,
    name: "Dyson V8 Cordless Stick Vacuum Cleaner",
    category: "Home Appliances",
    brand: "Dyson",
    price: 29900,
    rating: 4.8,
    reviewsCount: 190,
    featured: true,
    bestSeller: false,
    description: "Powerful digital motor V8, up to 40 minutes of fade-free suction, advanced filtration, and no-touch bin emptying.",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 37,
    name: "LG 242L 3 Star Smart Inverter Double Door Refrigerator",
    category: "Home Appliances",
    brand: "LG",
    price: 24990,
    rating: 4.5,
    reviewsCount: 310,
    featured: false,
    bestSeller: true,
    description: "Multi Air Flow cooling, Smart Connect stabilizer-free operation, toughened glass shelves, and anti-bacterial gasket.",
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 38,
    name: "Bajaj New Shakti Neo 15L Vertical Water Geyser",
    category: "Home Appliances",
    brand: "Bajaj",
    price: 5499,
    rating: 4.3,
    reviewsCount: 270,
    featured: false,
    bestSeller: false,
    description: "Titanium Armour technology tank, copper heating element, 8-bar pressure rated for high-rise buildings.",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 39,
    name: "Havells Stealth Air 1200mm Premium Ceiling Fan",
    category: "Home Appliances",
    brand: "Havells",
    price: 2199,
    rating: 4.4,
    reviewsCount: 380,
    featured: false,
    bestSeller: false,
    description: "Aerodynamic dust-resistant blades, whisper-quiet motor operation, and high air delivery of 280 m³/min.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80&auto=format&fit=crop"
  },

  // --- Category: Accessories (5 items) ---
  {
    id: 40,
    name: "Spigen Ultra Hybrid Matte Phone Case",
    category: "Accessories",
    brand: "Spigen",
    price: 999,
    rating: 4.5,
    reviewsCount: 450,
    featured: false,
    bestSeller: true,
    description: "Air Cushion military-grade corner drop defense with clear polycarbonate back and flexible TPU bumper.",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 41,
    name: "Anker 65W GaN Fast Dual USB-C Wall Charger",
    category: "Accessories",
    brand: "Anker",
    price: 2999,
    rating: 4.8,
    reviewsCount: 210,
    featured: true,
    bestSeller: false,
    description: "Gallium Nitride (GaN) high efficiency tech, fast charges laptops, tablets, and phones simultaneously.",
    image: "https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 42,
    name: "Belkin 3-in-1 Wireless MagSafe Charging Pad",
    category: "Accessories",
    brand: "Belkin",
    price: 7499,
    rating: 4.6,
    reviewsCount: 95,
    featured: false,
    bestSeller: false,
    description: "15W fast wireless charging for iPhone, Apple Watch fast charger, and dedicated Qi pad for wireless earbuds.",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 43,
    name: "Xiaomi 20000mAh Power Bank 3i (18W Fast Charge)",
    category: "Accessories",
    brand: "Xiaomi",
    price: 1999,
    rating: 4.5,
    reviewsCount: 880,
    featured: false,
    bestSeller: true,
    description: "Triple port output, two-way fast charging, 12-layer advanced circuit protection, and low-power charging mode.",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 44,
    name: "Portronics MUSB 6-in-1 Multiport USB-C Hub",
    category: "Accessories",
    brand: "Portronics",
    price: 1299,
    rating: 4.2,
    reviewsCount: 240,
    featured: false,
    bestSeller: false,
    description: "Aluminum housing with 4K HDMI 30Hz, USB 3.0 ports, SD/TF card reader, and 87W Power Delivery passthrough.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80&auto=format&fit=crop"
  },

  // --- Category: Gaming (5 items) ---
  {
    id: 45,
    name: "Sony PlayStation 5 Slim Console (Disc Edition)",
    category: "Gaming",
    brand: "Sony",
    price: 49990,
    rating: 4.9,
    reviewsCount: 520,
    featured: true,
    bestSeller: true,
    description: "1TB high-speed SSD, ray tracing, 4K-TV gaming up to 120fps, HDR technology, and Tempest 3D AudioTech.",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 46,
    name: "Xbox Wireless Controller (Carbon Black)",
    category: "Gaming",
    brand: "Microsoft",
    price: 5390,
    rating: 4.7,
    reviewsCount: 310,
    featured: false,
    bestSeller: true,
    description: "Textured grip on triggers and bumpers, hybrid D-pad, share button, and seamless Bluetooth pairing across devices.",
    image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 47,
    name: "Logitech G502 HERO High Performance Gaming Mouse",
    category: "Gaming",
    brand: "Logitech",
    price: 3995,
    rating: 4.8,
    reviewsCount: 680,
    featured: false,
    bestSeller: true,
    description: "HERO 25K optical sensor, 11 programmable buttons, adjustable weights, and LIGHTSYNC customizable RGB.",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 48,
    name: "Razer BlackWidow V4 Mechanical RGB Gaming Keyboard",
    category: "Gaming",
    brand: "Razer",
    price: 8999,
    rating: 4.6,
    reviewsCount: 190,
    featured: true,
    bestSeller: false,
    description: "Razer Green clicky mechanical switches, multi-function roller with media keys, and magnetic plush wrist rest.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80&auto=format&fit=crop"
  },
  {
    id: 49,
    name: "HyperX Cloud II Pro Wired Gaming Headset",
    category: "Gaming",
    brand: "HyperX",
    price: 6890,
    rating: 4.7,
    reviewsCount: 440,
    featured: false,
    bestSeller: false,
    description: "Hardware-driven virtual 7.1 surround sound, 53mm neodymium drivers, memory foam ear pads, and noise-canceling mic.",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=600&q=80&auto=format&fit=crop"
  }
];

// Helper to format currency in Indian numbering system (e.g. ₹1,499, ₹54,990)
const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});

function formatINR(amount) {
  return inrFormatter.format(amount);
}

// Global fallback image generator using SVG
function handleImageError(imgElement, category) {
  imgElement.onerror = null; // Prevent loop
  const icons = {
    "Electronics": "📺",
    "Mobiles": "📱",
    "Laptops": "💻",
    "Headphones": "🎧",
    "Smart Watches": "⌚",
    "Fashion": "👕",
    "Footwear": "👟",
    "Home Appliances": "🏠",
    "Accessories": "🔌",
    "Gaming": "🎮"
  };
  const icon = icons[category] || "🛍️";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450">
      <rect width="600" height="450" fill="#f1f5f9"/>
      <circle cx="300" cy="190" r="65" fill="#e2e8f0"/>
      <text x="300" y="210" font-size="50" text-anchor="middle" font-family="sans-serif">${icon}</text>
      <text x="300" y="295" font-size="22" font-weight="bold" fill="#334155" text-anchor="middle" font-family="sans-serif">${category}</text>
      <text x="300" y="325" font-size="14" fill="#94a3b8" text-anchor="middle" font-family="sans-serif">VoltStore Quality Product</text>
    </svg>
  `;
  imgElement.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// Make accessible on window
window.PRODUCTS = PRODUCTS;
window.formatINR = formatINR;
window.handleImageError = handleImageError;
