/**
 * ════════════════════════════════════════════════════
 *  UTech Housing Hub — script.js
 *  All application logic, data, and UI interactions.
 *  No backend. No external APIs. Pure client-side JS.
 * ════════════════════════════════════════════════════
 */

/* ─── Wait for DOM ──────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  renderListings(listings);
  renderLandlordCRM();
  renderStaffPanel();
  renderInquiries();
});

/* ════════════════════════════════════════════════════
   1. MOCK DATA
════════════════════════════════════════════════════ */

/** Mock user credentials */
const USERS = {
  students: [
    { id: '1900123', password: 'student1', name: 'Marcus Campbell' },
    { id: '2000456', password: 'student2', name: 'Alicia Brown' },
    { id: '2100789', password: 'pass123',  name: 'Devon Richards' },
  ],
  staff: [
    { id: 'S10001', password: 'staff2024', name: 'Dr. Patricia White' },
    { id: 'S10002', password: 'admin123',  name: 'Mr. Kevin Thompson' },
  ],
  landlords: [
    { email: 'mbrown@mail.com', password: 'landlord1', name: 'Mr. Michael Brown',    id: 'LL001' },
    { email: 'jsmith@mail.com', password: 'landlord2', name: 'Ms. Janet Smith',      id: 'LL002' },
    { email: 'rjones@mail.com', password: 'landlord3', name: 'Mr. Robert Jones',     id: 'LL003' },
  ]
};

/** Housing listings data — all hardcoded */
let listings = [
  {
    id: 1,
    title: '2BR Modern Apartment — Mona Ridge',
    area: 'Mona',
    address: '14 University Close, Mona, Kingston',
    price: 55000,
    furnished: 'Furnished',
    description: 'Bright, spacious 2-bedroom apartment just 5 minutes walk from UTech main gate. Features open-plan living area, modern kitchen with appliances, high-speed WiFi, and 24-hour security. Perfect for 2 students sharing.',
    landlord: 'Mr. Michael Brown',
    landlordId: 'LL001',
    rating: 4.7,
    reviews: 23,
    beds: 2,
    baths: 1,
    amenities: ['WiFi', 'Water Included', 'Security', 'Parking', 'Washer'],
    emoji: '🏢',
    bgColor: '#E8EDF5',
    active: true,
  },
  {
    id: 2,
    title: 'Cozy Studio — Papine Square',
    area: 'Papine',
    address: '3 Gordon Town Rd, Papine, Kingston',
    price: 28000,
    furnished: 'Semi-Furnished',
    description: 'Self-contained studio unit ideal for a single student. Walking distance to Papine market, bus terminal, and UTech. Includes built-in wardrobe and kitchenette. Quiet gated community.',
    landlord: 'Ms. Janet Smith',
    landlordId: 'LL002',
    rating: 4.2,
    reviews: 17,
    beds: 1,
    baths: 1,
    amenities: ['Water Included', 'Gated Community', 'Bus Route Access'],
    emoji: '🏠',
    bgColor: '#FBF4E3',
    active: true,
  },
  {
    id: 3,
    title: '3BR Family House — Hope Pastures',
    area: 'Hope Pastures',
    address: '22 Hope Boulevard, Kingston 6',
    price: 85000,
    furnished: 'Furnished',
    description: 'Spacious 3-bedroom house in upscale Hope Pastures. Features a large yard, covered parking, generator backup, and fully equipped kitchen. Great for 3 students looking for comfort.',
    landlord: 'Mr. Robert Jones',
    landlordId: 'LL003',
    rating: 4.9,
    reviews: 41,
    beds: 3,
    baths: 2,
    amenities: ['WiFi', 'Generator', 'Parking', 'Yard', 'Water Included', 'Washer/Dryer'],
    emoji: '🏡',
    bgColor: '#EBFBEE',
    active: true,
  },
  {
    id: 4,
    title: '1BR Apartment — Tavern Heights',
    area: 'Tavern',
    address: '8 Tavern Crescent, Kingston 8',
    price: 35000,
    furnished: 'Unfurnished',
    description: 'Clean 1-bedroom apartment in a peaceful area of Tavern. Tiled throughout, grille windows for ventilation, and reliable water supply. Landlord lives on property. Short commute via bus.',
    landlord: 'Ms. Janet Smith',
    landlordId: 'LL002',
    rating: 3.9,
    reviews: 8,
    beds: 1,
    baths: 1,
    amenities: ['Water Included', 'Bus Route Access'],
    emoji: '🏘️',
    bgColor: '#F2F4F7',
    active: true,
  },
  {
    id: 5,
    title: 'Luxury 2BR Townhouse — Barbican',
    area: 'Barbican',
    address: '5 Barbican Road, Kingston 8',
    price: 75000,
    furnished: 'Furnished',
    description: 'Premium townhouse in quiet Barbican neighbourhood. Features marble floors, A/C in all rooms, premium internet, and a rooftop deck. Close to New Kingston and UTech via East Kings House Road.',
    landlord: 'Mr. Robert Jones',
    landlordId: 'LL003',
    rating: 4.8,
    reviews: 29,
    beds: 2,
    baths: 2,
    amenities: ['WiFi (100Mbps)', 'A/C', 'Rooftop Deck', 'Generator', 'Parking', 'Security'],
    emoji: '🏰',
    bgColor: '#F0E6FF',
    active: true,
  },
  {
    id: 6,
    title: 'Budget Room — Mountain View',
    area: 'Mountain View',
    address: '19 Mountain View Ave, Kingston 6',
    price: 18000,
    furnished: 'Semi-Furnished',
    description: 'Affordable single room in a shared house. Suitable for a budget-conscious student. Close to bus routes on Windward Road. Shared kitchen and bathroom with 2 other tenants. No pets.',
    landlord: 'Mr. Michael Brown',
    landlordId: 'LL001',
    rating: 3.5,
    reviews: 12,
    beds: 1,
    baths: 1,
    amenities: ['Shared Kitchen', 'Bus Route Access', 'Water Included'],
    emoji: '🛏️',
    bgColor: '#FFF5F5',
    active: true,
  },
  {
    id: 7,
    title: '2BR Apartment — Gordon Town',
    area: 'Gordon Town',
    address: '12 Gordon Town Road, Kingston 6',
    price: 48000,
    furnished: 'Furnished',
    description: 'Quiet 2-bedroom apartment surrounded by nature in Gordon Town. Ideal for students who prefer a peaceful environment. Features veranda with views, natural ventilation, and a small garden.',
    landlord: 'Ms. Janet Smith',
    landlordId: 'LL002',
    rating: 4.5,
    reviews: 19,
    beds: 2,
    baths: 1,
    amenities: ['WiFi', 'Garden', 'Veranda', 'Water Included', 'Parking'],
    emoji: '🌿',
    bgColor: '#ECFDF5',
    active: true,
  },
  {
    id: 8,
    title: 'Newly Built Studio — Papine',
    area: 'Papine',
    address: '7 Papine Close, Papine, Kingston',
    price: 32000,
    furnished: 'Furnished',
    description: 'Brand new self-contained studio unit constructed in 2023. Fully tiled, modern bathroom, and equipped kitchenette. 3-minute walk to UTech main campus via the pedestrian walkway.',
    landlord: 'Mr. Robert Jones',
    landlordId: 'LL003',
    rating: 4.6,
    reviews: 7,
    beds: 1,
    baths: 1,
    amenities: ['WiFi', 'Water Included', 'New Build', 'Near Campus'],
    emoji: '✨',
    bgColor: '#E8EDF5',
    active: true,
  },
];

