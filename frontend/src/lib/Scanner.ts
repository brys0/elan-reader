import { StatusResolver } from "$lib/StatusResolver"
import { default as EventEmitter } from "events"
import { wait, random } from "$lib/utils"

export class Scanner extends EventEmitter {

    constructor() {
        super()
    }

    async scan(): Promise<boolean> {

        this.emit("start")

        await wait(random(1000, 5000))

        if (Math.random() > 0.5) {
            let errors = Object.values(StatusResolver.STATUS_CODES)
            let error = errors[~~(Math.random() * errors.length)]
            return this.emit("error", error)
        }

        return this.emit("complete")

    }

}

export type ElanScanner = Scanner
