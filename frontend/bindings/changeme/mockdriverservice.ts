// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unused imports
import {Call as $Call, Create as $Create} from "@wailsio/runtime";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unused imports
import * as elan$0 from "../github.com/brys0/elan-driver-go/elan/models.js";

export function Delete(id: number): Promise<boolean> & { cancel(): void } {
    let $resultPromise = $Call.ByID(2592838314, id) as any;
    return $resultPromise;
}

export function DeleteAll(): Promise<void> & { cancel(): void } {
    let $resultPromise = $Call.ByID(1928358417) as any;
    return $resultPromise;
}

export function Enroll(total_samples: number, data: string): Promise<void> & { cancel(): void } {
    let $resultPromise = $Call.ByID(3155577541, total_samples, data) as any;
    return $resultPromise;
}

export function Info(id: number): Promise<elan$0.Finger | null> & { cancel(): void } {
    let $resultPromise = $Call.ByID(2398471781, id) as any;
    let $typingPromise = $resultPromise.then(($result: any) => {
        return $$createType1($result);
    }) as any;
    $typingPromise.cancel = $resultPromise.cancel.bind($resultPromise);
    return $typingPromise;
}

export function InfoAll(): Promise<(elan$0.Finger | null)[]> & { cancel(): void } {
    let $resultPromise = $Call.ByID(1544923460) as any;
    let $typingPromise = $resultPromise.then(($result: any) => {
        return $$createType2($result);
    }) as any;
    $typingPromise.cancel = $resultPromise.cancel.bind($resultPromise);
    return $typingPromise;
}

export function Reset(): Promise<void> & { cancel(): void } {
    let $resultPromise = $Call.ByID(294104480) as any;
    return $resultPromise;
}

export function Total(): Promise<number | null> & { cancel(): void } {
    let $resultPromise = $Call.ByID(3758393053) as any;
    return $resultPromise;
}

export function Verify(): Promise<boolean> & { cancel(): void } {
    let $resultPromise = $Call.ByID(820259972) as any;
    return $resultPromise;
}

// Private type creation functions
const $$createType0 = elan$0.Finger.createFrom;
const $$createType1 = $Create.Nullable($$createType0);
const $$createType2 = $Create.Array($$createType1);
