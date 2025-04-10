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

          itemContainer.appendChild(title);
          itemContainer.appendChild(image);

          // Cria um footer para o rating e reviews
          const footer = document.createElement('div');
          footer.classList.add('card-footer');

          const rating = document.createElement('span');
          rating.textContent = `⭐ ${item.rating}`;

          const reviews = document.createElement('span');
          reviews.textContent = item.reviews;

          footer.appendChild(rating);
          footer.appendChild(reviews);
          itemContainer.appendChild(footer);


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
