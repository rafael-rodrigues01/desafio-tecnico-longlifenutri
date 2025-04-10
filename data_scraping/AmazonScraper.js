// realiza as importações necessárias
import axios from 'axios';
import jsdom from 'jsdom';

// importa a classe JSDOM da biblioteca do jsdom que permite criar e manipular um DOM virtual
const {JSDOM} = jsdom;

// cria a classe AmazonScraper e a exporta como padrão para ser reutilizada em outros arquivos
export default class AmazonScraper {
  constructor() {
    // Configurações padrão para evitar que o Amazon bloqueie o scraper
    this.baseUrl = 'https://www.amazon.com/s?k=';
    this.headers = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
    };
  }

  /**
   * Gera a URL de pesquisa
   * @param {string} searchTerm - Termo de busca
   * @returns {string} URL completa
   */

  // Gera a URL de pesquisa com o termo de busca codificado
  generateUrl(searchTerm) {
    return `${this.baseUrl}${encodeURIComponent(searchTerm)}&ref=nb_sb_noss`;
  }

  /**
   * Faz a requisição HTTP e retorna o DOM
   * @param {string} url - URL para fazer scraping
   * @returns {Promise<Document>} DOM virtual
   */

  // Faz a requisição HTTP para obter o conteúdo da página
  async fetchPage(url) {
    try {
      const response = await axios.get(url, {headers: this.headers});
      const dom = new JSDOM(response.data);
      return dom.window.document;
    } catch (error) {
      console.error(`Error fetching page: ${url}`, error);
      throw error;
    }
  }

  /**
   * Extrai os dados de um produto
   * @param {Element} productElement - Elemento DOM do produto
   * @returns {object} Dados do produto
   */

  // Extrai os dados de um produto específico
  extractProductData(productElement) {
    const titleElement = productElement.querySelector('a h2 span');
    const imageElement = productElement.querySelector('.s-image');
    const ratingElement = productElement.querySelector(
      '.a-icon-star-small span.a-icon-alt'
    );
    const reviewsElement = productElement.querySelector('.a-size-base');

    return {
      title: titleElement ? titleElement.textContent.trim() : 'Title not found',
      imageUrl: imageElement ? imageElement.src : 'Imagem não encontrada',
      rating: ratingElement
        ? ratingElement.textContent.trim().split(' ')[0]
        : 'No rating',
      reviews:
        reviewsElement && !isNaN(parseFloat(reviewsElement.textContent.trim()))
          ? reviewsElement.textContent.trim()
          : 'No reviews',
    };
  }

  /**
   * Extrai todos os produtos da página
   * @param {Document} document - DOM virtual da página
   * @returns {array} Lista de produtos
   */

  // Extrai todos os produtos da página de resultados
  extractAllProducts(document) {
    const products = document.querySelectorAll('.s-main-slot > .s-result-item');
    const results = [];

    for (const product of products) {
      if (product) {
          const data = this.extractProductData(product);

          // Verifica se é um produto válido antes de adicionar
          if (
            data.title !== 'Title not found' &&
            data.imageUrl !== 'Imagem não encontrada'
          ) {
            results.push(data);
          }
        }
      }

      return results;
    }

  /**
   * Método principal para buscar produtos
   * @param {string} searchTerm - Termo de busca
   * @param {object} options - Opções adicionais
   * @returns {Promise<array>} Lista de produtos
   */

  // Método principal que combina todas as funções
  async searchProducts(searchTerm, options = {}) {
    try {
      const url = this.generateUrl(searchTerm);
      const document = await this.fetchPage(url);

      if (options.singleProduct) {
        const firstProduct = document.querySelector(
          '.s-main-slot > .s-result-item'
        );
        return firstProduct ? this.extractProductData(firstProduct) : null;
      }

      return this.extractAllProducts(document);
    } catch (error) {
      console.error('Error in searchProducts:', error);
      throw error;
    }
  }
}
