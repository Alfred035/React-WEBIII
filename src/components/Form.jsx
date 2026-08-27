import { useState } from "react";
import Button from "./Button";
import "./Form.css";

// Guardo o estado inicial aqui pra poder usar ele de novo quando
// o usuario clicar em "Limpar Dados", sem ter que reescrever tudo.
const estadoInicial = {
  nome: "",
  sobrenome: "",
  email: "",
  dataNascimento: "",
  telefone: "",
  pais: "Brasil",
  bio: "",
  funcao: "usuario",
  senha: "",
  aceitouTermos: false,
};

function Form() {
  const [dados, setDados] = useState(estadoInicial);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  // Uma funcao so pra atualizar qualquer campo do formulario.
  // Pega o "name" do input pra saber qual chave do estado mudar.
  function handleChange(evento) {
    const { name, value, type, checked } = evento.target;

    setDados({
      ...dados,
      [name]: type === "checkbox" ? checked : value,
    });

    // some com as mensagens antigas assim que o usuario mexe de novo
    setErro("");
    setSucesso("");
  }

  function handleSubmit(evento) {
    evento.preventDefault();

    // validacao minima pedida na atividade
    if (dados.nome.trim() === "") {
      setErro("Preencha o campo Nome.");
      return;
    }
    if (dados.email.trim() === "") {
      setErro("Preencha o campo Email.");
      return;
    }
    if (dados.senha.length < 6) {
      setErro("A senha precisa ter no minimo 6 caracteres.");
      return;
    }
    if (dados.aceitouTermos === false) {
      setErro("Voce precisa aceitar os termos.");
      return;
    }

    // se chegou ate aqui, ta tudo certo
    console.log("Cadastro enviado:", dados);
    setSucesso("Cadastro realizado com sucesso!");
    setDados(estadoInicial);
  }

  function handleLimpar() {
    setDados(estadoInicial);
    setErro("");
    setSucesso("");
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h1>Cadastro de Usuario</h1>

      <div className="linha">
        <div className="campo">
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            name="nome"
            type="text"
            value={dados.nome}
            onChange={handleChange}
          />
        </div>

        <div className="campo">
          <label htmlFor="sobrenome">Sobrenome</label>
          <input
            id="sobrenome"
            name="sobrenome"
            type="text"
            value={dados.sobrenome}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="campo">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={dados.email}
          onChange={handleChange}
        />
      </div>

      <div className="linha">
        <div className="campo">
          <label htmlFor="dataNascimento">Data de Nascimento</label>
          <input
            id="dataNascimento"
            name="dataNascimento"
            type="date"
            value={dados.dataNascimento}
            onChange={handleChange}
          />
        </div>

        <div className="campo">
          <label htmlFor="telefone">Telefone</label>
          <input
            id="telefone"
            name="telefone"
            type="tel"
            placeholder="(00) 00000-0000"
            value={dados.telefone}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="campo">
        <label htmlFor="pais">Pais</label>
        <select id="pais" name="pais" value={dados.pais} onChange={handleChange}>
          <option value="Brasil">Brasil</option>
          <option value="Portugal">Portugal</option>
          <option value="Estados Unidos">Estados Unidos</option>
          <option value="Argentina">Argentina</option>
          <option value="Outro">Outro</option>
        </select>
      </div>

      <div className="campo">
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          rows="3"
          value={dados.bio}
          onChange={handleChange}
        />
      </div>

      <div className="campo">
        <label htmlFor="funcao">Funcao no sistema</label>
        <select id="funcao" name="funcao" value={dados.funcao} onChange={handleChange}>
          <option value="admin">Administrador</option>
          <option value="editor">Editor</option>
          <option value="usuario">Usuario</option>
        </select>
      </div>

      <div className="campo">
        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          name="senha"
          type="password"
          value={dados.senha}
          onChange={handleChange}
        />
      </div>

      <div className="campo campo-checkbox">
        <input
          id="aceitouTermos"
          name="aceitouTermos"
          type="checkbox"
          checked={dados.aceitouTermos}
          onChange={handleChange}
        />
        <label htmlFor="aceitouTermos">Aceito os termos</label>
      </div>

      {erro !== "" && <p className="mensagem mensagem-erro">{erro}</p>}
      {sucesso !== "" && <p className="mensagem mensagem-sucesso">{sucesso}</p>}

      <div className="acoes">
        <Button texto="Enviar Cadastro" tipo="primario" type="submit" disabled={!dados.aceitouTermos} />
        <Button texto="Limpar Dados" tipo="secundario" onClick={handleLimpar} />
      </div>
    </form>
  );
}

export default Form;
