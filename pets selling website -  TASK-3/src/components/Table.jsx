import React from "react";
import "./Table.scss";

export const Table = () => {
  const [dogs, setDogs] = React.useState([]);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    try {
      fetch("https://mern-dogs-app.herokuapp.com/api/getdogs/dogs")
        .then((response) => response.json())
        .then((json) => setDogs(json));
    } catch (e) {
      console.log(e);
    }
  }, []);

  const Search = dogs.filter((el) => {
    return el.title.toLowerCase().includes(value.toLowerCase());
  });

  // Pagination
  const [currentPage, setCurrentPage] = React.useState(1);

  const [dogsOnpage] = React.useState(10);
  const lastIndex = currentPage * dogsOnpage;
  const firstIndex = lastIndex - dogsOnpage;
  const currentDog = Search.slice(firstIndex, lastIndex);

  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(Search.length / dogsOnpage); i++) {
    pageNumber.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  //

  return (
    <div className="Table">
      <form action="" submit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Поиск по заголовку..."
          onChange={(e) => setValue(e.target.value)}
        />
      </form>

      <table>
        <thead>
          <tr>
            <th>Заголовок</th>
            <th>Картинка</th>
            <th>Порода</th>
          </tr>
        </thead>
        <tbody>
          {currentDog.map((el, index) => (
            <>
              <tr key={index}>
                <td>{el.title}</td>
                <td>
                  <img
                    src={`https://images.dog.ceo/breeds/${el.breed}/${el.title}.jpg`}
                    alt=""
                  />
                </td>
                <td>{el.breed}</td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      {pageNumber.map((num) => (
        <button
          onClick={() => paginate(num)}
          key={num}
          className="button-pagination"
        >
          {num}
        </button>
      ))}
    </div>
  );
};
