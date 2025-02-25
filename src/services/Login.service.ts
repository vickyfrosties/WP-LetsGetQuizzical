const { VITE_URL_WP } = import.meta.env;


export async function loginUser(username: string, password: string): Promise<Boolean> {

  const formData = new URLSearchParams();
  formData.append("log", username);
  formData.append("pwd", password);

  try {
    const response = await fetch(VITE_URL_WP + "wp-login.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
      credentials: "include"
    });

    return response.ok;
  }
  catch (err) {
    console.error("Erreur lors de la connexion", err);
    throw err;
  }
}

export async function getUser(): Promise<{ id: number; name: string; } | null> {

  try {
    const { wpApiSettings } = window as any;
    if (!wpApiSettings?.root) {
      console.error("wpApiSettings introuvable");
      return null;
    }

    const response = await fetch(`${wpApiSettings.root}wp/v2/users/me`, {
      credentials: "include",
      headers: {
        "X-WP-Nonce": wpApiSettings.nonce
      }
    });

    if (!response.ok) {
      console.error(response.status, await response.text());
      return null;
    }

    const data = await response.json();
    return { id: data.id, name: data.name };
  } catch (error) {
    console.error("Erreur lors de la récupération du nonce:", error);
    return null;
  }
};