/** Mock inquiries for landlord CRM */
const inquiries = [
  { id: 1, studentName: 'Marcus Campbell', studentInitial: 'M', property: '2BR Modern Apartment — Mona Ridge', message: 'Hi, I am interested in this apartment for September. Is it still available? I have two colleagues we would like to move in together.', time: '2h ago', unread: true },
  { id: 2, studentName: 'Alicia Brown', studentInitial: 'A', property: 'Budget Room — Mountain View', message: 'Hello, what utilities are included in the rent? Can I schedule a viewing this weekend?', time: '5h ago', unread: true },
  { id: 3, studentName: 'Devon Richards', studentInitial: 'D', property: '1BR Apartment — Tavern Heights', message: 'Good day. I\'d like to inquire about the security deposit and lease terms for this unit.', time: '1d ago', unread: false },
  { id: 4, studentName: 'Tanya Morrison', studentInitial: 'T', property: 'Cozy Studio — Papine Square', message: 'Is this studio still available? Can I bring my own furniture? Also, are pets allowed?', time: '2d ago', unread: false },
  { id: 5, studentName: 'Jermaine Williams', studentInitial: 'J', property: 'Newly Built Studio — Papine', message: 'I would love to view this property. I am available any day after 4pm during the week.', time: '3d ago', unread: false },
];

/** Mock activity feed for CRM dashboard */
const activityFeed = [
  { dot: 'dot-blue',  text: 'New inquiry received for <strong>2BR Modern Apartment — Mona Ridge</strong>',  time: '2h ago' },
  { dot: 'dot-green', text: 'Listing <strong>Newly Built Studio — Papine</strong> marked as active',           time: '5h ago' },
  { dot: 'dot-gold',  text: '<strong>Alicia Brown</strong> rated your listing — 4 stars',                      time: '1d ago' },
  { dot: 'dot-blue',  text: 'New inquiry for <strong>Budget Room — Mountain View</strong>',                   time: '1d ago' },
  { dot: 'dot-green', text: 'Listing <strong>2BR Apartment — Gordon Town</strong> updated successfully',        time: '2d ago' },
];

/* ════════════════════════════════════════════════════
   2. STATE
════════════════════════════════════════════════════ */
let currentRole  = null;   // 'student' | 'staff' | 'landlord'
let currentUser  = null;   // user object from USERS
let activeArea   = 'all';
let furnishedOnly = false;
let editingListingId = null;  // null = add, number = edit
let deleteTargetId   = null;
let currentRatingListingId = null;
let currentRatingValue = 0;

/* ════════════════════════════════════════════════════
   3. PAGE ROUTING
════════════════════════════════════════════════════ */

/** Show any page by ID. Handles active class and icon re-init. */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
    p.style.display = 'none';
    p.style.opacity = '0';
  });
  const target = document.getElementById(pageId);
  if (!target) return;
  target.style.display = pageId === 'page-login' ? 'flex' : 'block';
  // Trigger reflow for animation
  void target.offsetHeight;
  target.classList.add('active');
  target.style.opacity = '1';
  setTimeout(() => lucide.createIcons(), 50);
}

/** Logout — back to landing */
function logout() {
  currentUser = null;
  currentRole = null;
  showPage('page-landing');
  showToast('Signed out successfully.', 'success');
}

/* ════════════════════════════════════════════════════
   4. AUTHENTICATION
════════════════════════════════════════════════════ */

/** Configure and show the login page for a given role */
function showLogin(role) {
  currentRole = role;
  showPage('page-login');

  const configs = {
    student: {
      icon: '🎓',
      title: 'Student Portal',
      desc: 'Sign in with your UTech student ID to browse verified housing listings near campus.',
      formTitle: 'Student Sign In',
      formSub: 'Use your UTech ID number and password.',
      hint: '💡 Try ID: <strong>1900123</strong> / Password: <strong>student1</strong>',
      showIdField: true,
      showEmailField: false,
    },
    staff: {
      icon: '🛡️',
      title: 'Staff / Admin',
      desc: 'Manage platform listings, verify landlords, and oversee student housing quality.',
      formTitle: 'Staff Sign In',
      formSub: 'Use your UTech staff ID number and password.',
      hint: '💡 Try ID: <strong>S10001</strong> / Password: <strong>staff2024</strong>',
      showIdField: true,
      showEmailField: false,
    },
    landlord: {
      icon: '🏢',
      title: 'Landlord CRM',
      desc: 'Manage your property listings, view student inquiries, and grow your rental business.',
      formTitle: 'Landlord Sign In',
      formSub: 'Sign in with your registered email and password.',
      hint: '💡 Try Email: <strong>mbrown@mail.com</strong> / Password: <strong>landlord1</strong>',
      showIdField: false,
      showEmailField: true,
    },
  };

  const cfg = configs[role];
  document.getElementById('login-visual-icon').textContent  = cfg.icon;
  document.getElementById('login-visual-title').textContent = cfg.title;
  document.getElementById('login-visual-desc').textContent  = cfg.desc;
  document.getElementById('login-form-title').textContent   = cfg.formTitle;
  document.getElementById('login-form-subtitle').textContent = cfg.formSub;
  document.getElementById('login-hint').innerHTML           = cfg.hint;

  // Toggle fields
  document.getElementById('field-utechid').classList.toggle('hidden', !cfg.showIdField);
  document.getElementById('field-email').classList.toggle('hidden', !cfg.showEmailField);

  // Clear inputs & errors
  document.getElementById('input-utechid').value  = '';
  document.getElementById('input-email').value    = '';
  document.getElementById('input-password').value = '';
  document.getElementById('login-error').classList.add('hidden');

  setTimeout(() => lucide.createIcons(), 50);
}

/** Handle login form submission */
function handleLogin() {
  const password = document.getElementById('input-password').value.trim();
  let authenticated = false;

  if (currentRole === 'student') {
    const utechId = document.getElementById('input-utechid').value.trim();
    const user = USERS.students.find(u => u.id === utechId && u.password === password);
    if (user) { authenticated = true; currentUser = user; }
  } else if (currentRole === 'staff') {
    const utechId = document.getElementById('input-utechid').value.trim();
    const user = USERS.staff.find(u => u.id === utechId && u.password === password);
    if (user) { authenticated = true; currentUser = user; }
  } else if (currentRole === 'landlord') {
    const email = document.getElementById('input-email').value.trim().toLowerCase();
    const user = USERS.landlords.find(u => u.email === email && u.password === password);
    if (user) { authenticated = true; currentUser = user; }
  }

  if (authenticated) {
    document.getElementById('login-error').classList.add('hidden');
    // Animate button briefly
    const btn = document.getElementById('login-btn');
    btn.style.background = '#2F9E44';
    btn.querySelector('span').textContent = 'Signing in…';
    setTimeout(() => {
      btn.style.background = '';
      btn.querySelector('span').textContent = 'Sign In';
      redirectAfterLogin();
    }, 700);
  } else {
    showLoginError('Invalid credentials. Please check your ID/email and password.');
  }
}

