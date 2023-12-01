"use client"

import MessagePopup from '@/components/MessagePopup'
import { useState } from 'react';
import { RecoilRoot } from 'recoil';
import MessageBubble from '../messageBubble';

const Main = ({ children, }: { children: React.ReactNode }) => {

    return (
        <main>
            <RecoilRoot>
                {children}
                <MessagePopup />
                <MessageBubble />
            </RecoilRoot>
        </main>
    );
}

export default Main;