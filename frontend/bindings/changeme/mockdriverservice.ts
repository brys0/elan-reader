// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unused imports
import {Call as $Call, Create as $Create} from "@wailsio/runtime";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unused imports
import * as application$0 from "../github.com/wailsapp/wails/v3/pkg/application/models.js";

export function Enroll(total_samples: number, data: string): Promise<void> & { cancel(): void } {
    let $resultPromise = $Call.ByID(3155577541, total_samples, data) as any;
    return $resultPromise;
}

export function ServiceStartup(options: application$0.ServiceOptions): Promise<void> & { cancel(): void } {
    let $resultPromise = $Call.ByID(1564338293, options) as any;
    return $resultPromise;
}

export function VerifyFingerprint(): Promise<boolean | null> & { cancel(): void } {
    let $resultPromise = $Call.ByID(700131792) as any;
    return $resultPromise;
}
