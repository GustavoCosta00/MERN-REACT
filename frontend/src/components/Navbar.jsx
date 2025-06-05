import React from 'react'
import { Container, Flex, Text, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <Container maxW="1140px" px={4} py={6}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ base: "column", sm: "row" }}
        mb={8}
      >
        <Text
          fontSize={{ base: "2xl", sm: "3xl" }}
          fontWeight="bold"
          textAlign="center"
          color="teal.500"
        >
          <Link to="/">Product Store</Link>
        </Text>

        <Button
          as={Link}
          to="/create"
          colorScheme="teal"
          size="md"
          mt={{ base: 4, sm: 0 }}
        >
          Adicionar Produto
        </Button>
      </Flex>
    </Container>
  )
}

export default Navbar
