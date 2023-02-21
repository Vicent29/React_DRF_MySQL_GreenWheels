import axios from 'axios';
import { useCallback } from 'react';
import AuthService from '../services/AuthService';
import secret from '../services/secret';

export function useTel() {

    const sendMessage = async (chatId, message) => {
        const url = `https://api.telegram.org/bot${secret.TOKEN_TELBOT}/sendMessage`;
        const data = {
            chat_id: chatId,
            text: message,
        };
        const headers = {
            'Content-Type': 'application/json',
        };
        await axios.post(url, data, { headers });
    }

    const allchatid = async () => {
        let retn = []
        await AuthService.allchatid()
            .then(({ data }) => {
                retn = data
            })
        return retn
    }

    const checkChatID = useCallback(async (res) => {
        await AuthService.checkChatID(res)
            .then(({ data }) => {
                sendMessage(res.chatID, data)
            })
            .catch(({ response }) => {
                sendMessage(res.chatID, response.data[0])
            })
    }, [])
    return { sendMessage, allchatid, checkChatID }
}