import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

function ProfileSidebar({ username }) {
  return (
    <Box>
      <img src={`https://github.com/${username}.png`} style={{borderRadius: "8px"}} />
    </Box>
  );
}

export default function Home() {
  const githubUser = "jotahdavid";
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
      <AlurakutMenu />
      <MainGrid>
        <section className="profile-area">
          <ProfileSidebar username={githubUser} />
        </section>
        <section className="welcome-area">
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet confiavel={2} legal={3} sexy={1} />
          </Box>
        </section>
        <section className="profile-relations-area">
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Meus amigos ({friendsList.length})</h2>
            <ul>
              {friendsList.map((friendName) => {
                return (
                  <li>
                    <a href={`/users/${friendName}`}>
                      <img src={`https://github.com/${friendName}.png`} />
                      <span>{friendName}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>
            Comunidades
          </Box>
        </section>
      </MainGrid>
    </>
  );
}
