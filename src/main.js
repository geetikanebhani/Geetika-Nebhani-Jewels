import './style.css';

const app = document.querySelector('#app');

const products = [
  {
    id: 1,
    name: 'Royal Necklace',
    category: 'Necklaces',
    style: 'Traditional',
    price: 24999,
    description: 'A statement piece inspired by Indian celebrations.',
    image: '/image/neckpiece.jpg',
    tag: 'BESTSELLER',
  },
  {
    id: 2,
    name: 'Designer Earrings',
    category: 'Earrings',
    style: 'Traditional',
    price: 8499,
    description: 'Elegant detailing for festive occasions.',
    image: '/image/earring.jpg',
    tag: 'WESTERN',
  },
  {
    id: 3,
    name: 'Designer Rings',
    category: 'Rings',
    style: 'Western Jewellery',
    price: 5999,
    description: 'A bold, modern accent for evening styling.',
    image: '/image/ring.jpg',
    tag: 'WESTERN EDIT',
  },
  {
    id: 4,
    name: 'Bracelet',
    category: 'Bracelets',
    style: 'Western Jewellery',
    price: 7299,
    description: 'Understated sparkle for everyday luxury.',
    image: '/image/bracelet.jpg',
    tag: 'BESTSELLER',
  },
  {
    id: 5,
    name: 'Watch',
    category: 'watch',
    style: 'Western Jewellery',
    price: 11999,
    description: 'A meticulous dial with timeless appeal.',
    image: '/image/watch.jpg',
    tag: 'MODERN CLASSIC',
  },
  {
    id: 6,
    name: 'Bags',
    category: 'bags',
    style: 'Western Jewellery',
    price: 4299,
    description: 'Luxe bags for a fashion statement.',
    image: '/image/fishbag.jpg',
    tag: 'EVERYDAY LUXURY',
  },
  {
    id: 7,
    name: 'Layered Chain Necklace',
    category: 'Necklaces',
    style: 'Western Jewellery',
    price: 6499,
    description: 'Layered styling for a chic contemporary look.',
    image:
      'https://images.unsplash.com/photo-1599459183200-59c7687a027b?auto=format&fit=crop&w=800&q=85',
    tag: 'NEW ARRIVAL',
  },
  {
    id: 8,
    name: 'Pearl Celebration Earrings',
    category: 'Earrings',
    style: 'Traditional',
    price: 5299,
    description: 'A graceful finishing touch for special moments.',
    image:
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=85',
    tag: 'ELEGANT PICK',
  },
];

const money = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

let page = 'home';
let user = null;
let cart = [];
let searchTerm = '';
let activeCategory = 'All';
let message = '';

function escapeHTML(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char]);
}

// Keep React Context synchronized with the original shopping bag.
function publishCartUpdate() {
  const cartItems = cart
    .map((item) => {
      const product = products.find(
        (product) => product.id === item.id
      );

      return product
        ? { ...product, qty: item.qty }
        : null;
    })
    .filter(Boolean);

  window.dispatchEvent(
    new CustomEvent('jewellery-cart-updated', {
      detail: { cart: cartItems },
    })
  );
}

function addProductToCart(id) {
  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) return;

  const existing = cart.find(
    (item) => item.id === product.id
  );

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      qty: 1,
    });
  }

  message = 'Added to your bag.';

  render();
  publishCartUpdate();
}

function removeProductFromCart(id) {
  cart = cart.filter(
    (item) => item.id !== Number(id)
  );

  render();
  publishCartUpdate();
}

