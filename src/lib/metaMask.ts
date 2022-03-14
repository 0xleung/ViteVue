import { ethers } from "ethers";

export class MetamaskSign {
    public static isMetamaskInstalled(): boolean {
        return typeof window.ethereum !== "undefined";
    }

    public static isMetamaskLocked(): boolean {
        return typeof window.ethereum.isMetaMask !== "undefined" && !window.ethereum.isMetaMask;
    }

    public static getAccount(): string {
        return window.ethereum.selectedAddress;
    }

    public static getProvider(): ethers.providers.JsonRpcProvider {
        return new ethers.providers.Web3Provider(window.ethereum);
    }

    public static getSigner(): ethers.Signer {
        return this.getProvider().getSigner();
    }

    public static async sign(msg: string): Promise<string> {
        try {
            const signer= new ethers.providers.Web3Provider(window.ethereum).getSigner();
            const signature= await signer.signMessage(msg);
            return signature;
        } catch (error: any) {
            return error.toString()
        }
    }

    public static async verify({msg, addr, sig}: {msg:string, addr: string, sig:string}): Promise<boolean>{
        try {
            const signerAddr = await ethers.utils.verifyMessage(msg, sig);
            return addr.toLowerCase() === signerAddr.toLowerCase();
        } catch (error) {
            console.log(error)
            return false
        }
    }
}
