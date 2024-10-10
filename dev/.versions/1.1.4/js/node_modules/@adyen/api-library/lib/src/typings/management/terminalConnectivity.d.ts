import { TerminalConnectivityBluetooth } from './terminalConnectivityBluetooth';
import { TerminalConnectivityCellular } from './terminalConnectivityCellular';
import { TerminalConnectivityEthernet } from './terminalConnectivityEthernet';
import { TerminalConnectivityWifi } from './terminalConnectivityWifi';
export declare class TerminalConnectivity {
    'bluetooth'?: TerminalConnectivityBluetooth;
    'cellular'?: TerminalConnectivityCellular;
    'ethernet'?: TerminalConnectivityEthernet;
    'wifi'?: TerminalConnectivityWifi;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
