import React from 'react';
import css from './landingPage.module.css';
import { Button, Flex, Heading, VStack } from "@chakra-ui/react"
import LoginButton from '../LoginButton';


function LandingPage() {
    return (
        <div className={css.bg}>
            <VStack spacing="5%">
                <VStack spacing="2%">
                    <Heading as="h1" size="3xl" paddingTop="7%">SoC Lessons Tracker</Heading>
                    <Heading as="h1" size="xl">Keep track of all your School of Code lectures in one place</Heading>
                </VStack>
                <LoginButton textDisplay="Click here to register/login" />
            </VStack>
        </div>
    )
}

export default LandingPage
