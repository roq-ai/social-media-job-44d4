import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Business Owner'];
  const roles = ['Business Owner', 'Marketing Manager', 'Social Media Specialist', 'Content Creator'];
  const applicationName = `Social Media Job Postings`;
  const tenantName = `Organization`;
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Title: Business Owner creates an organization

As a Business Owner,
I want to create an organization,
So that I can manage my ad campaigns on social media platforms.

Title: Business Owner invites team members

As a Business Owner,
I want to invite Marketing Managers, Social Media Specialists, and Content Creators,
So that they can collaborate on ad campaigns.

Title: Marketing Manager creates an ad campaign

As a Marketing Manager,
I want to create an ad campaign,
So that I can promote my organization's products or services on social media platforms.

Title: Marketing Manager sets campaign goals

As a Marketing Manager,
I want to set goals for my ad campaign,
So that I can measure its success.

Title: Social Media Specialist selects platforms

As a Social Media Specialist,
I want to select the social media platforms for the ad campaign,
So that I can target the right audience.

Title: Content Creator designs ad content

As a Content Creator,
I want to design the ad content for the campaign,
So that it is visually appealing and engaging.

Title: Marketing Manager schedules ad campaign

As a Marketing Manager,
I want to schedule the ad campaign,
So that it runs at the optimal time for my target audience.

Title: Marketing Manager publishes ad campaign

As a Marketing Manager,
I want to publish the ad campaign,
So that it is visible on the selected social media platforms.

Title: Marketing Manager monitors campaign success

As a Marketing Manager,
I want to monitor the success metrics of my ad campaign,
So that I can make data-driven decisions for future campaigns.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent w="50vw" h="70vh">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
