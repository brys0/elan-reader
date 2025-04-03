type StatusObj = {
    decimal: number
    hex: string
}

export class StatusResolver {

    public static STATUS_CODES: Record<number, string> = {
        0x41: "Move your finger slightly down",
        0x42: "Move your finger slightly right",
        0x43: "Move your finger slightly up",
        0x44: "Move your finger slightly to the left",
        0xfb: "Clean off your sensor",
        0xfd: "This finger has not been enrolled yet",
        0xfe: "Place more of your finger on the sensor", 
    }

    public static resolve(code: number): string | null {
        return this.STATUS_CODES[code] || null
    }

    public static getCode(message: string): StatusObj | null {
        const code = Object.keys(this.STATUS_CODES)
            .find((key) => this.STATUS_CODES[parseInt(key)] === message)

        return code ? {
            decimal: parseInt(code),
            hex: `0x${parseInt(code).toString(16)}`
        } : null
    
    }

}