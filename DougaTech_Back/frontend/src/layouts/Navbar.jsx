import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  SlideFade,
  Slide,
  ScaleFade,
  Collapse,
  VStack,
  Fade,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/auth";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const links = [
  { name: "Home", link: "/" },
  { name: "Products", link: "/products" },
  { name: "About", link: "/about" },
  // { name: "Authenticate", link: "/authenticate" },
];

const authLinks = [
  { name: "Login", link: "/login" },
  { name: "Signup", link: "/signup" },
];

const NavLink = React.memo(({ children, path, onClick, className }) => {
  const location = useLocation();

  return (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        bg: useColorModeValue("gray.600", "gray.100"),
      }}
      className={`nav-link ${location.pathname === path ? "active" : ""}`}
      onClick={onClick} // Use the handleClick function here
      to={path}
    >
      {children}
    </Link>
  );
});

const WithAction = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state?.auth);
  const order_items = useSelector(
    (state) => state.cart.shoppingCart?.order_items
  );
  const [scrollDirection, setScrollDirection] = useState(null)
  useEffect(() => {
    const handleScroll = () => {
      let currentScroll = window.scrollY
      if (currentScroll > scrollPos) setScrollDirection('down')
      if (currentScroll < scrollPos) setScrollDirection('up')
      scrollPos = currentScroll
  }
  let scrollPos = window.scrollY
  window.addEventListener('scroll', handleScroll)
  return () => {
    window.removeEventListener('scroll', handleScroll)
  }

  }, [])
  
  const handleCalculateQuantity = () => {
    if (order_items && order_items.length > 0) {
      const totalQuantity = order_items.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      setQuantity(totalQuantity);
    } else {
      setQuantity("0");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    handleCalculateQuantity();
  }, [order_items]);

  return (
    <Box position="sticky" top="0" zIndex={100}>
      <Box
        bg={useColorModeValue("gray.200", "blackAlpha.900")}
        px={4}
        fontSize={13}
        position="absolute"
        top="0"
        w="100%"
        style={{
          transition: "height 0.3s ease-in-out, transform .3s ease-in-out",
          transform: scrollDirection === 'down' ?'translateY(-52px)': 'translateY(0)',
          height: isOpen ? "260px" : "45px",
        }}

      >
        <Flex h={12} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            bg="transparent"
            onClick={isOpen ? onClose : onOpen}
          />
          <Box>
            <Link to="/" aria-label="Home">
              GraphiCode
            </Link>
          </Box>
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {links.map((link) => (
                <NavLink key={link.name} path={link.link} name={link.name}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <HStack>
            <IconButton
              display={"flex"}
              rounded="9px"
              size="sm"
              bg="transparent"
              onClick={toggleColorMode}
              aria-label="Toggle color mode"
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            />
            {isAuthenticated ? (
              <>
                <Box display="flex" alignItems="center">
                  {quantity > 0 && (
                    <Box
                      position="relative "
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
                  <NavLink path="/cart">
                    <IconButton
                      variant="shadow"
                      area-label="Cart"
                      icon={<AiOutlineShoppingCart />}
                    />
                  </NavLink>
                </Box>
                <Box display={{ base: "none", md: "none", lg: "flex" }} gap={8}>
                  <Link to="/" onClick={handleLogout} aria-label="Logout">
                    Logout
                  </Link>
                </Box>
                <NavLink aria-label="Profile" path={"/profile"}>
                  <CgProfile size="20px" />
                </NavLink>
              </>
            ) : (
              authLinks.map((link) => (
                <NavLink
                  key={link.name}
                  name={link.name}
                  path={link.link}
                  onClick={onClose}
                >
                  {link.name}
                </NavLink>
              ))
            )}
          </HStack>
        </Flex>
        {/* Mobile */}
        <Box p={5} className={`${isOpen ? "fade" : "noFade"}`}>
          <Stack as={"nav"} spacing={6}>
            {links.map((link) => (
              <>
                <NavLink
                  className="douga"
                  key={link.name}
                  onClick={onClose}
                  path={link.link}
                  name={link.name}
                >
                  {link.name}
                </NavLink>
              </>
            ))}
            {isAuthenticated ? (
              <NavLink to="/" onClick={handleLogout} aria-label="Logout">
                Logout
              </NavLink>
            ) : (
              <></>
            )}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default WithAction;
