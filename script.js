const WHATSAPP_NUMBER = "38344181803";

const vehicles = [
  { id: "golf-1", name: "Volkswagen Golf 7", label: "Vetura 1", image: "assets/images/golf-front-card.webp", fullImage: "assets/images/golf-front.webp", year: "Shto vitin", transmission: "Shto transmisionin", fuel: "Shto karburantin", seats: "Shto numrin", price: "Kontaktoni për çmim" },
  { id: "golf-2", name: "Volkswagen Golf 7", label: "Vetura 2", image: "assets/images/golf-rear-card.webp", fullImage: "assets/images/golf-rear.webp", year: "Shto vitin", transmission: "Shto transmisionin", fuel: "Shto karburantin", seats: "Shto numrin", price: "Kontaktoni për çmim" },
  { id: "golf-3", name: "Volkswagen Golf 7", label: "Vetura 3", image: "assets/images/golf-side-card.webp", fullImage: "assets/images/golf-side.webp", year: "Shto vitin", transmission: "Shto transmisionin", fuel: "Shto karburantin", seats: "Shto numrin", price: "Kontaktoni për çmim" },
  { id: "jetta-1", name: "Volkswagen Jetta", label: "Vetura 1", image: "assets/images/jetta-front-card.webp", fullImage: "assets/images/jetta-front.webp", year: "Shto vitin", transmission: "Shto transmisionin", fuel: "Shto karburantin", seats: "Shto numrin", price: "Kontaktoni për çmim" },
  { id: "jetta-2", name: "Volkswagen Jetta", label: "Vetura 2", image: "assets/images/jetta-rear-card.webp", fullImage: "assets/images/jetta-rear.webp", year: "Shto vitin", transmission: "Shto transmisionin", fuel: "Shto karburantin", seats: "Shto numrin", price: "Kontaktoni për çmim" }
];

const reviews = [
  { initials: "AK", name: "Ardit K.", text: "Shërbim shumë i shpejtë dhe komunikim korrekt. Vetura ishte e pastër dhe në gjendje shumë të mirë.", car: "Volkswagen Golf 7" },
  { initials: "LB", name: "Luan B.", text: "Rezervimi përmes WhatsApp-it ishte shumë i lehtë. Përgjigjen e mora shpejt dhe çdo gjë shkoi sipas marrëveshjes.", car: "Volkswagen Jetta" },
  { initials: "EM", name: "Erion M.", text: "Përvojë shumë e mirë nga rezervimi deri te kthimi i veturës. Proces i thjeshtë dhe komunikim i qartë.", car: "Volkswagen Golf 7" },
  { initials: "BH", name: "Besnik H.", text: "Vetura ishte e rregullt, e pastër dhe komode. Shërbimi ishte profesional dhe pa vonesa.", car: "Volkswagen Jetta" },
  { initials: "AR", name: "Alban R.", text: "Komunikim i mirë, rezervim i shpejtë dhe veturë shumë e përshtatshme për udhëtim.", car: "Volkswagen Golf 7" }
];

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[ch]));
}

function vehicleDisplay(v) { return `${v.name} – ${v.label}`; }

function waUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function renderFleet() {
  const grid = document.getElementById("fleet-grid");
  if (!grid) return;
  grid.innerHTML = vehicles.map(v => {
    const message = `Përshëndetje Rent A Car 007, jam i interesuar të rezervoj ${vehicleDisplay(v)}. Ju lutem më tregoni disponueshmërinë dhe çmimin për datat që më nevojiten.`;
    return `
      <article class="vehicle-card reveal">
        <div class="vehicle-image">
          <img src="${v.image}" alt="${escapeHtml(vehicleDisplay(v))} — fotografi demonstruese" width="900" height="563" loading="lazy">
          <span class="vehicle-badge">Fotografi demonstruese</span>
        </div>
        <div class="vehicle-body">
          <div class="vehicle-top">
            <div><h3>${escapeHtml(v.name)}</h3><p class="vehicle-code">${escapeHtml(v.label)}</p></div>
            <span class="vehicle-price">${escapeHtml(v.price)}</span>
          </div>
          <div class="spec-grid">
            <div class="spec"><span>Viti</span><strong>${escapeHtml(v.year)}</strong></div>
            <div class="spec"><span>Transmisioni</span><strong>${escapeHtml(v.transmission)}</strong></div>
            <div class="spec"><span>Karburanti</span><strong>${escapeHtml(v.fuel)}</strong></div>
            <div class="spec"><span>Vendet</span><strong>${escapeHtml(v.seats)}</strong></div>
          </div>
          <div class="vehicle-actions">
            <a class="button button-dark" href="vetura.html?id=${encodeURIComponent(v.id)}">Shiko detajet</a>
            <a class="button button-primary" href="${waUrl(message)}" target="_blank" rel="noopener">Rezervo në WhatsApp</a>
          </div>
        </div>
      </article>`;
  }).join("");
}

function populateVehicleSelects() {
  document.querySelectorAll('select[name="car"]').forEach(select => {
    vehicles.forEach(v => {
      const option = document.createElement("option");
      option.value = vehicleDisplay(v);
      option.textContent = vehicleDisplay(v);
      select.append(option);
    });
  });
}

function renderGallery() {
  const track = document.getElementById("gallery-track");
  if (!track) return;
  const items = vehicles.map(v => `
    <article class="gallery-item">
      <img src="${v.fullImage}" alt="${escapeHtml(vehicleDisplay(v))} — fotografi demonstruese" width="1600" height="1000" loading="lazy">
      <div class="gallery-caption"><strong>${escapeHtml(v.name)}</strong><span>${escapeHtml(v.label)} · fotografi demonstruese</span></div>
    </article>`).join("");
  track.innerHTML = items + items;
}

function renderReviews() {
  const track = document.getElementById("review-track");
  if (!track) return;
  const cards = reviews.map(r => `
    <article class="review-card">
      <div class="review-head">
        <span class="avatar" aria-hidden="true">${escapeHtml(r.initials)}</span>
        <div><p class="review-name">${escapeHtml(r.name)}</p><span class="stars" aria-label="5 nga 5 yje">★★★★★</span></div>
      </div>
      <p class="review-text">“${escapeHtml(r.text)}”</p>
      <p class="review-car">Vetura: ${escapeHtml(r.car)} · shembull i përkohshëm</p>
    </article>`).join("");
  track.innerHTML = cards + cards;
}

function setupHeader() {
  const header = document.getElementById("header");
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!header || !toggle || !menu) return;

  const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 20);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const close = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Hap menynë");
    menu.hidden = true;
    document.body.classList.remove("menu-open");
  };

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    if (open) close();
    else {
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Mbyll menynë");
      menu.hidden = false;
      document.body.classList.add("menu-open");
    }
  });
  menu.querySelectorAll("a").forEach(link => link.addEventListener("click", close));
  window.addEventListener("resize", () => { if (window.innerWidth > 1020) close(); });
}

function setupMarquee(shell) {
  const track = shell.querySelector(".marquee-track");
  if (!track) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let paused = false;
  let dragging = false;
  let startX = 0;
  let startScroll = 0;
  let lastTime = performance.now();
  const speed = Number(shell.dataset.speed || 24);

  function normalize() {
    const half = track.scrollWidth / 2;
    if (!half) return;
    while (shell.scrollLeft >= half) shell.scrollLeft -= half;
    while (shell.scrollLeft < 0) shell.scrollLeft += half;
  }

  function tick(time) {
    const dt = Math.min(50, time - lastTime);
    lastTime = time;
    if (!paused && !dragging && !reduced.matches) {
      shell.scrollLeft += speed * dt / 1000;
      normalize();
    }
    requestAnimationFrame(tick);
  }

  shell.addEventListener("mouseenter", () => { paused = true; });
  shell.addEventListener("mouseleave", () => { paused = false; });
  shell.addEventListener("pointerdown", event => {
    dragging = true;
    shell.classList.add("dragging");
    startX = event.clientX;
    startScroll = shell.scrollLeft;
    shell.setPointerCapture?.(event.pointerId);
  });
  shell.addEventListener("pointermove", event => {
    if (!dragging) return;
    const delta = event.clientX - startX;
    shell.scrollLeft = startScroll - delta;
    normalize();
  });
  const stopDragging = event => {
    if (!dragging) return;
    dragging = false;
    shell.classList.remove("dragging");
    shell.releasePointerCapture?.(event.pointerId);
  };
  shell.addEventListener("pointerup", stopDragging);
  shell.addEventListener("pointercancel", stopDragging);
  shell.addEventListener("dragstart", event => event.preventDefault());
  requestAnimationFrame(tick);
}

