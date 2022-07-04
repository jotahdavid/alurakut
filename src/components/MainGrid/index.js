import styled from 'styled-components';

const MainGrid = styled.main`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 16px;
  gap: 10px;

  .profile-area {
    display: none;

    @media (min-width: 860px) {
      display: block;
      grid-area: profileArea;
    }
  }

  .welcome-area {
    @media (min-width: 860px) {
      grid-area: welcomeArea;
    }
  }

  .profile-relations-area {
    @media (min-width: 860px) {
      grid-area: profileRelationsArea;
    }
  }

  @media (min-width: 860px) {
    max-width: 1110px;
    display: grid;
    grid-template-areas: 'profileArea welcomeArea profileRelationsArea';
    grid-template-columns: 160px 1fr 312px;
  }
`;

export default MainGrid;
