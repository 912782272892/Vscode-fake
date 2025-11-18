async function loadUsers() {
  const res = await fetch("/api/users");
  const data = await res.json();

  const table = document.getElementById("table");
  table.innerHTML = "";

  data.forEach(u => {
    table.innerHTML += `
      <tr>
        <td>${u.id}</td>
        <td>${u.name}</td>
        <td>${u.email}</td>
      </tr>
    `;
  });
}

async function addUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (!name || !email) return alert("Completa los campos");

  await fetch("/api/users", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ name, email })
  });

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";

  loadUsers();
}

loadUsers();