function setupForms() {
  const today = new Date().toISOString().split("T")[0];
  document.querySelectorAll('input[type="date"]').forEach(input => { input.min = today; });

  document.querySelectorAll(".js-whatsapp-form").forEach(form => {
    const pickup = form.querySelector('[name="pickupDate"]');
    const returned = form.querySelector('[name="returnDate"]');
    if (pickup && returned) pickup.addEventListener("change", () => { returned.min = pickup.value || today; });

    form.addEventListener("submit", event => {
      event.preventDefault();
      clearErrors(form);
      const data = Object.fromEntries(new FormData(form).entries());
      let valid = true;

      form.querySelectorAll("[required]").forEach(field => {
        if (!String(field.value).trim()) {
          showError(field, "Kjo fushë është e detyrueshme.");
          valid = false;
        }
      });

      if (data.pickupDate && data.returnDate && data.returnDate < data.pickupDate) {
        showError(returned, "Data e kthimit nuk mund të jetë para datës së marrjes.");
        valid = false;
      }
      if (!valid) {
        form.querySelector(".invalid input, .invalid select, .invalid textarea")?.focus();
        return;
      }

      let message;
      if (form.dataset.formType === "quick") {
        message = `Përshëndetje Rent A Car 007, dëshiroj të kontrolloj disponueshmërinë për këtë rezervim:\n\nVetura: ${data.car}\nData e marrjes: ${formatDate(data.pickupDate)}\nData e kthimit: ${formatDate(data.returnDate)}\nLokacioni: ${data.location}\n\nJu lutem më konfirmoni disponueshmërinë dhe çmimin.`;
      } else {
        message = `Përshëndetje Rent A Car 007, dëshiroj të bëj një kërkesë për rezervim:\n\nEmri: ${data.firstName} ${data.lastName}\nTelefoni: ${data.phone}\nVetura: ${data.car}\nMarrja: ${formatDate(data.pickupDate)} në ora ${data.pickupTime}\nKthimi: ${formatDate(data.returnDate)} në ora ${data.returnTime}\nLokacioni: ${data.location}${data.message ? `\nMesazh shtesë: ${data.message}` : ""}\n\nJu lutem më konfirmoni disponueshmërinë dhe çmimin.`;
      }
      window.open(waUrl(message), "_blank", "noopener");
    });
  });
}

function showError(field, message) {
  const wrapper = field.closest(".field");
  if (!wrapper) return;
  wrapper.classList.add("invalid");
  const error = wrapper.querySelector(".error");
  if (error) error.textContent = message;
  field.setAttribute("aria-invalid", "true");
}

function clearErrors(form) {
  form.querySelectorAll(".field").forEach(wrapper => {
    wrapper.classList.remove("invalid");
    const error = wrapper.querySelector(".error");
    if (error) error.textContent = "";
    wrapper.querySelector("input,select,textarea")?.removeAttribute("aria-invalid");
  });
}

function formatDate(value) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year}`;
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach(item => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: "0px 0px -30px" });
  items.forEach(item => observer.observe(item));
}

renderFleet();
populateVehicleSelects();
renderGallery();
renderReviews();
setupHeader();
setupForms();
document.querySelectorAll(".js-marquee").forEach(setupMarquee);
setupReveal();
