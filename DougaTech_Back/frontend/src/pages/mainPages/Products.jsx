import { useEffect } from "react";
import { Button, Center, Grid, GridItem, Box } from "@chakra-ui/react";
import ProductCard from "../../layouts/ProductCard";
import { loadProducts } from "../../actions/products";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  const productList = useSelector(
    (state) => state.products?.productList?.results
  );
  const links = useSelector((state) => state.products?.productList);
  // const [page, setPage] = useState(1);

  const handleNextPage = () => {
    if (links && links.next) {
      dispatch(loadProducts({ url: links.next }));
    }
  };

  const handlePrevPage = () => {
    if (links && links.previous) {
      dispatch(loadProducts({ url: links.previous }));
    }
  };

  useEffect(() => {
    dispatch(loadProducts({}));
  }, [dispatch]);

  return (
    <>
      <Center pt={10}>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
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
                  variationsExist={
                    product.variations && product.variations.length > 0
                      ? true
                      : false
                  }
                  slug={product.slug}
                />
              </GridItem>
            ))}
        </Grid>
      </Center>
      <Center>
        <Button onClick={handlePrevPage} disabled={!links?.previous}>
          Previous Page
        </Button>
        <Button onClick={handleNextPage} disabled={!links?.next}>
          Next Page
        </Button>
      </Center>
    </>
  );
};

export default Products;
