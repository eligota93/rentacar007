const WHATSAPP_NUMBER = "38344181803";
const vehicles = [
  { id:"golf-1", name:"Volkswagen Golf 7", label:"Vetura 1", image:"assets/images/golf-front.webp", year:"Shto vitin", transmission:"Shto transmisionin", fuel:"Shto karburantin", seats:"Shto numrin", price:"Kontaktoni për çmim" },
  { id:"golf-2", name:"Volkswagen Golf 7", label:"Vetura 2", image:"assets/images/golf-rear.webp", year:"Shto vitin", transmission:"Shto transmisionin", fuel:"Shto karburantin", seats:"Shto numrin", price:"Kontaktoni për çmim" },
  { id:"golf-3", name:"Volkswagen Golf 7", label:"Vetura 3", image:"assets/images/golf-side.webp", year:"Shto vitin", transmission:"Shto transmisionin", fuel:"Shto karburantin", seats:"Shto numrin", price:"Kontaktoni për çmim" },
  { id:"jetta-1", name:"Volkswagen Jetta", label:"Vetura 1", image:"assets/images/jetta-front.webp", year:"Shto vitin", transmission:"Shto transmisionin", fuel:"Shto karburantin", seats:"Shto numrin", price:"Kontaktoni për çmim" },
  { id:"jetta-2", name:"Volkswagen Jetta", label:"Vetura 2", image:"assets/images/jetta-rear.webp", year:"Shto vitin", transmission:"Shto transmisionin", fuel:"Shto karburantin", seats:"Shto numrin", price:"Kontaktoni për çmim" }
];
const params = new URLSearchParams(location.search);
const vehicle = vehicles.find(v => v.id === params.get("id")) || vehicles[0];
const modelImages = vehicle.id.startsWith("golf")
  ? ["assets/images/golf-front.webp","assets/images/golf-rear.webp","assets/images/golf-side.webp"]
  : ["assets/images/jetta-front.webp","assets/images/jetta-rear.webp"];

const title = `${vehicle.name} – ${vehicle.label}`;
document.title = `${title} | Rent A Car 007`;
document.getElementById("detail-title").textContent = title;
const main = document.getElementById("detail-main-image");
main.src = vehicle.image;
main.alt = `${title} — fotografi demonstruese`;
const specs = [
  ["Viti", vehicle.year], ["Transmisioni", vehicle.transmission], ["Karburanti", vehicle.fuel], ["Vendet", vehicle.seats], ["Çmimi", vehicle.price], ["Rezervimi", "Përmes WhatsApp-it"]
];
document.getElementById("detail-specs").innerHTML = specs.map(([a,b]) => `<div class="detail-spec"><span>${a}</span><strong>${b}</strong></div>`).join("");
const thumbs = document.getElementById("detail-thumbs");
thumbs.innerHTML = modelImages.map((src,i) => `<button class="detail-thumb ${src===vehicle.image?'active':''}" type="button" data-src="${src}" aria-label="Shfaq fotografinë ${i+1}"><img src="${src}" alt="Pamje ${i+1} e modelit" width="400" height="250"></button>`).join("");
thumbs.querySelectorAll("button").forEach(btn => btn.addEventListener("click", () => {
  thumbs.querySelectorAll("button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  main.src = btn.dataset.src;
}));

const toggle = document.querySelector(".menu-toggle");
const menu = document.getElementById("mobile-menu");
const close = () => { toggle.setAttribute("aria-expanded","false"); menu.hidden = true; document.body.classList.remove("menu-open"); };
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  if (open) close(); else { toggle.setAttribute("aria-expanded","true"); menu.hidden=false; document.body.classList.add("menu-open"); }
});
menu.querySelectorAll("a").forEach(a=>a.addEventListener("click", close));

const today = new Date().toISOString().split("T")[0];
const start = document.getElementById("d-start");
const end = document.getElementById("d-end");
start.min = today; end.min = today;
start.addEventListener("change", ()=> end.min = start.value || today);
document.querySelector(".js-detail-form").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  let valid = true;
  form.querySelectorAll(".field").forEach(f => { f.classList.remove("invalid"); const e=f.querySelector(".error"); if(e)e.textContent=""; });
  form.querySelectorAll("[required]").forEach(field => {
    if (!field.value.trim()) { const w=field.closest(".field"); w.classList.add("invalid"); w.querySelector(".error").textContent="Kjo fushë është e detyrueshme."; valid=false; }
  });
  if (start.value && end.value && end.value < start.value) { const w=end.closest(".field"); w.classList.add("invalid"); w.querySelector(".error").textContent="Data e kthimit nuk mund të jetë para datës së marrjes."; valid=false; }
  if (!valid) return;
  const data = Object.fromEntries(new FormData(form).entries());
  const fmt = v => { const [y,m,d]=v.split("-"); return `${d}.${m}.${y}`; };
  const msg = `Përshëndetje Rent A Car 007, dëshiroj të rezervoj ${title}.\n\nEmri: ${data.name}\nTelefoni: ${data.phone}\nData e marrjes: ${fmt(data.start)}\nData e kthimit: ${fmt(data.end)}\n\nJu lutem më konfirmoni disponueshmërinë dhe çmimin.`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
});
