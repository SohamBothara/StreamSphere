import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import logo from "../assets/logo.png";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";

export default function NavbarWithSearch({ isScrolled }) {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults([]);
      setNoResults(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=3d39d6bfe362592e6aa293f01fbcf9b9&query=${query}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        setSearchResults(data.results);
        setNoResults(false);
      } else {
        setSearchResults([]);
        setNoResults(true);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
      setNoResults(true);
    }
  };

  return (
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""} flex`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="Logo" />
          </div>
          <ul className="links flex">
            {links.map(({ name, link }) => (
              <li key={name}>
                <Link to={link}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(e.target.value);
              }}
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>
          <button onClick={() => signOut(firebaseAuth)}>
            <FaPowerOff />
          </button>
        </div>
      </nav>
      {showSearch && (
        <SearchResultsContainer>
          {searchResults.length > 0
            ? searchResults.map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id}>
                  <SearchResultItem>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <span>{movie.title}</span>
                  </SearchResultItem>
                </Link>
              ))
            : noResults && <div>No results found</div>}
        </SearchResultsContainer>
      )}
    </Container>
  );
}

// Styled components for Navbar and Search
const Container = styled.div`
  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
      gap: 2rem;
      .brand {
        img {
          height: 4rem;
        }
      }
      .links {
        list-style-type: none;
        gap: 2rem;
        li {
          a {
            color: white;
            text-decoration: none;
          }
        }
      }
    }
    .right {
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }
`;

const SearchResultsContainer = styled.div`
  position: absolute;
  top: 6.5rem; /* Adjust this according to your navbar height */
  left: 50%;
  transform: translateX(-50%);
  width: 300px; /* Width of the results dropdown */
  background-color: rgba(0, 0, 0, 0.8);
  border: 1px solid white;
  z-index: 1000;
  max-height: 200px; /* Limit the height */
  overflow-y: auto; /* Add scroll if too many results */
`;

const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  color: white;
  cursor: pointer;
  img {
    width: 50px;
    height: 75px;
    margin-right: 10px;
    object-fit: cover;
  }
  span {
    font-size: 1rem;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