function navbar() {
  const quantity = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  return `
    <header class="sticky top-0 z-40 border-b border-white/10 bg-[#17120e] text-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">

        <button data-action="home" class="text-left">
          <span class="block text-xl font-semibold tracking-[0.12em] text-[#d7b777]">
            GNJ
          </span>
          <span class="text-[10px] uppercase tracking-[0.2em] text-stone-300">
            Geetika Nebhani Jewels
          </span>
        </button>

        <nav class="hidden items-center gap-7 text-sm text-stone-300 md:flex">
          <button data-action="home" class="hover:text-[#d7b777]">Home</button>
          <button data-action="collection" class="hover:text-[#d7b777]">Collections</button>
          <button data-action="dashboard" class="hover:text-[#d7b777]">Dashboard</button>
        </nav>

        <div class="flex items-center gap-2 sm:gap-3">
          <button
            data-action="dashboard"
            class="rounded-full border border-white/20 px-3 py-2 text-xs hover:border-[#d7b777] sm:px-4 sm:text-sm"
          >
            ${user ? 'My Account' : 'Account'}
          </button>

          <button
            data-action="cart"
            class="rounded-full bg-[#d7b777] px-3 py-2 text-xs font-semibold text-black sm:px-4 sm:text-sm"
          >
            Bag (${quantity})
          </button>
        </div>

      </div>
    </header>
  `;
}

function productCard(product) {
  return `
    <article class="product-card overflow-hidden rounded-2xl border border-stone-200 bg-white">

      <div class="relative overflow-hidden bg-stone-100">
        <img
          class="product-image aspect-square w-full object-cover"
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
          onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"
        >

        <div
          style="display:none"
          class="aspect-square place-items-center text-4xl text-stone-400"
        >
          ✧
        </div>

        <span class="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[9px] font-semibold tracking-widest">
          ${product.tag}
        </span>
      </div>

      <div class="p-4 sm:p-5">
        <p class="text-[10px] uppercase tracking-[0.18em] text-stone-500">
          ${product.category}
        </p>

        <h3 class="mt-2 font-semibold">
          ${escapeHTML(product.name)}
        </h3>

        <p class="mt-2 text-sm leading-6 text-stone-500">
          ${escapeHTML(product.description)}
        </p>

        <div class="mt-4 flex items-center justify-between gap-2">
          <span class="font-semibold">${money(product.price)}</span>

          <button
            data-action="add"
            data-id="${product.id}"
            class="gold-button rounded-full px-4 py-2 text-xs font-semibold"
          >
            Add to bag +
          </button>
        </div>
      </div>

    </article>
  `;
}

