import React from 'react';
import {Text} from '@nextui-org/react';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';
import PostsDisplay from '../posts/posts';

export const Content = () => (
   <Box css={{overflow: 'auto', height: '100%'}}>
      <Flex
         direction={'column'}
         justify={'center'}
         css={{
            'width': '100%',
            'py': '$10',
            'px': '$10',
            'mt': '$8',
            '@sm': {px: '$20'},
         }}
      >
         <Flex justify={'start'} wrap={'wrap'}>
            <Text
               h3
               css={{
                  'textAlign': 'center',
                  '@lg': {
                     textAlign: 'inherit',
                  },
               }}
            >
               Latest Posts
            </Text>
         </Flex>
         <PostsDisplay />
      </Flex>
   </Box>
);
