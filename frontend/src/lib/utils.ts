import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { States } from "$types"

import CircleNotch from "phosphor-svelte/lib/CircleNotch"
import Check from "phosphor-svelte/lib/Check"
import Scan from "phosphor-svelte/lib/Scan"
import X from "phosphor-svelte/lib/X"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Pauses execution for a specified number of milliseconds.
 * 
 * @param ms - The number of milliseconds to wait.
 * @returns A promise that resolves after the specified delay.
 */
export async function wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function random(min: number, max: number): number {
    return ~~(Math.random() * max) + min
}

export const shadows = {
    enroll: {
        get base() {
            return `drop-shadow-[0px_0px_80px_rgba(93,227,105,0.4)] ${this.hover}`
        },
        get hover() {
            return `hover:drop-shadow-[0px_0px_100px_rgba(93,227,105,0.8)]`
        },
        get active() {
            return `drop-shadow-[0px_0px_100px_rgba(93,227,105,0.4)] ${this.hover}`
        },
    },
    verify: {
        get base() {
            return `drop-shadow-[0px_0px_80px_rgba(96,165,250,0.4)] ${this.hover}`
        },
        get hover() {
            return `hover:drop-shadow-[0px_0px_100px_rgba(96,165,250,0.8)]`
        },
        get active() {
            return `drop-shadow-[0px_0px_100px_rgba(96,165,250,0.4)] ${this.hover}`
        }
    },
    error: {
        get base() {
            return `drop-shadow-[0px_0px_80px_rgba(240,50,58,0.4)] ${this.hover}`
        },
        get hover() {
            return `drop-shadow-[0px_0px_100px_rgba(240,50,58,0.8)]`
        },
        get active() {
            return `drop-shadow-[0px_0px_100px_rgba(240,50,58,0.4)] ${this.hover}`
        }
    }
}

export const states: States = {
    readyToScan: { message: "Ready to Scan", icon: Scan },
    readyToEnroll: { message: "Ready to Enroll", icon: Scan },
    scanning: { message: "Scanning...", icon: CircleNotch, loader: true },
    enrolling: { message: "Enrolling...", icon: CircleNotch, loader: true },
    success: { message: "Scan Successful", icon: Check },
    successfulEnroll: { message: "Enrollment Successful", icon: Check },
    error: { message: "Scan Failed", icon: X }
}