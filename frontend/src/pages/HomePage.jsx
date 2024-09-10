import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Text, VStack, SimpleGrid } from '@chakra-ui/react'
import { useProductStore } from '../store/product'
import ProductCard from '../components/ProductCard'

function HomePage() {

  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])


  return (
    <Container maxW='container.xl' py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}>Current Products
        </Text>

        <SimpleGrid
          columns={{
            base: 3,
            md: 3,
            sm: 2
          }}
          spacing={3}
          w={"full"}>

          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}

        </SimpleGrid>

        {products.length === 0 && (
          <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
            No products found 😢{" "}
            <Link to={"/create"}>
              <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                Create a product
              </Text>
            </Link>
          </Text>
        )}

      </VStack>

    </Container>
  )
}

export default HomePage