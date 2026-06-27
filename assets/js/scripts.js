document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 2. Global Data
    const products = [
        { name: "Wonder Precision", price: "$2.490.990", img: "assets/images/maquinas/1.webp", cat: "Musculación", featured: true },
        { name: "LegoLaser Trio", price: "$8.990.000", img: "assets/images/maquinas/2.webp", cat: "Depilación", featured: true },
        { name: "DermoPro Max", price: "$1.299.990", img: "assets/images/maquinas/3.webp", cat: "Facial", featured: true },
        { name: "CryoSculpt Pro", price: "$5.490.000", img: "assets/images/maquinas/4.webp", cat: "Corporal", featured: true },
        { name: "HIFU S-Line", price: "$4.150.000", img: "assets/images/maquinas/5.webp", cat: "Lifting", featured: true },
        { name: "LipoPlus 360", price: "$3.890.000", img: "assets/images/maquinas/1.webp", cat: "Corporal", featured: true },
        { name: "UltraSHR Laser", price: "$7.499.990", img: "assets/images/maquinas/2.webp", cat: "Depilación", featured: true },
        { name: "HydroReveal", price: "$990.000", img: "assets/images/maquinas/3.webp", cat: "Facial", featured: true }
    ];

    // 3. Render Helper
    const createProductCard = (p, variant = 'slider') => {
        const isSlider = variant === 'slider';
        return `
            <div class="group ${isSlider ? 'w-80 shrink-0 snap-start' : 'w-full'} bg-white rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-500 relative">
                <div class="aspect-square bg-gray-50 rounded-xl overflow-hidden mb-6 relative">
                    <img src="${p.img}" alt="${p.name}" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" loading="lazy">
                    <span class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-sm">${p.cat}</span>
                    
                    <!-- Hover Action -->
                    <div class="absolute inset-x-0 bottom-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                        <button class="w-full bg-secondary hover:bg-primary text-white py-3 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl transition-colors relative z-30">
                            <i data-lucide="shopping-bag" class="w-3 h-3"></i>
                            Añadir al Carrito
                        </button>
                    </div>
                </div>
                <div class="p-6">
                    <h3 class="font-sync text-sm md:text-xl tracking-tighter mb-2 uppercase text-secondary leading-tight">${p.name}</h3>
                    <p class="text-primary font-black tracking-widest text-md mb-6">${p.price}</p>
                    <a href="producto.html" class="flex items-center justify-between text-xs font-black uppercase tracking-widest group/btn border-t border-gray-50 pt-4 after:absolute after:inset-0 after:z-20">
                        Ver Detalles <i data-lucide="arrow-right" class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"></i>
                    </a>
                </div>
            </div>
        `;
    };

    // 4. Populate Grids
    const populateGrid = (id, data, variant) => {
        const el = document.getElementById(id);
        if (el) {
            el.innerHTML = data.map(p => createProductCard(p, variant)).join('');
            if (window.lucide) window.lucide.createIcons();
        }
    };

    // Index Grids (Infinite Scroll Setup)
    const featuredItems = products.filter(p => p.featured);
    populateGrid('featured-grid', [...featuredItems, ...featuredItems, ...featuredItems], 'slider');
    
    // Initial scroll to middle set for infinite loop
    const fGrid = document.getElementById('featured-grid');
    if (fGrid) {
        setTimeout(() => {
            fGrid.scrollLeft = fGrid.scrollWidth / 3;
        }, 100);
    }

    populateGrid('offers-grid', products.slice(0, 4), 'grid');

    // Tienda Grid
    populateGrid('shop-grid', [...products, ...products], 'grid');

    // 5. Category Marquee
    const catContainer = document.getElementById('categories-container');
    if (catContainer) {
        const cats = ["CORPORALES", "FACIALES", "REHABILITACIÓN", "MOBILIARIO", "INSUMOS", "OFERTAS", "PACKS", "WONDER", "LEGOLÁSER"];
        const html = cats.map(c => `<span class="text-3xl md:text-5xl font-sync tracking-tighter text-secondary/5 hover:text-primary transition-colors cursor-default uppercase">${c}</span>`).join('');
        catContainer.innerHTML = html + html;
    }

    // 6. Header/Promo Logic
    const promo = document.getElementById('promo-bar');
    const header = document.getElementById('main-header');
    let lastScrollY = window.scrollY;

    if (header) {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const inner = header.querySelector('div');

            // 1. Promo Hide/Show Logic
            if (promo) {
                if (currentScrollY < 10) {
                    promo.style.transform = 'translateY(0)';
                } else {
                    promo.style.transform = 'translateY(-100%)';
                }
            }

            // 2. Header Sticky Transition
            if (currentScrollY > 40) {
                header.classList.replace('top-8', 'top-0');
            } else {
                header.classList.replace('top-0', 'top-8');
            }

            lastScrollY = currentScrollY;
        }, { passive: true });
    }
    // 7. Horizontal Scroll & Slider Logic
    const featuredGrid = document.getElementById('featured-grid');
    const featuredNext = [document.getElementById('featured-next'), document.getElementById('featured-next-mb')];
    const featuredPrev = [document.getElementById('featured-prev'), document.getElementById('featured-prev-mb')];

    if (featuredGrid) {
        const scrollAmount = 350;
        const setWidth = featuredGrid.scrollWidth / 3;

        // Infinite detection
        featuredGrid.addEventListener('scroll', () => {
            if (featuredGrid.scrollLeft >= setWidth * 2) {
                featuredGrid.scrollLeft = setWidth;
            } else if (featuredGrid.scrollLeft <= 5) {
                featuredGrid.scrollLeft = setWidth;
            }
        }, { passive: true });

        featuredNext.forEach(btn => {
            if (btn) btn.onclick = () => {
                featuredGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                resetAutoplay();
            };
        });

        featuredPrev.forEach(btn => {
            if (btn) btn.onclick = () => {
                featuredGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                resetAutoplay();
            };
        });

        // Autoplay
        let autoplay = setInterval(() => {
            featuredGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }, 5000);

        function resetAutoplay() {
            clearInterval(autoplay);
            autoplay = setInterval(() => {
                featuredGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }, 5000);
        }

        featuredGrid.addEventListener('mouseenter', () => clearInterval(autoplay));
        featuredGrid.addEventListener('mouseleave', () => resetAutoplay());
    }

    // 8. Mobile Menu Logic
    const mobileTrigger = document.getElementById('mobile-menu-trigger');
    const mobileClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileTrigger && mobileMenu) {
        mobileTrigger.onclick = () => {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        };
    }

    if (mobileClose && mobileMenu) {
        mobileClose.onclick = () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        };
    }

    // 9. Drag-to-scroll logic
    const sliders = document.querySelectorAll('.hide-scrollbar');
    sliders.forEach(slider => {
        let isDown = false, startX, scrollLeft;
        slider.onmousedown = (e) => { isDown = true; startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft; };
        slider.onmouseleave = () => { isDown = false; };
        slider.onmouseup = () => { isDown = false; };
        slider.onmousemove = (e) => {
            if (!isDown) return;
            const x = e.pageX - slider.offsetLeft;
            slider.scrollLeft = scrollLeft - (x - startX) * 2;
        };
    });

    // 10. Product Detail Page Logic
    const prodContainer = document.getElementById('product-container');
    if (prodContainer) {
        // Pick a product (using first one as default demo)
        const p = products[0]; 
        
        // Update Breadcrumb
        const breadcrumb = document.getElementById('product-breadcrumb');
        if (breadcrumb) breadcrumb.innerText = p.name;

        // Render Product HTML
        prodContainer.innerHTML = `
            <!-- Gallery -->
            <div class="space-y-6">
                <div class="aspect-[4/5] bg-white rounded-3xl border border-gray-100 overflow-hidden group relative">
                    <img src="${p.img}" alt="${p.name}" class="w-full h-full object-contain p-12 transition-transform duration-700 group-hover:scale-110">
                    <button class="absolute top-6 right-6 w-12 h-12 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all shadow-xl">
                        <i data-lucide="maximize-2" class="w-5 h-5"></i>
                    </button>
                </div>
            </div>

            <!-- Info -->
            <div class="flex flex-col">
                <div class="mb-10">
                    <span class="inline-block bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-6">${p.cat}</span>
                    <h1 class="font-sync text-4xl lg:text-5xl tracking-tighter text-secondary mb-4 uppercase leading-none">${p.name}</h1>
                    <div class="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                        <div class="flex text-yellow-400">
                            <i data-lucide="star" class="w-3 h-3 fill-current"></i>
                            <i data-lucide="star" class="w-3 h-3 fill-current"></i>
                            <i data-lucide="star" class="w-3 h-3 fill-current"></i>
                            <i data-lucide="star" class="w-3 h-3 fill-current"></i>
                            <i data-lucide="star" class="w-3 h-3 fill-current"></i>
                        </div>
                        <span>12 Valoraciones</span>
                    </div>
                </div>

                <p class="text-4xl font-sync tracking-tighter text-primary mb-10">${p.price}</p>

                <div class="prose prose-sm text-gray-500 font-light leading-relaxed mb-12 max-w-md">
                    <p>Tecnología de vanguardia diseñada para resultados profesionales. Este equipo ofrece la máxima eficiencia en tratamientos de ${p.cat.toLowerCase()}, garantizando seguridad y confort para el paciente.</p>
                </div>

                <!-- Actions -->
                <div class="space-y-6">
                    <div class="flex flex-col sm:flex-row gap-4">
                        <div class="flex items-center bg-gray-50 rounded-2xl p-2 border border-gray-100">
                            <button class="w-12 h-12 flex items-center justify-center hover:text-primary transition-colors"><i data-lucide="minus" class="w-4 h-4"></i></button>
                            <input type="number" value="1" class="w-12 bg-transparent text-center font-bold text-secondary outline-none pointer-events-none">
                            <button class="w-12 h-12 flex items-center justify-center hover:text-primary transition-colors"><i data-lucide="plus" class="w-4 h-4"></i></button>
                        </div>
                        <button class="flex-1 bg-secondary hover:bg-primary text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-xl shadow-secondary/20 flex items-center justify-center gap-3">
                            <i data-lucide="shopping-bag" class="w-5 h-5"></i>
                            Añadir al Carrito
                        </button>
                    </div>
                    <button class="w-full border-2 border-gray-100 hover:border-primary/30 hover:bg-primary/5 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3">
                        <i data-lucide="heart" class="w-5 h-5"></i>
                        Lista de Deseo
                    </button>
                </div>
            </div>
        `;

        const tabs = document.getElementById('product-tabs');
        if (tabs) tabs.classList.remove('hidden');

        const woocommerceDesc = document.getElementById('woocommerce-description');
        if (woocommerceDesc) {
            woocommerceDesc.innerHTML = `<p>El equipo <strong>${p.name}</strong> representa la cima de la innovación en ${p.cat}. Con años de investigación clínica y desarrollo de ingeniería, este equipo ha sido optimizado para proporcionar:</p><ul><li>Resultados inmediatos y duraderos.</li><li>Interfaz intuitiva para el operador.</li><li>Mínimo mantenimiento requerido.</li><li>Diseño ergonómico premium.</li></ul>`;
        }

        // Related Products Grid
        populateGrid('related-products-grid', products.slice(1, 5), 'grid');

        if (window.lucide) window.lucide.createIcons();
    }

    // 11. Cart Logic (Mobile vs Desktop)
    const cartTrigger = document.getElementById('cart-trigger');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartClose = document.getElementById('cart-drawer-close');
    const cartOverlay = document.getElementById('cart-overlay');
    
    const mobileCartBtn = document.querySelector('#mobile-menu button.bg-primary');

    const openCart = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (window.innerWidth < 1024) {
            window.location.href = 'carrito.html';
        } else {
            if (cartDrawer && cartOverlay) {
                cartDrawer.classList.remove('translate-x-full');
                cartOverlay.classList.remove('opacity-0', 'invisible');
                document.body.style.overflow = 'hidden';
            }
        }
    };

    const closeCart = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (cartDrawer && cartOverlay) {
            cartDrawer.classList.add('translate-x-full');
            cartOverlay.classList.add('opacity-0', 'invisible');
            document.body.style.overflow = '';
        }
    };

    if (cartTrigger) cartTrigger.addEventListener('click', openCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
    if (mobileCartBtn) mobileCartBtn.addEventListener('click', openCart);
});

