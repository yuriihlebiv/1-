/* ===== PRODUCTS DATA ===== */
let products = [
  {id:1,photo:'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80',name:'Сукня міді Flow',brand:'Ukr Design',cat:'women',price:1890,old:2490,sizes:['XS','S','M','L'],badge:'sale',new:false,stock:14},
  {id:2,photo:'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',name:'Пальто оверсайз',brand:'Atelier K',cat:'women',price:3450,old:null,sizes:['S','M','L','XL'],badge:'new',new:true,stock:5},
  {id:3,photo:'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80',name:'Сорочка Oxford',brand:'MenStyle',cat:'men',price:890,old:1190,sizes:['M','L','XL','XXL'],badge:'sale',new:false,stock:22},
  {id:4,photo:'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80',name:'Джинси Slim Fit',brand:'DenimUA',cat:'men',price:1290,old:null,sizes:['28','30','32','34'],badge:null,new:true,stock:18},
  {id:5,photo:'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80',name:'Шарф кашемір',brand:'Soft Label',cat:'women',price:650,old:950,sizes:['ONE'],badge:'hot',new:false,stock:3},
  {id:6,photo:'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80',name:'Лофери замшеві',brand:'Step UA',cat:'women',price:2100,old:null,sizes:['36','37','38','39','40'],badge:'new',new:true,stock:9},
  {id:7,photo:'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80',name:'Светр оверсайз',brand:'MenStyle',cat:'men',price:980,old:1350,sizes:['S','M','L'],badge:'sale',new:false,stock:11},
  {id:8,photo:'https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=600&q=80',name:'Блейзер класик',brand:'StyleUA',cat:'women',price:2850,old:null,sizes:['XS','S','M','L'],badge:null,new:true,stock:7},
];

let nextProductId = 9;

/* ===== ORDERS DATA ===== */
let orders = [
  {id:'ORD-0041',client:'Олена Ткаченко',email:'olena@gmail.com',phone:'+380671234567',city:'Київ',address:'вул. Хрещатик, 1',items:[{name:'Сукня міді Flow',qty:1,price:1890},{name:'Шарф кашемір',qty:1,price:650}],total:2540,status:'delivered',date:'2026-05-28',payment:'card'},
  {id:'ORD-0042',client:'Максим Бондаренко',email:'maks@ukr.net',phone:'+380501112233',city:'Харків',address:'пр. Науки, 14',items:[{name:'Джинси Slim Fit',qty:2,price:2580},{name:'Сорочка Oxford',qty:1,price:890}],total:3470,status:'shipped',date:'2026-06-01',payment:'monobank'},
  {id:'ORD-0043',client:'Ірина Савченко',email:'iryna@gmail.com',phone:'+380637776655',city:'Львів',address:'вул. Руська, 7',items:[{name:'Пальто оверсайз',qty:1,price:3450}],total:3450,status:'processing',date:'2026-06-03',payment:'cash'},
  {id:'ORD-0044',client:'Андрій Мельник',email:'andriy@outlook.com',phone:'+380938887766',city:'Одеса',address:'вул. Дерибасівська, 5',items:[{name:'Блейзер класик',qty:1,price:2850},{name:'Лофери замшеві',qty:1,price:2100}],total:4950,status:'processing',date:'2026-06-04',payment:'privatbank'},
  {id:'ORD-0045',client:'Наталія Коваль',email:'natalia@gmail.com',phone:'+380664445566',city:'Дніпро',address:'пр. Гагаріна, 22',items:[{name:'Светр оверсайз',qty:1,price:980}],total:980,status:'cancelled',date:'2026-06-04',payment:'card'},
];

let nextOrderId = 46;

/* ===== CLIENTS DATA ===== */
let clients = [
  {name:'Олена Ткаченко',email:'olena@gmail.com',provider:'Google',orders:3,total:7260,date:'2025-11-12'},
  {name:'Максим Бондаренко',email:'maks@ukr.net',provider:'Email',orders:1,total:3470,date:'2026-01-05'},
  {name:'Ірина Савченко',email:'iryna@gmail.com',provider:'Facebook',orders:2,total:5890,date:'2025-12-20'},
  {name:'Андрій Мельник',email:'andriy@outlook.com',provider:'Google',orders:1,total:4950,date:'2026-03-15'},
  {name:'Наталія Коваль',email:'natalia@gmail.com',provider:'Email',orders:4,total:12440,date:'2025-10-01'},
];

