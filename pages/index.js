import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu } from '../src/lib/AlurakutCommons';

function ProfileSidebar({ username }) {
  return (
    <Box>
      <img src={`https://github.com/${username}.png`} style={{borderRadius: "8px"}} />
    </Box>
  );
}

export default function Home() {
  const githubUser = "omariosouto";

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <section className="profile-area">
          <ProfileSidebar username={githubUser} />
        </section>
        <section className="welcome-area">
          <Box>
            Bem vindo
          </Box>
        </section>
        <section className="profile-relations-area">
          <Box>
            Meus amigos
          </Box>
          <Box>
            Comunidades
          </Box>
        </section>
      </MainGrid>
    </>
  );
}
