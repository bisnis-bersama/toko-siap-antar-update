import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

export const $ = (s) => document.querySelector(s);
export const money = (n) => new Intl.NumberFormat("id-ID", {style:"currency",currency:"IDR",maximumFractionDigits:0}).format(Number(n || 0));
export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
export function notice(message, type="info") {
  const el = $("#notice");
  if (el) { el.textContent = message; el.className = "notice " + type; el.hidden = false; }
  else alert(message);
}
export async function getProfile(user) {
  if (!user) return null;
  const snap = await getDoc(doc(db, "users", user.uid));
  return snap.exists() ? snap.data() : null;
}
export function requireRole(roles, callback) {
  return onAuthStateChanged(auth, async user => {
    if (!user) { location.href = "login.html"; return; }
    try {
      const profile = await getProfile(user);
      if (!profile || !roles.includes(profile.role)) {
        document.body.innerHTML = `<main class="shell"><section class="panel"><h1>Akses ditolak</h1><p>Akun ini tidak memiliki hak untuk membuka halaman tersebut.</p><a class="btn" href="index.html">Kembali ke toko</a></section></main>`;
        return;
      }
      callback(user, profile);
    } catch (e) { notice("Gagal memeriksa akses: " + e.message, "error"); }
  });
}
export function setupNav() {
  const btn = $("#logoutBtn");
  if (btn) btn.addEventListener("click", async () => {
    await signOut(auth);
    location.href = "index.html";
  });
  onAuthStateChanged(auth, async user => {
    const el = $("#sessionLabel");
    if (!el) return;
    if (!user) { el.textContent = "Belum login"; return; }
    const p = await getProfile(user);
    el.textContent = `${p?.nama || user.email} · ${p?.role || "role belum diatur"}`;
  });
}
setupNav();
