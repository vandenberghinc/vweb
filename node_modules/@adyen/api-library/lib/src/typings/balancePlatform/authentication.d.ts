import { Phone } from './phone';
export declare class Authentication {
    /**
    * The email address where the one-time password (OTP) is sent.
    */
    'email'?: string;
    /**
    * The password used for 3D Secure password-based authentication. The value must be between 1 to 30 characters and must only contain the following supported characters.  * Characters between **a-z**, **A-Z**, and **0-9**  * Special characters: **äöüßÄÖÜ+-*_/ç%()=?!~#\'\",;:$&àùòâôûáúó**
    */
    'password'?: string;
    'phone'?: Phone;
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
