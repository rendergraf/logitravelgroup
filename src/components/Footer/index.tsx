import { Box, Container, Stack, Text, VisuallyHidden, chakra, useColorModeValue } from '@chakra-ui/react'
import React, { FC } from 'react'
import { FaGithub } from 'react-icons/fa'
import type { SocialButtonProps } from '../../Types'

const SocialButton: FC<SocialButtonProps> = ({ children, label, href }) => {
	return (
		<chakra.button
			bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
			rounded={'full'}
			w={8}
			h={8}
			cursor={'pointer'}
			as={'a'}
			href={href}
			display={'inline-flex'}
			alignItems={'center'}
			justifyContent={'center'}
			transition={'background 0.3s ease'}
			_hover={{
				bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
			}}
		>
			<VisuallyHidden>{label}</VisuallyHidden>
			{children}
		</chakra.button>
	)
}

const Footer: FC = () => {
	return (
		<Box
			bg={useColorModeValue('gray.50', 'gray.900')}
			color={useColorModeValue('gray.700', 'gray.200')}
			position="fixed"
			width={'100vw'}
			bottom={'0'}
		>
			<Container
				as={Stack}
				maxW={'6xl'}
				py={4}
				direction={{ base: 'column', md: 'row' }}
				spacing={4}
				justify={{ base: 'center', md: 'space-between' }}
				align={{ base: 'center', md: 'center' }}
			>
				<Text>2023 Xavier Araque. MIT Licence</Text>
				<Stack direction={'row'} spacing={6}>
					<SocialButton label={'Github'} href={'https://github.com/rendergraf/logitravelgroup/'}>
						<FaGithub />
					</SocialButton>
				</Stack>
			</Container>
		</Box>
	)
}

export default Footer
