import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
const Slug = ({ character }) => {
  return (
    <>
      <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={`${character.image}`}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {character.gender}
              </h2>
              <h1 className="text-white text-3xl title-font font-medium mb-1">
                {character.name}
              </h1>

              <br/>
              <p className="leading-relaxed">
                <span className="title-font font-medium text-2xl text-white">
                  Origin :-
                </span>
                <br/>
                <ul className="list-none text-l text-white">
                  <li>{character.origin.name}</li>
                  <li>{character.origin.type}</li>
                  <li>{character.origin.dimension}</li>
                </ul>
              </p>
              <p className="leading-relaxed">
                <span className="title-font font-medium text-2xl text-white">
                  Location :-
                </span>
                <br/>
                <ul className="list-none text-l text-white">
                  <li>{character.location.name}</li>
                  <li>{character.location.type}</li>
                  <li>{character.location.dimension}</li>
                </ul>
              </p>
              <br/>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-white">
                  Status :- {character.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Slug;

export async function getServerSideProps(context) {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql",
    cache: new InMemoryCache(),
  });
  const newName = context.query.slug;
  const { data } = await client.query({
    query: gql`
    query{
      character(id: ${newName}){
          name
          image
          gender
          status
          origin{
            name
            type
            dimension
          }
          location{
            name
            type
            dimension
          }
      }
    }`,
  });
  // console.log(data);
  // console.log("###############################");
  // console.log(data.character.name);
  // console.log("###############################");
  return {
    props: {
      character: data.character,
    },
  };
}
