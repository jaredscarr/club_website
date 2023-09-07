import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import PageCard from "../components/PageCard/PageCard";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import bannerImg from "../img/Homepage-Background.svg";
import bannerImgCover from "../img/Homepage-Background-Text.svg";
import { GetServerSideProps } from "next";
import { getNewsCards, NewsCard } from "../lib/News";
import { EventCard, getEventCards } from "../lib/Event";

const Index = ({ news, events }: { news: NewsCard[]; events: EventCard[] }) => {
    return (
        <Flex flexDir="column" minW="100%" minH="100%">
            <Header />

            <Box>
                {/* I don't like using pixels here, but the flex breaks percentages. */}
                <Box
                    w="100%"
                    h={{
                        base: "300px",
                        sm: "400px",
                        md: "500px",
                        lg: "600px",
                        xl: "700px",
                    }}
                    // Needed for the image.
                    pos="relative"
                >
                    <Image
                        src={bannerImg}
                        alt=""
                        style={{
                            objectFit: "cover",
                            userSelect: "none",
                            pointerEvents: "none",
                            position: "absolute",
                            zIndex: "-1000",
                            width: "100%",
                            height: "100%",
                        }}
                    />

                    <Image
                        src={bannerImgCover}
                        alt=""
                        style={{
                            userSelect: "none",
                            pointerEvents: "none",
                            position: "absolute",
                            zIndex: "-999",
                            width: "100%",
                            height: "100%",
                        }}
                    />

                    <Box h={{ base: "25%", md: "30%", lg: "35%" }} />

                    <Heading
                        as="h1"
                        mx="10%"
                        pb={{ base: "30px", md: "70px", lg: "100px" }}
                        textAlign="center"
                        size={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
                    >
                        Inspirational and Welcoming Words!
                    </Heading>
                    <Box textAlign="center">
                        <Link href="/join" style={{ textDecoration: "none" }}>
                            <Text
                                as="span"
                                fontSize={{
                                    base: "1.3em",
                                    sm: "1.8em",
                                    md: "2.1em",
                                    lg: "2.4em",
                                }}
                                color="white"
                                bg="#004da8"
                                p="15px"
                                borderRadius="50px"
                                transition="all 0.3s ease"
                                _hover={{
                                    bg: "#95ca59",
                                    color: "black",
                                }}
                            >
                                Join The Club!
                            </Text>
                        </Link>
                    </Box>
                </Box>

                <Box
                    py={{ base: "10px", sm: "15px", md: "20px" }}
                    px={{
                        base: "30px",
                        sm: "50px",
                        md: "75px",
                        lg: "100px",
                        xl: "150px",
                    }}
                    bg="white"
                >
                    <Heading
                        as="h2"
                        color="#95ca59"
                        py={{ base: "20px", sm: "25px", md: "30px" }}
                        textAlign="center"
                        size="2xl"
                    >
                        Who We Are
                    </Heading>
                    <Text
                        pb="30px"
                        textAlign="center"
                        fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec at ipsum convallis, pretium ex vitae, malesuada
                        est. Suspendisse vitae fermentum justo, ut elementum
                        justo. In ligula ante, sagittis id nulla ac, rhoncus
                        congue ante. Proin sollicitudin sapien eget viverra
                        eleifend. Aliquam quis sem ut diam porttitor consequat
                        nec id urna. Donec venenatis commodo sem, id volutpat
                        neque ullamcorper elementum. Mauris in lorem at turpis
                        elementum aliquam. Ut blandit pretium accumsan.
                    </Text>
                </Box>

                <Box py="30px" px="20px" bg="#004da8">
                    <Flex
                        flexDir={{ base: "column", lg: "row" }}
                        w="100%"
                        h="100%"
                    >
                        <Box
                            w={{ base: "100%", lg: "50%" }}
                            p={{
                                base: "10px",
                                sm: "20px",
                                md: "30px",
                                lg: "40px",
                                xl: "50px",
                            }}
                        >
                            <Heading
                                as="h2"
                                color="#95ca59"
                                py={{ base: "20px", sm: "25px", md: "30px" }}
                                textAlign="center"
                                size="2xl"
                                whiteSpace="nowrap"
                            >
                                News
                            </Heading>

                            <VStack spacing="100px">
                                {news.map((newsItem) => (
                                    <PageCard
                                        key={newsItem.id}
                                        title={newsItem.title}
                                        time={new Date(newsItem.date * 1000)}
                                        description={newsItem.description}
                                        url={"/news/" + newsItem.id}
                                    />
                                ))}
                            </VStack>
                        </Box>

                        <Box
                            w={{ base: "100%", lg: "50%" }}
                            p={{
                                base: "10px",
                                sm: "20px",
                                md: "30px",
                                lg: "40px",
                                xl: "50px",
                            }}
                        >
                            <Heading
                                as="h2"
                                color="#95ca59"
                                py={{ base: "20px", sm: "25px", md: "30px" }}
                                textAlign="center"
                                size="2xl"
                                whiteSpace="nowrap"
                            >
                                Upcoming Events
                            </Heading>

                            <VStack spacing="100px">
                                {events.map((eventItem) => (
                                    // TODO: Use event images.
                                    <PageCard
                                        key={eventItem.id}
                                        title={eventItem.title}
                                        time={new Date(eventItem.date * 1000)}
                                        description={eventItem.description}
                                        url={
                                            "https://gdsc.community.dev/events/details/" +
                                            eventItem.id
                                        }
                                    />
                                ))}
                            </VStack>
                        </Box>
                    </Flex>
                </Box>
            </Box>

            <Box flexGrow={1} />

            <Footer whiteBg />
        </Flex>
    );
};

export const getServerSideProps: GetServerSideProps = async (props) => {
    const news = await getNewsCards(2);
    const events = await getEventCards(2);

    return {
        props: {
            news,
            events,
        },
    };
};

export default Index;
