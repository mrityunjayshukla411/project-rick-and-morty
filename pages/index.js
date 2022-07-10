import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home(results) {
  const initialState = results;
  const [characters, setCharacters] = useState(initialState.characters);
  console.log(initialState);
  return (
    <section class="text-gray-400 bg-gray-900 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
        {results.characters && results.characters.map((character) =>
          <div class="p-5 md:w-1/5 sm:mb-0 mb-6">
            <div class="rounded-lg h-64 overflow-hidden">
              <img
                alt="content"
                class="object-cover object-center h-full w-full"
                src={`${character.image}`}
              />
            </div>
            <h2 class="text-xl font-medium title-font text-white mt-5">
              {character.name}
            </h2>
            <p class="text-base leading-relaxed mt-2">
              Origin:- {character.origin.name}
            </p>
            <p class="text-base leading-relaxed mt-2">
              Location:- {character.location.name}
            </p>
            <a class="text-indigo-400 inline-flex items-center mt-3">
              Learn More
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                class="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
      )}
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
        characters{
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
      }
    `,
  });

  return {
    props: {
      characters: data.characters.results,
    },
  };
}
