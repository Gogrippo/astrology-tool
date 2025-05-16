// script.js
document.addEventListener('DOMContentLoaded', function() {
  const texts = {
    en: {
      nameLabel: 'Name:',
      dobLabel: 'Date of Birth:',
      tobLabel: 'Time of Birth:',
      placeLabel: 'Place of Birth:',
      generateBtn: 'Generate Report',
      reportFor: 'Astrology Report for',
      personalInfo: 'Personal Information',
      planetaryPos: 'Planetary Positions',
      predictions: 'Predictions',
      careerLabel: 'Career',
      healthLabel: 'Health',
      loveLabel: 'Love'
    },
    hi: {
      nameLabel: 'नाम:',
      dobLabel: 'जन्म तिथि:',
      tobLabel: 'जन्म समय:',
      placeLabel: 'जन्म स्थान:',
      generateBtn: 'रिपोर्ट बनाएँ',
      reportFor: 'ज्योतिष रिपोर्ट -',
      personalInfo: 'व्यक्तिगत जानकारी',
      planetaryPos: 'ग्रह स्थिति',
      predictions: 'अनुमान',
      careerLabel: 'व्यवसाय',
      healthLabel: 'स्वास्थ्य',
      loveLabel: 'प्रेम / संबंध'
    }
  };

  // Update form labels when language changes
  document.querySelectorAll('input[name="lang"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const lang = document.querySelector('input[name="lang"]:checked').value;
      document.getElementById('labelName').innerText  = texts[lang].nameLabel;
      document.getElementById('labelDob').innerText   = texts[lang].dobLabel;
      document.getElementById('labelTob').innerText   = texts[lang].tobLabel;
      document.getElementById('labelPlace').innerText = texts[lang].placeLabel;
      document.getElementById('generateBtn').innerText= texts[lang].generateBtn;
      document.getElementById('title').innerText      = (lang==='hi' ? 'ज्योतिष रिपोर्ट जनरेटर' : 'Astrology Report Generator');
    });
  });

  // Determine Sun sign from birth date
  function getSunSign(date) {
    const d = date.getDate(), m = date.getMonth()+1;
    if ((m==3&&d>=21)||(m==4&&d<=19)) return 'Aries';
    if ((m==4&&d>=20)||(m==5&&d<=20)) return 'Taurus';
    if ((m==5&&d>=21)||(m==6&&d<=20)) return 'Gemini';
    if ((m==6&&d>=21)||(m==7&&d<=22)) return 'Cancer';
    if ((m==7&&d>=23)||(m==8&&d<=22)) return 'Leo';
    if ((m==8&&d>=23)||(m==9&&d<=22)) return 'Virgo';
    if ((m==9&&d>=23)||(m==10&&d<=22)) return 'Libra';
    if ((m==10&&d>=23)||(m==11&&d<=21)) return 'Scorpio';
    if ((m==11&&d>=22)||(m==12&&d<=21)) return 'Sagittarius';
    if ((m==12&&d>=22)||(m==1&&d<=19)) return 'Capricorn';
    if ((m==1&&d>=20)||(m==2&&d<=18)) return 'Aquarius';
    if ((m==2&&d>=19)||(m==3&&d<=20)) return 'Pisces';
    return '';
  }

  // Prediction texts by sign and language
  const predictions = {
    Aries: { en: { career: "...", health: "...", love: "..." }, 
             hi: { career: "...", health: "...", love: "..." } },
    // ... (other signs in similar structure) ...
    /* (See full code above for detailed predictions in both languages) */
  };
  // (For brevity, the above object should include all 12 signs as shown in the earlier example code.)

  // Handle form submit
  document.getElementById('astroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const lang  = document.querySelector('input[name="lang"]:checked').value;
    const name  = document.getElementById('name').value.trim();
    const place = document.getElementById('place').value.trim();
    const dob   = new Date(document.getElementById('dob').value);
    const tob   = document.getElementById('tob').value;
    const dobStr = dob.toLocaleDateString(lang==='hi'?'hi-IN':'en-US', { day:'numeric', month:'long', year:'numeric' });
    let timeStr = tob;
    if (tob) {
      const t = new Date('1970-01-01T' + tob + ':00');
      timeStr = t.toLocaleTimeString(lang==='hi'?'hi-IN':'en-US', { hour:'2-digit', minute:'2-digit' });
    }
    const sign = getSunSign(dob);
    const signMap = {
      Aries: 'मेष', Taurus: 'वृषभ', Gemini: 'मिथुन', Cancer: 'कर्क',
      Leo: 'सिंह', Virgo: 'कन्या', Libra: 'तुला', Scorpio: 'वृश्चिक',
      Sagittarius: 'धनु', Capricorn: 'मकर', Aquarius: 'कुंभ', Pisces: 'मीन'
    };
    // Static planetary positions example
    const planets = [
      {name: 'Sun',    nameHi: 'सूर्य', signEn: sign,        signHi: signMap[sign]},
      {name: 'Moon',   nameHi: 'चंद्र', signEn: '—',         signHi: '—'},
      {name: 'Mercury',nameHi: 'बुध',  signEn: '—',         signHi: '—'},
      {name: 'Venus',  nameHi: 'शुक्र', signEn: '—',         signHi: '—'},
      {name: 'Mars',   nameHi: 'मंगल', signEn: '—',         signHi: '—'},
      {name: 'Jupiter',nameHi: 'बृहस्पति', signEn: '—',     signHi: '—'},
      {name: 'Saturn', nameHi: 'शनि',   signEn: '—',         signHi: '—'},
      {name: 'Rahu',   nameHi: 'राहु',  signEn: '—',         signHi: '—'},
      {name: 'Ketu',   nameHi: 'केतु',  signEn: '—',         signHi: '—'}
    ];

    // Build the report HTML
    let html = `<h2>${texts[lang].reportFor} ${name}</h2>`;
    html += `<div class="section personal-info"><h3>${texts[lang].personalInfo}</h3><ul>`;
    html += `<li><strong>${texts[lang].nameLabel}</strong> ${name}</li>`;
    html += `<li><strong>${texts[lang].dobLabel}</strong> ${dobStr}</li>`;
    html += `<li><strong>${texts[lang].tobLabel}</strong> ${timeStr}</li>`;
    html += `<li><strong>${texts[lang].placeLabel}</strong> ${place}</li>`;
    html += `<li><strong>${lang==='en'?'Sun Sign:':'सूर्य राशि:'}</strong> ${lang==='en'?sign:signMap[sign]}</li>`;
    html += `</ul></div>`;

    html += `<div class="section planetary"><h3>${texts[lang].planetaryPos}</h3>`;
    html += `<table><tr><th>${lang==='en'?'Planet':'ग्रह'}</th><th>${lang==='en'?'Sign':'राशि'}</th></tr>`;
    planets.forEach(p => {
      html += `<tr><td>${lang==='en'?p.name:p.nameHi}</td><td>${p.signEn} (${p.signHi})</td></tr>`;
    });
    html += `</table></div>`;

    const preds = predictions[sign][lang];
    html += `<div class="section predictions"><h3>${texts[lang].predictions}</h3>`;
    html += `<h4>${texts[lang].careerLabel}:</h4><p>${preds.career}</p>`;
    html += `<h4>${texts[lang].healthLabel}:</h4><p>${preds.health}</p>`;
    html += `<h4>${texts[lang].loveLabel}:</h4><p>${preds.love}</p>`;
    html += `</div>`;

    html += `<button id="printBtn" onclick="window.print()">Print / Download</button>`;
    document.getElementById('result').classList.remove('hidden');
    document.getElementById('result').innerHTML = html;
  });
});
