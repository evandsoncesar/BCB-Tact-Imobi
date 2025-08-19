import React from "react";
import "../styles/cadastroStyle/Cadastro.css";
import CadastroForm from "../components/cadastro/CadastroForm";

export default function Cadastro() {
  return (
    <div className="cadastro-wrapper">
      <img
        src="/background-cidade.svg"
        alt="background"
        className="cadastro-bg"
      />

      <div className="cadastro-container">
        <img src="/logotact.svg" alt="Logo" className="cadastro-logo" />
        <CadastroForm />
      </div>
    </div>
  );
}
