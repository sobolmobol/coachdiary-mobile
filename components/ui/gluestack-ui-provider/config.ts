'use client';
import { vars } from 'nativewind';


export const config = {
  light: vars({
    '--color-primary-0': '0 63 80',
    '--color-secondary-0': '126 55 23',
    '--color-tertiary': '229 170 123',
    '--color-error': '',
    '--color-success': '',
    '--color-warning': '',
    '--color-info-0': '115 86 190',
    '--color-typography-0': '255 243 225',
    '--color-typography-1': '34 41 24',
    '--color-background-0': '255 243 225',
  }),
  dark: vars({
    '--color-primary-0': '',
    '--color-secondary': '',
    '--color-tertiary': '',
    '--color-error': '',
    '--color-success': '',
    '--color-warning': '',
    '--color-info-0': '',
    '--color-typography-0': '',
    '--color-typography-1': '',
    '--color-background-0': '',
  }),
};
