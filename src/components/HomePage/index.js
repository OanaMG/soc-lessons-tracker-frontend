import React, {useState} from 'react';
import UserProfile from '../UserProfile';
import css from './homePage.module.css';
import { Heading, HStack, VStack, Input, Stack, ListItem, UnorderedList, SimpleGrid} from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Label, Tooltip, Legend} from 'recharts';
import EntriesTable from '../EntriesTable';
import EntriesTable2 from '../EntriesTable2';



function HomePage() {
    const [search, setSearch] = useState("");

    var notes = [{date: "14/06/20", topic: "router, react-router", score: 7},
                {date: "15/06/20", topic: "css, tailwind", score: 9},
                {date: "16/06/20", topic: "heroku, cloud deployment", score: 8},
                {date: "17/06/20", topic: "array methods, map function", score: 10},
                {date: "18/06/20", topic: "heroku, cloud deployment", score: 8},
                {date: "19/06/20", topic: "heroku, cloud deployment", score: 5},
                {date: "20/06/20", topic: "heroku, cloud deployment", score: 9},
                {date: "21/06/20", topic: "heroku, cloud deployment", score: 7},
                {date: "22/06/20", topic: "css, tailwind", score: 9},
                {date: "23/06/20", topic: "heroku, cloud deployment", score: 8},
                {date: "24/06/20", topic: "array methods, map function", score: 10},
                {date: "25/06/20", topic: "heroku, cloud deployment", score: 8},
                {date: "26/06/20", topic: "heroku, cloud deployment", score: 5},
                {date: "27/06/20", topic: "heroku, cloud deployment", score: 9},
                {date: "28/06/20", topic: "heroku, cloud deployment", score: 7}
            ];
    
    var testDates = ["14/06/20", "20/06/20", "28/06/20", "14/06/20", "20/06/20", "28/06/20", "14/06/20", "20/06/20", "28/06/20", "14/06/20", "20/06/20", "28/06/20", "14/06/20", "20/06/20", "28/06/20", "14/06/20", "20/06/20", "28/06/20"]

    console.log(notes);

    function searchTopic(e) {
        setSearch(e.target.value);
        console.log(search);
      }

    return (
        <div className={css.bg}>
            <Stack bgColor="white" color="black" minHeight="100vh" minWidth="100vw" maxWidth="100%" display="flex" flexWrap="flex" paddingRight="2%" paddingLeft="2%">
                <HStack alignItems="flex-start" justifyContent="space-between" paddingBottom="3%">
                    <VStack spacing="0%" alignItems="left" display="flex">
                        <Heading size="2xl">SoC Lessons Tracker</Heading>
                        <Heading size="lg">Keep track of all your School of Code lectures in one place</Heading>
                    </VStack>

                    <VStack>
                        <UserProfile/>
                    </VStack>
                </HStack>

                <HStack alignItems="flex-start" justifyContent="space-around" display="flex" flexFlow="column-wrap">
                    <VStack display="flex">
                        <Heading size="md">Overview</Heading>

                        {/* <EntriesTable data={notes}/> */}
                        <EntriesTable2 data={notes}/>
                    </VStack>

                    <VStack display="flex" spacing="5%">
                        <VStack display="flex">
                            <Heading size="md">Test Score Graph</Heading>
                            {/* <LineChart
                                width={400}
                                height={500}
                                data={notes}
                                margin={{top:20, right:10, bottom:20, left:10}}   
                            />
                            <Line type="monotone" dataKey="score" stroke="#000000"/>
                            <CartesianGrid stroke="#000000" strokeDasharray="3 3"/>
                            <XAxis dataKey="date" tick={{fill: "#282c34"}} tickLine={{stroke: "#000000"}}>
                                <Label value="Date" position="bottom" offset={0}/>
                            </XAxis>
                            <YAxis type="number" domain={[0,10]}/> */}

                            <LineChart width={730} height={250} data={notes} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" >
                                    {/* <Label value="Date" position="bottom" offset={0}/> */}
                                </XAxis>
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="score" stroke="#0095FF" />
                            </LineChart>
                        </VStack>

                        <VStack>
                            <Input placeholder="Search by topic" size="sm" width="100%" variant="outline" colorScheme="blue" border="2px" borderColor="blue.500" onChange={searchTopic}/>
                            <UnorderedList styleType="none" overflowY="scroll" height="200px">
                                {notes.map((item)=> {
                                    return (
                                        <SimpleGrid columns={2} spacingX="40px" spacingY="20px">
                                            <ListItem>{item.date}</ListItem>
                                            <ListItem>{item.topic}</ListItem>
                                        </SimpleGrid>)
                                })}
                            </UnorderedList>
                        </VStack>
                    </VStack>

                </HStack>
            </Stack>
        </div>
    )
}

export default HomePage
