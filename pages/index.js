import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { useState } from "react";
import Link from 'next/link'
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home(results) {
  const initialState = results;
  const [characters, setCharacters] = useState(initialState.characters);

  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
          {results.characters &&
            results.characters.map((character) => (
              <div key={character.id} className="p-5 md:w-1/5 sm:mb-0 mb-6">
                <div className="rounded-lg h-64 overflow-hidden">
                  <img
                    alt="content"
                    className="object-cover object-center h-full w-full"
                    src={`${character.image}`}
                  />
                </div>
                <h2 className="text-xl font-medium title-font text-white mt-5">
                  {character.name}
                </h2>
                <p className="text-base leading-relaxed mt-2">
                  Origin:- {character.origin.name}
                </p>
                <p className="text-base leading-relaxed mt-2">
                  Location:- {character.location.name}
                </p>
                <Link key={character.id} className="text-indigo-400 inline-flex items-center mt-3" href={`/characters/${character.id}`}>
                <a className="mt-3 text-indigo-400 inline-flex items-center">Learn More
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                  </a>
                      </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
export async function getStaticProps(context) {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query {
        characters(page : ${Math.floor(Math.random() * 42) + 1}) {
          info {
            count
            pages
          }
          results {
            name
            id
            location {
              id
              name
            }
            origin {
              id
              name
            }
            episode {
              id
              episode
              air_date
            }
            image
          }
        }
      }`,
  });

  return {
    props: {
      characters: data.characters.results,
    },
  };
}
