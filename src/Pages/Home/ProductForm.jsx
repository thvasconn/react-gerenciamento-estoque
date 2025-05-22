import React from 'react';
import './styles.css';
import './mediaqueries.css';
import { useState } from 'react';
import api from '../../services/api';


function ProductForm({ onClose, setData, data }) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [currentQuantity, setCurrentQuantity] = useState('');
    const [minimumStock, setMinimumStock] = useState('');
    const [costPrice, setCostPrice] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const nameOptions = ['Alimentos', 'Bebidas', 'Higiene', 'Limpeza', 'Hortifruti', 'Congelados', 'Pet Shop'];



    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!name || !category || !currentQuantity || !minimumStock || !costPrice) {
            alert('Preencha todos os campos obrigatórios.');
            return;
        }

        try {
            const response = await api.post('/products', {
                name: name,
                category: category,
                quantity: currentQuantity,
                minStock: minimumStock,
                costPrice: costPrice,
                expirationDate: expirationDate
            });
            console.log('Produto criado com sucesso!');

            await api.post('/movements', {
                productId: response.data._id,
                type: 'entrada',
                quantity: currentQuantity,
                date: new Date().toISOString()
            });

            if (setData && data) {
                setData([...data, response.data]);
            }
            
            onClose();
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            alert('Erro ao criar produto. Tente novamente.');
        }
    };



    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Adicionar Produto</h2>
                <form onSubmit={handleSubmit}>
                    <label>Nome <span className='required'>*</span>:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <div className='dropdown2'>
                        <label>Categoria <span className='required'>*</span>:</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Selecione uma categoria</option>
                            {nameOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <label>Quantidade Atual <span className='required'>*</span>:</label>
                    <input type="number" value={currentQuantity} onChange={(e) => setCurrentQuantity(e.target.value)} />
                    <label>Estoque Mínimo <span className='required'>*</span>:</label>
                    <input type="number" value={minimumStock} onChange={(e) => setMinimumStock(e.target.value)} />
                    <label>Preço de Custo <span className='required'>*</span>:</label>
                    <input type="number" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} />
                    <label>Data de Expiração:</label>
                    <input type="date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} />
                    <div>
                        <button type="submit">Salvar</button>
                        <button onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductForm;