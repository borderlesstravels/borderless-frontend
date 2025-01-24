
import { ReactNode } from 'react';
import { callback, PaystackProps } from 'react-paystack/dist/types';

export interface PaystackButtonProps extends PaystackProps {
    text?: string;
    className?: string;
    children?: ReactNode;
    onSuccess?: callback;
    onClose?: callback;
}