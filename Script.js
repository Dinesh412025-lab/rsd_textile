const CONFIG = {
  name: 'RSD Textile',
  whatsapp: '6383198730', // country code + number, no + or spaces
  social: {
    Instagram: 'https://www.instagram.com/mr_dinesh__41_?cplk=MXBuazE4NjgxN3E0dg==',
    Facebook: 'https://facebook.com/',
    YouTube: 'https://youtube.com/',
    Twitter: 'https://twitter.com/',
    LinkedIn: 'https://linkedin.com/'
  }
};
const CATEGORIES = ['Fabrics','Beads & Buttons','Embellishment','Jewellery Findings','Assorted Products','Unstitched Suit Sets'];
const page = location.pathname.split('/').pop() || 'index.html';
const act = f => page === f ? 'active' : '';
const socialLinks = Object.entries(CONFIG.social)
  .map(([n,u]) => `<a href="${u}" target="_blank" rel="noopener">${n}</a>`).join('');

document.body.insertAdjacentHTML('afterbegin', `
<div class="promo">Flat 10% off on all prepaid orders</div>
<header>
  <button class="menu-btn" id="menuBtn" aria-label="Open categories">Menu</button>
  <a href="index.html" class="logo">RSD <span>Textile</span></a>
  <nav>
    <a href="index.html" class="${act('index.html')}">Home</a>
    <a href="index.html#new" >New Arrivals</a>
    <a href="about.html" class="${act('about.html')}">About Us</a>
    <a href="login.html" class="${act('login.html')}">Login</a>
  </nav>
  <a href="#" class="cart-btn" id="cartBtn">Cart<b id="cartCount">0</b></a>
</header>
<div id="overlay"></div>
<aside id="sidebar" aria-label="Categories">
  <button class="close-btn" id="closeBtn" aria-label="Close">&times;</button>
  <h3>Shop</h3>
  ${CATEGORIES.map(c => `<a href="index.html#collections">${c}</a>`).join('')}
  <a href="index.html#new">New Arrivals</a>
  <h3>Account</h3>
  <a href="login.html">Track Your Orders</a>
  <a href="login.html">Login</a>
  <h3>Contact us</h3>
  <div class="social">${socialLinks}</div>
</aside>
<a class="wa" target="_blank" rel="noopener"
   href="https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent('Hi RSD Textile, I would like to know more about your fabrics.')}">WhatsApp us</a>
`);
document.body.insertAdjacentHTML('beforeend', `
<footer>
  <h3 style="color:#fff;margin-bottom:.5rem">${CONFIG.name}</h3>
  <p>Fabrics, trims and unstitched suit sets for every occasion.</p>
  <div class="social" style="margin:1rem 0">${socialLinks}</div>
  <small>&copy; ${new Date().getFullYear()} ${CONFIG.name}. All rights reserved.</small>
</footer>`);


const sb = document.getElementById('sidebar'), ov = document.getElementById('overlay');
const toggle = o => { sb.classList.toggle('open', o); ov.classList.toggle('show', o); };
menuBtn.onclick = () => toggle(true);
closeBtn.onclick = ov.onclick = () => toggle(false);
document.addEventListener('keydown', e => e.key === 'Escape' && toggle(false));
sb.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));


let cart = +localStorage.getItem('rsdCart') || 0;
const showCart = () => cartCount.textContent = cart;
showCart();
document.addEventListener('click', e => {
  if (e.target.matches('[data-add]')) {
    cart++; localStorage.setItem('rsdCart', cart); showCart();
    e.target.textContent = 'Added';
    setTimeout(() => e.target.textContent = 'Add to cart', 1200);
  }
});


const tabs = document.querySelectorAll('.tabs button');
tabs.forEach(t => t.onclick = () => {
  tabs.forEach(x => x.classList.remove('on')); t.classList.add('on');
  document.getElementById('passRow').style.display = t.dataset.mode === 'pass' ? 'block' : 'none';
  document.getElementById('idLabel').textContent = t.dataset.mode === 'pass' ? 'Email' : 'Mobile number';
});
const lf = document.getElementById('loginForm');
if (lf) lf.onsubmit = e => {
  e.preventDefault();
  document.getElementById('msg').textContent = 'Demo only: connect this form to your backend or Firebase.';
};