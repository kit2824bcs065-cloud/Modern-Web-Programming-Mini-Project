/**
 * ============================================================================
 * VoltStore - Cart, Wishlist & Checkout Management Module (cart.js)
 * 
 * Features:
 * 1. Persistent Shopping Cart in localStorage (quantities, item removal, clear)
 * 2. Persistent Wishlist in localStorage with instant toggle
 * 3. Dynamic INR Currency Calculations (Subtotal, GST/Taxes, Free Shipping)
 * 4. Slide-Out Cart Drawer & Wishlist Drawer
 * 5. Quick View Product Details Modal
 * 6. Demo Checkout Modal with Indian Payment Options (UPI, Cards, NetBanking, COD)
 * ============================================================================
 */

const CART_STORAGE_KEY = "voltstore_cart";
const WISHLIST_STORAGE_KEY = "voltstore_wishlist";

let cartItems = [];
let wishlistItems = [];

// Initialize Cart & Wishlist from localStorage
function initCartAndWishlist() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      cartItems = JSON.parse(savedCart);
    }
  } catch (e) {
    cartItems = [];
  }

  try {
    const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (savedWishlist) {
      wishlistItems = JSON.parse(savedWishlist);
    }
  } catch (e) {
    wishlistItems = [];
  }

  updateCartBadgesAndUI();
  updateWishlistBadgesAndUI();
}

/**
 * Persists cart state
 */
function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch (e) {}
}

/**
 * Persists wishlist state
 */
function saveWishlist() {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems));
  } catch (e) {}
}

/**
 * Adds product to cart or increments quantity
 */
