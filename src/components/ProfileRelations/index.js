import styled from 'styled-components';
import Box from '@components/Box';

const ProfileRelationsBoxWrapper = styled(Box)`
  ul {
    display: grid;
    grid-gap: 8px;
    grid-template-columns: 1fr 1fr 1fr;
    max-height: 220px;
    list-style: none;
  }

  img {
    object-fit: cover;
    background-position: center center;
    width: 100%;
    height: 100%;
    position: relative;
  }

  ul li a {
    display: inline-block;
    width: 100%;
    height: 102px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;

    span {
      color: #ffffff;
      font-size: 10px;
      position: absolute;
      left: 0;
      bottom: 10px;
      z-index: 2;
      padding: 0 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 1;
      background-image: linear-gradient(0deg, #00000073, transparent);
    }
  }
`;

export default function ProfileRelations({ title, list, length }) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({length})
      </h2>
      <ul>
        {list.slice(0, 6).map((item) => {
          if (typeof item === 'object') {
            return (
              <li key={item.id}>
                <a href={`/communities/${item.id}`}>
                  <img src={item.imageUrl} />
                  <span>{item.title}</span>
                </a>
              </li>
            );
          } else {
            return (
              <li key={item}>
                <a href={`/users/${item}`}>
                  <img src={`https://github.com/${item}.png`} />
                  <span>{item}</span>
                </a>
              </li>
            );
          }
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}