/** Redirect to the correct portal after login */
function redirectAfterLogin() {
  if (currentRole === 'student') {
    document.getElementById('student-name-display').textContent = currentUser.name;
    document.querySelector('.avatar').textContent = currentUser.name[0];
    showPage('page-student');
    setStudentTab('listings');
    showToast(`Welcome back, ${currentUser.name.split(' ')[0]}!`, 'success');
  } else if (currentRole === 'staff') {
    document.getElementById('staff-name-display').textContent = currentUser.name;
    showPage('page-staff');
    showToast(`Welcome, ${currentUser.name}`, 'success');
  } else if (currentRole === 'landlord') {
    document.getElementById('landlord-name-display').textContent = currentUser.name;
    document.getElementById('landlord-welcome').textContent = `Welcome back, ${currentUser.name.split(' ')[1]}`;
    showPage('page-landlord');
    setLandlordTab('dashboard');
    renderLandlordCRM();
    showToast(`Welcome, ${currentUser.name}`, 'success');
  }
}

/** Show login error */
function showLoginError(msg) {
  const err = document.getElementById('login-error');
  document.getElementById('login-error-msg').textContent = msg;
  err.classList.remove('hidden');
  err.style.animation = 'none';
  void err.offsetHeight;
  err.style.animation = 'fadeIn .25s both';
  setTimeout(() => lucide.createIcons(), 20);
}

/** Toggle password visibility */
function togglePassword() {
  const input = document.getElementById('input-password');
  const eyeIcon = document.getElementById('pw-eye');
  if (input.type === 'password') {
    input.type = 'text';
    eyeIcon.setAttribute('data-lucide', 'eye-off');
  } else {
    input.type = 'password';
    eyeIcon.setAttribute('data-lucide', 'eye');
  }
  lucide.createIcons();
}

/* ════════════════════════════════════════════════════
   5. STUDENT PORTAL — LISTINGS
════════════════════════════════════════════════════ */

