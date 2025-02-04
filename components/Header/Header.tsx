import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Flex,
    HStack,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import headerLogo from "../../img/CS_Club_Logo_White.png";
import React, { useRef } from "react";
import Link from "next/link";

const menuItems = [
    {
        name: "Home",
        url: "/",
        outlined: false,
    },
    {
        name: "Resources",
        url: "/resources",
        outlined: false,
    },
    {
        name: "Events",
        url: "/events",
        outlined: false,
    },
    {
        name: "News",
        url: "/news",
        outlined: false,
    },
    {
        name: "Join The Club!",
        url: "/join",
        outlined: true,
    },
];

const Header: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const headerRef = useRef<HTMLDivElement>(null);

    return (
        <Box as="header" w="100%" ref={headerRef}>
            <Flex
                as="nav"
                w="100%"
                minH={{ base: "75px", sm: "87.5px", md: "100px" }}
                px={{ base: "16px", md: "50px", lg: "100px" }}
                alignItems="center"
                bg="#004da8"
            >
                <Box w={{ base: "45%", sm: "35%", md: "20%", lg: "25%" }}>
                    <Image src={headerLogo} alt="North Seattle College Logo" />
                </Box>

                <Box flexGrow={1} />

                <HStack
                    display={{ base: "none", md: "initial" }}
                    spacing="40px"
                >
                    {menuItems.map(({ name, url, outlined }) => (
                        <Link key={name} href={url}>
                            <Text
                                as="span"
                                fontSize={{
                                    base: "1.2em",
                                    sm: "1.3em",
                                    md: "1.4em",
                                    lg: "1.7em",
                                }}
                                color={outlined ? "#004da8" : "white"}
                                bg={outlined ? "white" : null}
                                p={outlined ? "10px" : null}
                                borderRadius={outlined ? "50px" : null}
                                _hover={{
                                    bg: outlined ? "#95ca59" : null,
                                    color: outlined ? "black" : null,
                                }}
                            >
                                {name}
                            </Text>
                        </Link>
                    ))}
                </HStack>

                <Box display={{ base: "initial", md: "none" }}>
                    <Button onClick={onOpen} bg="#95ca59" borderRadius="0px">
                        Menu
                    </Button>
                </Box>
                <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                    <DrawerOverlay />

                    <DrawerContent>
                        <DrawerCloseButton
                            right="initial"
                            top={
                                // The button is 32px in length.
                                ((headerRef.current?.clientHeight || 0) - 32) /
                                    2 +
                                "px"
                            }
                            left="20px"
                            color="white"
                            fontSize="20px"
                        />

                        <DrawerBody p="initial">
                            <Box
                                w="100%"
                                h={headerRef.current?.clientHeight || 0}
                                bg="#004da8"
                            />

                            <VStack spacing="30px" p="20px">
                                {menuItems.map(({ name, url }) => (
                                    <Link
                                        style={{ width: "100%" }}
                                        key={name}
                                        href={url}
                                    >
                                        <Text fontSize="1.5em" color="#004da8">
                                            {name}
                                        </Text>
                                    </Link>
                                ))}
                            </VStack>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Flex>
        </Box>
    );
};

export default Header;
