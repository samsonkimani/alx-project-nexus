'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { SearchBar } from '@/components/ui/SearchBar';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { searchMovies, setSearchQuery } from '@/store/moviesSlice';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Logo = styled(Link)`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: #ccc;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;

  &:hover {
    color: #fff;
  }

  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

const SearchSection = styled.div`
  flex: 1;
  max-width: 500px;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
`;

export const Header: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((state) => state.movies);

  const handleSearch = (query: string) => {
    if (query.trim()) {
      dispatch(searchMovies({ query: query.trim() }));
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSearchChange = (value: string) => {
    dispatch(setSearchQuery(value));
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo href="/">🎬 MovieApp</Logo>

        <SearchSection>
          <SearchBar
            value={search.query}
            onChange={handleSearchChange}
            onSearch={handleSearch}
            placeholder="Search for movies..."
          />
        </SearchSection>

        <Nav>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/favorites">Favorites</NavLink>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};