/* ===== STATE ===== */
let cart = {};
let currentFilter = 'all';
let currentSort = '';
let currentUser = null;
let editingProductId = null;
let adminOrderFilter = '';
let adminOrderStatusFilter = '';
let adminProdSearch = '';
let adminProdCatFilter = '';

/* ===== PRODUCTS RENDER ===== */
function renderProducts() {
  let list = [...products];
  if (currentFilter === 'women') list = list.filter(p => p.cat === 'women');
  else if (currentFilter === 'men') list = list.filter(p => p.cat === 'men');
  else if (currentFilter === 'sale') list = list.filter(p => p.old);
  if (currentSort === 'price-asc') list.sort((a,b) => a.price - b.price);
  else if (currentSort === 'price-desc') list.sort((a,b) => b.price - a.price);
  else if (currentSort === 'new') list.sort((a,b) => b.new - a.new);

  const grid = document.getElementById('products-grid');
  grid.innerHTML = list.map(p => {
    const inCart = cart[p.id] && cart[p.id].qty > 0;
    return `<div class="product-card">
      <div class="product-img-wrap">
        <img src="${p.photo}" alt="${p.name}" loading="lazy">
        ${p.badge ? `<div class="product-badge ${p.badge==='sale'?'badge-sale':p.badge==='new'?'badge-new':'badge-hot'}">${p.badge==='sale'?'SALE':p.badge==='new'?'NEW':'ХІТ'}</div>` : ''}
        <div class="product-overlay">
          <button class="quick-btn" onclick="addToCart(${p.id})">У кошик</button>
          <button class="wish-btn" onclick="wishlist(${p.id},this)"><i class="ti ti-heart"></i></button>
        </div>
      </div>
      <div class="product-body">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-sizes">${p.sizes.map(s => `<span class="size-dot">${s}</span>`).join('')}</div>
        <div class="product-bottom">
          <div class="price-wrap">
            <span class="price">${p.price.toLocaleString('uk-UA')}₴</span>
            ${p.old ? `<span class="price-old">${p.old.toLocaleString('uk-UA')}₴</span>` : ''}
          </div>
          <button class="add-cart-btn ${inCart ? 'added' : ''}" id="btn-${p.id}" onclick="addToCart(${p.id})">
            <i class="ti ti-${inCart ? 'check' : 'shopping-bag'}"></i>
          </button>
        </div>
      </div>
    </div>`;
  }).join('');
}

function filterProducts(f, el) {
  currentFilter = f;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderProducts();
}

function sortProducts(v) {
  currentSort = v;
  renderProducts();
}

/* ===== CART ===== */
function addToCart(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  if (!cart[id]) cart[id] = { product: p, qty: 0 };
  cart[id].qty++;
  updateCartCount();
  renderProducts();
  showToast(`+ ${p.name} додано до кошика`);
}

function removeFromCart(id) {
  delete cart[id];
  updateCartCount();
  renderCartPanel();
  renderProducts();
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id].qty += delta;
  if (cart[id].qty <= 0) delete cart[id];
  updateCartCount();
  renderCartPanel();
  renderProducts();
}

function wishlist(id, btn) {
  const icon = btn.querySelector('i');
  if (btn.classList.contains('wi-active')) {
    icon.style.color = '';
    btn.classList.remove('wi-active');
  } else {
    icon.style.color = '#E74C3C';
    btn.classList.add('wi-active');
    showToast('Додано до обраного');
  }
}

function updateCartCount() {
  const total = Object.values(cart).reduce((a,v) => a + v.qty, 0);
  document.getElementById('cart-count').textContent = total;
}

function openCart() {
  renderCartPanel();
  document.getElementById('cart-panel').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
}

function closeCart() {
  document.getElementById('cart-panel').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
}

function renderCartPanel() {
  const body = document.getElementById('cart-body');
  const footer = document.getElementById('cart-footer');
  const ids = Object.keys(cart);
  if (!ids.length) {
    body.innerHTML = `<div class="cart-empty-state"><i class="ti ti-shopping-bag" style="font-size:56px;margin-bottom:1rem;display:block;color:var(--border)"></i><p>Кошик порожній</p><p style="font-size:13px;margin-top:0.5rem">Додайте товари, щоб оформити замовлення</p></div>`;
    footer.style.display = 'none';
    return;
  }
  let sub = 0;
  body.innerHTML = ids.map(id => {
    const { product: p, qty } = cart[id];
    const line = p.price * qty;
    sub += line;
    return `<div class="cart-item">
      <div class="ci-img"><img src="${p.photo}" alt="${p.name}"></div>
      <div class="ci-info">
        <div class="ci-brand">${p.brand}</div>
        <div class="ci-name">${p.name}</div>
        <div class="ci-size">Розмір: ${p.sizes[0]}</div>
        <div class="ci-bottom">
          <div class="qty-ctrl">
            <button class="qty-btn" onclick="changeQty(${id},-1)">−</button>
            <span class="qty-val">${qty}</span>
            <button class="qty-btn" onclick="changeQty(${id},1)">+</button>
          </div>
          <div class="ci-price">${line.toLocaleString('uk-UA')}₴</div>
          <button class="ci-remove" onclick="removeFromCart(${id})"><i class="ti ti-trash"></i></button>
        </div>
      </div>
    </div>`;
  }).join('');
  document.getElementById('subtotal-val').textContent = sub.toLocaleString('uk-UA') + '₴';
  document.getElementById('total-val').textContent = sub.toLocaleString('uk-UA') + '₴';
  footer.style.display = 'block';
}

