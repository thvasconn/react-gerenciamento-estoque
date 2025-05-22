import { useState, useEffect } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/src/vite.svg'
import './styles.css'
import api from '../../services/api'
import { FiEdit, FiTrash } from 'react-icons/fi';
import ProductForm from './ProductForm';
import './mediaqueries.css';

function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movements, setMovements] = useState({});
  const [search, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [stats, setStats] = useState({
    recentEntries: 0,
    recentExits: 0,
  });

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setCategoryFilter(category);
  }

  const getProductsAndStats = async () => {
    try {
      const productsResponse = await api.get('/products');
      setProducts(productsResponse.data);

      const movementsResponse = await api.get('/movements', {
        params: {
          startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date().toISOString(),
        }
      });
      
      const validMovements = movementsResponse.data.filter(m => m.type === 'entrada' || m.type === 'saída');

      const entries = validMovements.filter(m => m.type === 'entrada').length;
      const exits = validMovements.filter(m => m.type === 'saída').length;

      console.log(validMovements);
      console.log("Entradas: ", entries);
      console.log("Saídas: ", exits);

      setMovements(validMovements);
      setStats({
        recentEntries: entries,
        recentExits: exits

      
      });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };


  useEffect(() => {
    getProductsAndStats();
  }, []);

  useEffect(() => {
    setLoading(true);
    api.get('/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
        setError(error.message || 'Erro ao buscar produtos');
        setLoading(false);
      });
  }, []);


  useEffect(() => {
    if (search === '' && loading) return;

    const timer = setTimeout(() => {
      getProductsBySearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, categoryFilter]);

  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    getProductsAndStats();
  };

  async function handleDelete(id) {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(product => product._id !== id));


      await api.post('/movements', {
        productId: id,
        type: 'saída',
        quantity: products.find(product => product._id === id).quantity,
        date: new Date().toISOString()
        
      });
      getProductsAndStats();
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  }


  const getProductsBySearch = async (search) => {
    setLoading(true);
    try {
      const params = {};
      if (search) {
        params.search = search
      }
      if (categoryFilter) {
        params.category = categoryFilter;
      }

      const response = await api.get('/products', { params });
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setError(error.message || 'Erro ao buscar produtos');
      setLoading(false);
    }
  }


  const handleSearch = (e) => {
      const searchTerm = e.target.value;
      setSearchTerm(searchTerm);
  }

  return (
    <div className="container">
      <h1>Gerenciamento de Estoque</h1>

      <div className="stats-container">
        <div className="stat-card">
          <h2>Total de Produtos</h2>
          <p className="stat-number">{products.length}</p>
        </div>
        <div className="stat-card">
          <h2>Últimas Entradas</h2>
          <p className="stat-number">{stats.recentEntries}</p>
        </div>
        <div className="stat-card">
          <h2>Últimas Saídas</h2>
          <p className="stat-number">{stats.recentExits}</p>
        </div>
      </div>

      <div className="filters-container">
        <input type="text" placeholder="Pesquisar..." className="search-input" onChange={handleSearch} />
        <div className="dropdown">
          <select name="category" id="category" value={categoryFilter} onChange={handleCategoryChange}>
            <option value="">Categoria</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Higiene">Higiene</option>
            <option value="Limpeza">Limpeza</option>
            <option value="Hortifruti">Hortifruti</option>
            <option value="Congelados">Congelados</option>
            <option value="Pet Shop">Pet Shop</option>
          </select>
        </div>
        <div className="dropdown">
          <select name="quantity" id="quantity" defaultValue="">
            <option value="">Quantidade</option>
            <option value="low">Baixo Estoque</option>
            <option value="medium">Médio Estoque</option>
            <option value="high">Alto Estoque</option>
          </select>
        </div>
        <input type="date" placeholder="Expiration Date" className="date-input" />
        <button className="add-button" onClick={handleOpenForm}>Adicionar Produto</button>
        {isFormOpen && (
          <ProductForm onClose={handleCloseForm} setProducts={setProducts} products={products} />
        )}
      </div>

      <div className="table-container">
        {loading ? (
          <p>Carregando produtos...</p>
        ) : error ? (
          <p className='error-message'>Erro ao carregar produtos: {error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Código do Produto</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Quantidade Atual</th>
                <th>Estoque Mínimo</th>
                <th>Preço de Custo</th>
                <th>Data de Expiração</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.code}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.quantity}</td>
                    <td>{product.minStock}</td>
                    <td>{product.costPrice}</td>
                    <td>{product.expirationDate}</td>
                    <td>
                      <a href="#" className="edit-link" title='Editar'>
                        <FiEdit />
                      </a>
                      <a href="#" className="remove-link icon-spacing" title='Remover' onClick={(e) => {
                        e.preventDefault();
                        handleDelete(product._id);
                      }}>
                        <FiTrash />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center' }}>
                    Nenhum produto encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Home;