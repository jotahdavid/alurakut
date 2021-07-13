import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import { useState } from 'react';

function ProfileSidebar({ username }) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${username}.png`} style={{borderRadius: "8px"}} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${username}`} target="_blank">
          @{username}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {
  const githubUser = "jotahdavid";
  const [ communities, setCommunities ] = useState([
    { 
      id: "2021-07-13T18:29:44.970Z",
      title: "Eu odeio acordar cedo",
      imageURL: "https://img10.orkut.br.com/community/52cc4290facd7fa700b897d8a1dc80aa.jpg"
    }
  ]);
  const friendsList = [ 
    "juunegreiros", 
    "rafaballerini", 
    "marcobrunodev", 
    "akitaonrails", 
    "maykbrito",
    "omariosouto"
  ];

  return (
    <>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>
        <section className="profile-area">
          <ProfileSidebar username={githubUser} />
        </section>
        <section className="welcome-area">
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet confiavel={2} legal={3} sexy={1} />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={(event) => {
              event.preventDefault();

              const communityData = new FormData(event.target);
              const newCommunity = {
                id: new Date().toISOString(),
                title: communityData.get("title"),
                imageURL: communityData.get("imageURL")
              };

              setCommunities([...communities, newCommunity]);
            }}>
              <div>
                <input
                  placeholder="Digite o nome da sua comunidade"
                  name="title"
                  aria-label="Digite o nome da sua comunidade"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Informe a URL da imagem que aparecerá na comunidade"
                  name="imageURL"
                  aria-label="Informe a URL da imagem que aparecerá na comunidade"
                  type="text"
                />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </section>
        <section className="profile-relations-area">
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Meus amigos ({friendsList.length})</h2>
            <ul>
              {friendsList.map((friendName) => {
                return (
                  <li key={friendName}>
                    <a href={`/users/${friendName}`}>
                      <img src={`https://github.com/${friendName}.png`} />
                      <span>{friendName}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Comunidades ({communities.length})</h2>
            <ul>
              {communities.map(({ id, title, imageURL }, index) => {
                return (
                  <li key={id}>
                    <a href={`/communities/${title}`}>
                      <img src={imageURL || `https://picsum.photos/300?10${index}`} />
                      <span>{title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </section>
      </MainGrid>
    </>
  );
}
