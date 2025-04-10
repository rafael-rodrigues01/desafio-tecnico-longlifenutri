const button = document.querySelector('button');
const input = document.querySelector('input');
const cardContainer = document.querySelector('.cards-container');

button.addEventListener('click', event => {
  event.preventDefault();
  const inputValue = input.value;

  try {
    // Limpa o conteúdo do cardContainer antes de adicionar novos itens
    cardContainer.innerHTML = '';
    axios
      .get(`http://localhost:3000/api/scrape/${inputValue}`)
      .then(response => {
        response.data.forEach(item => {
          // Cria o contêiner do item
          const itemContainer = document.createElement('div');
          itemContainer.classList.add('card');

          // Cria o título
          const title = document.createElement('h2');
          title.textContent = item.title;

          // Cria a imagem
          const image = document.createElement('img');
          if (item.imageUrl && item.imageUrl.startsWith('http')) {
            image.src = item.imageUrl; // Define a URL da imagem se for válida
          }

          // Cria a o numero de estrelas
          const rating = document.createElement('p');
          rating.textContent = `rating: ⭐ ${item.rating}`;

          const reviews = document.createElement('p');
          reviews.textContent = `reviews: ${item.reviews}`;

          // Adiciona os elementos ao contêiner do item
          itemContainer.appendChild(title);
          itemContainer.appendChild(image);
          itemContainer.appendChild(rating);
          itemContainer.appendChild(reviews);

          // Adiciona o contêiner do item ao cardContainer
          cardContainer.appendChild(itemContainer);
        });
      })
      .catch(error => {
        console.error(error);
      });
  } catch (err) {
    console.error('Error:', err);
  }
});
