/**
 * ============================================================================
 * VoltStore India - Main Application Logic (script.js)
 * 
 * Features:
 * 1. Dark/Light Mode Theme Management with localStorage persistence
 * 2. Multi-Criteria Dynamic Product Filtering (10 Categories, Brands, INR Price, Ratings)
 * 3. Live Instant Search by Name, Brand & Category
 * 4. Sorting Engine (Price Asc/Desc, Name A-Z, Top Rated)
 * 5. Active Filter Chips with Individual Dismissal
 * 6. Quick Category Horizontal Pills & Curated Filter Tabs
 * 7. Shopping Cart & Wishlist Drawer Interactivity
 * 8. Toast Notifications & Mobile Offcanvas Sidebar
 * ============================================================================
 */

// Application Filter State
const filterState = {
  searchQuery: "",
  selectedCategory: "All",
  selectedBrand: "All",
  minPrice: 0,
  maxPrice: 150000,
  minRating: 0,
  curatedTab: "all", // "all", "featured", "bestSellers", "under5000"
  sortBy: "featured"
};

// ============================================================================
// 1. THEME SWITCHER (Light & Dark Mode)
// ============================================================================
const THEME_STORAGE_KEY = "voltstore_theme";

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  const themeBtn = document.getElementById("themeToggleBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const nextTheme = current === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", nextTheme);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch (e) {}
      updateThemeIcon(nextTheme);
      showToast(`Switched to ${nextTheme === "dark" ? "Dark 🌙" : "Light ☀️"} Mode`, "info");
    });
  }
}

function updateThemeIcon(theme) {
  const iconWrap = document.getElementById("themeIcon");
  if (!iconWrap) return;

  const sunIcon = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="19" height="19">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  `;

  const moonIcon = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="19" height="19">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  `;

  iconWrap.innerHTML = theme === "dark" ? sunIcon : moonIcon;
}

// ============================================================================
// 2. DOM INITIALIZATION
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  
  if (window.authModule) {
    window.authModule.syncNavbarAuthUI();
  }

  if (window.cartModule) {
    window.cartModule.initCartAndWishlist();
  }

  renderSubNavCategoryPills();
  renderSidebarCategories();
  renderSidebarBrands();
  setupFilterEventListeners();
  applyFiltersAndRender();
  checkWelcomeUrlParams();
});

function checkWelcomeUrlParams() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("loginSuccess") === "1") {
    const user = window.authModule ? window.authModule.getCurrentUser() : null;
    showToast(`Welcome back, ${user ? user.name : "Shopper"}!`, "success");
    window.history.replaceState({}, document.title, window.location.pathname);
  } else if (params.get("signupSuccess") === "1") {
    showToast("Account created successfully! Enjoy shopping.", "success");
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

// ============================================================================
// 3. CATEGORY & BRAND CONTROLS RENDERING
// ============================================================================
const ALL_CATEGORIES = [
  "All",
  "Electronics",
  "Mobiles",
  "Laptops",
  "Headphones",
  "Smart Watches",
  "Fashion",
  "Footwear",
  "Home Appliances",
  "Accessories",
  "Gaming"
];

function renderSubNavCategoryPills() {
  const container = document.getElementById("quickCategoryPills");
  if (!container) return;

  container.innerHTML = ALL_CATEGORIES.map(cat => `
    <button type="button" class="sub-nav-pill ${filterState.selectedCategory === cat ? 'active' : ''}" data-cat="${cat}">
      ${cat}
    </button>
  `).join("");

  container.querySelectorAll(".sub-nav-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      const cat = btn.getAttribute("data-cat");
      filterByCategory(cat);
    });
  });
}

