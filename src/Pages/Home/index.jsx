import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/src/vite.svg'
import './styles.css'

function Home() {
  return (
    <div className="container">
        <h1>Gerenciamento de Estoque</h1>
        
        <div className="stats-container">
            <div className="stat-card">
                <h2>Total de Produtos</h2>
                <p className="stat-number">150</p>
            </div>
            <div className="stat-card">
                <h2>Últimas Entradas</h2>
                <p className="stat-number">5</p>
            </div>
            <div className="stat-card">
                <h2>Últimas Saídas</h2>
                <p className="stat-number">3</p>
            </div>
        </div>
        
        <div className="filters-container">
            <input type="text" placeholder="Pesquisar..." className="search-input" />
            <div className="dropdown">
                <select name="category" id="category" defaultValue="">
                    <option value="" disabled>Categoria</option>
                    <option value="electronics">Eletrônicos</option>
                    <option value="hardware">Hardware</option>
                    <option value="clothing">Vestuário</option>
                </select>
            </div>
            <div className="dropdown">
                <select name="quantity" id="quantity" defaultValue="">
                    <option value="" disabled>Quantidade</option>
                    <option value="low">Baixo Estoque</option>
                    <option value="medium">Médio Estoque</option>
                    <option value="high">Alto Estoque</option>
                </select>
            </div>
            <input type="date" placeholder="Expiration Date" className="date-input" />
            <button className="add-button">Adicionar Produto</button>
        </div>
        
        <div className="table-container">
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
                    <tr>
                        <td>PD001</td>
                        <td>Widget A</td>
                        <td>Eletrônicos</td>
                        <td>100</td>
                        <td>20</td>
                        <td>R$10.00</td>
                        <td>2023-12-31</td>
                        <td><a href="#" className="edit-link">Editar</a></td>
                    </tr>
                    <tr>
                        <td>PD002</td>
                        <td>Gadget B</td>
                        <td>Eletrônicos</td>
                        <td>50</td>
                        <td>10</td>
                        <td>R$20.00</td>
                        <td>2024-06-30</td>
                        <td><a href="#" className="remove-link">Remover</a></td>
                    </tr>
                    <tr>
                        <td>PD003</td>
                        <td>Tool C</td>
                        <td>Hardware</td>
                        <td>200</td>
                        <td>50</td>
                        <td>R$5.00</td>
                        <td>2025-01-15</td>
                        <td><a href="#" className="edit-link">Editar</a></td>
                    </tr>
                    <tr>
                        <td>PD004</td>
                        <td>Accessory D</td>
                        <td>Clothing</td>
                        <td>75</td>
                        <td>25</td>
                        <td>R$8.00</td>
                        <td>2024-09-10</td>
                        <td><a href="#" className="remove-link">Remover</a></td>
                    </tr>
                    <tr>
                        <td>PD005</td>
                        <td>Widget E</td>
                        <td>Electronics</td>
                        <td>120</td>
                        <td>30</td>
                        <td>R$12.00</td>
                        <td>2023-11-25</td>
                        <td><a href="#" className="edit-link">Editar</a></td>
                    </tr>
                    <tr>
                        <td>PD006</td>
                        <td>Tool F</td>
                        <td>Hardware</td>
                        <td>95</td>
                        <td>15</td>
                        <td>R$25.00</td>
                        <td>2025-03-05</td>
                        <td><a href="#" className="remove-link">Remover</a></td>
                    </tr>
                    <tr>
                        <td>PD006</td>
                        <td>Tool F</td>
                        <td>Hardware</td>
                        <td>95</td>
                        <td>40</td> 
                        <td>R$40.00</td>
                        <td>2025-03-05</td>
                        <td><a href="#" className="edit-link">Editar</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Home