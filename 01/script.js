const API_URL = "http://localhost:3001/usuarios";

async function loadUsers() {
  try {
    const response = await fetch(API_URL);
    const users = await response.json();

    const tableBody = document.getElementById("usersTableBody");
    tableBody.innerHTML = "";

    users.forEach((user) => {
      const row = document.createElement("tr");

      row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.nome}</td>
                        <td>${user.idade}</td>
                        <td class="actions">
                            <button class="delete-btn" onclick="deleteUser(${user.id})">Excluir</button>
                        </td>
                    `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
  }
}

async function addUser(event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;

  try {
    const response = await fetch(API_URL);
    const users = await response.json();

    const maxId = users.reduce((max, user) => Math.max(max, user.id), 0);

    const newUser = {
      id: maxId + 1,
      nome,
      idade: parseInt(idade),
    };

    const postResponse = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (postResponse.ok) {
      document.getElementById("userForm").reset();

      loadUsers();
    }
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error);
    alert("Erro ao adicionar usuário. Verifique o console para mais detalhes.");
  }
}

async function deleteUser(id) {
  if (confirm("Tem certeza que deseja excluir este usuário?")) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        loadUsers();
      }
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert("Erro ao excluir usuário. Verifique o console para mais detalhes.");
    }
  }
}

document.getElementById("userForm").addEventListener("submit", addUser);

document.addEventListener("DOMContentLoaded", loadUsers);
