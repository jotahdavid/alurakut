import styled from 'styled-components'

// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `

const MainGrid = styled.main`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 16px;
  gap: 10px;

  .profile-area {
    display: none;

    @media(min-width: 860px) {
      display: block;
      grid-area: "profileArea";
    }
  }

  .welcome-area {
    @media(min-width: 860px) {
      grid-area: "welcomeArea";
    }
  }

  .profile-relations-area {
    @media(min-width: 860px) {
      grid-area: "profileRelationsArea";
    }
  }

  @media(min-width: 860px) {
    max-width: 1110px;
    display: grid;
    grid-template-areas: "profileArea welcomeArea profileRelationsArea";
    grid-template-columns: 160px 1fr 312px;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 8px;
`;

export default function Home() {
  return (
    <MainGrid>
      <section className="profile-area">
        <Box>
          Imagem
        </Box>
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
  );
}
