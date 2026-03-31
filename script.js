// DOM Elements
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelectorAll(".nav-link");
const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");

// Smooth scroll for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Close mobile menu if open
      if (
        mobileMenu.classList.contains("block") ||
        !mobileMenu.classList.contains("hidden")
      ) {
        toggleMobileMenu();
      }
    }
  });
});

// Toggle mobile menu
function toggleMobileMenu() {
  mobileMenu.classList.toggle("hidden");
  const icon = mobileMenuBtn.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
}

// Mobile menu button event
mobileMenuBtn.addEventListener("click", toggleMobileMenu);

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector("nav");
  if (window.scrollY > 100) {
    navbar.classList.add("shadow-lg", "bg-white/100");
  } else {
    navbar.classList.remove("shadow-lg", "bg-white/100");
  }
});

// Form validation and submission
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name").trim();
  const phone = formData.get("phone").trim();
  const message = formData.get("message").trim();

  // Simple validation
  if (name.length < 2) {
    showAlert("Nama minimal 2 karakter", "error");
    return;
  }

  if (phone.length < 10) {
    showAlert("Nomor telepon tidak valid", "error");
    return;
  }

  if (message.length < 5) {
    showAlert("Pesan minimal 5 karakter", "error");
    return;
  }

  // Show loading state
  const submitText = submitBtn.querySelector(".submit-text");
  const loadingText = submitBtn.querySelector(".loading-text");
  submitText.classList.add("hidden");
  loadingText.classList.remove("hidden");
  submitBtn.disabled = true;

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Reset form and show success
  contactForm.reset();
  submitText.classList.remove("hidden");
  loadingText.classList.add("hidden");
  submitBtn.disabled = false;

  showAlert(
    "Pesan berhasil dikirim! Kami akan segera menghubungi Anda.",
    "success",
  );

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Alert function
function showAlert(message, type) {
  // Remove existing alerts
  const existingAlert = document.querySelector(".alert-toast");
  if (existingAlert) {
    existingAlert.remove();
  }

  const alert = document.createElement("div");
  alert.className = `alert-toast fixed top-4 right-4 z-50 p-6 rounded-2xl shadow-2xl text-white transform translate-x-full transition-all duration-300 max-w-sm ${
    type === "success" ? "bg-green-500" : "bg-red-500"
  }`;
  alert.innerHTML = `
        <div class="flex items-center space-x-3">
            <i class="fas ${type === "success" ? "fa-check-circle text-2xl" : "fa-exclamation-circle text-2xl"}"></i>
            <span class="font-semibold">${message}</span>
        </div>
    `;

  document.body.appendChild(alert);

  // Animate in
  setTimeout(() => {
    alert.classList.remove("translate-x-full");
  }, 100);

  // Auto remove
  setTimeout(() => {
    alert.classList.add("translate-x-full");
    setTimeout(() => {
      if (alert.parentNode) {
        alert.remove();
      }
    }, 300);
  }, 4000);
}

// Menu card interactions
document.querySelectorAll(".menu-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-8px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-fade-in-up");
    }
  });
}, observerOptions);

// Observe menu cards and sections
document.querySelectorAll(".menu-card, #about, #contact").forEach((el) => {
  observer.observe(el);
});

// Add initial animation classes
document.addEventListener("DOMContentLoaded", () => {
  // Hero animation
  setTimeout(() => {
    document.querySelector("#home h1").classList.add("animate-fade-in-up");
    document.querySelector("#home p").classList.add("animate-fade-in-up");
    document
      .querySelector("#home .hero-btn")
      .classList.add("animate-fade-in-up");
  }, 500);

  // Navbar active state
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove(
        "text-orange-500",
        "border-b-2",
        "border-orange-500",
      );
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add(
          "text-orange-500",
          "border-b-2",
          "border-orange-500",
        );
      }
    });
  });
});

// Add custom CSS animations via Tailwind config (already included in HTML)

// ... (kode sebelumnya tetap sama sampai baris "// Menu card interactions")

// Menu card interactions + Order Modal
document.querySelectorAll(".pesan-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const menuCard = btn.closest(".menu-card");
    const menuName = menuCard.querySelector("h3").textContent;
    const menuPrice = menuCard.querySelector("span").textContent;

    showOrderModal(menuName, menuPrice);
  });
});