function addToCart(productId, quantity = 1) {
  const product = window.PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cartItems.find(item => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cartItems.push({
      id: product.id,
      name: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }

  saveCart();
  updateCartBadgesAndUI();
  triggerBadgeBump("cartCountBadge");
  flashButtonSuccess(productId);

  if (typeof showToast === "function") {
    showToast(`Added "${product.name}" to cart!`, "success");
  }
}

/**
 * Modifies cart item quantity (+1 or -1)
 */
function updateCartQty(productId, change) {
  const idx = cartItems.findIndex(i => i.id === productId);
  if (idx === -1) return;

  cartItems[idx].quantity += change;

  if (cartItems[idx].quantity <= 0) {
    const removedName = cartItems[idx].name;
    cartItems.splice(idx, 1);
    if (typeof showToast === "function") {
      showToast(`Removed "${removedName}" from cart.`, "info");
    }
  }

  saveCart();
  updateCartBadgesAndUI();
}

/**
 * Removes an item entirely from cart
 */
function removeCartItem(productId) {
  const item = cartItems.find(i => i.id === productId);
  cartItems = cartItems.filter(i => i.id !== productId);
  saveCart();
  updateCartBadgesAndUI();

  if (item && typeof showToast === "function") {
    showToast(`Removed "${item.name}" from cart.`, "info");
  }
}

/**
 * Empties all items from cart
 */
function clearCart() {
  if (cartItems.length === 0) return;
  cartItems = [];
  saveCart();
  updateCartBadgesAndUI();
  if (typeof showToast === "function") {
    showToast("Shopping cart cleared.", "info");
  }
}

/**
 * Toggles product in user's wishlist
 */
function toggleWishlist(productId) {
  const product = window.PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const idx = wishlistItems.findIndex(id => id === productId);
  const isAdded = idx === -1;

  if (isAdded) {
    wishlistItems.push(productId);
    if (typeof showToast === "function") {
      showToast(`Saved "${product.name}" to Wishlist!`, "success");
    }
  } else {
    wishlistItems.splice(idx, 1);
    if (typeof showToast === "function") {
      showToast(`Removed from Wishlist.`, "info");
    }
  }

  saveWishlist();
  updateWishlistBadgesAndUI();
  updateWishlistIconsOnCards();
  triggerBadgeBump("wishlistCountBadge");
}

function isInWishlist(productId) {
  return wishlistItems.includes(productId);
}

/**
 * Updates cart badge, item counts, drawer markup, and INR totals
 */
function updateCartBadgesAndUI() {
  const totalCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = cartItems.reduce((acc, i) => acc + (i.price * i.quantity), 0);

  // Delivery calculation: Free delivery over ₹999, else ₹99
  const shippingFee = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const grandTotal = subtotal + shippingFee;

  // Header badges
  const badge = document.getElementById("cartCountBadge");
  const drawerCount = document.getElementById("cartItemCountHeader");
  if (badge) badge.textContent = totalCount;
  if (drawerCount) drawerCount.textContent = totalCount;

  // Drawer Body
  const listEl = document.getElementById("cartItemsList");
  const emptyEl = document.getElementById("cartEmptyMessage");
  const footerEl = document.getElementById("cartFooter");

  if (!listEl) return;

  if (cartItems.length === 0) {
    listEl.innerHTML = "";
    if (emptyEl) emptyEl.classList.remove("hidden");
    if (footerEl) footerEl.classList.add("hidden");
  } else {
    if (emptyEl) emptyEl.classList.add("hidden");
    if (footerEl) footerEl.classList.remove("hidden");

    listEl.innerHTML = cartItems.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img 
          src="${item.image}" 
          alt="${escapeHtml(item.name)}" 
          class="cart-item-img"
          onerror="handleImageError(this, '${item.category}')"
        >
        <div class="cart-item-details">
          <span class="cart-item-brand">${escapeHtml(item.brand || "")}</span>
          <h4 class="cart-item-title">${escapeHtml(item.name)}</h4>
          <span class="cart-item-price">${formatINR(item.price)} each</span>
          <div class="cart-item-qty-row">
            <button type="button" class="qty-btn" onclick="updateCartQty(${item.id}, -1)" aria-label="Decrease quantity">&minus;</button>
            <span class="qty-number">${item.quantity}</span>
            <button type="button" class="qty-btn" onclick="updateCartQty(${item.id}, 1)" aria-label="Increase quantity">&plus;</button>
          </div>
        </div>
        <div class="cart-item-action">
          <span class="cart-item-subtotal">${formatINR(item.price * item.quantity)}</span>
          <button type="button" class="cart-item-delete" onclick="removeCartItem(${item.id})" title="Remove item" aria-label="Remove item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    `).join("");

    const subtotalEl = document.getElementById("cartSubtotalAmount");
    const shippingEl = document.getElementById("cartShippingAmount");
    const totalEl = document.getElementById("cartTotalAmount");

    if (subtotalEl) subtotalEl.textContent = formatINR(subtotal);
    if (shippingEl) shippingEl.textContent = shippingFee === 0 ? "FREE" : formatINR(shippingFee);
    if (totalEl) totalEl.textContent = formatINR(grandTotal);
  }
}

/**
 * Updates wishlist badge counter & wishlist modal list
 */
function updateWishlistBadgesAndUI() {
  const badge = document.getElementById("wishlistCountBadge");
  if (badge) badge.textContent = wishlistItems.length;

  const listEl = document.getElementById("wishlistItemsList");
  const emptyEl = document.getElementById("wishlistEmptyMessage");
  if (!listEl) return;

  const items = window.PRODUCTS.filter(p => wishlistItems.includes(p.id));

  if (items.length === 0) {
    listEl.innerHTML = "";
    if (emptyEl) emptyEl.classList.remove("hidden");
  } else {
    if (emptyEl) emptyEl.classList.add("hidden");
    listEl.innerHTML = items.map(p => `
      <div class="wishlist-item" data-id="${p.id}">
        <img src="${p.image}" alt="${escapeHtml(p.name)}" class="wishlist-item-img" onerror="handleImageError(this, '${p.category}')">
        <div class="wishlist-item-details">
          <h4>${escapeHtml(p.name)}</h4>
          <span class="wishlist-item-price">${formatINR(p.price)}</span>
        </div>
        <div class="wishlist-item-actions">
          <button type="button" class="btn btn-primary btn-sm" onclick="addToCart(${p.id}); toggleWishlist(${p.id});">
            Move to Cart
          </button>
          <button type="button" class="btn btn-outline btn-sm" onclick="toggleWishlist(${p.id})" title="Remove">
            &times;
          </button>
        </div>
      </div>
    `).join("");
  }
}

function updateWishlistIconsOnCards() {
  document.querySelectorAll(".btn-wishlist").forEach(btn => {
    const id = parseInt(btn.getAttribute("data-id"), 10);
    if (isInWishlist(id)) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function triggerBadgeBump(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.classList.remove("bump");
  void el.offsetWidth;
  el.classList.add("bump");
}

function flashButtonSuccess(productId) {
  const btns = document.querySelectorAll(`.btn-add-cart[data-id="${productId}"]`);
  btns.forEach(btn => {
    const origText = btn.innerHTML;
    btn.classList.add("added-flash");
    btn.innerHTML = `<span>Added ✓</span>`;
    setTimeout(() => {
      btn.classList.remove("added-flash");
      btn.innerHTML = origText;
    }, 1200);
  });
}

/**
 * Open Quick View Product Details Modal
 */
function openQuickView(productId) {
  const product = window.PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById("quickViewModal");
  const modalContent = document.getElementById("quickViewBody");
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="quick-view-grid">
      <div class="quick-view-image-wrap">
        <span class="product-badge">${escapeHtml(product.category)}</span>
        <img 
          src="${product.image}" 
          alt="${escapeHtml(product.name)}" 
          class="quick-view-img"
          onerror="handleImageError(this, '${product.category}')"
        >
      </div>
      <div class="quick-view-info">
        <div class="quick-view-brand">${escapeHtml(product.brand)}</div>
        <h2 class="quick-view-title">${escapeHtml(product.name)}</h2>
        
        <div class="product-rating quick-rating">
          <span class="stars-gold">${"★".repeat(Math.floor(product.rating))}</span>
          <span class="rating-score">${product.rating.toFixed(1)}</span>
          <span class="rating-reviews-count">(${product.reviewsCount} Customer Reviews)</span>
        </div>

        <div class="quick-view-price-box">
          <span class="quick-view-price">${formatINR(product.price)}</span>
          <span class="quick-view-mrp">MRP: <del>${formatINR(Math.round(product.price * 1.25))}</del></span>
          <span class="quick-view-discount">20% OFF</span>
        </div>

        <p class="quick-view-desc">${escapeHtml(product.description)}</p>

        <div class="quick-view-highlights">
          <div class="highlight-item">🚚 <strong>Free Delivery</strong> on orders above ₹999</div>
          <div class="highlight-item">🔄 <strong>7 Days Replacement</strong> available</div>
          <div class="highlight-item">🛡️ <strong>1 Year Brand Warranty</strong> included</div>
        </div>

        <div class="quick-view-cta-row">
          <button type="button" class="btn btn-primary btn-lg" onclick="addToCart(${product.id}); closeQuickView();">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Add to Cart
          </button>
          <button type="button" class="btn btn-outline btn-lg" onclick="toggleWishlist(${product.id}); closeQuickView();">
            ❤️ Wishlist
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeQuickView() {
  const modal = document.getElementById("quickViewModal");
  if (modal) modal.classList.remove("open");
  document.body.style.overflow = "";
}

/**
 * Open Demo Checkout Modal
 */
function openCheckoutModal() {
  if (cartItems.length === 0) {
    if (typeof showToast === "function") showToast("Your cart is empty!", "warning");
    return;
  }

  const subtotal = cartItems.reduce((acc, i) => acc + (i.price * i.quantity), 0);
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  const totalEl = document.getElementById("checkoutTotalDisplay");
  if (totalEl) totalEl.textContent = formatINR(total);

  // Pre-fill user info if logged in
  const currentUser = window.authModule ? window.authModule.getCurrentUser() : null;
  if (currentUser) {
    const nameInput = document.getElementById("checkoutFullName");
    const emailInput = document.getElementById("checkoutEmail");
    if (nameInput && !nameInput.value) nameInput.value = currentUser.name;
    if (emailInput && !emailInput.value) emailInput.value = currentUser.email;
  }

  const modal = document.getElementById("checkoutModal");
  if (modal) modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  if (modal) modal.classList.remove("open");
  document.body.style.overflow = "";
}

/**
 * Handles Demo Checkout Submission
 */
function submitDemoCheckout(e) {
  e.preventDefault();

  const name = document.getElementById("checkoutFullName")?.value.trim() || "Customer";
  const address = document.getElementById("checkoutAddress")?.value.trim() || "";
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || "UPI";

  if (!address) {
    if (typeof showToast === "function") showToast("Please enter your delivery address.", "warning");
    return;
  }

  // Create celebratory order details
  const orderId = "IN-" + Math.floor(100000 + Math.random() * 900000);
  clearCart();
  closeCheckoutModal();

  if (typeof showToast === "function") {
    showToast(`🎉 Order #${orderId} Placed! Thank you, ${name}! Payment: ${paymentMethod}`, "success");
  }

  // Show Order Placed success modal
  openOrderSuccessModal(orderId, name, paymentMethod);
}

function openOrderSuccessModal(orderId, name, paymentMethod) {
  const modal = document.getElementById("orderSuccessModal");
  if (!modal) return;

  const idEl = document.getElementById("orderSuccessId");
  const msgEl = document.getElementById("orderSuccessMsg");
  if (idEl) idEl.textContent = orderId;
  if (msgEl) msgEl.textContent = `A confirmation notification has been recorded for ${name}. Mode of Payment: ${paymentMethod} (Demo Simulation).`;

  modal.classList.add("open");
}

function closeOrderSuccessModal() {
  const modal = document.getElementById("orderSuccessModal");
  if (modal) modal.classList.remove("open");
  document.body.style.overflow = "";
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text || "";
  return div.innerHTML;
}

// Attach globally
window.cartModule = {
  initCartAndWishlist,
  addToCart,
  updateCartQty,
  removeCartItem,
  clearCart,
  toggleWishlist,
  isInWishlist,
  openQuickView,
  closeQuickView,
  openCheckoutModal,
  closeCheckoutModal,
  submitDemoCheckout,
  closeOrderSuccessModal
};

window.addToCart = addToCart;
window.updateCartQty = updateCartQty;
window.removeCartItem = removeCartItem;
window.toggleWishlist = toggleWishlist;
window.openQuickView = openQuickView;
