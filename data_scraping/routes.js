// realiza as importações necessárias
import {Router} from 'express';
import AmazonScraper from './AmazonScraper.js';

// cria uma instância do Router
const route = Router();

// define a rota para o scraping
route.get('/api/scrape/:keyword', (req, res) => {
  // obtém o parâmetro da URL
  const keyword = req.params.keyword;

  // cria uma instância do AmazonScraper para utilizar os métodos de scraping
  const scraper = new AmazonScraper();

  // chama o método searchProducts do AmazonScraper e envia a resposta como JSON
  scraper.searchProducts(keyword).then(products => {
    res.json(products);
  });
});

// exporta a rota para ser utilizada em outros arquivos
export default route;
