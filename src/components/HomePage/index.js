import React from 'react';
import UserProfile from '../UserProfile';
import css from './homePage.module.css';
import { Button, Flex, Heading, HStack, VStack } from "@chakra-ui/react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Label, Tooltip, Legend} from 'recharts';
  


function HomePage() {
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
    

    console.log(notes);

    return (
        <div className={css.bg}>
            <HStack alignItems="flex-start" justifyContent="space-between" paddingBottom="3%">
                <VStack spacing="0%" alignItems="left" display="flex">
                    <Heading size="2xl">SoC Lessons Tracker</Heading>
                    <Heading size="lg">Keep track of all your School of Code lectures in one place</Heading>
                </VStack>
                <VStack>
                    <UserProfile/>
                </VStack>
            </HStack>
            <HStack alignItems="flex-start" justifyContent="space-between">
                <VStack >
                    <Heading size="md">Overview</Heading>
                </VStack>

                <VStack>
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

            </HStack>
        </div>
    )
}

export default HomePage