/* ===== CHECKOUT ===== */
function openCheckout() {
  closeCart();
  const ids = Object.keys(cart);
  if (!ids.length) return;
  let sub = Object.values(cart).reduce((a,v) => a + v.product.price * v.qty, 0);

  const itemsHtml = Object.values(cart).map(({product:p, qty}) =>
    `<div class="osm-item"><span>${p.name} × ${qty}</span><span>${(p.price*qty).toLocaleString('uk-UA')}₴</span></div>`
  ).join('');

  document.getElementById('checkout-modal-title').textContent = 'Оформлення замовлення';
  document.getElementById('checkout-modal-body').innerHTML = `
    <div class="order-summary-mini">
      <div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin-bottom:0.75rem;font-weight:600">Ваше замовлення</div>
      ${itemsHtml}
      <div class="osm-total"><span>Разом</span><span>${sub.toLocaleString('uk-UA')}₴</span></div>
    </div>
    <div class="checkout-form">
      <div class="form-section-title">Контактні дані</div>
      <div class="form-row">
        <div class="form-group"><label>Ім'я</label><input type="text" id="co-name" placeholder="Ваше ім'я" value="${currentUser ? currentUser.name : ''}"></div>
        <div class="form-group"><label>Прізвище</label><input type="text" id="co-lastname" placeholder="Прізвище"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Телефон</label><input type="tel" id="co-phone" placeholder="+380..."></div>
        <div class="form-group"><label>Email</label><input type="email" id="co-email" placeholder="email@..." value="${currentUser ? currentUser.email : ''}"></div>
      </div>
      <div class="form-section-title">Доставка</div>
      <div class="form-row">
        <div class="form-group"><label>Місто</label><input type="text" id="co-city" placeholder="Місто"></div>
        <div class="form-group"><label>Спосіб доставки</label>
          <select id="co-delivery">
            <option>Нова Пошта (відділення)</option>
            <option>Нова Пошта (кур'єр)</option>
            <option>Укрпошта</option>
            <option>Самовивіз</option>
          </select>
        </div>
      </div>
      <div class="form-group"><label>Адреса / № відділення</label><input type="text" id="co-address" placeholder="вул. або № відділення..."></div>
      <div class="form-group"><label>Коментар до замовлення</label><textarea id="co-comment" placeholder="Додатковий коментар..."></textarea></div>
      <div class="form-section-title">Оплата</div>
      <div class="payment-methods">
        <button class="pay-opt active" onclick="selectPayment(this,'card')"><i class="ti ti-credit-card"></i> Карткою онлайн</button>
        <button class="pay-opt" onclick="selectPayment(this,'privatbank')"><i class="ti ti-building-bank"></i> ПриватБанк</button>
        <button class="pay-opt" onclick="selectPayment(this,'monobank')"><i class="ti ti-brand-mastercard"></i> Монобанк</button>
        <button class="pay-opt" onclick="selectPayment(this,'cash')"><i class="ti ti-cash"></i> Накладений платіж</button>
      </div>
      <button class="submit-order-btn" onclick="submitOrder()"><i class="ti ti-check" style="margin-right:8px"></i>Підтвердити замовлення — ${sub.toLocaleString('uk-UA')}₴</button>
    </div>`;

  openModal('checkout-modal');
}

let selectedPayment = 'card';
function selectPayment(el, method) {
  document.querySelectorAll('.pay-opt').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  selectedPayment = method;
}

