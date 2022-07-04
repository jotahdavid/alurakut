import { useRouter } from 'next/router';
import { useState } from 'react';

import nookies from 'nookies';
import jwt from 'jsonwebtoken';

export default function LoginScreen() {
  const router = useRouter();
  const [githubUser, setGithubUSer] = useState('jotahdavid');
  const [accountExists, setAccountExists] = useState(true);

  return (
    <main
      style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p>
            <strong>Conecte-se</strong> aos seus amigos e familiares usando
            recados e mensagens instantâneas
          </p>
          <p>
            <strong>Conheça</strong> novas pessoas através de amigos de seus
            amigos e comunidades
          </p>
          <p>
            <strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só
            lugar
          </p>
        </section>

        <section className="formArea">
          <form
            className="box"
            onSubmit={(event) => {
              event.preventDefault();

              if (githubUser.length === 0) return;

              fetch(`https://api.github.com/users/${githubUser}`, {
                method: 'GET',
              })
                .then((response) => {
                  if (response.status === 403) {
                    throw new Error(
                      'Você excedeu os limites de acesso a API do GitHub, tente novamente mais tarde!'
                    );
                  }

                  if (response.status === 404) {
                    setAccountExists(false);
                    return;
                  }

                  setAccountExists(true);

                  fetch('https://alurakut.vercel.app/api/login', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ githubUser }),
                  }).then(async (response) => {
                    const responseJSON = await response.json();

                    nookies.set(null, 'USER_TOKEN', responseJSON.token, {
                      path: '/',
                      maxAge: 86400 * 7,
                    });

                    router.push('/');
                  });
                })
                .catch((err) => {
                  alert(err);
                });
            }}
          >
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <input
              placeholder="Usuário"
              onChange={(event) => {
                setAccountExists(true);
                setGithubUSer(event.target.value);
              }}
              value={githubUser}
            />
            {accountExists ? (
              ''
            ) : (
              <p style={{ color: 'red' }}>Usuário informado não existe!</p>
            )}
            <button type="submit">Login</button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>ENTRAR JÁ</strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> -{' '}
            <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> -{' '}
            <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const USER_TOKEN = nookies.get(context).USER_TOKEN;

  if (USER_TOKEN) {
    const { isAuthenticated } = await fetch(
      'https://alurakut.vercel.app/api/auth',
      {
        method: 'GET',
        headers: {
          Authorization: USER_TOKEN,
        },
      }
    ).then((response) => response.json());

    if (!jwt.decode(USER_TOKEN)) {
      nookies.destroy(context, 'USER_TOKEN', {
        path: '/',
      });

      return { props: {} };
    }

    const { githubUser } = jwt.decode(USER_TOKEN);

    const accountExists = await fetch(
      `https://api.github.com/users/${githubUser}`,
      { method: 'GET' }
    ).then((response) => {
      if (response.status === 404) return false;

      return true;
    });

    if (!isAuthenticated || !accountExists) {
      nookies.destroy(context, 'USER_TOKEN', {
        path: '/',
      });

      return { props: {} };
    }

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: {} };
}
