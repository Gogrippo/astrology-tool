function getPrediction() {
  const name = document.getElementById("name").value;
  const dob = document.getElementById("dob").value;
  const tob = document.getElementById("tob").value;
  const pob = document.getElementById("pob").value;
  const lang = document.getElementById("lang").value;

  const prediction = lang === "en"
    ? `${name}, your future looks bright. Career and health are stable.`
    : `${name}, आपका भविष्य उज्जवल है। करियर और स्वास्थ्य अच्छे रहेंगे।`;

  document.getElementById("output").innerText = prediction;
}

function askQuestion() {
  const question = document.getElementById("question").value;
  const lang = document.getElementById("lang").value;

  const answer = lang === "en"
    ? "Today is a good day. Wear white for peace."
    : "आज का दिन अच्छा है। सफेद पहनें, शांति बनी रहेगी।";

  document.getElementById("answer").innerText = answer;
}