function submitOrder() {
  const name = document.getElementById('co-name').value.trim();
  const phone = document.getElementById('co-phone').value.trim();
  const city = document.getElementById('co-city').value.trim();
  const address = document.getElementById('co-address').value.trim();
  if (!name || !phone || !city || !address) {
    showToast('Заповніть усі обов\'язкові поля');
    return;
  }
  const orderId = 'ORD-00' + nextOrderId++;
  const items = Object.values(cart).map(({product:p, qty}) => ({name:p.name, qty, price:p.price*qty}));
  const total = items.reduce((a,v) => a + v.price, 0);
  const email = document.getElementById('co-email').value.trim();
  const newOrder = {
    id: orderId,
    client: name + ' ' + (document.getElementById('co-lastname').value.trim()),
    email,
    phone,
    city,
    address,
    items,
    total,
    status: 'processing',
    date: new Date().toISOString().split('T')[0],
    payment: selectedPayment
  };
  orders.unshift(newOrder);
  if (currentUser) {
    const c = clients.find(c => c.email === currentUser.email);
    if (c) { c.orders++; c.total += total; }
    else clients.push({name:currentUser.name,email:currentUser.email,provider:currentUser.provider,orders:1,total,date:new Date().toISOString().split('T')[0]});
    if (currentUser.orders) currentUser.orders.unshift(newOrder);
  }
  cart = {};
  updateCartCount();
  renderProducts();
  showOrderSuccess(orderId, total);
}

function showOrderSuccess(orderId, total) {
  document.getElementById('checkout-modal-title').textContent = 'Замовлення оформлено!';
  document.getElementById('checkout-modal-body').innerHTML = `
    <div class="success-screen">
      <i class="ti ti-circle-check success-icon"></i>
      <h2>Дякуємо за замовлення!</h2>
      <p>Ваше замовлення успішно оформлено. Наш менеджер зв'яжеться з вами найближчим часом для підтвердження.</p>
      <div class="order-num">Номер замовлення: ${orderId}</div>
      <div style="font-size:15px;font-weight:700;margin-bottom:1.5rem">Сума: ${total.toLocaleString('uk-UA')}₴</div>
      <button class="btn-gold" onclick="closeModal('checkout-modal')">Продовжити покупки</button>
    </div>`;
}

/* ===== ACCOUNT ===== */
function openAccountModal() {
  if (currentUser) {
    renderAccountPanel();
  } else {
    renderLoginPanel();
  }
  openModal('account-modal');
}

function renderLoginPanel() {
  document.getElementById('account-modal-title').textContent = 'Особистий кабінет';
  document.getElementById('account-modal-body').innerHTML = `
    <div class="account-tabs">
      <button class="acc-tab active" onclick="switchAccTab('login',this)">Увійти</button>
      <button class="acc-tab" onclick="switchAccTab('register',this)">Реєстрація</button>
    </div>
    <div class="acc-pane active" id="acc-login">
      <div class="social-login">
        <button class="social-btn" onclick="socialLogin('Google')">
          <svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Увійти через Google
        </button>
        <button class="social-btn" onclick="socialLogin('Facebook')">
          <svg viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.027 4.388 11.025 10.125 11.927v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.234 2.686.234v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796v8.437C19.612 23.098 24 18.1 24 12.073z"/></svg>
          Увійти через Facebook
        </button>
      </div>
      <div class="divider">або</div>
      <div class="checkout-form">
        <div class="form-group"><label>Email</label><input type="email" id="login-email" placeholder="email@..."></div>
        <div class="form-group"><label>Пароль</label><input type="password" id="login-pass" placeholder="Пароль"></div>
        <button class="submit-order-btn" onclick="emailLogin()">Увійти</button>
      </div>
    </div>
    <div class="acc-pane" id="acc-register">
      <div class="social-login">
        <button class="social-btn" onclick="socialLogin('Google')">
          <svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Реєстрація через Google
        </button>
        <button class="social-btn" onclick="socialLogin('Facebook')">
          <svg viewBox="0 0 24 24"><path fill="#1877F2" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.027 4.388 11.025 10.125 11.927v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.234 2.686.234v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796v8.437C19.612 23.098 24 18.1 24 12.073z"/></svg>
          Реєстрація через Facebook
        </button>
      </div>
      <div class="divider">або</div>
      <div class="checkout-form">
        <div class="form-row">
          <div class="form-group"><label>Ім'я</label><input type="text" id="reg-name" placeholder="Ім'я"></div>
          <div class="form-group"><label>Прізвище</label><input type="text" id="reg-lastname" placeholder="Прізвище"></div>
        </div>
        <div class="form-group"><label>Email</label><input type="email" id="reg-email" placeholder="email@..."></div>
        <div class="form-group"><label>Пароль</label><input type="password" id="reg-pass" placeholder="Пароль"></div>
        <button class="submit-order-btn" onclick="emailRegister()">Зареєструватися</button>
      </div>
    </div>`;
}

