export declare class ChallengeInfo {
    /**
    * Indicator informing the Access Control Server (ACS) and the Directory Server (DS) that the authentication has been cancelled. For possible values, refer to [3D Secure API reference](https://docs.adyen.com/online-payments/3d-secure/api-reference#mpidata).
    */
    'challengeCancel'?: ChallengeInfo.ChallengeCancelEnum;
    /**
    * The flow used in the challenge. Possible values:  * **OTP_SMS**: one-time password (OTP) flow * **OOB**: out-of-band (OOB) flow
    */
    'flow': ChallengeInfo.FlowEnum;
    /**
    * The last time of interaction with the challenge.
    */
    'lastInteraction': Date;
    /**
    * The last four digits of the phone number used in the challenge.
    */
    'phoneNumber'?: string;
    /**
    * The number of times the one-time password (OTP) was resent during the challenge.
    */
    'resends'?: number;
    /**
    * The number of retries used in the challenge.
    */
    'retries'?: number;
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
export declare namespace ChallengeInfo {
    enum ChallengeCancelEnum {
        _01 = "01",
        _02 = "02",
        _03 = "03",
        _04 = "04",
        _05 = "05",
        _06 = "06",
        _07 = "07"
    }
    enum FlowEnum {
        OtpSms = "OTP_SMS",
        Oob = "OOB"
    }
}
