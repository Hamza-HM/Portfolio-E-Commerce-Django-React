import React, { useEffect, useState } from "react";
import { Box, Button, Center, Grid, GridItem } from "@chakra-ui/react";
import ProductCard from "../../layouts/ProductCard";
import { loadProducts } from "../../actions/products";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  const productList = useSelector(
    (state) => state.products?.productList?.results
  );
  const [page, setPage] = useState(1);
  console.log(page);
  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page !== 0) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    dispatch(loadProducts({ page }));
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
        <Button onClick={handleNextPage}>next page</Button>
        <Button onClick={handlePrevPage}>next page</Button>
      </Grid>
    </Center>
  );
};

export default Products;
