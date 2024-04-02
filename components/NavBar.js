import * as React from 'react';
import Link from "next/link";
import { useSession,signOut } from 'next-auth/react';
import { HiMenuAlt3 } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaGlobeAmericas } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoDotFill,GoSignOut } from "react-icons/go";
import { Merriweather } from "next/font/google";

const MerriReg400 = Merriweather({
    subsets:['latin'],
    display:'swap',
    weight:'400'
});

export function NavBar() {
    const { data:session } = useSession();
    const [showMenu,setShowMenu] = React.useState(true);

    return (
        <>
        <nav className="h-[60px] grid grid-cols-2 lg:grid-cols-3 bg-[#402B3A] border-b border-amber-600 px-2 md:px-8 lg:px-16">
            {/* show only on desktop */}
            <ul className="hidden lg:flex flex-row gap-4 items-center">
                <li className={styles.navLink}><Link href="#">Shop</Link></li>
                <li className={styles.navLink}><Link href="#">Accessories</Link></li>
                <li className={styles.navLink}><Link href="#">Showroom</Link></li>
                <li className={styles.navLink}><Link href="/contact-us">Contact Us</Link></li>
            </ul>

            {/* show on all devices */}
            <div className="flex flex-row gap-1 justify-start lg:justify-center items-center">
                <h1 className={`${MerriReg400.className} text-4xl text-gray-100`}>Irun</h1>
                <GoDotFill className="text-amber-400"/>
            </div>

            {/* show only on mobile and tablets */}
            <div className="flex justify-end items-center lg:hidden">
                <HiMenuAlt3 
                onClick={() => setShowMenu(false)}
                className={`${showMenu ? 'flex' : 'hidden'} text-gray-200 text-4xl`}/>
                <MdClose 
                onClick={() => setShowMenu(true)}
                className={`${!showMenu ? 'flex' : 'hidden'} text-gray-200 text-4xl`}/>
            </div>

            {/* show only on desktop */}
            <div className="hidden lg:flex flex-row justify-end gap-6">
                <div className="flex flex-row gap-4">
                    <blockquote className="flex flex-row items-center">
                        <FaGlobeAmericas className="text-amber-400"/>
                        <span className="text-gray-200">English</span>
                        <MdKeyboardArrowDown className="text-gray-200"/>
                    </blockquote>
                    <blockquote className="flex flex-row items-center">
                        <BsCurrencyDollar className="text-amber-400"/>
                        <span className="text-gray-200">USD</span>
                        <MdKeyboardArrowDown className="text-gray-200"/>
                    </blockquote>
                </div>

                {session ?
                <ul className="flex flex-row gap-4 items-center">
                    <li><Link href="#"><CiUser className={styles.navLinkIcon}/></Link></li>
                    <li><GoSignOut 
                    onClick={() => signOut()}
                    className={styles.navLinkIcon}/></li>
                </ul>
                :
                <ul className="flex flex-row gap-4 items-center">
                    <li><Link className={styles.navLink} href="/auth/signin">Sign in</Link></li>
                </ul>
                }
            </div>
        </nav>

        {/* mobile-only nav  */}
        <div className={`${!showMenu ? 'flex' : 'hidden'} flex-col justify-center items-center gap-8 lg:hidden min-h-80 w-full absolute top-[60px] left-0 z-10 bg-gray-800`}>
            <ul className="flex flex-col gap-3">
                <li className='text-gray-200 text-2xl text-center'><Link href="/shop">Shop</Link></li>
                <li className='text-gray-200 text-2xl text-center'><Link href="/contact-us">Contact Us</Link></li>
            </ul>

            <div className="flex flex-col gap-3">
                {session ?
                <ul className="flex flex-row justify-center gap-4 items-center">
                    <li><Link href="#"><CiUser className={styles.navLinkIcon}/></Link></li>
                    <li><GoSignOut 
                    onClick={() => signOut()}
                    className={styles.navLinkIcon}/></li>
                </ul>
                :
                <ul className="flex flex-row gap-4 items-center">
                    <li><Link className={styles.navLink} href="/auth/signin">Sign in</Link></li>
                </ul>
                }

                <div className="flex flex-row gap-4">
                    <blockquote className="flex flex-row items-center">
                        <FaGlobeAmericas className="text-amber-400"/>
                        <span className="text-gray-200">English</span>
                        <MdKeyboardArrowDown className="text-gray-200"/>
                    </blockquote>
                    <blockquote className="flex flex-row items-center">
                        <BsCurrencyDollar className="text-amber-400"/>
                        <span className="text-gray-200">USD</span>
                        <MdKeyboardArrowDown className="text-gray-200"/>
                    </blockquote>
                </div>
            </div>
        </div>
        </>
    )
}

const styles = {
    navLink:"text-gray-200",
    navLinkIcon:"text-gray-200 text-2xl",
}