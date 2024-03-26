import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { FcGoogle} from 'react-icons/fc';
import { signIn } from "next-auth/react";
import { Merriweather } from "next/font/google";
import { useSession } from "next-auth/react";

const MerriReg900 = Merriweather({
    subsets:['latin'],
    display:'swap',
    weight:'900'
});

export default function Signin () {
    const {data:session} = useSession();

    const router = useRouter();

    useEffect(() => {
        session ? router.push('/admin/create-product') : null;
    },[session]);

    //console.log('=>>>logged user >>>>>>',session?.user.name);

    return (
        <>
        <Head>
            <title>Signin | Irun</title>
        </Head>
        <main className="h-screen flex justify-center items-center bg-slate-100 px-2 md:px-0 py-4 md:py-0">
            <div className="h-2/3 w-full md:w-[320px] flex flex-col items-center gap-6 bg-slate-50 border border-slate-200 rounded-md py-3 md:py-6 px-2 md:px-4">
                <h2 className={`${MerriReg900.className} text-2xl text-slate-800`}>Get started or continue with an option</h2>
                
                <Button 
                variant="contained"
                className="w-full py-3 bg-slate-800 flex flex-row justify-between"
                onClick={() => signIn('google')}>Continue with <FcGoogle className="text-3xl"/></Button>
            </div>
        </main>
        </>
    )
}