function renderSidebarCategories() {
  const container = document.getElementById("categoryOptions");
  if (!container) return;

  container.innerHTML = ALL_CATEGORIES.map(cat => {
    const count = cat === "All"
      ? window.PRODUCTS.length
      : window.PRODUCTS.filter(p => p.category === cat).length;
    const isActive = filterState.selectedCategory === cat;

    return `
      <div class="category-item ${isActive ? 'active' : ''}" data-category="${cat}">
        <div class="category-name-wrap">
          <span class="category-radio-circle"></span>
          <span>${cat}</span>
        </div>
        <span class="category-count">${count}</span>
      </div>
    `;
  }).join("");

  container.querySelectorAll(".category-item").forEach(item => {
    item.addEventListener("click", () => {
      const cat = item.getAttribute("data-category");
      filterByCategory(cat);
    });
  });
}

function renderSidebarBrands() {
  const container = document.getElementById("brandOptions");
  if (!container) return;

  // Extract unique brands
  const brands = ["All", ...new Set(window.PRODUCTS.map(p => p.brand).filter(Boolean))].sort();

  container.innerHTML = brands.map(brand => `
    <button type="button" class="brand-chip ${filterState.selectedBrand === brand ? 'active' : ''}" data-brand="${brand}">
      ${brand}
    </button>
  `).join("");

  container.querySelectorAll(".brand-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const brand = chip.getAttribute("data-brand");
      filterByBrand(brand);
    });
  });
}

function filterByCategory(category) {
  filterState.selectedCategory = category;
  renderSubNavCategoryPills();
  renderSidebarCategories();
  applyFiltersAndRender();
}

function filterByBrand(brand) {
  filterState.selectedBrand = brand;
  renderSidebarBrands();
  applyFiltersAndRender();
}

window.filterByCategory = filterByCategory;
window.filterByBrand = filterByBrand;

// ============================================================================
// 4. CORE FILTERING & SORTING ENGINE
// ============================================================================
function applyFiltersAndRender() {
  const query = filterState.searchQuery.trim().toLowerCase();

  // 1. Filter logic
  const filtered = window.PRODUCTS.filter(p => {
    // Search query matching Name, Category, or Brand
    const matchesSearch = !query ||
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      (p.brand && p.brand.toLowerCase().includes(query)) ||
      p.description.toLowerCase().includes(query);

    // Category filter
    const matchesCategory = filterState.selectedCategory === "All" || p.category === filterState.selectedCategory;

    // Brand filter
    const matchesBrand = filterState.selectedBrand === "All" || p.brand === filterState.selectedBrand;

    // Price filter (in INR)
    const matchesPrice = p.price >= filterState.minPrice && p.price <= filterState.maxPrice;

    // Customer rating filter
    const matchesRating = p.rating >= filterState.minRating;

    // Curated Tabs filter
    let matchesTab = true;
    if (filterState.curatedTab === "featured") matchesTab = !!p.featured;
    else if (filterState.curatedTab === "bestSellers") matchesTab = !!p.bestSeller;
    else if (filterState.curatedTab === "under5000") matchesTab = p.price <= 5000;

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesRating && matchesTab;
  });

  // 2. Sort logic
  const sorted = sortCatalog(filtered, filterState.sortBy);

  // 3. Render into DOM
  renderProductGrid(sorted);

  // 4. Update Header counter & active chips
  updateStatusIndicators(sorted.length);
  updateActiveChips();
}

function sortCatalog(list, sortMethod) {
  const copy = [...list];

  switch (sortMethod) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "name-asc":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "rating-desc":
      return copy.sort((a, b) => b.rating - a.rating);
    case "featured":
    default:
      return copy;
  }
}

