import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LogoImg from '../../../assets/images/logo.png';

const HomeNav = styled.nav`
  padding: 10px 0 10px 20px;
  background-color: var(--lightPink);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LogoContainer = styled.div`
  width: 200px;
`;

const ListContainer = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ItemContainer = styled.li`
  width: 150px;
  text-align: center;
  font-size: 1.4rem;
`;

const Logo = styled.img`
  width: 80%;
`;

function NavBar() {
  return (
    <HomeNav>
      <LogoContainer>
        <Link to={'/login'}>
          <Logo src={LogoImg}></Logo>
        </Link>
      </LogoContainer>
      <ListContainer>
        <ItemContainer>
          <Link to={'/login'}>
            <p>스팟등록</p>
          </Link>
        </ItemContainer>
        <ItemContainer>
          <Link to={'/login'}>
            <p>마이페이지</p>
          </Link>
        </ItemContainer>
        <ItemContainer>
          <Link to={'/login'}>
            <p>로그아웃</p>
          </Link>
        </ItemContainer>
      </ListContainer>
    </HomeNav>
  );
}

export default NavBar;
