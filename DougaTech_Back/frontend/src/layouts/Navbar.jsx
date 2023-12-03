import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useEffect, useState } from "react";
const links = [
  { name: "Home", link: "/" },
  { name: "Products", link: "/products" },
  { name: "About", link: "/list" },
  // { name: "Authenticate", link: "/authenticate" },
];

const authLinks = [
  { name: "Login", link: "/login" },
  { name: "Signup", link: "/signup" },
];

const NavLink = (props) => {
  const { children, path } = props; // Destructure 'path' from props
  return (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.600", "gray.700"),
      }}
      to={path} // Use 'href' for anchor tag
    >
      {children}
    </Link>
  );
};

const WithAction = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [quantity, setQuantity] = useState(0);
  const { isAuthenticated } = useSelector((state) => state?.auth);
  const order_items = useSelector(
    (state) => state.cart.shoppingCart?.order_items
  );
  const dispatch = useDispatch();
  console.log(order_items);
  const handleCalculateQuantity = () => {
    if (order_items) {
      const totalQuantity = order_items.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      setQuantity(totalQuantity);
    }
  };
  useEffect(() => {
    handleCalculateQuantity();
  }, [order_items]);

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Box>
            <Link to="/" aria-label="Home">
              Logo
            </Link>
          </Box>
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {/* Iterate over 'links' array and render NavLink for each link */}
              {links.map((link) => (
                <NavLink key={link.name} path={link.link}>
                  {link.name}
                </NavLink>
              ))}
              <IconButton
                display={"flex"}
                rounded="full"
                onClick={toggleColorMode}
                aria-label="Toggle color mode"
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              />
            </HStack>
          </HStack>
          <HStack>
            {quantity > 0 && ( // Display quantity only if it's greater than 0
              <Box
                position="absolute"
                top="-8px"
                right="-8px"
                bg="red.500"
                color="white"
                borderRadius="full"
                padding="2px 6px"
                fontSize="xs"
              >
                {quantity}
              </Box>
            )}
            <IconButton
              variant="shadow"
              area-label="Cart"
              icon={<AiOutlineShoppingCart />}
              onClick={() => console.log(quantity)}
            />
            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  onClick={handleLogout}
                  aria-label="Toggle color mode"
                >
                  Logout
                </Link>
                <Link to="/profile" aria-label="Profile">
                  Profile
                </Link>
              </>
            ) : (
              authLinks.map((link) => (
                <NavLink key={link.name} path={link.link}>
                  {link.name}
                </NavLink>
              ))
            )}
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={6}>
              {/* Render NavLink for each link in 'links' array */}
              {links.map((link) => (
                <NavLink key={link.name} path={link.link}>
                  {link.name}
                </NavLink>
              ))}

              {isAuthenticated ? (
                <Link
                  to="/"
                  onClick={handleLogout}
                  aria-label="Toggle color mode"
                >
                  Logout
                </Link>
              ) : (
                authLinks.map((link) => (
                  <NavLink key={link.name} path={link.link}>
                    {link.name}
                  </NavLink>
                ))
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default WithAction;
