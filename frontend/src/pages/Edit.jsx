import React, { useEffect, useState } from 'react'
import {
  Container,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Spinner
} from '@chakra-ui/react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProductStore } from '../store/product'

const Edit = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, updateProduct, getProducts } = useProductStore()

  const [produtoEditado, setProdutoEditado] = useState(null)

  useEffect(() => {
    const carregarProduto = async () => {
if (!products || products.length === 0) await getProducts()
      const produto = products.find(p => p._id === id)
      if (produto) {
        setProdutoEditado({ ...produto })
      } else {
        alert("Produto não encontrado.")
        navigate('/')
      }
    }

    carregarProduto()
  }, [id, products, getProducts, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProdutoEditado(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    await updateProduct(id, produtoEditado)
    await getProducts()
    alert("Produto atualizado com sucesso!")
    navigate('/')
  } catch (error) {
    alert("Erro ao atualizar o produto: " + (error.message || "Tente novamente."))
  }
}

  if (!produtoEditado) {
    return (
      <Container py={8} textAlign="center">
        <Spinner size="xl" color="teal.500" />
      </Container>
    )
  }

  return (
    <Container maxW="lg" py={8}>
      <Heading mb={6} textAlign="center" color="teal.500">
        Editar Produto
      </Heading>

      <Box as="form" onSubmit={handleSubmit} bg="gray.50" p={6} rounded="md" shadow="md">
        <FormControl mb={4} isRequired>
          <FormLabel>Nome do Produto</FormLabel>
          <Input
            name="name"
            value={produtoEditado.name}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb={4} isRequired>
          <FormLabel>Preço</FormLabel>
          <Input
            name="price"
            type="number"
            value={produtoEditado.price}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Imagem (URL)</FormLabel>
          <Input
            name="image"
            value={produtoEditado.image}
            onChange={handleChange}
          />
        </FormControl>

        <Button colorScheme="teal" type="submit" width="full">
          Atualizar Produto
        </Button>
      </Box>
    </Container>
  )
}

export default Edit