/** Switch student portal tabs */
function setStudentTab(tab) {
  document.querySelectorAll('#page-student .tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('#student-nav .nav-link').forEach(l => l.classList.remove('active'));
  document.getElementById(`tab-${tab}`).classList.add('active');
  const keyMap = { listings: 'listing', bookings: 'booking', helpdesk: 'helpdesk' };
  document.querySelectorAll('#student-nav .nav-link').forEach(l => {
    if (l.textContent.trim().toLowerCase().includes(keyMap[tab] || tab)) l.classList.add('active');
  });
  if (tab === 'bookings') renderBookingsTab();
  setTimeout(() => lucide.createIcons(), 50);
}

/** Render listing cards into the grid */
function renderListings(data) {
  const grid = document.getElementById('listings-grid');
  const noResults = document.getElementById('no-results');
  const badge = document.getElementById('listing-count-badge');

  grid.innerHTML = '';

  if (data.length === 0) {
    noResults.classList.remove('hidden');
    badge.textContent = 'No listings found';
    setTimeout(() => lucide.createIcons(), 50);
    return;
  }

  noResults.classList.add('hidden');
  badge.textContent = `Showing ${data.length} listing${data.length !== 1 ? 's' : ''}`;

  data.forEach((listing, i) => {
    const card = document.createElement('div');
    card.className = 'listing-card';
    card.style.animationDelay = `${i * 0.05}s`;
    card.onclick = () => openListingModal(listing.id);

    const furnTag = getFurnTag(listing.furnished);
    const stars   = renderStars(listing.rating);
    const initials = listing.landlord.split(' ').slice(-2).map(w => w[0]).join('');

    card.innerHTML = `
      <div class="card-img-placeholder" style="background:${listing.bgColor}">${listing.emoji}</div>
      <div class="card-body">
        <div class="card-tags">
          <span class="tag tag-area">${listing.area}</span>
          ${furnTag}
        </div>
        <h3 class="card-title">${listing.title}</h3>
        <div class="card-location">
          <i data-lucide="map-pin"></i>
          <span>${listing.address}</span>
        </div>
        <p class="card-desc">${listing.description}</p>
        <div class="card-footer">
          <div class="card-price">
            J$${listing.price.toLocaleString()}
            <span>/ month</span>
          </div>
          <div class="card-landlord">
            <div class="landlord-mini-avatar">${initials}</div>
            <div class="landlord-mini-info">
              <span class="landlord-mini-name">${listing.landlord.split(' ').slice(-1)}</span>
              <span class="landlord-mini-rating">${stars} ${listing.rating}</span>
            </div>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  setTimeout(() => lucide.createIcons(), 50);
}

/** Get the furnished tag HTML */
function getFurnTag(status) {
  const map = {
    'Furnished':      '<span class="tag tag-furn">Furnished</span>',
    'Unfurnished':    '<span class="tag tag-unfurn">Unfurnished</span>',
    'Semi-Furnished': '<span class="tag tag-semi">Semi-Furnished</span>',
  };
  return map[status] || `<span class="tag tag-unfurn">${status}</span>`;
}

/** Generate star string (e.g. ★★★★½) */
function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '⯨' : '') + '☆'.repeat(empty);
}

/* ── Filtering & Sorting ──────────────────────── */

/** Set area filter chip active state */
function setAreaFilter(el, area) {
  document.querySelectorAll('#area-filter-chips .chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  activeArea = area;
  applyFilters();
}

/** Toggle furnished-only filter */
function toggleFurnishedFilter(btn) {
  furnishedOnly = !furnishedOnly;
  btn.classList.toggle('active', furnishedOnly);
  applyFilters();
}

/** Apply all active filters and sort to listings */
function applyFilters() {
  const query = document.getElementById('search-input').value.toLowerCase();
  const sort  = document.getElementById('sort-select').value;

  let filtered = listings.filter(l => {
    const matchArea     = activeArea === 'all' || l.area === activeArea;
    const matchFurn     = !furnishedOnly || l.furnished === 'Furnished';
    const matchSearch   = !query
      || l.title.toLowerCase().includes(query)
      || l.area.toLowerCase().includes(query)
      || l.description.toLowerCase().includes(query)
      || l.landlord.toLowerCase().includes(query);
    return matchArea && matchFurn && matchSearch;
  });

  if (sort === 'price-asc')  filtered.sort((a,b) => a.price - b.price);
  if (sort === 'price-desc') filtered.sort((a,b) => b.price - a.price);
  if (sort === 'rating')     filtered.sort((a,b) => b.rating - a.rating);

  renderListings(filtered);
}

/** Reset all filters */
function resetFilters() {
  document.getElementById('search-input').value = '';
  document.getElementById('sort-select').value  = 'default';
  furnishedOnly = false;
  activeArea    = 'all';
  document.querySelectorAll('#area-filter-chips .chip').forEach(c => c.classList.remove('active'));
  document.querySelector('#area-filter-chips .chip[data-area="all"]').classList.add('active');
  document.getElementById('toggle-furnished').classList.remove('active');
  renderListings(listings);
}

/* ── Listing Detail Modal ─────────────────────── */

/** Open the listing detail modal */
function openListingModal(id) {
  const listing = listings.find(l => l.id === id);
  if (!listing) return;

  const initials = listing.landlord.split(' ').slice(-2).map(w => w[0]).join('');
  const stars    = renderStars(listing.rating);
  const amenitiesHTML = listing.amenities.map(a => `<span class="amenity-tag">${a}</span>`).join('');
  const furnTag  = getFurnTag(listing.furnished);

  document.getElementById('listing-modal-content').innerHTML = `
    <div class="modal-listing-img-placeholder" style="background:${listing.bgColor}">${listing.emoji}</div>
    <div class="modal-listing-body">
      <div class="modal-listing-meta">
        <span class="tag tag-area">${listing.area}</span>
        ${furnTag}
      </div>
      <h2 class="modal-listing-title">${listing.title}</h2>
      <div class="modal-listing-address">
        <i data-lucide="map-pin"></i>
        <span>${listing.address}</span>
      </div>
      <div class="modal-listing-price">
        J$${listing.price.toLocaleString()}
        <span>/ month</span>
      </div>
      <div class="modal-listing-stats">
        <div class="stat-item"><i data-lucide="bed-double"></i> ${listing.beds} Bedroom${listing.beds>1?'s':''}</div>
        <div class="stat-item"><i data-lucide="bath"></i> ${listing.baths} Bathroom${listing.baths>1?'s':''}</div>
        <div class="stat-item"><i data-lucide="sofa"></i> ${listing.furnished}</div>
        <div class="stat-item"><i data-lucide="star"></i> ${listing.rating} (${listing.reviews} reviews)</div>
      </div>
      <p class="modal-listing-desc">${listing.description}</p>
      <div class="modal-amenities">${amenitiesHTML}</div>
      <div class="modal-landlord-section">
        <div class="modal-landlord-info">
          <div class="landlord-avatar-large">${initials}</div>
          <div>
            <div class="landlord-info-name">${listing.landlord}</div>
            <div class="landlord-info-rating">${stars} ${listing.rating} · ${listing.reviews} reviews</div>
            <div class="landlord-verified"><i data-lucide="badge-check"></i> Verified Landlord</div>
          </div>
        </div>
        ${currentRole === 'student' ? `
          <button class="btn-secondary" onclick="openRateModal(${listing.id})">
            <i data-lucide="star"></i> Rate Landlord
          </button>` : ''}
      </div>
    </div>
  `;

  openModal('modal-listing');
}

/* ════════════════════════════════════════════════════
   6. RATING SYSTEM (UI only)
════════════════════════════════════════════════════ */

function openRateModal(listingId) {
  currentRatingListingId = listingId;
  currentRatingValue     = 0;
  const listing = listings.find(l => l.id === listingId);
  document.getElementById('rate-landlord-name').textContent = `Rating: ${listing.landlord}`;
  document.getElementById('rate-comment').value = '';
  document.getElementById('rating-label').textContent = 'Click a star to rate';
  document.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
  closeModal('modal-listing');
  openModal('modal-rate');
}

function setRating(val) {
  currentRatingValue = val;
  const labels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
  document.getElementById('rating-label').textContent = `${labels[val]} — ${val}/5 stars`;
  document.querySelectorAll('.star').forEach(s => {
    s.classList.toggle('active', parseInt(s.dataset.val) <= val);
  });
}

function submitRating() {
  if (!currentRatingValue) {
    showToast('Please select a star rating.', 'error');
    return;
  }
  // Update mock rating (UI simulation)
  const listing = listings.find(l => l.id === currentRatingListingId);
  if (listing) {
    const total  = listing.rating * listing.reviews + currentRatingValue;
    listing.reviews += 1;
    listing.rating = Math.round((total / listing.reviews) * 10) / 10;
  }
  closeModal('modal-rate');
  showToast(`Rating submitted! ${renderStars(currentRatingValue)} Thank you.`, 'success');
  applyFilters();
}

/* ════════════════════════════════════════════════════
   7. HELPDESK
════════════════════════════════════════════════════ */

function submitHelpdesk(e) {
  e.preventDefault();
  const name     = document.getElementById('hd-name').value;
  const location = document.getElementById('hd-location').value;
  const priority = document.getElementById('hd-priority').value;
  const category = document.getElementById('hd-category').value;
  const ticketNo = 'HD-' + Date.now().toString().slice(-6);

  document.getElementById('confirm-ticket').innerHTML = `
    🎫 Ticket Reference: <strong>${ticketNo}</strong><br/>
    📍 Location: ${location}<br/>
    ${priority ? `⚠️ Priority: ${priority.charAt(0).toUpperCase()+priority.slice(1)}<br/>` : ''}
    ${category ? `🔧 Category: ${category}` : ''}
  `;
  document.getElementById('confirm-message').textContent =
    `Thank you ${name}. Your maintenance request has been logged. The UTech Housing helpdesk team will respond within 24–48 hours.`;

  document.getElementById('helpdesk-form-wrap').classList.add('hidden');
  document.getElementById('helpdesk-confirm').classList.remove('hidden');
  setTimeout(() => lucide.createIcons(), 50);
}

function resetHelpdesk() {
  document.getElementById('helpdesk-form-wrap').classList.remove('hidden');
  document.getElementById('helpdesk-confirm').classList.add('hidden');
  document.querySelector('.helpdesk-form').reset();
}

/* ════════════════════════════════════════════════════
   8. LANDLORD CRM DASHBOARD
════════════════════════════════════════════════════ */

function setLandlordTab(tab) {
  document.querySelectorAll('#page-landlord .tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('#landlord-nav .nav-link').forEach(l => l.classList.remove('active'));
  document.getElementById(`ll-tab-${tab}`).classList.add('active');
  const linkMap = { dashboard: 'dashboard', listings: 'my listing', inquiries: 'inquir' };
  document.querySelectorAll('#landlord-nav .nav-link').forEach(l => {
    if (l.textContent.toLowerCase().includes(linkMap[tab])) l.classList.add('active');
  });
  setTimeout(() => lucide.createIcons(), 50);
}

/** Render CRM dashboard stats */
function renderLandlordCRM() {
  // Get current landlord's listings (or all if not filtered)
  const myListings = currentUser
    ? listings.filter(l => l.landlordId === currentUser.id)
    : listings;

  const activeListings = myListings.filter(l => l.active).length;
  const totalInquiries = inquiries.length;
  const unreadInquiries = inquiries.filter(i => i.unread).length;
  const avgRating = myListings.length
    ? (myListings.reduce((s,l) => s + l.rating, 0) / myListings.length).toFixed(1)
    : '—';

  document.getElementById('crm-stats').innerHTML = `
    <div class="crm-stat-card">
      <div class="crm-stat-icon blue"><i data-lucide="home"></i></div>
      <div><div class="crm-stat-num">${activeListings}</div><div class="crm-stat-label">Active Listings</div></div>
    </div>
    <div class="crm-stat-card">
      <div class="crm-stat-icon gold"><i data-lucide="message-square"></i></div>
      <div><div class="crm-stat-num">${totalInquiries}</div><div class="crm-stat-label">Total Inquiries</div></div>
    </div>
    <div class="crm-stat-card">
      <div class="crm-stat-icon green"><i data-lucide="star"></i></div>
      <div><div class="crm-stat-num">${avgRating}</div><div class="crm-stat-label">Avg. Rating</div></div>
    </div>
    <div class="crm-stat-card">
      <div class="crm-stat-icon red"><i data-lucide="bell"></i></div>
      <div><div class="crm-stat-num">${unreadInquiries}</div><div class="crm-stat-label">Unread Messages</div></div>
    </div>
  `;

  // Activity feed
  document.getElementById('activity-list').innerHTML = activityFeed.map(a => `
    <div class="activity-item">
      <div class="activity-dot ${a.dot}"></div>
      <span class="activity-text">${a.text}</span>
      <span class="activity-time">${a.time}</span>
    </div>
  `).join('');

  // Listings management table
  renderCRMListingsTable(myListings);

  setTimeout(() => lucide.createIcons(), 50);
}

/** Render the CRM listings management table */
function renderCRMListingsTable(data) {
  const container = document.getElementById('crm-listings-table');
  container.innerHTML = `
    <div class="crm-table-header">
      <span>Property</span>
      <span>Area</span>
      <span>Price / mo</span>
      <span>Status</span>
      <span>Actions</span>
    </div>
    ${data.map(l => `
      <div class="crm-table-row">
        <div class="crm-row-title">${l.title}</div>
        <div class="crm-row-area">${l.area}</div>
        <div class="crm-row-price">J$${l.price.toLocaleString()}</div>
        <div class="crm-row-status">
          <span class="status-badge ${l.active ? 'status-active' : 'status-inactive'}">
            ${l.active ? 'Active' : 'Inactive'}
          </span>
        </div>
        <div class="crm-row-actions">
          <button class="btn-icon gold" onclick="openEditListingModal(${l.id})" title="Edit">
            <i data-lucide="pencil"></i>
          </button>
          <button class="btn-icon danger" onclick="openDeleteModal(${l.id})" title="Delete">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>
    `).join('')}
  `;
  setTimeout(() => lucide.createIcons(), 50);
}

/** Render inquiries list */
function renderInquiries() {
  document.getElementById('inquiries-list').innerHTML = inquiries.map(inq => `
    <div class="inquiry-card">
      <div class="inquiry-avatar">${inq.studentInitial}</div>
      <div class="inquiry-body">
        <div class="inquiry-name">${inq.studentName}</div>
        <div class="inquiry-property">Re: ${inq.property}</div>
        <div class="inquiry-message">${inq.message}</div>
        <div class="inquiry-meta">
          <span class="inquiry-time">${inq.time}</span>
          ${inq.unread ? '<span class="inquiry-unread">New</span>' : ''}
        </div>
      </div>
    </div>
  `).join('');
  setTimeout(() => lucide.createIcons(), 50);
}

/* ── Add / Edit / Delete Listings ──────────────── */

/** Open the Add Listing modal (blank form) */
function openAddListingModal() {
  editingListingId = null;
  document.getElementById('add-listing-title').textContent  = 'Add New Listing';
  document.getElementById('save-listing-btn-text').textContent = 'Add Listing';
  // Clear fields
  ['al-title','al-price','al-area','al-furnished','al-address','al-desc','al-beds','al-baths','al-amenities']
    .forEach(id => { document.getElementById(id).value = ''; });
  openModal('modal-add-listing');
}

/** Open the Edit Listing modal (prefilled) */
function openEditListingModal(id) {
  const listing = listings.find(l => l.id === id);
  if (!listing) return;
  editingListingId = id;
  document.getElementById('add-listing-title').textContent    = 'Edit Listing';
  document.getElementById('save-listing-btn-text').textContent = 'Save Changes';
  document.getElementById('al-title').value     = listing.title;
  document.getElementById('al-price').value     = listing.price;
  document.getElementById('al-area').value      = listing.area;
  document.getElementById('al-furnished').value = listing.furnished;
  document.getElementById('al-address').value   = listing.address;
  document.getElementById('al-desc').value      = listing.description;
  document.getElementById('al-beds').value      = listing.beds;
  document.getElementById('al-baths').value     = listing.baths;
  document.getElementById('al-amenities').value = listing.amenities.join(', ');
  openModal('modal-add-listing');
}

/** Save a new or edited listing */
function saveListing() {
  const title     = document.getElementById('al-title').value.trim();
  const price     = parseInt(document.getElementById('al-price').value);
  const area      = document.getElementById('al-area').value;
  const furnished = document.getElementById('al-furnished').value;
  const address   = document.getElementById('al-address').value.trim();
  const desc      = document.getElementById('al-desc').value.trim();
  const beds      = parseInt(document.getElementById('al-beds').value) || 1;
  const baths     = parseInt(document.getElementById('al-baths').value) || 1;
  const amenities = document.getElementById('al-amenities').value
    .split(',').map(s => s.trim()).filter(Boolean);

  if (!title || !price || !area || !address || !desc) {
    showToast('Please fill in all required fields.', 'error');
    return;
  }

  const landlordUser = currentUser || USERS.landlords[0];

  if (editingListingId !== null) {
    // Update existing
    const idx = listings.findIndex(l => l.id === editingListingId);
    if (idx !== -1) {
      listings[idx] = {
        ...listings[idx], title, price, area, furnished, address,
        description: desc, beds, baths, amenities
      };
    }
    showToast('Listing updated successfully!', 'success');
  } else {
    // Add new
    const newId = Math.max(...listings.map(l => l.id)) + 1;
    const emojis = ['🏠','🏢','🏡','🏘️','🛏️','🌿','✨'];
    const colors = ['#E8EDF5','#FBF4E3','#EBFBEE','#F2F4F7','#FFF5F5','#ECFDF5','#F0E6FF'];
    listings.push({
      id: newId, title, price, area, furnished, address,
      description: desc, beds, baths, amenities,
      landlord: landlordUser.name,
      landlordId: landlordUser.id,
      rating: 0.0,
      reviews: 0,
      emoji: emojis[newId % emojis.length],
      bgColor: colors[newId % colors.length],
      active: true,
    });
    showToast('New listing added!', 'success');
    // Add to activity feed
    activityFeed.unshift({
      dot: 'dot-green',
      text: `New listing <strong>${title}</strong> was added`,
      time: 'Just now'
    });
  }

  closeModal('modal-add-listing');
  renderLandlordCRM();
  applyFilters();
}

/** Open delete confirmation modal */
function openDeleteModal(id) {
  deleteTargetId = id;
  openModal('modal-delete');
}

/** Confirm and execute delete */
function confirmDelete() {
  if (deleteTargetId !== null) {
    const idx = listings.findIndex(l => l.id === deleteTargetId);
    if (idx !== -1) {
      const title = listings[idx].title;
      listings.splice(idx, 1);
      activityFeed.unshift({ dot: 'dot-red', text: `Listing <strong>${title}</strong> was deleted`, time: 'Just now' });
      showToast('Listing deleted.', 'success');
    }
    deleteTargetId = null;
    closeModal('modal-delete');
    renderLandlordCRM();
    applyFilters();
  }
}

/* ════════════════════════════════════════════════════
   9. STAFF PANEL
════════════════════════════════════════════════════ */

function renderStaffPanel() {
  const overview = document.getElementById('staff-overview');
  const areas    = [...new Set(listings.map(l => l.area))];
  const landlordCount = USERS.landlords.length;
  const studentCount  = USERS.students.length;

  // Platform stats card
  const platformCard = `
    <div class="staff-card">
      <div class="staff-card-header"><i data-lucide="bar-chart-2"></i><h4>Platform Overview</h4></div>
      <div class="staff-stat-row"><span>Total Listings</span><span class="staff-stat-val">${listings.length}</span></div>
      <div class="staff-stat-row"><span>Verified Landlords</span><span class="staff-stat-val">${landlordCount}</span></div>
      <div class="staff-stat-row"><span>Registered Students</span><span class="staff-stat-val">${studentCount}</span></div>
      <div class="staff-stat-row"><span>Open Inquiries</span><span class="staff-stat-val">${inquiries.length}</span></div>
      <div class="staff-stat-row"><span>Coverage Areas</span><span class="staff-stat-val">${areas.length}</span></div>
    </div>`;

  // Listings by area card
  const areaStats = areas.map(area => {
    const count = listings.filter(l => l.area === area).length;
    return `<div class="staff-stat-row"><span>${area}</span><span class="staff-stat-val">${count}</span></div>`;
  }).join('');
  const areaCard = `
    <div class="staff-card">
      <div class="staff-card-header"><i data-lucide="map"></i><h4>Listings by Area</h4></div>
      ${areaStats}
    </div>`;

  // Price range card
  const prices = listings.map(l => l.price);
  const minP   = Math.min(...prices).toLocaleString();
  const maxP   = Math.max(...prices).toLocaleString();
  const avgP   = Math.round(prices.reduce((a,b)=>a+b,0)/prices.length).toLocaleString();
  const priceCard = `
    <div class="staff-card">
      <div class="staff-card-header"><i data-lucide="dollar-sign"></i><h4>Pricing Intelligence (JMD)</h4></div>
      <div class="staff-stat-row"><span>Lowest Rent</span><span class="staff-stat-val">J$${minP}</span></div>
      <div class="staff-stat-row"><span>Highest Rent</span><span class="staff-stat-val">J$${maxP}</span></div>
      <div class="staff-stat-row"><span>Average Rent</span><span class="staff-stat-val">J$${avgP}</span></div>
      <div class="staff-stat-row"><span>Furnished Units</span><span class="staff-stat-val">${listings.filter(l=>l.furnished==='Furnished').length}</span></div>
      <div class="staff-stat-row"><span>Unfurnished</span><span class="staff-stat-val">${listings.filter(l=>l.furnished==='Unfurnished').length}</span></div>
    </div>`;

  // Landlord performance card
  const landlordPerf = USERS.landlords.map(ll => {
    const llListings = listings.filter(l => l.landlordId === ll.id);
    const avg = llListings.length
      ? (llListings.reduce((s,l)=>s+l.rating,0)/llListings.length).toFixed(1)
      : '—';
    return `<div class="staff-stat-row"><span>${ll.name.split(' ').slice(-2).join(' ')}</span>
      <span class="staff-stat-val">${llListings.length} listings · ★ ${avg}</span></div>`;
  }).join('');
  const landlordCard = `
    <div class="staff-card">
      <div class="staff-card-header"><i data-lucide="users"></i><h4>Landlord Performance</h4></div>
      ${landlordPerf}
    </div>`;

  overview.innerHTML = platformCard + areaCard + priceCard + landlordCard;
  setTimeout(() => lucide.createIcons(), 50);
}

/* ════════════════════════════════════════════════════
   10. MODAL HELPERS
════════════════════════════════════════════════════ */

function openModal(id) {
  const modal = document.getElementById(id);
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => lucide.createIcons(), 50);
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

/** Close modal only when clicking the backdrop itself (not the modal box) */
function closeModalIfBackdrop(event, id) {
  if (event.target === event.currentTarget) closeModal(id);
}

/* ════════════════════════════════════════════════════
   11. TOAST NOTIFICATIONS
════════════════════════════════════════════════════ */

let toastTimer = null;
function showToast(msg, type = 'success') {
  const toast   = document.getElementById('toast');
  const iconEl  = document.getElementById('toast-icon');
  document.getElementById('toast-msg').textContent = msg;

  toast.className = `toast ${type}`;
  iconEl.setAttribute('data-lucide', type === 'success' ? 'check-circle' : 'alert-circle');
  lucide.createIcons();

  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ════════════════════════════════════════════════════
   13. BOOKING SYSTEM
════════════════════════════════════════════════════ */

/** In-memory bookings store */
let bookings = [];

/** Open booking modal pre-filled with listing info */
function openBookingModal(listingId) {
  const listing = listings.find(l => l.id === listingId);
  if (!listing) return;

  document.getElementById('booking-property-name').textContent = listing.title;
  document.getElementById('booking-confirm').classList.add('hidden');
  document.getElementById('booking-form-actions').classList.remove('hidden');

  // Pre-fill student info if logged in
  if (currentUser && currentRole === 'student') {
    document.getElementById('bk-name').value = currentUser.name || '';
    document.getElementById('bk-id').value   = currentUser.id   || '';
  }

  // Set min date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  document.getElementById('bk-date').min = tomorrow.toISOString().split('T')[0];

  // Store listing reference
  document.getElementById('modal-booking').dataset.listingId = listingId;
  closeModal('modal-listing');
  openModal('modal-booking');
}

/** Submit a viewing booking */
function submitBooking() {
  const name  = document.getElementById('bk-name').value.trim();
  const id    = document.getElementById('bk-id').value.trim();
  const date  = document.getElementById('bk-date').value;
  const time  = document.getElementById('bk-time').value;
  const phone = document.getElementById('bk-phone').value.trim();
  const notes = document.getElementById('bk-notes').value.trim();
  const listingId = parseInt(document.getElementById('modal-booking').dataset.listingId);
  const listing = listings.find(l => l.id === listingId);

  if (!name || !date || !time) {
    showToast('Please fill in your name, date, and preferred time.', 'error');
    return;
  }

  const ref = 'BK-' + Date.now().toString().slice(-6);

  // Store booking
  bookings.push({
    ref, listingId,
    listingTitle: listing ? listing.title : 'Unknown',
    listingArea:  listing ? listing.area  : '',
    landlord:     listing ? listing.landlord : '',
    name, id, date, time, phone, notes,
    status: 'pending',
    createdAt: new Date().toISOString(),
  });

  // Show confirmation inside modal
  document.getElementById('booking-confirm').classList.remove('hidden');
  document.getElementById('booking-form-actions').classList.add('hidden');
  document.getElementById('booking-confirm-msg').textContent =
    `Your viewing for "${listing ? listing.title : 'the property'}" on ${formatDate(date)} at ${time} has been submitted. The landlord will confirm within 24 hours.`;
  document.getElementById('booking-ref').innerHTML =
    `📋 Reference: <strong>${ref}</strong> &nbsp;|&nbsp; 📅 ${formatDate(date)} &nbsp;|&nbsp; 🕐 ${time}`;

  showToast('Viewing booked! Check "My Bookings" for details.', 'success');
  setTimeout(() => lucide.createIcons(), 50);
}

/** Format ISO date to readable string */
function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('en-JM', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
}

/** Render the My Bookings tab */
function renderBookingsTab() {
  const empty = document.getElementById('bookings-empty');
  const grid  = document.getElementById('bookings-grid');

  // Filter to current student's bookings if possible
  const myBookings = currentUser
    ? bookings.filter(b => b.id === currentUser.id || !b.id)
    : bookings;

  if (myBookings.length === 0) {
    empty.classList.remove('hidden');
    grid.innerHTML = '';
    return;
  }

  empty.classList.add('hidden');
  grid.innerHTML = myBookings.map(b => `
    <div class="booking-card">
      <div class="booking-card-header">
        <span class="booking-card-ref">${b.ref}</span>
        <span class="booking-status-badge ${b.status}">
          ${b.status === 'pending' ? '⏳ Pending' : '✅ Confirmed'}
        </span>
      </div>
      <div class="booking-card-body">
        <div class="booking-card-title">${b.listingTitle}</div>
        <div class="booking-detail"><i data-lucide="map-pin"></i> ${b.listingArea}</div>
        <div class="booking-detail"><i data-lucide="user"></i> ${b.landlord}</div>
        <div class="booking-detail"><i data-lucide="calendar"></i> ${formatDate(b.date)}</div>
        <div class="booking-detail"><i data-lucide="clock"></i> ${b.time}</div>
        ${b.notes ? `<div class="booking-detail"><i data-lucide="message-circle"></i> ${b.notes}</div>` : ''}
      </div>
      <div class="booking-card-actions">
        <button class="btn-danger-sm" onclick="cancelBooking('${b.ref}')">Cancel Booking</button>
      </div>
    </div>
  `).join('');
  setTimeout(() => lucide.createIcons(), 50);
}

/** Cancel a booking */
function cancelBooking(ref) {
  bookings = bookings.filter(b => b.ref !== ref);
  renderBookingsTab();
  showToast('Booking cancelled.', 'success');
}

/* ════════════════════════════════════════════════════
   14. DIRECT MESSAGING
════════════════════════════════════════════════════ */

/** Per-listing message threads: { listingId: [{role, text, time}] } */
const dmThreads = {};

/** Open DM modal for a listing */
function openDMModal(listingId) {
  const listing = listings.find(l => l.id === listingId);
  if (!listing) return;

  document.getElementById('dm-landlord-name').textContent =
    `To: ${listing.landlord} — ${listing.title}`;
  document.getElementById('modal-dm').dataset.listingId = listingId;
  document.getElementById('dm-message').value = '';

  renderDMThread(listingId);
  closeModal('modal-listing');
  openModal('modal-dm');
  setTimeout(() => document.getElementById('dm-message').focus(), 100);
}

/** Render the thread messages */
function renderDMThread(listingId) {
  const thread  = dmThreads[listingId] || [];
  const threadEl = document.getElementById('dm-thread');
  const emptyEl  = document.getElementById('dm-thread-empty');

  if (thread.length === 0) {
    emptyEl.classList.remove('hidden');
    // Remove all message bubbles
    threadEl.querySelectorAll('.dm-msg').forEach(el => el.remove());
    return;
  }

  emptyEl.classList.add('hidden');
  threadEl.querySelectorAll('.dm-msg').forEach(el => el.remove());

  thread.forEach(msg => {
    const div = document.createElement('div');
    div.className = `dm-msg from-${msg.role}`;
    div.innerHTML = `
      <div class="dm-bubble">${escapeHTML(msg.text)}</div>
      <span class="dm-meta">${msg.time}</span>
    `;
    threadEl.appendChild(div);
  });

  // Scroll to bottom
  threadEl.scrollTop = threadEl.scrollHeight;
}

/** Send a DM message */
function sendDM() {
  const listingId = parseInt(document.getElementById('modal-dm').dataset.listingId);
  const text = document.getElementById('dm-message').value.trim();
  if (!text) return;

  if (!dmThreads[listingId]) dmThreads[listingId] = [];

  const now = new Date().toLocaleTimeString('en-JM', { hour: '2-digit', minute: '2-digit' });

  // Student message
  dmThreads[listingId].push({ role: 'student', text, time: now });
  document.getElementById('dm-message').value = '';

  renderDMThread(listingId);

  // Simulate a landlord auto-reply after 1.5s
  const listing = listings.find(l => l.id === listingId);
  const replies = [
    `Thank you for reaching out about ${listing ? '"' + listing.title + '"' : 'the property'}! I'll get back to you shortly.`,
    'Yes, the property is still available. Feel free to schedule a viewing!',
    'Thanks for your interest! Water and electricity are included in the rent.',
    'Security deposit is equivalent to 2 months\' rent. Lease is 12 months minimum.',
    'I can do viewings on weekdays after 3pm or weekends. What works for you?',
  ];
  const autoReply = replies[Math.floor(Math.random() * replies.length)];

  setTimeout(() => {
    const replyTime = new Date().toLocaleTimeString('en-JM', { hour: '2-digit', minute: '2-digit' });
    dmThreads[listingId].push({ role: 'landlord', text: autoReply, time: replyTime });
    renderDMThread(listingId);
  }, 1400);
}

/** Inject a quick-prompt into the DM textarea */
function useQuickPrompt(btn) {
  document.getElementById('dm-message').value = btn.textContent;
  document.getElementById('dm-message').focus();
}

/** Escape HTML for safe rendering */
function escapeHTML(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ════════════════════════════════════════════════════
   15. LISTING DETAIL MODAL — ACTION BUTTONS
   (Patch openListingModal to include new buttons)
════════════════════════════════════════════════════ */

/** Override the original openListingModal to inject Booking & DM buttons */
const _origOpenListingModal = openListingModal;
window.openListingModal = function(id) {
  _origOpenListingModal(id);
  // After original renders, inject action buttons if student
  if (currentRole === 'student') {
    const landlordSection = document.querySelector('.modal-landlord-section');
    if (landlordSection && !landlordSection.querySelector('.booking-dm-actions')) {
      const actionBar = document.createElement('div');
      actionBar.className = 'booking-dm-actions';
      actionBar.style.cssText = 'display:flex; gap:10px; width:100%; margin-top:16px; flex-wrap:wrap;';
      actionBar.innerHTML = `
        <button class="btn-primary" style="flex:1;" onclick="openBookingModal(${id})">
          <i data-lucide="calendar-check"></i> Schedule Viewing
        </button>
        <button class="btn-secondary" style="flex:1;" onclick="openDMModal(${id})">
          <i data-lucide="message-circle"></i> Message Landlord
        </button>
      `;
      landlordSection.insertAdjacentElement('afterend', actionBar);
      setTimeout(() => lucide.createIcons(), 30);
    }
  }
};

/* ════════════════════════════════════════════════════
   16. AI CHAT ASSISTANT
════════════════════════════════════════════════════ */

let aiChatOpen    = false;
let aiChatHistory = []; // {role, content}[]
let aiTyping      = false;

/** System prompt describing the assistant's role */
const AI_SYSTEM_PROMPT = `You are the UTech Housing Hub Assistant — a helpful, friendly AI for the University of Technology, Jamaica's student housing marketplace platform.

You help students, staff, and landlords with questions about:
- Finding housing near UTech (areas: Papine, Mona, Gordon Town, Tavern, Mountain View, Hope Pastures, Barbican)
- How to schedule property viewings and message landlords on the platform
- Submitting maintenance requests through the Helpdesk
- Rating landlords and reviewing properties
- Understanding lease terms, utilities, and rental agreements in Jamaica
- Tips for student budgeting and safe housing choices
- Platform features: browsing listings, filtering by area/price, furnished options

Keep responses concise, helpful, and warm. Use bullet points for lists. Reference UTech and Jamaica context where relevant.
If asked about something outside housing/the platform, politely redirect to housing topics.`;

/** Toggle the chat panel */
function toggleAIChat() {
  aiChatOpen = !aiChatOpen;
  const panel = document.getElementById('ai-chat-panel');
  panel.classList.toggle('open', aiChatOpen);

  // Inject greeting on first open
  if (aiChatOpen && aiChatHistory.length === 0) {
    addAIMessage('bot', `👋 Hi there! I'm the **UTech Housing Hub Assistant**.\n\nI can help you find housing near campus, schedule viewings, understand listings, or navigate the platform. What would you like to know?`);
  }
  setTimeout(() => {
    lucide.createIcons();
    if (aiChatOpen) document.getElementById('ai-chat-input').focus();
  }, 50);
}

/** Handle Enter key in chat input */
function handleChatKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendAIMessage();
  }
}

/** Send a user message and get AI response */
async function sendAIMessage() {
  const input = document.getElementById('ai-chat-input');
  const text  = input.value.trim();
  if (!text || aiTyping) return;

  input.value = '';
  input.style.height = 'auto';

  // Hide suggestions after first real message
  document.getElementById('ai-chat-suggestions').style.display = 'none';

  addAIMessage('user', text);
  aiChatHistory.push({ role: 'user', content: text });

  showAITyping();
  document.getElementById('ai-chat-send').disabled = true;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: AI_SYSTEM_PROMPT,
        messages: aiChatHistory,
      }),
    });

    const data = await response.json();
    hideAITyping();

    const reply = data.content
      ? data.content.filter(b => b.type === 'text').map(b => b.text).join('\n')
      : 'Sorry, I had trouble responding. Please try again.';

    aiChatHistory.push({ role: 'assistant', content: reply });
    addAIMessage('bot', reply);

  } catch (err) {
    hideAITyping();
    addAIMessage('bot', '⚠️ I couldn\'t connect right now. You can also try the [Gemini AI model](https://gemini.google.com/app/bec82ee167c460a2) for help.');
  }

  document.getElementById('ai-chat-send').disabled = false;
  setTimeout(() => lucide.createIcons(), 30);
}

/** Send a suggestion chip as a message */
function sendSuggestion(btn) {
  document.getElementById('ai-chat-input').value = btn.textContent;
  sendAIMessage();
}

/** Append a message bubble to the chat */
function addAIMessage(role, text) {
  const container = document.getElementById('ai-chat-messages');
  const time = new Date().toLocaleTimeString('en-JM', { hour: '2-digit', minute: '2-digit' });
  const div  = document.createElement('div');
  div.className = `ai-msg from-${role === 'user' ? 'user' : 'bot'}`;

  // Simple markdown-lite: **bold**, bullet lists, line breaks
  const formatted = markdownLite(text);

  div.innerHTML = `
    <div class="ai-bubble">${formatted}</div>
    <span class="ai-meta">${role === 'user' ? 'You' : 'Assistant'} · ${time}</span>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

/** Very lightweight markdown renderer for chat bubbles */
function markdownLite(text) {
  return text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" style="color:var(--gold)">$1</a>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul style="margin:6px 0 6px 14px;padding:0">$1</ul>')
    .replace(/\n\n/g, '<br/><br/>').replace(/\n/g, '<br/>');
}

/** Show the typing indicator */
function showAITyping() {
  aiTyping = true;
  const container = document.getElementById('ai-chat-messages');
  const typing = document.createElement('div');
  typing.className = 'ai-msg from-bot';
  typing.id = 'ai-typing-indicator';
  typing.innerHTML = `<div class="ai-bubble ai-typing"><span></span><span></span><span></span></div>`;
  container.appendChild(typing);
  container.scrollTop = container.scrollHeight;
}

/** Remove the typing indicator */
function hideAITyping() {
  aiTyping = false;
  const el = document.getElementById('ai-typing-indicator');
  if (el) el.remove();
}

/* ════════════════════════════════════════════════════
   17. CLOSE AI CHAT WHEN CLICKING OUTSIDE
════════════════════════════════════════════════════ */
document.addEventListener('click', (e) => {
  if (!aiChatOpen) return;
  const panel = document.getElementById('ai-chat-panel');
  const fab   = document.getElementById('ai-fab');
  if (!panel.contains(e.target) && !fab.contains(e.target)) {
    // Do NOT auto-close — user should use the X button
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    ['modal-listing','modal-rate','modal-add-listing','modal-delete'].forEach(closeModal);
  }
  // Enter key on login fields
  if (e.key === 'Enter') {
    const loginPage = document.getElementById('page-login');
    if (loginPage && loginPage.classList.contains('active')) handleLogin();
  }
});
