import React, { useEffect } from "react";
import { Box, Center, Grid, GridItem } from "@chakra-ui/react";
import ProductCard from "../../layouts/ProductCard";
import { loadProducts } from "../../actions/products";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  const productList = useSelector(
    (state) => state.products?.productList?.results
  );

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  return (
    <Center>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={5}
        p={5}
        w="100%"
      >
        {productList &&
          productList.map((product) => (
            <GridItem key={product.id}>
              <ProductCard
                id={product.id}
                name={product.title}
                category={product.category.title}
                label={product.label.title}
                discountPrice={product.discount_price}
                image={product.image}
                description={product.description}
                price={product.price}
              />
            </GridItem>
          ))}
      </Grid>
    </Center>
  );
};

export default Products;
