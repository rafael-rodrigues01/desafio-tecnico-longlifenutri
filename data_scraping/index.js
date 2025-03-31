const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

//função de teste para buscar os dados da url do site da amazon utilizando o axios

const generateUrl = (searchText) => `https://www.amazon.com/s?k=${searchText}&crid=26UOD2FLHP794`;

const getData = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: 'application/json, text/javascript, */*; q=0.01',
        Host: 'www.amazon.com.br',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 OPR/117.0.0.0'
      }
    });
    
    console.log(`dados: ${response.data}`);
    const dom = new JSDOM(response.data);
    const document = dom.window.document;
     // Exibe o HTML completo da página
    
  }
  catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
}

//como estou usando async/await, não preciso usar o then e o catch 
const fetchData = async () => {
  const url = generateUrl('radio');
  const data = await getData(url);
  // console.log(data);
};

fetchData();