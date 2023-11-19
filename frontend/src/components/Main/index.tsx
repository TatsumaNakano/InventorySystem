"use client"

import MessagePopup from '@/components/MessagePopup'
import { useState } from 'react';
import { RecoilRoot } from 'recoil';

const Main = ({ children, }: { children: React.ReactNode }) => {

    return (
        <main>
            <RecoilRoot>
                {children}
                <MessagePopup />
            </RecoilRoot>
        </main>
    );
}

export default Main;