import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

type Notif = {
    type: string
    message: string
}

export const useNotif = () => {
    const toast = useToast()
    const [notif, setNotif] = useState<Notif>();

    useEffect(() => {
        if (notif)
            toast({
                title: notif.type === "error" ? 'Une erreur est survenue !' : "Information",
                description: notif.message,
                status: notif.type === "error" ? 'error' : "info",
                duration: 9000,
                position: 'top-right',
                isClosable: true,
            })
    }, [notif, toast])

    return {
        notif,
        setNotif
    }
};