// ============================================================================
// 5. DOM GRID RENDERING
// ============================================================================
function renderProductGrid(products) {
  const grid = document.getElementById("productsGrid");
  const empty = document.getElementById("emptyState");
  if (!grid || !empty) return;

  if (products.length === 0) {
    grid.innerHTML = "";
    empty.classList.remove("hidden");
    return;
  }

  empty.classList.add("hidden");

  grid.innerHTML = products.map(product => {
    const isWishlisted = window.cartModule ? window.cartModule.isInWishlist(product.id) : false;
    const mrp = Math.round(product.price * 1.25);
    const stars = "★".repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? "★" : "");
    const filledStars = stars.padEnd(5, "☆");

    return `
      <article class="product-card" data-id="${product.id}">
        <div class="product-image-box">
          <span class="product-badge">${product.category}</span>
          
          <button 
            type="button" 
            class="btn-wishlist ${isWishlisted ? 'active' : ''}" 
            data-id="${product.id}"
            onclick="window.cartModule.toggleWishlist(${product.id})"
            aria-label="Add ${escapeHtml(product.name)} to wishlist"
          >
            <svg viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" width="16" height="16">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>

          <img 
            src="${product.image}" 
            alt="${escapeHtml(product.name)}" 
            class="product-image"
            loading="lazy"
            onerror="handleImageError(this, '${product.category}')"
          >

          <button 
            type="button" 
            class="quick-view-overlay-btn" 
            onclick="window.cartModule.openQuickView(${product.id})"
          >
            Quick View
          </button>
        </div>

        <div class="product-content">
          <div class="product-brand-line">${escapeHtml(product.brand || "")}</div>
          
          <div class="product-rating">
            <span class="stars-gold">${filledStars}</span>
            <span class="rating-score">${product.rating.toFixed(1)}</span>
            <span class="rating-reviews-count">(${product.reviewsCount})</span>
          </div>

          <h3 class="product-title" title="${escapeHtml(product.name)}">${escapeHtml(product.name)}</h3>
          <p class="product-description">${escapeHtml(product.description)}</p>

          <div class="product-footer">
            <div class="product-price-box">
              <span class="product-price">${formatINR(product.price)}</span>
              <div class="product-mrp-row">
                <del>${formatINR(mrp)}</del>
                <span class="product-discount-tag">20% off</span>
              </div>
            </div>

            <button 
              type="button" 
              class="btn-add-cart" 
              data-id="${product.id}"
              onclick="window.cartModule.addToCart(${product.id})"
              aria-label="Add ${escapeHtml(product.name)} to cart"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>Add</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// ============================================================================
// 6. STATUS LABELS & DISMISSIBLE ACTIVE CHIPS
// ============================================================================
function updateStatusIndicators(matchingCount) {
  const counter = document.getElementById("productsCounter");
  const heading = document.getElementById("catalogHeading");
  const filterBadge = document.getElementById("filterCountBadge");

  if (counter) {
    counter.textContent = `Showing ${matchingCount} of ${window.PRODUCTS.length} products`;
  }

  if (heading) {
    if (filterState.selectedCategory !== "All") {
      heading.textContent = `${filterState.selectedCategory} Collection`;
    } else if (filterState.selectedBrand !== "All") {
      heading.textContent = `${filterState.selectedBrand} Products`;
    } else {
      heading.textContent = "All Products";
    }
  }

  let activeFiltersCount = 0;
  if (filterState.searchQuery.trim()) activeFiltersCount++;
  if (filterState.selectedCategory !== "All") activeFiltersCount++;
  if (filterState.selectedBrand !== "All") activeFiltersCount++;
  if (filterState.minPrice > 0 || filterState.maxPrice < 150000) activeFiltersCount++;
  if (filterState.minRating > 0) activeFiltersCount++;
  if (filterState.curatedTab !== "all") activeFiltersCount++;

  if (filterBadge) {
    if (activeFiltersCount > 0) {
      filterBadge.textContent = activeFiltersCount;
      filterBadge.classList.remove("hidden");
    } else {
      filterBadge.classList.add("hidden");
    }
  }
}

function updateActiveChips() {
  const row = document.getElementById("activeFiltersRow");
  const container = document.getElementById("activeChipsContainer");
  if (!row || !container) return;

  const chips = [];

  if (filterState.searchQuery.trim()) {
    chips.push({
      label: `Search: "${filterState.searchQuery.trim()}"`,
      remove: () => {
        filterState.searchQuery = "";
        document.getElementById("searchInput").value = "";
        document.getElementById("clearSearchBtn").classList.add("hidden");
        applyFiltersAndRender();
      }
    });
  }

  if (filterState.selectedCategory !== "All") {
    chips.push({
      label: `Category: ${filterState.selectedCategory}`,
      remove: () => filterByCategory("All")
    });
  }

  if (filterState.selectedBrand !== "All") {
    chips.push({
      label: `Brand: ${filterState.selectedBrand}`,
      remove: () => filterByBrand("All")
    });
  }

  if (filterState.minPrice > 0 || filterState.maxPrice < 150000) {
    chips.push({
      label: `Price: ${formatINR(filterState.minPrice)} - ${formatINR(filterState.maxPrice)}`,
      remove: () => {
        filterState.minPrice = 0;
        filterState.maxPrice = 150000;
        document.getElementById("priceSlider").value = 150000;
        document.getElementById("minPriceInput").value = 0;
        document.getElementById("maxPriceInput").value = 150000;
        document.getElementById("priceRangeIndicator").textContent = "₹0 - ₹1,50,000";
        applyFiltersAndRender();
      }
    });
  }

  if (filterState.minRating > 0) {
    chips.push({
      label: `Rating: ${filterState.minRating}★ & up`,
      remove: () => {
        filterState.minRating = 0;
        document.querySelector('input[name="ratingFilter"][value="0"]').checked = true;
        applyFiltersAndRender();
      }
    });
  }

  if (filterState.curatedTab !== "all") {
    chips.push({
      label: `Tab: ${filterState.curatedTab}`,
      remove: () => setCuratedTab("all")
    });
  }

  if (chips.length > 0) {
    row.classList.remove("hidden");
    container.innerHTML = "";
    chips.forEach(chip => {
      const el = document.createElement("div");
      el.className = "filter-chip";
      el.innerHTML = `
        <span>${escapeHtml(chip.label)}</span>
        <button type="button" class="chip-remove-btn" aria-label="Remove filter">&times;</button>
      `;
      el.querySelector(".chip-remove-btn").addEventListener("click", chip.remove);
      container.appendChild(el);
    });
  } else {
    row.classList.add("hidden");
    container.innerHTML = "";
  }
}

// ============================================================================
// 7. FILTER RESET LOGIC
// ============================================================================
function resetAllFilters(showNotification = true) {
  filterState.searchQuery = "";
  filterState.selectedCategory = "All";
  filterState.selectedBrand = "All";
  filterState.minPrice = 0;
  filterState.maxPrice = 150000;
  filterState.minRating = 0;
  filterState.curatedTab = "all";
  filterState.sortBy = "featured";

  // Reset inputs
  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.value = "";
  const clearSearchBtn = document.getElementById("clearSearchBtn");
  if (clearSearchBtn) clearSearchBtn.classList.add("hidden");

  const priceSlider = document.getElementById("priceSlider");
  if (priceSlider) priceSlider.value = 150000;
  const minPriceInput = document.getElementById("minPriceInput");
  if (minPriceInput) minPriceInput.value = 0;
  const maxPriceInput = document.getElementById("maxPriceInput");
  if (maxPriceInput) maxPriceInput.value = 150000;
  const priceIndicator = document.getElementById("priceRangeIndicator");
  if (priceIndicator) priceIndicator.textContent = "₹0 - ₹1,50,000";

  const zeroRadio = document.querySelector('input[name="ratingFilter"][value="0"]');
  if (zeroRadio) zeroRadio.checked = true;

  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) sortSelect.value = "featured";

  // Reset UI components
  renderSubNavCategoryPills();
  renderSidebarCategories();
  renderSidebarBrands();
  updateCuratedPillsActive("pillAll");

  applyFiltersAndRender();

  if (showNotification) {
    showToast("All filters have been reset.", "info");
  }
}

window.resetAllFilters = resetAllFilters;

// ============================================================================
// 8. CURATED PILLS LOGIC (All, Featured, Best Sellers, Under 5000)
// ============================================================================
function setCuratedTab(tabKey) {
  filterState.curatedTab = tabKey;
  const map = {
    "all": "pillAll",
    "featured": "pillFeatured",
    "bestSellers": "pillBestSellers",
    "under5000": "pillUnder5000"
  };
  updateCuratedPillsActive(map[tabKey]);
  applyFiltersAndRender();
}

function updateCuratedPillsActive(activeId) {
  ["pillAll", "pillFeatured", "pillBestSellers", "pillUnder5000"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (id === activeId) el.classList.add("active");
      else el.classList.remove("active");
    }
  });
}

// ============================================================================
// 9. EVENT LISTENERS
// ============================================================================
function setupFilterEventListeners() {
  // Live Search
  const searchInput = document.getElementById("searchInput");
  const clearSearchBtn = document.getElementById("clearSearchBtn");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      filterState.searchQuery = e.target.value;
      if (clearSearchBtn) {
        if (filterState.searchQuery.trim().length > 0) {
          clearSearchBtn.classList.remove("hidden");
        } else {
          clearSearchBtn.classList.add("hidden");
        }
      }
      applyFiltersAndRender();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      filterState.searchQuery = "";
      clearSearchBtn.classList.add("hidden");
      searchInput.focus();
      applyFiltersAndRender();
    });
  }

  // Price Slider in INR
  const priceSlider = document.getElementById("priceSlider");
  const minPriceInput = document.getElementById("minPriceInput");
  const maxPriceInput = document.getElementById("maxPriceInput");
  const priceRangeIndicator = document.getElementById("priceRangeIndicator");

  if (priceSlider) {
    priceSlider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      filterState.maxPrice = val;
      if (maxPriceInput) maxPriceInput.value = val;
      if (priceRangeIndicator) {
        priceRangeIndicator.textContent = `${formatINR(filterState.minPrice)} - ${formatINR(val)}`;
      }
      applyFiltersAndRender();
    });
  }

  if (minPriceInput) {
    minPriceInput.addEventListener("change", (e) => {
      let val = parseInt(e.target.value, 10) || 0;
      if (val < 0) val = 0;
      if (val > filterState.maxPrice) val = filterState.maxPrice;
      filterState.minPrice = val;
      minPriceInput.value = val;
      if (priceRangeIndicator) {
        priceRangeIndicator.textContent = `${formatINR(val)} - ${formatINR(filterState.maxPrice)}`;
      }
      applyFiltersAndRender();
    });
  }

  if (maxPriceInput) {
    maxPriceInput.addEventListener("change", (e) => {
      let val = parseInt(e.target.value, 10) || 150000;
      if (val < filterState.minPrice) val = filterState.minPrice;
      if (val > 150000) val = 150000;
      filterState.maxPrice = val;
      maxPriceInput.value = val;
      if (priceSlider) priceSlider.value = val;
      if (priceRangeIndicator) {
        priceRangeIndicator.textContent = `${formatINR(filterState.minPrice)} - ${formatINR(val)}`;
      }
      applyFiltersAndRender();
    });
  }

  // Customer Rating Radios
  document.querySelectorAll('input[name="ratingFilter"]').forEach(radio => {
    radio.addEventListener("change", (e) => {
      filterState.minRating = parseFloat(e.target.value);
      applyFiltersAndRender();
    });
  });

  // Sorting Dropdown
  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      filterState.sortBy = e.target.value;
      applyFiltersAndRender();
    });
  }

  // Reset Buttons
  const clearFiltersBtn = document.getElementById("clearFiltersBtn");
  if (clearFiltersBtn) clearFiltersBtn.addEventListener("click", () => resetAllFilters(true));

  const emptyResetBtn = document.getElementById("emptyStateResetBtn");
  if (emptyResetBtn) emptyResetBtn.addEventListener("click", () => resetAllFilters(true));

  const clearChipsBtn = document.getElementById("clearAllChipsBtn");
  if (clearChipsBtn) clearChipsBtn.addEventListener("click", () => resetAllFilters(true));

  // Curated Filter Pills
  document.getElementById("pillAll")?.addEventListener("click", () => setCuratedTab("all"));
  document.getElementById("pillFeatured")?.addEventListener("click", () => setCuratedTab("featured"));
  document.getElementById("pillBestSellers")?.addEventListener("click", () => setCuratedTab("bestSellers"));
  document.getElementById("pillUnder5000")?.addEventListener("click", () => setCuratedTab("under5000"));

  // Mobile Filter Drawer
  const mobileToggle = document.getElementById("mobileFilterToggle");
  const filtersSidebar = document.getElementById("filtersSidebar");
  const sidebarBackdrop = document.getElementById("sidebarBackdrop");
  const closeSidebarBtn = document.getElementById("closeSidebarBtn");

  if (mobileToggle && filtersSidebar && sidebarBackdrop) {
    mobileToggle.addEventListener("click", () => {
      filtersSidebar.classList.add("open");
      sidebarBackdrop.classList.add("open");
      document.body.style.overflow = "hidden";
    });

    const closeMobileSidebar = () => {
      filtersSidebar.classList.remove("open");
      sidebarBackdrop.classList.remove("open");
      document.body.style.overflow = "";
    };

    if (closeSidebarBtn) closeSidebarBtn.addEventListener("click", closeMobileSidebar);
    sidebarBackdrop.addEventListener("click", closeMobileSidebar);
  }

  // Shopping Cart Drawer Toggle
  const cartToggleBtn = document.getElementById("cartToggleBtn");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartBackdrop = document.getElementById("cartBackdrop");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartBrowseBtn = document.getElementById("cartBrowseBtn");

  if (cartToggleBtn && cartDrawer && cartBackdrop) {
    cartToggleBtn.addEventListener("click", () => {
      cartDrawer.classList.add("open");
      cartBackdrop.classList.add("open");
      document.body.style.overflow = "hidden";
    });

    const closeCart = () => {
      cartDrawer.classList.remove("open");
      cartBackdrop.classList.remove("open");
      document.body.style.overflow = "";
    };

    if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
    if (cartBrowseBtn) cartBrowseBtn.addEventListener("click", closeCart);
    cartBackdrop.addEventListener("click", closeCart);
  }

  // Wishlist Drawer Toggle
  const wishlistToggleBtn = document.getElementById("wishlistToggleBtn");
  const wishlistDrawer = document.getElementById("wishlistDrawer");
  const wishlistBackdrop = document.getElementById("wishlistBackdrop");
  const closeWishlistBtn = document.getElementById("closeWishlistBtn");

  if (wishlistToggleBtn && wishlistDrawer && wishlistBackdrop) {
    wishlistToggleBtn.addEventListener("click", () => {
      wishlistDrawer.classList.add("open");
      wishlistBackdrop.classList.add("open");
      document.body.style.overflow = "hidden";
    });

    const closeWishlist = () => {
      wishlistDrawer.classList.remove("open");
      wishlistBackdrop.classList.remove("open");
      document.body.style.overflow = "";
    };

    if (closeWishlistBtn) closeWishlistBtn.addEventListener("click", closeWishlist);
    wishlistBackdrop.addEventListener("click", closeWishlist);
  }

  // Cart Buttons (Checkout & Clear)
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (window.cartModule) window.cartModule.openCheckoutModal();
    });
  }

  const clearCartBtn = document.getElementById("clearCartBtn");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to empty your shopping cart?")) {
        if (window.cartModule) window.cartModule.clearCart();
      }
    });
  }

  // Keyboard Shortcuts ('/' for search, 'Escape' to close modals)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".side-drawer.open, .modal-backdrop.open, .sidebar-backdrop.open").forEach(el => {
        el.classList.remove("open");
      });
      document.body.style.overflow = "";
    }

    if (e.key === "/" && document.activeElement !== searchInput && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
      e.preventDefault();
      if (searchInput) searchInput.focus();
    }
  });
}

// ============================================================================
// 10. TOAST FEEDBACK NOTIFICATIONS
// ============================================================================
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  let icon = "";
  if (type === "success") {
    icon = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  } else if (type === "warning") {
    icon = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  } else {
    icon = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  }

  toast.innerHTML = `${icon}<span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-leave");
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

window.showToast = showToast;

function escapeHtml(text) {
  const d = document.createElement("div");
  d.textContent = text || "";
  return d.innerHTML;
}