// Order Modal
function showOrderModal(menuName, menuPrice) {
  const modal = document.createElement("div");
  modal.className =
    "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in";
  modal.innerHTML = `
        <div class="bg-white rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl transform scale-95 animate-scale-in">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-3xl font-bold text-gray-800">Pesan ${menuName}</h2>
                <button id="close-modal" class="text-2xl text-gray-500 hover:text-gray-700 transition-colors">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-2xl mb-6">
                <div class="flex items-center space-x-4">
                    <div class="w-20 h-20 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
                        <i class="fas fa-utensils text-2xl text-white"></i>
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold text-gray-800">${menuName}</h3>
                        <p class="text-3xl font-bold text-orange-500">${menuPrice}</p>
                    </div>
                </div>
            </div>
            
            <form id="order-form" class="space-y-4">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Jumlah Pesanan</label>
                    <div class="flex items-center space-x-3">
                        <button type="button" id="decrease-qty" class="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center text-xl font-bold transition-colors">-</button>
                        <input type="number" id="quantity" name="quantity" min="1" max="10" value="1" 
                               class="w-20 text-center text-2xl font-bold text-gray-800 border-0 focus:ring-0 bg-transparent">
                        <button type="button" id="increase-qty" class="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center text-xl font-bold transition-colors">+</button>
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Nama Pemesan</label>
                    <input type="text" id="customer-name" name="customer-name" required
                           class="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 transition-all">
                </div>
                
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Nomor Telepon</label>
                    <input type="tel" id="customer-phone" name="customer-phone" required
                           class="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-gray-50 transition-all">
                </div>
                
                <div class="flex space-x-3 pt-2">
                    <button type="button" id="cancel-order" class="flex-1 bg-gray-100 text-gray-700 font-semibold py-4 px-6 rounded-2xl hover:bg-gray-200 transition-all duration-300">
                        Batal
                    </button>
                    <button type="submit" id="confirm-order" class="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold py-4 px-6 rounded-2xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                        <span class="confirm-text">Konfirmasi Pesanan</span>
                        <span class="loading-text hidden">
                            <i class="fas fa-spinner fa-spin mr-2"></i>
                            Memproses...
                        </span>
                    </button>
                </div>
            </form>
        </div>
    `;

  document.body.appendChild(modal);

  // Quantity controls
  const qtyInput = modal.querySelector("#quantity");
  const decreaseBtn = modal.querySelector("#decrease-qty");
  const increaseBtn = modal.querySelector("#increase-qty");

  decreaseBtn.addEventListener("click", () => {
    let qty = parseInt(qtyInput.value);
    if (qty > 1) {
      qtyInput.value = qty - 1;
    }
  });

  increaseBtn.addEventListener("click", () => {
    let qty = parseInt(qtyInput.value);
    if (qty < 10) {
      qtyInput.value = qty + 1;
    }
  });

  // Close modal
  const closeBtn = modal.querySelector("#close-modal");
  const cancelBtn = modal.querySelector("#cancel-order");

  closeBtn.addEventListener("click", () => closeModal(modal));
  cancelBtn.addEventListener("click", () => closeModal(modal));

  // Click outside to close
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(modal);
  });

  // Form submission
  const orderForm = modal.querySelector("#order-form");
  // Form submission - DIRECT WHATSAPP (NO DELAY!)
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(orderForm);
    const customerName = formData.get("customer-name").trim();
    const customerPhone = formData.get("customer-phone").trim();
    const quantity = parseInt(formData.get("quantity"));

    // VALIDASI CEPAT
    if (customerName.length < 2) {
      showAlert("❌ Nama minimal 2 karakter", "error");
      return;
    }

    if (customerPhone.length < 10) {
      showAlert("❌ Nomor HP minimal 10 digit", "error");
      return;
    }

    // FORMAT NOMOR WA ADMIN (GANTI INI!)
    let adminNumber = "6282129546021"; // ← GANTI NOMOR ADMIN KAMU!

    // PESAN OTOMATIS SIAP KIRIM
    const pesanWA =
      `🍽️ *PESANAN BARU*\n\n` +
      `👤 *${customerName}*\n` +
      `📱 ${customerPhone}\n` +
      `🍲 *${menuName}*\n` +
      `📊 ${quantity} Porsi\n` +
      `💰 ${quantity} x ${menuPrice}\n\n` +
      `⚡ *LANGSUNG PROSES!*`;

    // LANGSUNG BUKA WHATSAPP!
    const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(pesanWA)}`;
    window.open(whatsappUrl, "_blank");

    // TUTUP MODAL & SUKSES
    closeModal(modal);
    showAlert("✅ Pesanan langsung terkirim ke WhatsApp!", "success");
  });
}

function closeModal(modal) {
  modal.classList.add("animate-fade-out");
  setTimeout(() => {
    if (modal.parentNode) {
      modal.remove();
    }
  }, 300);
}

// Prevent body scroll when modal open
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("animate-fade-in")) {
    document.body.style.overflow = "hidden";
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".max-w-md")) {
    document.body.style.overflow = "auto";
  }
});

// ... (sisa kode observer tetap sama)
