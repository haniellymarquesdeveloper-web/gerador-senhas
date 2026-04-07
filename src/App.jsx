import { useState } from "react";
import "./App.css";

export default function App() {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%&*()-_=+[]{};:,.<>?/";

    let availableChars = "";

    if (includeUppercase) availableChars += uppercaseChars;
    if (includeLowercase) availableChars += lowercaseChars;
    if (includeNumbers) availableChars += numberChars;
    if (includeSymbols) availableChars += symbolChars;

    if (!availableChars) {
      setPassword("Selecione pelo menos uma opção");
      return;
    }

    let newPassword = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      newPassword += availableChars[randomIndex];
    }

    setPassword(newPassword);
    setCopied(false);
  };

  const copyPassword = async () => {
    if (!password || password === "Selecione pelo menos uma opção") return;

    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      alert("Não foi possível copiar a senha.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <p className="tag">SecurePass</p>
        <h1>Crie sua senha</h1>
        <p className="description">
          Crie senhas seguras de forma rápida, escolhendo tamanho e tipos de
          caracteres.
        </p>

        <div className="password-box">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Sua senha aparecerá aqui"
          />
          <button onClick={copyPassword}>
            {copied ? "Copiado!" : "Copiar"}
          </button>
        </div>

        <div className="option-group">
          <label className="range-label">Tamanho: {length}</label>
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
            />
            Letras maiúsculas
          </label>

          <label>
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={() => setIncludeLowercase(!includeLowercase)}
            />
            Letras minúsculas
          </label>

          <label>
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />
            Números
          </label>

          <label>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
            />
            Símbolos
          </label>
        </div>

        <button className="generate-btn" onClick={generatePassword}>
          Gerar senha
        </button>
      </div>
    </div>
  );
}