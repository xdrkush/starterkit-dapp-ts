import { config } from '@/config'
import { ScanSecureContext } from '@/contexts'
import { Box, Button, Divider, Flex, Heading } from '@chakra-ui/react'
import { useContext } from 'react'

// Whitelist, store, register, incStore, resetStore
// isOwner, isWhitelisted

export default function Demo() {
  const {
    contract, owner, store, whitelist, register,
    isWhitelisted, isOwner, contractIsConnected,
    getStore, incStore, resetStore
  } = useContext(ScanSecureContext)

  return (
    <Box>
      <Heading size='xl'> Demo: </Heading>

      {contract && contractIsConnected && (
        <>

          {/* Info Contract */}
          <Flex justify='space-around' my={5}>
            <Heading size='sm'> {`address: ${config.contracts.scanSecure.address}`} </Heading>
            <Heading size='sm'> {`owner: ${owner}`} </Heading>
          </Flex>

          <Divider />

          {/* State */}
          <Flex justify='space-around' my={5}>
            <Heading size='md'> {`Store: ${store}`} </Heading>
            <Heading size='md'> {`isOwner: ${isOwner}`} </Heading>
            <Heading size='md'> {`isWhitelisted: ${isWhitelisted}`} </Heading>
          </Flex>

          <Divider />

          {/* Actions */}
          <Flex justify='space-around' my={5}>
            {!isWhitelisted ? (
              <Button onClick={register}>Register</Button>
            ) : (
              <Button onClick={incStore}>Inc Store</Button>
            )}
            {isOwner && (
              <Button onClick={resetStore}>Reset Store</Button>
            )}
          </Flex>

          <Divider />

          {/* Whitelisted */}
          <Box my={5}>
            <Heading size='md'> Whitelisted: </Heading>

            {whitelist && whitelist.length > 0 ? whitelist.map((obj: any, i) => (
              <Box key={obj.id}>
                {`id: ${obj.id} - address: ${obj.address}`}
              </Box>
            )) : (
              <Box>
                aucune address whitelisté
              </Box>
            )}
          </Box>
        </>
      )}

    </Box>
  )
}
