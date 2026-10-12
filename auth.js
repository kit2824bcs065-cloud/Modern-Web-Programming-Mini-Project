/**
 * ============================================================================
 * VoltStore - Demo Authentication Module (auth.js)
 * 
 * DISCLAIMER & EDUCATIONAL NOTICE:
 * This is an entirely client-side demonstration of user authentication using
 * browser localStorage. 
 * - In a production application, authentication MUST be handled by a secure backend
 *   (e.g., Node.js/Express, Python/Django, Spring Boot, Supabase/Firebase).
 * - Real backends hash passwords with bcrypt/argon2, issue secure HTTP-only cookies
 *   or JWTs, protect against XSS/CSRF, and enforce HTTPS encryption.
 * - This demo does NOT store real sensitive credentials and is strictly designed
 *   for frontend learning, prototyping, and demonstration purposes.
 * ============================================================================
 */

// Storage keys
const AUTH_STORAGE_KEY = "voltstore_demo_current_user";
const USERS_STORAGE_KEY = "voltstore_demo_users_database";

// Pre-seeded demo accounts
const DEFAULT_DEMO_USERS = [
  {
    name: "Aarav Sharma",
    email: "aarav@demo.in",
    // In production, NEVER store plain passwords. For demo, we store a dummy token.
    demoToken: "demo_token_aarav_sharma_9872"
  },
  {
    name: "Priya Patel",
    email: "priya@demo.in",
    demoToken: "demo_token_priya_patel_5431"
  }
];

// Initialize local users repository in localStorage
function initUsersDatabase() {
  try {
    const existing = localStorage.getItem(USERS_STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_DEMO_USERS));
    }
  } catch (e) {
    console.warn("localStorage unavailable for demo users database", e);
  }
}

initUsersDatabase();

/**
 * Gets currently logged-in demo user, if any
 */
function getCurrentUser() {
  try {
    const userStr = localStorage.getItem(AUTH_STORAGE_KEY);
    return userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Checks if a session is currently active
 */
function isLoggedIn() {
  return getCurrentUser() !== null;
}

/**
 * Logs in a user in the demo system
 */
function loginUser(email, password, rememberMe = false) {
  const cleanEmail = email.trim().toLowerCase();
  
  if (!cleanEmail || !password) {
    return { success: false, message: "Please provide both email address and password." };
  }

  // Basic email pattern check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return { success: false, message: "Please enter a valid email address (e.g., name@example.com)." };
  }

  if (password.length < 6) {
    return { success: false, message: "Password must be at least 6 characters long." };
  }

  // Lookup in demo database
  let users = DEFAULT_DEMO_USERS;
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    if (stored) users = JSON.parse(stored);
  } catch (e) {}

  let user = users.find(u => u.email.toLowerCase() === cleanEmail);

  // For beginner demonstration ease: if logging in with any valid email, create a demo session
  if (!user) {
    // Auto-create demo profile for frictionless evaluation
    const namePart = cleanEmail.split("@")[0];
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    user = {
      name: formattedName,
      email: cleanEmail,
      demoToken: "demo_token_" + Date.now()
    };
    users.push(user);
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {}
  }

  // Create demo session object (never storing the raw password)
  const sessionUser = {
    name: user.name,
    email: user.email,
    loginTime: new Date().toISOString(),
    isDemo: true
  };

  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionUser));
    if (rememberMe) {
      localStorage.setItem("voltstore_remember_email", cleanEmail);
    } else {
      localStorage.removeItem("voltstore_remember_email");
    }
  } catch (e) {
    console.error("Failed saving session", e);
  }

  return { success: true, user: sessionUser };
}

/**
 * Registers a new user in the demo database
 */
function signupUser(name, email, password, confirmPassword) {
  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanName) {
    return { success: false, message: "Please enter your full name." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  if (!password || password.length < 6) {
    return { success: false, message: "Password must be at least 6 characters long." };
  }

  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match. Please verify." };
  }

  let users = DEFAULT_DEMO_USERS;
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    if (stored) users = JSON.parse(stored);
  } catch (e) {}

  // Check if email already registered
  const exists = users.find(u => u.email.toLowerCase() === cleanEmail);
  if (exists) {
    return { success: false, message: "An account with this email already exists. Please log in." };
  }

  const newUser = {
    name: cleanName,
    email: cleanEmail,
    demoToken: "demo_token_" + Date.now()
  };

  users.push(newUser);
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (e) {}

  // Automatically log in newly created user
  return loginUser(cleanEmail, password, true);
}

/**
 * Terminates user demo session
 */
function logoutUser() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (e) {}
  return true;
}

/**
 * Toggle password visibility helper
 */
function setupPasswordToggle(inputElementId, buttonElementId) {
  const input = document.getElementById(inputElementId);
  const btn = document.getElementById(buttonElementId);
  if (!input || !btn) return;

  btn.addEventListener("click", () => {
    const isPassword = input.getAttribute("type") === "password";
    input.setAttribute("type", isPassword ? "text" : "password");
    btn.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
    
    // Toggle SVG or text
    const eyeOpen = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    const eyeSlash = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
    
    btn.innerHTML = isPassword ? eyeSlash : eyeOpen;
  });
}

/**
 * Synchronizes navigation bar with current authentication status
 */
function syncNavbarAuthUI() {
  const authContainer = document.getElementById("navAuthContainer");
  if (!authContainer) return;

  const user = getCurrentUser();

  if (user) {
    authContainer.innerHTML = `
      <div class="user-profile-menu">
        <button type="button" class="user-profile-btn" id="userMenuBtn" aria-expanded="false" aria-label="User account menu">
          <span class="user-avatar">${user.name.charAt(0).toUpperCase()}</span>
          <span class="user-name-text">${escapeHtmlAuth(user.name.split(" ")[0])}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="chevron-icon" width="14" height="14">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div class="user-dropdown-menu hidden" id="userDropdownMenu">
          <div class="user-dropdown-header">
            <strong>${escapeHtmlAuth(user.name)}</strong>
            <small>${escapeHtmlAuth(user.email)}</small>
            <span class="badge-demo-pill">Demo User</span>
          </div>
          <hr class="dropdown-divider">
          <button type="button" class="dropdown-item text-danger" id="logoutActionBtn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Logout
          </button>
        </div>
      </div>
    `;

    const menuBtn = document.getElementById("userMenuBtn");
    const menuDropdown = document.getElementById("userDropdownMenu");
    const logoutBtn = document.getElementById("logoutActionBtn");

    if (menuBtn && menuDropdown) {
      menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        menuDropdown.classList.toggle("hidden");
      });

      document.addEventListener("click", (e) => {
        if (!menuDropdown.contains(e.target) && e.target !== menuBtn) {
          menuDropdown.classList.add("hidden");
        }
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        logoutUser();
        if (typeof showToast === "function") {
          showToast("You have been logged out.", "info");
        }
        syncNavbarAuthUI();
      });
    }
  } else {
    authContainer.innerHTML = `
      <div class="auth-buttons-group">
        <a href="login.html" class="btn btn-outline btn-sm auth-link-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Login</span>
        </a>
        <a href="signup.html" class="btn btn-primary btn-sm auth-link-btn signup-btn-hide-mobile">
          <span>Sign Up</span>
        </a>
      </div>
    `;
  }
}

function escapeHtmlAuth(text) {
  const d = document.createElement("div");
  d.textContent = text || "";
  return d.innerHTML;
}

// Export functions to global scope
window.authModule = {
  getCurrentUser,
  isLoggedIn,
  loginUser,
  signupUser,
  logoutUser,
  setupPasswordToggle,
  syncNavbarAuthUI
};
