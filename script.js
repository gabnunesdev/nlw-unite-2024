let players = [
  {
    nome: "Cristiano Ronaldo",
    email: "cr7@cr7.com",
    dataInscricao: new Date(),
    dataCheckIn: new Date(2024, 3, 2, 22, 1),
  },
  {
    nome: "Lionel Messi",
    email: "leomessi@messi.com",
    dataInscricao: new Date(2024, 3, 2, 22, 10),
    dataCheckIn: new Date(2024, 3, 3, 19, 45),
  },
  {
    nome: "Neymar Jr.",
    email: "neymar@jr.com",
    dataInscricao: new Date(2024, 3, 2, 22, 15),
    dataCheckIn: new Date(2024, 3, 3, 10, 30),
  },
  {
    nome: "Robert Lewandowski",
    email: "rl9@lewandowski.com",
    dataInscricao: new Date(2024, 3, 2, 22, 20),
    dataCheckIn: new Date(2024, 3, 3, 14, 15),
  },
  {
    nome: "Kevin De Bruyne",
    email: "kdb@debruyne.com",
    dataInscricao: new Date(2024, 3, 2, 22, 25),
    dataCheckIn: new Date(2024, 3, 3, 16, 20),
  },
  {
    nome: "Sergio Ramos",
    email: "sr4@ramos.com",
    dataInscricao: new Date(2024, 3, 2, 22, 30),
    dataCheckIn: new Date(2024, 3, 3, 18, 40),
  },
  {
    nome: "Kylian Mbappé",
    email: "kmbappe@mbappe.com",
    dataInscricao: new Date(2024, 3, 2, 22, 35),
    dataCheckIn: new Date(2024, 3, 3, 9, 50),
  },
  {
    nome: "Mohamed Salah",
    email: "msalah@salah.com",
    dataInscricao: new Date(2024, 3, 2, 22, 40),
    dataCheckIn: new Date(2024, 3, 3, 11, 10),
  },
  {
    nome: "Gareth Bale",
    email: "gbale@bale.com",
    dataInscricao: new Date(2024, 3, 2, 22, 45),
    dataCheckIn: new Date(2024, 3, 3, 13, 25),
  },
  {
    nome: "Virgil van Dijk",
    email: "vvandijk@vandijk.com",
    dataInscricao: new Date(2024, 3, 2, 22, 50),
    dataCheckIn: new Date(2024, 3, 3, 15, 30),
  },
];

const createNewPlayer = (player) => {
  const dataInscricao = dayjs(Date.now()).to(player.dataInscricao);

  let dataCheckIn = dayjs(Date.now()).to(player.dataCheckIn);
  if (player.dataCheckIn == null) {
    dataCheckIn = `<button data-email="${player.email}" onclick="confirmarPresenca(event)">
    Confirmar Presença</button>`;
  }

  return `
  <tr>
    <td>
      <strong>${player.nome}</strong>
      <br />
      <small> ${player.email} </small>
    </td>

    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
</tr>`;
};

const atualizarLista = (players) => {
  let output = "";
  for (let player of players) {
    output = output + createNewPlayer(player);
  }

  document.querySelector("tbody").innerHTML = output;
};

atualizarLista(players);

const adicionarPlayer = (event) => {
  event.preventDefault();
  const dadosForm = new FormData(event.target);
  const player = {
    nome: dadosForm.get("nome"),
    email: dadosForm.get("email"),
    dataInscricao: new Date(),
    dataCheckIn: null,
  };
  const playerExiste = players.find((p) => p.email == player.email);

  if (playerExiste) {
    alert("Email já cadastrado!");
    return;
  }
  players = [player, ...players];
  atualizarLista(players);

  event.target.querySelector('[name="nome"]').value = "";
  event.target.querySelector('[name="email"]').value = "";
};

const confirmarPresenca = (event) => {
  const resultado = confirm("Tem certeza que deseja confirmar sua presença?");
  alert(resultado);

  if (confirm(resultado) == false) {
    return;
  }

  const player = players.find((p) => p.email == event.target.dataset.email);
  player.dataCheckIn = new Date();
  atualizarLista(players);
};
