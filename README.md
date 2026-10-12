# VoltStore India - Dynamic Product Filtering and Search System

A modern, responsive e-commerce web application built with **HTML5**, **CSS3**, and **Vanilla JavaScript** tailored for the Indian market.

---

## 🌟 Key Features

### 1. Demo Authentication System (`auth.js`, `login.html`, `signup.html`)
- **Login & Sign Up Pages**: Complete with full name, email, password, and confirm password fields.
- **Show/Hide Password**: Quick eye-icon toggle to reveal or obscure passwords.
- **Form Validation**: Real-time format checking, email pattern matching, password length validation, and clear error alerts.
- **"Remember Me" Support**: Persists email address in `localStorage` for returning users.
- **One-Click Quick Test**: Instant demo credential buttons for test accounts (`Aarav Sharma` - `aarav@demo.in` & `Priya Patel` - `priya@demo.in`).
- **Profile Dropdown**: Displays user name, initial avatar, demo badge, and functional **Logout** button.
- **Security Notice**: Clear disclosures explaining client-side demo storage versus production backend security.

### 2. Comprehensive Product Catalog (`products.js`)
- **49 Realistic Products** spanning **10 Categories**:
  1. *Electronics* (4K Smart TVs, DSLR cameras, soundbars, portable SSDs)
  2. *Mobiles* (iPhone 15, Galaxy S24 Ultra, OnePlus 12R, Redmi Note 13 Pro+, Realme)
  3. *Laptops* (MacBook Air M2, ASUS ROG Gaming, HP Pavilion, Lenovo, Dell)
  4. *Headphones* (Sony WH-1000XM5, boAt Rockerz, OnePlus Bullets, AirPods Pro, JBL)
  5. *Smart Watches* (Apple Watch Series 9, Galaxy Watch 6, Noise ColorFit, Fire-Boltt, boAt)
  6. *Fashion* (Levi's Jeans, Allen Solly Shirts, Biba Kurta Sets, Zara Hoodies, W Kurtas)
  7. *Footwear* (Nike Air Max, Puma Smash v2, Adidas Runfalcon, Red Tape Boots, Woodland)
  8. *Home Appliances* (Philips Air Fryer, Dyson Vacuum, LG Refrigerator, Bajaj Geyser, Havells Fan)
  9. *Accessories* (Spigen Cases, Anker 65W GaN Chargers, Belkin MagSafe, Xiaomi Power Bank, Portronics Hub)
  10. *Gaming* (PlayStation 5 Slim, Xbox Wireless Controller, Logitech G502, Razer BlackWidow, HyperX Cloud II)
- **Indian Rupee (INR) Pricing**: Formatted using `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })` (e.g. `₹1,499`, `₹54,990`, `₹1,29,999`).
- **Reliable Images & Automatic SVG Fallbacks**: Built-in SVG placeholder generation prevents broken image displays.

### 3. Dynamic Search & Multi-Filter Engine (`script.js`)
- **Live Search**: Instant filtering as you type across product names, categories, brands, and descriptions. Press `/` to focus anytime.
- **Category Filters**: Sidebar radio list + horizontal quick-jump pill bar with live count badges.
- **Brand Filters**: Interactive chips for top brands (Apple, Samsung, Sony, boAt, Nike, Puma, Philips, ASUS, etc.).
- **Price Range Filter**: Interactive range slider and synchronized min/max numeric inputs in INR (₹0 to ₹1,50,000).
- **Customer Rating Filter**: Radios for "All", "4.0★ & up", and "4.5★ & up".
- **Curated Tabs**: Instant shortcuts for "All Products", "⭐ Featured Picks", "🔥 Best Sellers", and "🏷️ Under ₹5,000".
- **Sorting Options**:
  - Featured / Default
  - Price: Low to High
  - Price: High to Low
  - Name: A to Z
  - Top Rated (Rating: High to Low)
- **Dismissible Active Filter Chips**: Removable tags (e.g., `Brand: Sony [✕]`, `Category: Mobiles [✕]`) with one-click clearance.
- **Friendly Empty State**: Helpful message and "Reset All Filters" button when 0 items match.

### 4. Light & Dark Themes
- **Navbar Theme Toggle Button**: Sun / Moon icon switch.
- **Complete Color Palette Adaptation**: Seamless dark backgrounds, text contrast, card borders, and form inputs.
- **Persistence**: Saved in `localStorage` under `voltstore_theme` and automatically restored on revisits.

### 5. Shopping Cart, Wishlist & Demo Checkout (`cart.js`)
- **Cart Side Drawer**:
  - Quantity controls (`+` / `−`), automatic removal at 0.
  - Live calculations of subtotal, delivery charges (Free over ₹999), and grand total.
  - LocalStorage persistence under `voltstore_cart`.
- **Wishlist Side Drawer**:
  - Heart icon button on product cards to bookmark items.
  - LocalStorage persistence under `voltstore_wishlist`.
  - "Move to Cart" button from wishlist.
- **Quick View Modal**: Inspect larger photos, brand details, customer reviews count, and warranty highlights.
- **Demo Checkout Modal**:
  - Shipping address form.
  - Simulated Indian payment methods (UPI: Google Pay / PhonePe, Credit/Debit Cards, Cash on Delivery).
  - Generates realistic order confirmation IDs (e.g. `IN-784920`) with congratulatory feedback.

---

## 📁 Project File Structure

```
MWP mini project/
├── index.html       # Storefront homepage, navbar, modals, drawers, and catalog grid
├── login.html       # Professional demo login page with validation and quick-fill
├── signup.html      # Demo registration page with validation and auto-login
├── style.css        # CSS3 design system, dark/light themes, drawers, and animations
├── products.js      # 49 Indian e-commerce products, INR formatting & SVG fallbacks
├── auth.js          # Demo authentication module, session tracking, and navbar UI sync
├── cart.js          # Shopping cart, wishlist, quick view, and demo checkout logic
├── script.js        # Main filtering pipeline, live search, sorting, and DOM events
└── README.md        # Comprehensive documentation, testing steps, and security guide
```

---

## 🚀 How to Run the Website Locally

### Option 1: Direct Browser Open (No Installation Needed)
1. Open the project folder in File Explorer:
   `c:\Users\Jayanth Prajin.N\OneDrive\Desktop\MWP mini project\`
2. Double-click **`index.html`** (or right-click → **Open with** → **Google Chrome** / **Microsoft Edge**).

### Option 2: Using the Built-In Python Local Server
1. Open PowerShell or Command Prompt in the project folder.
2. Run:
   ```powershell
   python -m http.server 5500
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:5500/
   ```

---

## 🧪 Step-by-Step Feature Testing Guide

| Feature | Action to Take | Expected Outcome |
| :--- | :--- | :--- |
| **Demo Login** | Open `login.html`, click **Fill "Aarav Sharma"**, then click **Sign In** | Redirects to `index.html` with toast *"Welcome back, Aarav Sharma!"* and displays "Aarav" in the top navbar. |
| **Password Toggle** | On `login.html`, click the eye icon next to the password input | Switches between masked `••••••••` and visible text. |
| **Logout** | Click the profile name in navbar → **Logout** | Clears session, resets navbar to show "Login" and "Sign Up" buttons. |
| **Theme Toggle** | Click the Sun/Moon button in the top navbar | Smoothly switches between Light and Dark mode. Refreshing the page preserves your theme choice. |
| **Live Search** | Type `Sony` or press `/` and type `shoes` | Products instantly filter to matching items. Counter shows updated count. |
| **Category Filter** | Click `Mobiles` in the sidebar or top category bar | Shows 5 mobile phones (iPhone 15, S24 Ultra, OnePlus 12R, Redmi, Realme). |
| **Brand Filter** | Click the `Apple` chip in the sidebar | Shows only Apple devices (iPhone 15, MacBook Air M2, AirPods Pro, Apple Watch Series 9). |
| **Price Slider** | Drag the price slider to ₹10,000 | Only products priced ≤ ₹10,000 remain visible. |
| **Combined Filters**| Select `Footwear` + Brand `Nike` | Displays only "Nike Air Max SC Men's Lightweight Sneakers". |
| **Sorting** | Select `Price: Low to High` | Re-orders catalog from lowest price (e.g. Spigen case ₹999) to highest (S24 Ultra ₹1,29,999). |
| **Curated Tabs** | Click `🏷️ Under ₹5,000` | Filters down to all affordable gadgets, clothing, and accessories under ₹5,000. |
| **Quick View** | Hover over any product card and click **Quick View** | Opens modal with larger image, 20% discount tag, warranty highlights, and Add to Cart button. |
| **Wishlist** | Click the heart icon on any card | Heart turns red, wishlist badge increments, and item appears in the Wishlist drawer. |
| **Add to Cart** | Click **Add** on any product | Button flashes *"Added ✓"*, cart badge bumps, and item is saved to `localStorage`. |
| **Cart Quantity** | Open cart drawer, click `+` or `−` | Quantity and subtotal update in real time. Items removed when decremented to 0. |
| **Demo Checkout** | Click **Proceed to Demo Checkout**, fill address, select UPI, click **Confirm** | Generates order ID (e.g. `IN-654321`), clears cart, and shows success modal. |

---

## 🔒 Security Notice: Demo Authentication vs. Production Architecture

This project deliberately implements client-side demo authentication using browser `localStorage` for educational and prototyping purposes:

| Aspect | This Frontend Prototype | Production System Requirements |
| :--- | :--- | :--- |
| **Password Handling** | Simulated token, no raw password stored in storage | One-way salted hash using **bcrypt**, **Argon2**, or **scrypt** on the backend. |
| **Session Security** | `localStorage` JSON object | Encrypted **HTTP-only, Secure, SameSite** session cookies or short-lived JWTs. |
| **Data Verification** | Browser JavaScript validation | Strict server-side validation & sanitation against SQL Injection & XSS. |
| **Payments** | Simulated UI modal | Server-side integration with certified gateways (**Razorpay**, **Cashfree**, **Stripe**, **Paytm PG**). |
