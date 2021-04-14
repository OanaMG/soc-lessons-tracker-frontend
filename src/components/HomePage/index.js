import React, {useState, useEffect} from 'react';
import UserProfile from '../UserProfile';
import css from './homePage.module.css';
import { Heading, HStack, VStack, Input, Stack, UnorderedList, Grid, GridItem} from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import EntriesTable from '../EntriesTable';
import { BACKEND_URL_DAILY_ENTRIES } from "../../libs/config";
import { useAuth0 } from "@auth0/auth0-react";

function HomePage() {
    const [entries, setEntries] = useState([]);
    const [search, setSearch] = useState("");
    const [searchEntries, setSearchEntries] = useState(entries);
    const { user } = useAuth0();
    //!!! working with just the part after | in the auth0 token
    console.log(user.sub);
    console.log((user.sub).slice(6,(user.sub).length));
    //console.log();

    useEffect(() => {
        getUserEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getSearchedEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    async function getUserEntries() {
        let response = await fetch(`${BACKEND_URL_DAILY_ENTRIES}?token=${((user.sub).slice(6,(user.sub).length))}`);
        let data = await response.json();
        setEntries(data);
        //console.log(data);
    }

    async function getSearchedEntries() {
        let response = await fetch(`${BACKEND_URL_DAILY_ENTRIES}?token=${((user.sub).slice(6,(user.sub).length))}&search=${search}`);
        let data = await response.json();
        setSearchEntries(data);
        //console.log(data);
    }
      
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
                        <EntriesTable data={entries}/>
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

                            <LineChart width={730} height={250} data={entries} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" >
                                    {/* <Label value="Date" position="bottom" offset={0}/> */}
                                </XAxis>
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="recapQuizScore" stroke="#0095FF" />
                            </LineChart>
                        </VStack>

                        <VStack width="85%" paddingLeft="5%">
                            <Input placeholder="Search by topic" size="sm" width="100%" variant="outline" colorScheme="blue" border="2px" borderColor="blue.500" onChange={searchTopic}/>
                            <UnorderedList styleType="none" overflowY="scroll" height="200px">
                                {searchEntries.map((item)=> {
                                    return (
                                        <Grid templateColumns="repeat(7, 1fr)" gap={10}>
                                            <GridItem colSpan={2}>{item.date}</GridItem>
                                            <GridItem colSpan={5}>{item.topics}</GridItem>
                                        </Grid>)
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