// Global Tab Switcher
window.switchTab = (tabName) => {
    // Hide all tab contents
    const contents = ['tab-description', 'tab-reviews', 'tab-specs'];
    contents.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    // Remove active styles from all buttons
    const btns = ['tab-btn-description', 'tab-btn-reviews', 'tab-btn-specs'];
    btns.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.remove('text-primary', 'border-primary');
            el.classList.add('text-gray-400', 'border-transparent');
        }
    });

    // Show selected and set active
    const selectedTab = document.getElementById(`tab-${tabName}`);
    if (selectedTab) selectedTab.classList.remove('hidden');

    const selectedBtn = document.getElementById(`tab-btn-${tabName}`);
    if (selectedBtn) {
        selectedBtn.classList.add('text-primary', 'border-primary');
        selectedBtn.classList.remove('text-gray-400', 'border-transparent');
    }
};

// Video Mute Toggle
function toggleMute(videoId) {
    const v = document.getElementById(videoId);
    if (!v) return;
    v.muted = !v.muted;
    const off = document.getElementById('mute-icon-off-hero') || document.getElementById('mute-icon-off');
    const on = document.getElementById('mute-icon-on-hero') || document.getElementById('mute-icon-on');
    if (off && on) {
        off.classList.toggle('hidden', !v.muted);
        on.classList.toggle('hidden', v.muted);
    }
}
