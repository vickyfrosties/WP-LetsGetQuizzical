import { useState } from "react";
import { loginUser } from "../../services/Login.service";

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const success = await loginUser(username, password);
      if (success) {
        window.location.href = "/";
      }
      else {
        setError("Données incorrectes");
      }
    } catch (err) {
      setError("Une erreur est survenue");
    }
  };

  return (
    <>
      <section>
        <h2>Connexion</h2>
        <p>{error} </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Nom d'utilisateur :</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="">Mot de passe :</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Se connecter</button>
        </form>

      </section>
    </>
  );
};

export default Login;