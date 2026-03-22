import { z } from 'zod';
export const blacklistedDomains = ['tempmail.com', 'mailinator.com', '10minutemail.com'];


export const ProfileStatusEnum = z.enum(['commum', 'admin', 'analytics']);
export const TypesCategorysEnum = z.enum(['Fixed', 'Variable', 'Investments', 'Gifts', 'Cost Financials']);
export const CoinsEnum = z.enum(['BRL', 'USD', 'BTC', 'EUR', 'ARS', 'JPY']);