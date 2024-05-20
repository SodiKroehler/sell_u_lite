import Link from 'next/link'
import Image from 'next/image'

export default function HeadFootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className='flex w-full h-lvh flex-col bg-light'>
            <div className="flex h-40 items-end justify-end">
                <div className="flex w-full mt-10 items-center justify-end bg-dark text-light">
                    <Link href="/" className='p-5'>Home</Link>
                    <Link href="/library" className='p-5'>Library</Link>
                    <Link href="/play" className='p-5'>Play</Link>
                    <Link href="/shop" className='p-5'>Shop</Link>
                    <Link href="/profile" className='p-5'>Profile</Link>
                </div>
            </div>

            {/* <div className="flex h-56 items-end justify-end">
                <div className="flex w-full mt-20 items-center justify-center text-light">
                    <Link href="/" className='p-5'><Image src='/static/icons/home.png' alt="library" className='w-32' width={1024} height={1024} /></Link>
                    <Link href="/library" className='p-5'><Image src='/static/icons/library.png' alt="library" className='w-32' width={1024} height={1024} /></Link>
                    <Link href="/play" className='p-5'><Image src='/static/icons/game.png' alt="library" className='w-32' width={1024} height={1024} /></Link>
                    <Link href="/shop" className='p-5'><Image src='/static/icons/shop.png' alt="library" className='w-32' width={1024} height={1024} /></Link>
                    <Link href="/profile" className='p-5'><Image src='/static/icons/profile.png' alt="library" className='w-32' width={1024} height={1024} /></Link>
                </div>
            </div> */}
            <div className="grow">
                {children}
            </div>
        </div>
    )
}


{/* <div className={styles.header}>
    <Link href="/play" className={`${styles.button}`}>
        <Image src='/static/icons/game.svg' alt="play"
            className={`${styles.iconic} ${styles.playButton} `} width={25} height={25} />
    </Link>
    <Link href="/library" className={`${styles.button}`}>
        <Image src='/static/icons/library.png' alt="library"
            className={`${styles.iconic} ${styles.libButton}`} width={45} height={45} />
    </Link>
    <Link href="/shop" className={`${styles.button}`}>
        <Image src='/static/icons/shop.png' alt="shop"
            className={`${styles.iconic} ${styles.shopButton}`} width={28} height={28} />
    </Link>
    <Link href="/utils/profile" className={` ${styles.button}`}>
        <Image src='/static/icons/user.ico' alt="profile"
            className={`${styles.iconic} ${styles.userButton}`} width={30} height={30} />
    </Link>
</div> */}