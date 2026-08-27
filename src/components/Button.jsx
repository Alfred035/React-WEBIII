import "./Button.css";

// Botao reutilizavel. "tipo" define a cor (primario ou secundario).
// Uso o mesmo componente pro botao de Enviar e pro de Limpar.
function Button({ texto, tipo = "primario", onClick, disabled, type = "button" }) {
  return (
    <button
      className={`botao botao-${tipo}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {texto}
    </button>
  );
}

export default Button;
