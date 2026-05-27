 // ===== DATA =====
  const products = [
    { id:1, name:'iPhone 16 Pro Max 256GB Titanium', brand:'Apple', cat:'phone', price:34990000, oldPrice:36990000, img:'image/', badge:'new', rating:5, reviews:128 },
    { id:2, name:'Samsung Galaxy S25 Ultra 512GB', brand:'Samsung', cat:'phone', price:29990000, oldPrice:33990000, img:'image/', badge:'sale', rating:5, reviews:94 },
    { id:3, name:'Xiaomi 14T Pro 12GB/256GB', brand:'Xiaomi', cat:'phone', price:14990000, oldPrice:17990000, img:'image/', badge:'sale', rating:4, reviews:67 },
    { id:4, name:'OPPO Find X8 Pro 512GB', brand:'OPPO', cat:'phone', price:23990000, oldPrice:26990000, img:'image/', badge:'new', rating:4, reviews:45 },
    { id:5, name:'MacBook Air M3 8GB/256GB', brand:'Apple', cat:'laptop', price:27990000, oldPrice:29990000, img:'image/', badge:'hot', rating:5, reviews:210 },
    { id:6, name:'Asus ROG Zephyrus G14 RTX 4060', brand:'Asus', cat:'laptop', price:32990000, oldPrice:35990000, img:'image/', badge:'hot', rating:5, reviews:88 },
    { id:7, name:'iPad Pro M4 11 inch WiFi 256GB', brand:'Apple', cat:'tablet', price:22990000, oldPrice:24990000, img:'image/', badge:'new', rating:5, reviews:156 },
    { id:8, name:'Sony WH-1000XM5 Chống ồn', brand:'Sony', cat:'audio', price:7990000, oldPrice:9490000, img:'image/', badge:'sale', rating:5, reviews:302 },
    { id:9, name:'AirPods Pro 2nd Gen USB-C', brand:'Apple', cat:'audio', price:6490000, oldPrice:7490000, img:'image/', badge:'sale', rating:5, reviews:445 },
    { id:10, name:'Samsung Galaxy Tab S10+ WiFi', brand:'Samsung', cat:'tablet', price:18990000, oldPrice:21990000, img:'image/', badge:'sale', rating:4, reviews:73 },
  ];

  const flashProducts = [
    { id:11, name:'Apple Watch Series 10 45mm', price:10990000, oldPrice:14990000, sold:78, img:'image/Applewatchseries10.webp' },
    { id:12, name:'Galaxy Buds3 Pro ANC', price:3490000, oldPrice:4990000, sold:65, img:'image/galaxybuds3pro.webp' },
    { id:13, name:'Xiaomi Smart Band 9 Pro', price:990000, oldPrice:1590000, sold:90, img:'image/XiaomiSmartBand9Pro.webp' },
    { id:14, name:'Asus ZenFone 11 Ultra 16GB', price:19990000, oldPrice:24990000, sold:55, img:'image/AsusZenFone11Ultra16GB.webp' },
    { id:15, name:'Sony LinkBuds S TWS', price:2490000, oldPrice:3990000, sold:82, img:'image/SonyLinkBudsSTWS.webp' },
  ];

  // ===== FORMAT =====
  function fmt(n) { return n.toLocaleString('vi-VN') + '₫'; }
  function discount(p, op) { return Math.round((1 - p/op) * 100); }
  function stars(n) { return '★'.repeat(n) + '☆'.repeat(5-n); }


  // ===== FLASH SALE =====
  function renderFlash() {
    document.getElementById('flashGrid').innerHTML = flashProducts.map(p => `
      <div class="flash-card" onclick="addToCart(${p.id})">
        <img src="${p.img}" alt="${p.name}" />
        <div class="f-name">${p.name}</div>
        <div class="f-price">${fmt(p.price)}</div>
        <div class="f-old">${fmt(p.oldPrice)}</div>
        <div class="flash-progress"><div class="flash-bar" style="width:${p.sold}%"></div></div>
        <div style="font-size:11px;color:#666;margin-top:3px">Đã bán ${p.sold}%</div>
      </div>
    `).join('');
  }

  // ===== COUNTDOWN =====
  function startCountdown() {
    let end = new Date();
    end.setHours(23, 59, 59, 0);
    function tick() {
      const now = new Date();
      let diff = Math.max(0, end - now);
      const h = String(Math.floor(diff/3600000)).padStart(2,'0');
      const m = String(Math.floor((diff%3600000)/60000)).padStart(2,'0');
      const s = String(Math.floor((diff%60000)/1000)).padStart(2,'0');
      document.getElementById('cH').textContent = h;
      document.getElementById('cM').textContent = m;
      document.getElementById('cS').textContent = s;
    }
    tick(); setInterval(tick, 1000);
  }

  // ===== SLIDER =====
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const dotsEl = document.getElementById('slideDots');
  slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i===0?' active':'');
    d.onclick = () => goSlide(i);
    dotsEl.appendChild(d);
  });
  function goSlide(n) {
    slides[currentSlide].classList.remove('active');
    document.querySelectorAll('.dot')[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    document.querySelectorAll('.dot')[currentSlide].classList.add('active');
  }
  setInterval(() => goSlide(currentSlide + 1), 4000);

  // ===== SEARCH =====
  function handleSearch() {
    const q = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!q) { currentCat = 'all'; renderProducts(); return; }
    const grid = document.getElementById('productGrid');
    const res = products.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    if (res.length === 0) {
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:#999;padding:40px">Không tìm thấy sản phẩm phù hợp</p>';
    } else {
      grid.innerHTML = res.map(p => {
        const bClass = p.badge === 'sale' ? 'badge-sale' : p.badge === 'new' ? 'badge-new' : 'badge-hot';
        const bText = p.badge === 'sale' ? `−${discount(p.price,p.oldPrice)}%` : p.badge === 'new' ? 'Mới' : 'Hot';
        return `
          <div class="product-card">
            <div class="card-badges"><span class="badge ${bClass}">${bText}</span></div>
            <div class="card-img-wrap"><img src="${p.img}" alt="${p.name}" /></div>
            <div class="card-body">
              <div class="card-name">${p.name}</div>
              <div class="card-prices">
                <span class="price-new">${fmt(p.price)}</span>
                <span class="price-old">${fmt(p.oldPrice)}</span>
                <span class="price-discount">−${discount(p.price,p.oldPrice)}%</span>
              </div>
              <div class="card-stars">${stars(p.rating)} <span>(${p.reviews})</span></div>
              <button class="card-add-btn" onclick="addToCart(${p.id})"><i class="fas fa-cart-plus"></i> Thêm vào giỏ</button>
            </div>
          </div>
        `;
      }).join('');
    }
  }
  document.getElementById('searchInput').addEventListener('keydown', e => { if(e.key==='Enter') handleSearch(); });

  // ===== TOAST =====
  function showToast(msg, type='') {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = 'toast show ' + type;
    setTimeout(() => t.className = 'toast', 2500);
  }

  // ===== SCROLL TOP =====
  window.addEventListener('scroll', () => {
    document.getElementById('scrollTop').classList.toggle('show', window.scrollY > 400);
  });

  // ===== INIT =====
  renderFlash();
  startCountdown();
  updateCartUI();