function switchAccTab(tab, el) {
  document.querySelectorAll('.acc-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.acc-pane').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('acc-' + tab).classList.add('active');
}

function socialLogin(provider) {
  const names = {Google:'Олена Петренко', Facebook:'Іван Шевченко'};
  const emails = {Google:'olena.petrenko@gmail.com', Facebook:'ivan.shevchenko@fb.com'};
  currentUser = {name: names[provider], email: emails[provider], provider, orders:[]};
  onLoginSuccess();
}

function emailLogin() {
  const email = document.getElementById('login-email').value.trim();
  if (!email) { showToast('Введіть email'); return; }
  currentUser = {name: email.split('@')[0], email, provider:'Email', orders:[]};
  onLoginSuccess();
}

function emailRegister() {
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  if (!name || !email) { showToast('Заповніть усі поля'); return; }
  currentUser = {name, email, provider:'Email', orders:[]};
  const existing = clients.find(c => c.email === email);
  if (!existing) clients.push({name, email, provider:'Email', orders:0, total:0, date:new Date().toISOString().split('T')[0]});
  onLoginSuccess();
}

function onLoginSuccess() {
  showToast(`Вітаємо, ${currentUser.name}!`);
  document.getElementById('nav-user-icon').style.color = 'var(--accent)';
  renderAccountPanel();
}

function renderAccountPanel() {
  document.getElementById('account-modal-title').textContent = 'Особистий кабінет';
  const initials = currentUser.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);
  const userOrders = orders.filter(o => o.email === currentUser.email);
  document.getElementById('account-modal-body').innerHTML = `
    <div style="margin:-2rem -2rem 0">
      <div class="acc-welcome">
        <div class="acc-avatar">${initials}</div>
        <div>
          <div class="acc-name">${currentUser.name}</div>
          <div class="acc-email">${currentUser.email} · Вхід через ${currentUser.provider}</div>
        </div>
      </div>
      <div class="acc-nav">
        <button class="acc-nav-btn active" onclick="switchAccSubTab('acc-orders',this)"><i class="ti ti-package" style="margin-right:6px"></i>Мої замовлення</button>
        <button class="acc-nav-btn" onclick="switchAccSubTab('acc-wishlist',this)"><i class="ti ti-heart" style="margin-right:6px"></i>Обране</button>
        <button class="acc-nav-btn" onclick="switchAccSubTab('acc-profile',this)"><i class="ti ti-user" style="margin-right:6px"></i>Профіль</button>
        <button class="acc-nav-btn" onclick="logout()" style="margin-left:auto;color:var(--red)"><i class="ti ti-logout" style="margin-right:6px"></i>Вийти</button>
      </div>
    </div>
    <div class="acc-content">
      <div class="acc-sub-pane active" id="acc-orders">
        ${userOrders.length === 0
          ? `<div style="text-align:center;padding:2rem;color:var(--muted)"><i class="ti ti-package" style="font-size:40px;display:block;margin-bottom:1rem"></i>Замовлень ще немає</div>`
          : `<table class="orders-table">
              <thead><tr><th>№</th><th>Товари</th><th>Сума</th><th>Статус</th><th>Дата</th></tr></thead>
              <tbody>${userOrders.map(o => `
                <tr>
                  <td style="font-weight:600">${o.id}</td>
                  <td>${o.items.map(i => i.name).join(', ')}</td>
                  <td style="font-weight:700">${o.total.toLocaleString('uk-UA')}₴</td>
                  <td><span class="order-status status-${o.status}">${statusLabel(o.status)}</span></td>
                  <td>${o.date}</td>
                </tr>`).join('')}
              </tbody>
            </table>`}
      </div>
      <div class="acc-sub-pane" id="acc-wishlist">
        <div style="text-align:center;padding:2rem;color:var(--muted)"><i class="ti ti-heart" style="font-size:40px;display:block;margin-bottom:1rem"></i>Список обраного порожній</div>
      </div>
      <div class="acc-sub-pane" id="acc-profile">
        <div class="checkout-form">
          <div class="form-row">
            <div class="form-group"><label>Ім'я</label><input type="text" value="${currentUser.name}"></div>
            <div class="form-group"><label>Email</label><input type="email" value="${currentUser.email}" readonly style="background:var(--light)"></div>
          </div>
          <div class="form-group"><label>Телефон</label><input type="tel" placeholder="+380..."></div>
          <div class="form-row">
            <div class="form-group"><label>Місто</label><input type="text" placeholder="Місто"></div>
            <div class="form-group"><label>Нова пошта (відділення)</label><input type="text" placeholder="№ відділення"></div>
          </div>
          <button class="submit-order-btn" onclick="showToast('Профіль збережено')">Зберегти зміни</button>
        </div>
      </div>
    </div>`;
}

