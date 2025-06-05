import { create } from 'zustand'
import axios from 'axios'

export const useProductStore = create((set) => ({

  products: [],

  // Buscar produtos
  getProducts: async () => {
    try {
      const res = await axios.get('api/products')
      set({ products: res.data.data })
    } catch (error) {
      console.error('Erro ao buscar produtos:', error)
    }
  },

  // Criar produto
  createProduct: async (produto) => {
    try {
      const res = await axios.post('api/products', produto)
      return res.data
    } catch (error) {
      console.error('Erro ao criar produto:', error)
      return { success: false, message: 'Erro ao criar produto' }
    }
  },

  // Atualizar produto
  updateProduct: async (id, produtoAtualizado) => {
    
    try {
      const res = await axios.put(`/api/products/${id}`, produtoAtualizado)
      return res.data
    } catch (error) {
      console.error('Erro ao atualizar produto:', error)
      return { success: false, message: 'Erro ao atualizar produto' }
    }
  },

  // Deletar produto
  deleteProduct: async (id) => {
    try {
      await axios.delete(`api/products/${id}`)
      set((state) => ({
        products: state.products.filter((p) => p._id !== id)
      }))
    } catch (error) {
      console.error('Erro ao excluir produto:', error)
    }
  }
}))
