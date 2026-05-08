/* 
name: Association des Jeunes Citoyens Responsables 
*/

const loader = document.getElementById("loader");
const notif = document.getElementById("notification");
const form = document.querySelector("form");
const button = form.querySelector("button");

// notification
function showNotification(message, type) {
  notif.textContent = message;

  notif.classList.remove("hidden");
  notif.classList.add("show", type);

  setTimeout(() => {
    notif.classList.remove("show");

    setTimeout(() => {
      notif.classList.add("hidden");
      notif.classList.remove("success", "error");
    }, 300);
  }, 3000);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: form.querySelector("[name=name]").value.trim(),
    email: form.querySelector("[name=email]").value.trim(),
    subject: form.querySelector("[name=subject]").value.trim(),
    message: form.querySelector("[name=message]").value.trim()
  };

  // validation
  if (!data.name || !data.email || !data.message) {
    showNotification("Veuillez remplir tous les champs", "error");
    return;
  }

  // loader start
  loader.style.display = "flex";
  button.disabled = true;

  const start = Date.now();

  try {
    const res = await fetch("https://mon-serveur-production-0be0.up.railway.app/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    // délais de 3s avant l'apparition du message 
    const elapsed = Date.now() - start;
    if (elapsed < 3000) {
      await new Promise(r => setTimeout(r, 3000 - elapsed));
    }

    if (!res.ok) throw new Error(result.error || "Erreur inconnue");

    showNotification("Message envoyé avec succès", "success");
    form.reset();

  } catch (err) {
    console.error(err);

    const elapsed = Date.now() - start;
    if (elapsed < 3000) {
      await new Promise(r => setTimeout(r, 3000 - elapsed));
    }

    showNotification(err.message, "error");

  } finally {
    loader.style.display = "none";
    button.disabled = false;
  }
});
