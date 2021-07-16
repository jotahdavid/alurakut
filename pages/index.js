import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import ProfileRelations from '../src/components/ProfileRelations';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import { useState, useEffect } from 'react';

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
  const githubUser = "jotahdavid"; // Your GitHub username
  const [ communities, setCommunities ] = useState([]);
  const [ following, setFollowing ] = useState([]);
  const [ followers, setFollowers ] = useState([]);

  useEffect(() => {
    // GET Followers/Following
    fetch(
      "/api/github",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ githubUser })
      }
    )
    .then(async (response) => {
      const responseJSON = await response.json();
      setFollowing(responseJSON.followingList);
      setFollowers(responseJSON.followersList);
    })
    .catch((err) => {
      console.error(err);
      alert(err);
    });

    // GET Communities
    fetch("/api/communities", { method: "GET" })
    .then(async (response) => {
      const responseJSON = await response.json();
      setCommunities(responseJSON.data.allCommunities);
    });
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
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
                creatorSlug: githubUser,
                title: communityData.get("title"),
                imageUrl: communityData.get("imageURL") || `https://picsum.photos/300?10${communities.length}`
              };

              fetch(
                "/api/communities",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(newCommunity)
                }
              )
              .then(async (response) => {
                const responseJSON = await response.json();
                const { id, creatorSlug, title, imageUrl } = responseJSON.newRecord;
                
                const communityCreated = { id, creatorSlug, title, imageUrl };
                setCommunities([...communities, communityCreated]);
              });
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
          <ProfileRelations title="Seguidores" list={followers} length={followers.length} />
          <ProfileRelations title="Seguindo" list={following} length={following.length} />
          <ProfileRelations title="Comunidades" list={communities} length={communities.length} />
        </section>
      </MainGrid>
    </>
  );
}
