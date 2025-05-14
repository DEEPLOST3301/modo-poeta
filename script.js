const rimas = {
  "amor": ["flor", "dor", "valor", "calor"],
  "vida": ["ferida", "despedida", "querida", "conduzida"],
  "céu": ["troféu", "chapéu", "anel", "papel"],
  "luz": ["cruz", "reluz", "conduz", "voz"]
};

const frases = {
  romance: [
    "Talvez o amor não cure tudo, mas ele me manteve vivo até aqui.",
    "Quando ela sorri, até a dor tira um tempo pra respirar.",
    "Amar foi meu erro favorito — e eu repetiria mil vezes."
  ],
  fé: [
    "Mesmo em silêncio, Deus responde com presença.",
    "Minha fé não é barulho, é abrigo.",
    "Deus não tarda, Ele ensina o tempo."
  ],
  tristeza: [
    "Carrego sorrisos velhos no bolso furado da memória.",
    "A tristeza me visita, mas não deixo ela morar.",
    "Chorar também é maneira de regar o que ainda pode florescer."
  ],
  reflexao: [
    "Às vezes, parar é o que nos move pra frente.",
    "Nem todo silêncio é vazio, alguns gritam sem som.",
    "O mundo muda quando a gente muda o olhar."
  ],
  esperanca: [
    "Enquanto houver amanhã, ainda há chance de florir.",
    "A esperança é o sol das noites mais longas.",
    "Mesmo o inverno passa quando a vontade floresce."
  ]
};

document.getElementById("sugestoesBtn").addEventListener("click", () => {
  const texto = document.getElementById("poema").value.trim();
  const palavras = texto.split(/\s+/);
  const ultima = palavras[palavras.length - 1].toLowerCase();
  const sugestoes = rimas[ultima];
  const div = document.getElementById("sugestoes");
  div.innerHTML = sugestoes ? `<strong>Rimas com "${ultima}":</strong> ${sugestoes.join(", ")}` :
    `Sem rimas encontradas para "${ultima}".`;
});

document.getElementById("temporizadorBtn").addEventListener("click", () => {
  let tempo = 60;
  const div = document.getElementById("temporizador");
  div.textContent = `🕒 Tempo restante: ${tempo}s`;
  const interval = setInterval(() => {
    tempo--;
    div.textContent = `🕒 Tempo restante: ${tempo}s`;
    if (tempo <= 0) {
      clearInterval(interval);
      div.textContent = "⏰ Tempo encerrado! Continue brilhando nos versos.";
    }
  }, 1000);
});

document.getElementById("salvarBtn").addEventListener("click", () => {
  const conteudo = document.getElementById("poema").value.trim();
  const div = document.getElementById("salvo");
  if (conteudo) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const chave = `poema_${timestamp}`;
    localStorage.setItem(chave, conteudo);
    localStorage.setItem("poemaSalvo", conteudo);
    div.textContent = `💾 Poema salvo com nome: ${chave}`;
    atualizarListaPoemas();
  } else {
    div.textContent = "⚠️ Nada para salvar.";
  }
});

document.getElementById("carregarBtn").addEventListener("click", () => {
  const salvo = localStorage.getItem("poemaSalvo");
  const div = document.getElementById("salvo");
  if (salvo) {
    document.getElementById("poema").value = salvo;
    div.textContent = "📖 Último poema carregado com sucesso.";
  } else {
    div.textContent = "❌ Nenhum poema salvo encontrado.";
  }
});

document.getElementById("exportarBtn").addEventListener("click", () => {
  const {{ jsPDF }} = window.jspdf;
  const doc = new jsPDF();
  doc.setFont("times", "normal");
  doc.text(document.getElementById("poema").value, 10, 10);
  doc.save("meu_poema.pdf");
});

document.getElementById("temaBtn").addEventListener("click", () => {
  const body = document.body;
  if (body.style.backgroundColor === "rgb(240, 240, 240)") {
    body.style.backgroundColor = "#121212";
    body.style.color = "#f2f2f2";
  } else {
    body.style.backgroundColor = "#f0f0f0";
    body.style.color = "#121212";
  }
});

document.getElementById("inspirarBtn").addEventListener("click", () => {
  const tema = document.getElementById("temaInsp").value;
  const area = document.getElementById("frasesInspiradas");
  const sugestoes = frases[tema];
  area.innerHTML = sugestoes.map(frase => 
    `<p><button onclick="document.getElementById('poema').value = '${frase}'">${frase}</button></p>`
  ).join("");
});
