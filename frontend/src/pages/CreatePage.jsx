import React, { useState } from 'react'
import {
  Container,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/react'
import { useProductStore } from '../store/product'
import { useNavigate } from 'react-router-dom'

const CreatePage = () => {
  const [novoProduto, setNovoProduto] = useState({
    name: '',
    price: '',
    image: ''
  })

  const createProduct = useProductStore((state) => state.createProduct)
  const getProducts = useProductStore((state) => state.getProducts)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setNovoProduto((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await createProduct(novoProduto)

    if (res?.success === false) {
      alert(res.message)
    } else {
      alert('Produto criado com sucesso!')
      setNovoProduto({ name: '', price: '', image: '' })

      await getProducts() // atualiza os produtos na store
      navigate('/')       // redireciona para Home
    }
  }

  return (
    <Container maxW="lg" py={8}>
      <Heading mb={6} textAlign="center" color="teal.500">
        Criar Novo Produto
      </Heading>

      <Box as="form" onSubmit={handleSubmit} bg="gray.50" p={6} rounded="md" shadow="md">
        <FormControl mb={4} isRequired>
          <FormLabel>Nome do Produto</FormLabel>
          <Input
            name="name"
            placeholder="Ex: Fone de ouvido"
            value={novoProduto.name}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb={4} isRequired>
          <FormLabel>Preço</FormLabel>
          <Input
            name="price"
            type="number"
            placeholder="Ex: 99.90"
            value={novoProduto.price}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Imagem (URL)</FormLabel>
          <Input
            name="image"
            placeholder="https://exemplo.com/imagem.jpg"
            value={novoProduto.image}
            onChange={handleChange}
          />
        </FormControl>

        <Button colorScheme="teal" type="submit" width="full">
          Salvar Produto
        </Button>
      </Box>
    </Container>
  )
}

export default CreatePage