function switchAccSubTab(tab, el) {
  document.querySelectorAll('.acc-nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.acc-sub-pane').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  const pane = document.getElementById(tab);
  if (pane) pane.classList.add('active');
}

function logout() {
  currentUser = null;
  document.getElementById('nav-user-icon').style.color = '';
  closeModal('account-modal');
  showToast('Ви вийшли з кабінету');
}

/* ===== ADMIN PANEL ===== */
function openAdminPanel() {
  document.getElementById('admin-panel').classList.add('open');
  renderAdminDashboard();
  renderAdminProducts();
  renderAdminOrders();
  renderAdminClients();
}

function closeAdminPanel() {
  document.getElementById('admin-panel').classList.remove('open');
}

function switchAdminTab(tab, el) {
  document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.admin-pane').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('pane-' + tab).classList.add('active');
}

function renderAdminDashboard() {
  const todayOrders = orders.filter(o => o.date === new Date().toISOString().split('T')[0]).length;
  const revenue = orders.filter(o => o.status !== 'cancelled').reduce((a,o) => a + o.total, 0);
  document.getElementById('stat-orders-today').textContent = todayOrders || orders.length;
  document.getElementById('stat-revenue').textContent = revenue.toLocaleString('uk-UA') + '₴';
  document.getElementById('stat-products').textContent = products.length;
  document.getElementById('stat-clients').textContent = clients.length;

  const recentHtml = orders.slice(0,5).map(o => `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--border);font-size:13px">
      <span style="font-weight:600;width:100px">${o.id}</span>
      <span style="flex:1">${o.client}</span>
      <span style="font-weight:700;margin-right:1rem">${o.total.toLocaleString('uk-UA')}₴</span>
      <span class="order-status status-${o.status}">${statusLabel(o.status)}</span>
    </div>`).join('');
  document.getElementById('dashboard-orders-list').innerHTML = recentHtml;
}

function renderAdminProducts() {
  let list = [...products];
  if (adminProdSearch) list = list.filter(p => p.name.toLowerCase().includes(adminProdSearch.toLowerCase()) || p.brand.toLowerCase().includes(adminProdSearch.toLowerCase()));
  if (adminProdCatFilter) list = list.filter(p => p.cat === adminProdCatFilter);
  const stockClass = s => s > 10 ? 'in-stock' : s > 0 ? 'low-stock' : 'out-stock';
  const stockLabel = s => s > 10 ? 'В наявності' : s > 0 ? `Залишок: ${s}` : 'Немає';
  document.getElementById('admin-products-tbody').innerHTML = list.map(p => `
    <tr>
      <td>
        <div class="product-info-cell">
          <img src="${p.photo}" class="product-thumb" alt="${p.name}">
          <div><div class="tbl-brand">${p.brand}</div><div class="tbl-name">${p.name}</div></div>
        </div>
      </td>
      <td>${p.cat === 'women' ? 'Жіноче' : 'Чоловіче'}</td>
      <td>
        <span style="font-weight:700">${p.price.toLocaleString('uk-UA')}₴</span>
        ${p.old ? `<br><span style="font-size:11px;color:var(--muted);text-decoration:line-through">${p.old.toLocaleString('uk-UA')}₴</span>` : ''}
      </td>
      <td><span class="stock-badge ${stockClass(p.stock)}">${stockLabel(p.stock)}</span></td>
      <td>
        <div class="tbl-actions">
          <button class="tbl-btn" onclick="openProductForm(${p.id})" title="Редагувати"><i class="ti ti-edit"></i></button>
          <button class="tbl-btn danger" onclick="deleteProduct(${p.id})" title="Видалити"><i class="ti ti-trash"></i></button>
        </div>
      </td>
    </tr>`).join('');
}

function filterAdminProducts(val) {
  adminProdSearch = val;
  renderAdminProducts();
}

function filterAdminProductsCat(val) {
  adminProdCatFilter = val;
  renderAdminProducts();
}

