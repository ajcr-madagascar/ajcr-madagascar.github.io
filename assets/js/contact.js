 
/* le javascript qui gére le serveur contact */
document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const data = {
    name: document.querySelector("[name=name]").value,
    email: document.querySelector("[name=email]").value,
    subject: document.querySelector("[name=subject]").value,
    message: document.querySelector("[name=message]").value
  };
  try {
    const response = await fetch("https://mon-serveur-production-8d65.up.railway.app/contact",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      }); const text = await response.text(); alert(text);
  } catch (error) { alert("Erreur serveur"); }
});