function collectionSection() {
  const collections = [
    {
      name: 'Bags',
      image: '/image/bags.jpg',
      category: 'bags',
    },
    {
      name: 'Neckpieces',
      image: '/image/neckpiece.jpg',
      category: 'Necklaces',
    },
    {
      name: 'Watches',
      image: '/image/watch.jpg',
      category: 'watch',
    },
    {
      name: 'Earrings',
      image: '/image/earring.jpg',
      category: 'Earrings',
    },
    {
      name: 'Rings',
      image: '/image/rings.jpg',
      category: 'Rings',
    },
    {
      name: 'Bracelets',
      image: '/image/bracelet.jpg',
      category: 'Bracelets',
    },
  ];

  const shown = products.filter((product) => {
    const matchesCategory =
      activeCategory === 'All' ||
      product.style === activeCategory ||
      product.category === activeCategory;

    const matchesSearch =
      `${product.name} ${product.category} ${product.style}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return `
    <section id="collection" class="mx-auto max-w-7xl px-5 py-12 lg:px-8">

      <div class="mb-10 text-center">
        <p class="text-xs uppercase tracking-[0.3em] text-rose-700">
          Geetika Nebhani Jewels
        </p>

        <h2 class="mt-3 text-4xl font-serif text-stone-900">
          Shop by <span class="text-rose-700">Collection</span>
        </h2>

        <p class="mt-3 text-stone-600">
          Find your signature style
        </p>
      </div>

      <div class="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        ${collections.map((item) => `
          <button
            type="button"
            data-action="category"
            data-category="${item.category}"
            class="group overflow-hidden rounded-2xl bg-rose-50 text-left"
          >
            <img
              src="${item.image}"
              alt="${item.name}"
              class="h-64 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            >

            <div class="flex items-center justify-between p-4">
              <h3 class="text-xl font-serif text-stone-900">
                ${item.name}
              </h3>
              <span class="text-xl text-rose-700">→</span>
            </div>
          </button>
        `).join('')}
      </div>

      <div class="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h3 class="text-2xl font-serif text-stone-900">
          Explore Our Jewellery
        </h3>

        <input
          id="product-search"
          type="search"
          value="${escapeHTML(searchTerm)}"
          placeholder="Search products..."
          class="w-full rounded-full border border-stone-300 px-5 py-3 text-sm sm:max-w-xs"
        >
      </div>

      <div class="mb-6 flex flex-wrap gap-2">
        ${[
          'All',
          'Traditional',
          'Western Jewellery',
          'Necklaces',
          'Earrings',
          'Rings',
          'Bracelets',
          'watch',
          'bags',
        ].map((category) => `
          <button
            type="button"
            data-action="category"
            data-category="${category}"
            class="rounded-full border border-rose-200 px-4 py-2 text-sm hover:bg-rose-50"
          >
            ${category === 'All' ? 'All Products' : category}
          </button>
        `).join('')}
      </div>

      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        ${
          shown.length
            ? shown.map(productCard).join('')
            : '<p class="col-span-full py-10 text-center text-stone-500">No products found. Try another search.</p>'
        }
      </div>

    </section>
  `;
}

function footer() {
  return `
    <footer class="bg-[#17120e] px-5 py-10 text-center text-stone-400">
      <p class="text-lg tracking-[0.15em] text-[#d7b777]">
        GEETIKA NEBHANI JEWELS
      </p>

      <p class="mt-3 text-sm">
        Timeless beauty. Personal elegance.
      </p>

      <p class="mt-6 text-xs">
        © ${new Date().getFullYear()} Geetika Nebhani Jewels. Demo storefront.
      </p>
    </footer>
  `;
}

function homePage() {
  return `
    ${navbar()}

    <main>
      <section class="grid min-h-[540px] bg-[#fffafa] text-stone-900 md:grid-cols-2">

        <div class="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-20">
          <p class="text-xs uppercase tracking-[0.3em] text-[#c8103e]">
            The art of timeless luxury
          </p>

          <h1 class="mt-6 max-w-xl text-5xl font-light leading-[1.12] sm:text-6xl">
            Jewellery that tells
            <span class="italic text-[#c8103e]">your story.</span>
          </h1>

          <p class="mt-6 max-w-md text-sm leading-7 text-stone-600">
            Discover elegant designs, refined details and treasured pieces
            made to make every moment feel extraordinary.
          </p>

          <div class="mt-9 flex flex-wrap gap-3">
            <button
              data-action="collection"
              class="gold-button rounded-full px-7 py-3 text-sm font-semibold"
            >
              Explore collection →
            </button>

            <button
              data-action="register"
              class="rounded-full border border-stone-300 px-7 py-3 text-sm"
            >
              Join our world
            </button>
          </div>

          <div class="mt-12 flex gap-8 border-t border-rose-200 pt-6">
            <div>
              <p class="text-xl text-[#d7b777]">01</p>
              <p class="mt-1 text-xs text-stone-500">Timeless design</p>
            </div>

            <div>
              <p class="text-xl text-[#d7b777]">02</p>
              <p class="mt-1 text-xs text-stone-500">Curated collections</p>
            </div>

            <div>
              <p class="text-xl text-[#d7b777]">03</p>
              <p class="mt-1 text-xs text-stone-500">Made for moments</p>
            </div>
          </div>
        </div>

        <div
          class="hero-image min-h-[350px]"
          role="img"
          aria-label="Luxury jewellery model wearing statement jewellery"
          style="background-image:linear-gradient(0deg,rgba(23,18,14,.12),rgba(23,18,14,.02)),url('https://www.prerto.com/cdn/shop/files/IMG-9944_3000x.jpg?v=1775648265')"
        ></div>

      </section>

      <section class="bg-[#f0e8da] px-5 py-8 text-center">
        <p class="text-xs uppercase tracking-[0.24em] text-stone-600">
          Celebrate every version of you — with Geetika Nebhani Jewels
        </p>
      </section>

      ${collectionSection()}

      <section class="mx-5 mb-16 rounded-3xl bg-[#e9dfce] px-6 py-12 text-center sm:mx-8 sm:py-16">
        <p class="text-xs uppercase tracking-[0.25em] text-[#8e682d]">
          A little luxury, just for you
        </p>

        <h2 class="mt-4 text-3xl font-light sm:text-4xl">
          Your next favourite piece awaits.
        </h2>

        <button
          data-action="register"
          class="gold-button mt-7 rounded-full px-7 py-3 text-sm font-semibold"
        >
          Create your account
        </button>
      </section>
    </main>

    ${footer()}
  `;
}

function authPage(isRegister) {
  return `
    ${navbar()}

    <main class="grid min-h-[calc(100vh-150px)] bg-[#faf8f4] md:grid-cols-2">

      <div class="hidden bg-[#17120e] p-12 text-white md:flex md:flex-col md:justify-center lg:p-20">
        <p class="text-xs uppercase tracking-[0.3em] text-[#d7b777]">
          Geetika Nebhani Jewels
        </p>

        <h1 class="mt-6 text-5xl font-light leading-tight">
          Luxury is in the
          <span class="italic text-[#d7b777]">details.</span>
        </h1>

        <p class="mt-5 max-w-sm text-sm leading-7 text-stone-300">
          ${
            isRegister
              ? 'Join our world of thoughtfully curated jewellery and timeless elegance.'
              : 'Welcome back. Your favourite pieces and personal collection are waiting.'
          }
        </p>
      </div>

      <div class="flex items-center justify-center px-5 py-14">
        <form
          id="auth-form"
          class="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-7 shadow-sm sm:p-10"
        >
          <p class="text-xs uppercase tracking-[0.25em] text-[#a27a35]">
            ${isRegister ? 'Become a member' : 'Welcome back'}
          </p>

          <h2 class="mt-3 text-3xl font-light">
            ${isRegister ? 'Create account' : 'Sign in'}
          </h2>

          <p class="mt-3 text-sm text-stone-500">
            ${isRegister ? 'Start your jewellery journey with us.' : 'Enter your details to continue.'}
          </p>

          <div id="form-message" role="status" class="mt-4 text-sm text-red-700">
            ${escapeHTML(message)}
          </div>

          ${
            isRegister
              ? `
                <label class="mt-5 block text-sm font-medium" for="name">
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  required
                  minlength="2"
                  autocomplete="name"
                  placeholder="Your full name"
                  class="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm"
                >
              `
              : ''
          }

          <label class="mt-5 block text-sm font-medium" for="email">
            Email address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            autocomplete="email"
            placeholder="you@example.com"
            class="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm"
          >

          <label class="mt-5 block text-sm font-medium" for="password">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            required
            minlength="6"
            autocomplete="${isRegister ? 'new-password' : 'current-password'}"
            placeholder="At least 6 characters"
            class="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 text-sm"
          >

          <button
            type="submit"
            class="gold-button mt-7 w-full rounded-xl py-3 font-semibold"
          >
            ${isRegister ? 'Create my account' : 'Login to my account'}
          </button>

          <p class="mt-6 text-center text-sm text-stone-500">
            ${isRegister ? 'Already have an account?' : 'New to our world?'}

            <button
              type="button"
              data-action="${isRegister ? 'login' : 'register'}"
              class="font-semibold text-[#8e682d] underline underline-offset-4"
            >
              ${isRegister ? 'Login' : 'Create an account'}
            </button>
          </p>

          <p class="mt-5 text-center text-xs text-stone-400">
            Student demo only — no real account security is implemented.
          </p>
        </form>
      </div>
    </main>

    ${footer()}
  `;
}

function dashboardPage() {
  if (!user) {
    return authPage(false);
  }

  const quantity = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  return `
    ${navbar()}

    <main class="min-h-screen">
      <section class="bg-[#17120e] px-5 py-12 text-white sm:px-8 sm:py-16">
        <div class="mx-auto max-w-7xl">
          <p class="text-xs uppercase tracking-[0.25em] text-[#d7b777]">
            Your personal space
          </p>

          <h1 class="mt-4 text-3xl font-light sm:text-5xl">
            Welcome,
            <span class="italic text-[#d7b777]">
              ${escapeHTML(user.name)}
            </span>
          </h1>

          <p class="mt-4 text-sm text-stone-300">
            Discover pieces that match your style.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <button
              data-action="collection"
              class="gold-button rounded-full px-6 py-3 text-sm font-semibold"
            >
              Shop jewellery
            </button>

            <button
              data-action="logout"
              class="rounded-full border border-white/30 px-6 py-3 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </section>

      <section class="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-5 py-8 sm:grid-cols-3 lg:px-8">
        <div class="rounded-2xl border border-stone-200 bg-white p-6">
          <p class="text-sm text-stone-500">Available designs</p>
          <p class="mt-2 text-3xl font-light">${products.length}</p>
        </div>

        <div class="rounded-2xl border border-stone-200 bg-white p-6">
          <p class="text-sm text-stone-500">Items in your bag</p>
          <p class="mt-2 text-3xl font-light">${quantity}</p>
        </div>

        <div class="rounded-2xl border border-stone-200 bg-white p-6">
          <p class="text-sm text-stone-500">Your account</p>
          <p class="mt-2 truncate text-lg font-medium">
            ${escapeHTML(user.email)}
          </p>
        </div>
      </section>

      ${collectionSection()}
    </main>

    ${footer()}
  `;
}

function cartPage() {
  const items = cart
    .map((item) => {
      const product = products.find(
        (product) => product.id === item.id
      );

      return product
        ? { ...product, qty: item.qty }
        : null;
    })
    .filter(Boolean);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return `
    ${navbar()}

    <main class="mx-auto min-h-[60vh] max-w-4xl px-5 py-14">
      <p class="text-xs uppercase tracking-[0.25em] text-[#a27a35]">
        Your selection
      </p>

      <h1 class="mt-3 text-4xl font-light">
        Shopping bag
      </h1>

      ${
        items.length
          ? `
            <div class="mt-8 divide-y divide-stone-200">
              ${items.map((item) => `
                <div class="flex items-center gap-4 py-5">
                  <img
                    src="${item.image}"
                    alt="${escapeHTML(item.name)}"
                    class="h-20 w-20 rounded-xl object-cover"
                  >

                  <div class="min-w-0 flex-1">
                    <h2 class="font-medium">
                      ${escapeHTML(item.name)}
                    </h2>

                    <p class="mt-1 text-sm text-stone-500">
                      ${money(item.price)} × ${item.qty}
                    </p>
                  </div>

                  <button
                    data-action="remove"
                    data-id="${item.id}"
                    class="text-sm text-red-700 underline"
                  >
                    Remove
                  </button>
                </div>
              `).join('')}
            </div>

            <div class="mt-6 flex items-center justify-between border-t border-stone-300 pt-6">
              <span class="text-lg">Estimated total</span>
              <span class="text-xl font-semibold">${money(total)}</span>
            </div>

            <p class="mt-4 text-sm text-stone-500">
              Demo only. No real checkout or payment is connected.
            </p>

            <button
              data-action="collection"
              class="gold-button mt-6 rounded-full px-6 py-3 text-sm font-semibold"
            >
              Continue shopping
            </button>
          `
          : `
            <p class="mt-8 text-stone-500">
              Your bag is waiting for something beautiful.
            </p>

            <button
              data-action="collection"
              class="gold-button mt-6 rounded-full px-6 py-3 text-sm font-semibold"
            >
              Explore jewellery
            </button>
          `
      }
    </main>

    ${footer()}
  `;
}

function render() {
  if (page === 'login') {
    app.innerHTML = authPage(false);
  } else if (page === 'register') {
    app.innerHTML = authPage(true);
  } else if (page === 'dashboard') {
    app.innerHTML = dashboardPage();
  } else if (page === 'cart') {
    app.innerHTML = cartPage();
  } else {
    app.innerHTML = homePage();
  }
}

function goTo(nextPage) {
  page = nextPage;
  message = '';

  render();

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

// Original website actions.
document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action]');

  if (!target) return;

  const action = target.dataset.action;

  if (action === 'home') {
    goTo('home');
  }

  if (action === 'login') {
    goTo('login');
  }

  if (action === 'register') {
    goTo('register');
  }

  if (action === 'dashboard') {
    goTo(user ? 'dashboard' : 'login');
  }

  if (action === 'collection') {
    if (page === 'home' || page === 'dashboard') {
      document
        .querySelector('#collection')
        ?.scrollIntoView({ behavior: 'smooth' });
    } else {
      goTo(user ? 'dashboard' : 'home');

      setTimeout(() => {
        document
          .querySelector('#collection')
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }

  if (action === 'cart') {
    goTo('cart');
  }

  if (action === 'category') {
    activeCategory = target.dataset.category;
    render();
  }

  if (action === 'add') {
    addProductToCart(target.dataset.id);
  }

  if (action === 'remove') {
    removeProductFromCart(target.dataset.id);
  }

  if (action === 'logout') {
    user = null;
    goTo('home');
  }
});

// Handle product searching.
document.addEventListener('input', (event) => {
  if (event.target.id !== 'product-search') return;

  const input = event.target;
  const position = input.selectionStart;

  searchTerm = input.value;

  render();

  const newInput = document.querySelector('#product-search');

  newInput?.focus();

  if (newInput && position !== null) {
    newInput.setSelectionRange(position, position);
  }
});

// Handle demo login and registration.
document.addEventListener('submit', (event) => {
  if (event.target.id !== 'auth-form') return;

  event.preventDefault();

  const formData = new FormData(event.target);

  const email = String(
    formData.get('email') || ''
  ).trim().toLowerCase();

  const password = String(
    formData.get('password') || ''
  );

  const name = String(
    formData.get('name') || ''
  ).trim();

  if (!email || password.length < 6) {
    message =
      'Enter a valid email and a password of at least 6 characters.';

    render();
    return;
  }

  if (page === 'register') {
    if (name.length < 2) {
      message = 'Please enter your full name.';
      render();
      return;
    }

    // Demo only: this does not create a secure account.
    user = { name, email };
    goTo('dashboard');
  } else {
    // Demo login: accepts any valid email and password.
    const savedName = email
      .split('@')[0]
      .replace(/[._-]/g, ' ');

    user = {
      name: savedName,
      email,
    };

    goTo('dashboard');
  }
});

// React Context API integration.
// React can request the current original shopping bag.
window.addEventListener(
  'jewellery-cart-request',
  () => {
    publishCartUpdate();
  }
);

// React can add a product from the original product list.
window.addEventListener(
  'jewellery-cart-add-request',
  (event) => {
    addProductToCart(event.detail.id);
  }
);

// React can remove a product from the original shopping bag.
window.addEventListener(
  'jewellery-cart-remove-request',
  (event) => {
    removeProductFromCart(event.detail.id);
  }
);

// Render the original website.
render();

// Send the initial cart state to React after its listeners
// have had a chance to initialize.
window.setTimeout(() => {
  publishCartUpdate();
}, 0);