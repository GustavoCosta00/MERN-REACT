import React, { useEffect } from 'react'
import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  Image,
  Spinner,
  Center
} from '@chakra-ui/react'
import { useProductStore } from '../store/product'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const { products, getProducts, deleteProduct } = useProductStore()
  const navigate = useNavigate()

  useEffect(() => {
    getProducts()
  }, [])

  if (!products) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="teal.500" />
      </Center>
    )
  }

  return (
    <Container maxW="container.lg" py={8}>
      <Heading mb={6} color="teal.500">Lista de Produtos</Heading>

      {products.length === 0 ? (
        <Text color="gray.500">Nenhum produto encontrado.</Text>
      ) : (
        <Stack spacing={6}>
          {products.map((product) => (
            <Box key={product._id} p={4} bg="gray.100" rounded="md" shadow="md">
              <Stack direction="row" align="center" justify="space-between">
                <Box>
                  <Heading size="md">{product.name}</Heading>
                  <Text color="gray.600">Preço: R$ {product.price}</Text>
                  {product.image && (
                    <Image src={product.image} alt={product.name} mt={2} maxW="200px" />
                  )}
                </Box>
                <Stack spacing={2}>
                  <Button
                    colorScheme="blue"
                    onClick={() => navigate(`/edit/${product._id}`)}
                  >
                    Editar
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Excluir
                  </Button>
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </Container>
  )
}

export default HomePage