function renderAdminOrders() {
  let list = [...orders];
  if (adminOrderFilter) list = list.filter(o =>
    o.id.toLowerCase().includes(adminOrderFilter.toLowerCase()) ||
    o.client.toLowerCase().includes(adminOrderFilter.toLowerCase()) ||
    o.email.toLowerCase().includes(adminOrderFilter.toLowerCase())
  );
  if (adminOrderStatusFilter) list = list.filter(o => o.status === adminOrderStatusFilter);
  document.getElementById('admin-orders-tbody').innerHTML = list.map(o => `
    <tr>
      <td style="font-weight:700">${o.id}</td>
      <td>
        <div style="font-weight:500">${o.client}</div>
        <div style="font-size:11px;color:var(--muted)">${o.email}</div>
      </td>
      <td style="max-width:180px">${o.items.map(i => `${i.name}×${i.qty}`).join(', ')}</td>
      <td style="font-weight:700">${o.total.toLocaleString('uk-UA')}₴</td>
      <td>
        <select class="admin-select" style="padding:4px 8px;font-size:11px" onchange="changeOrderStatus('${o.id}',this.value)">
          ${['processing','shipped','delivered','cancelled'].map(s =>
            `<option value="${s}" ${o.status===s?'selected':''}>${statusLabel(s)}</option>`
          ).join('')}
        </select>
      </td>
      <td>${o.date}</td>
      <td>
        <button class="tbl-btn" onclick="openOrderDetail('${o.id}')" title="Деталі"><i class="ti ti-eye"></i></button>
      </td>
    </tr>`).join('');
}

function filterAdminOrders(val) {
  adminOrderFilter = val;
  renderAdminOrders();
}

function filterAdminOrdersStatus(val) {
  adminOrderStatusFilter = val;
  renderAdminOrders();
}

function changeOrderStatus(id, status) {
  const o = orders.find(o => o.id === id);
  if (o) { o.status = status; renderAdminOrders(); renderAdminDashboard(); }
}

function renderAdminClients() {
  document.getElementById('admin-clients-tbody').innerHTML = clients.map(c => `
    <tr>
      <td>
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:34px;height:34px;border-radius:50%;background:var(--accent);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;color:var(--dark);flex-shrink:0">${c.name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)}</div>
          <span style="font-weight:500">${c.name}</span>
        </div>
      </td>
      <td>${c.email}</td>
      <td>
        <span style="display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:600">
          ${c.provider === 'Google' ? '<i class="ti ti-brand-google" style="color:#4285F4"></i>' : c.provider === 'Facebook' ? '<i class="ti ti-brand-facebook" style="color:#1877F2"></i>' : '<i class="ti ti-mail"></i>'}
          ${c.provider}
        </span>
      </td>
      <td>${c.orders}</td>
      <td style="font-weight:700">${c.total.toLocaleString('uk-UA')}₴</td>
      <td>${c.date}</td>
    </tr>`).join('');
}

function filterAdminClients(val) {
  const rows = document.querySelectorAll('#admin-clients-tbody tr');
  rows.forEach(r => {
    r.style.display = r.textContent.toLowerCase().includes(val.toLowerCase()) ? '' : 'none';
  });
}

/* ===== PRODUCT FORM ===== */
function openProductForm(id) {
  editingProductId = id || null;
  const p = id ? products.find(x => x.id === id) : null;
  document.getElementById('product-form-title').textContent = p ? 'Редагувати товар' : 'Новий товар';
  document.getElementById('pf-name').value = p ? p.name : '';
  document.getElementById('pf-brand').value = p ? p.brand : '';
  document.getElementById('pf-cat').value = p ? p.cat : 'women';
  document.getElementById('pf-badge').value = p ? (p.badge || '') : '';
  document.getElementById('pf-price').value = p ? p.price : '';
  document.getElementById('pf-old').value = p ? (p.old || '') : '';
  document.getElementById('pf-sizes').value = p ? p.sizes.join(', ') : '';
  document.getElementById('pf-photo').value = p ? p.photo : '';
  previewProductPhoto(p ? p.photo : '');
  openModal('product-form-modal');
}

function previewProductPhoto(url) {
  const wrap = document.getElementById('pf-photo-preview');
  if (!wrap) return;
  if (url) {
    wrap.innerHTML = `<img src="${url}" class="img-preview" alt="Preview">`;
    wrap.style.border = 'none';
    wrap.style.background = 'none';
  } else {
    wrap.className = 'img-placeholder';
    wrap.innerHTML = `<i class="ti ti-photo" style="font-size:32px"></i><span>Прев'ю фото</span>`;
  }
}

function saveProduct() {
  const name = document.getElementById('pf-name').value.trim();
  const brand = document.getElementById('pf-brand').value.trim();
  const price = parseInt(document.getElementById('pf-price').value);
  const photo = document.getElementById('pf-photo').value.trim();
  if (!name || !brand || !price || !photo) { showToast('Заповніть усі обов\'язкові поля'); return; }
  const old = parseInt(document.getElementById('pf-old').value) || null;
  const sizes = document.getElementById('pf-sizes').value.split(',').map(s => s.trim()).filter(Boolean);
  const badge = document.getElementById('pf-badge').value || null;
  const cat = document.getElementById('pf-cat').value;
  if (editingProductId) {
    const idx = products.findIndex(p => p.id === editingProductId);
    if (idx !== -1) products[idx] = {...products[idx], name, brand, price, old, sizes, badge, cat, photo};
  } else {
    products.unshift({id: nextProductId++, name, brand, price, old, sizes, badge, cat, photo, new:true, stock:10});
  }
  closeModal('product-form-modal');
  renderProducts();
  renderAdminProducts();
  renderAdminDashboard();
  showToast(editingProductId ? 'Товар оновлено' : 'Товар додано');
}

function deleteProduct(id) {
  if (!confirm('Видалити товар?')) return;
  products = products.filter(p => p.id !== id);
  delete cart[id];
  updateCartCount();
  renderProducts();
  renderAdminProducts();
  renderAdminDashboard();
  showToast('Товар видалено');
}

/* ===== ORDER DETAIL ===== */
function openOrderDetail(id) {
  const o = orders.find(x => x.id === id);
  if (!o) return;
  document.getElementById('order-detail-title').textContent = 'Замовлення ' + o.id;
  document.getElementById('order-detail-body').innerHTML = `
    <div class="order-info-grid">
      <div class="order-info-card">
        <div class="oi-label">Клієнт</div>
        <div class="oi-val">${o.client}<br><span style="color:var(--muted);font-size:13px">${o.email}<br>${o.phone}</span></div>
      </div>
      <div class="order-info-card">
        <div class="oi-label">Доставка</div>
        <div class="oi-val">${o.city}<br>${o.address}</div>
      </div>
      <div class="order-info-card">
        <div class="oi-label">Оплата</div>
        <div class="oi-val">${paymentLabel(o.payment)}</div>
      </div>
      <div class="order-info-card">
        <div class="oi-label">Дата</div>
        <div class="oi-val">${o.date}</div>
      </div>
    </div>
    <div style="margin-bottom:1.5rem">
      <div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin-bottom:0.75rem;font-weight:600">Позиції замовлення</div>
      ${o.items.map(i => `
        <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);font-size:13px">
          <span>${i.name} × ${i.qty}</span>
          <span style="font-weight:700">${i.price.toLocaleString('uk-UA')}₴</span>
        </div>`).join('')}
      <div style="display:flex;justify-content:space-between;padding:12px 0;font-weight:700;font-family:'Playfair Display',serif;font-size:17px">
        <span>Разом</span><span>${o.total.toLocaleString('uk-UA')}₴</span>
      </div>
    </div>
    <div>
      <div style="font-size:12px;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin-bottom:0.5rem;font-weight:600">Змінити статус</div>
      <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
        ${['processing','shipped','delivered','cancelled'].map(s => `
          <button class="pay-opt ${o.status===s?'active':''}" onclick="changeOrderStatus('${o.id}','${s}');this.parentNode.querySelectorAll('.pay-opt').forEach(b=>b.classList.remove('active'));this.classList.add('active')" style="flex:none;min-width:auto;padding:8px 16px">${statusLabel(s)}</button>
        `).join('')}
      </div>
    </div>`;
  openModal('order-detail-modal');
}

function exportOrders() {
  const header = 'ID,Клієнт,Email,Сума,Статус,Дата\n';
  const rows = orders.map(o => `${o.id},"${o.client}",${o.email},${o.total},${statusLabel(o.status)},${o.date}`).join('\n');
  const blob = new Blob([header + rows], {type:'text/csv;charset=utf-8;'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'modeua-orders.csv';
  a.click();
}

/* ===== HELPERS ===== */
function statusLabel(s) {
  return {processing:'В обробці', shipped:'Відправлено', delivered:'Доставлено', cancelled:'Скасовано'}[s] || s;
}

function paymentLabel(p) {
  return {card:'Картка онлайн', privatbank:'ПриватБанк', monobank:'Монобанк', cash:'Накладений платіж'}[p] || p;
}

function openModal(id) {
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

function scrollToTop() {
  window.scrollTo({top: 0, behavior:'smooth'});
}

// Close modals on overlay click
document.querySelectorAll('.modal-bg').forEach(bg => {
  bg.addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('open');
  });
});

/* ===== INIT ===== */
renderProducts();
