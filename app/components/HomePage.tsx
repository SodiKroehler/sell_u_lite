import Link from 'next/link'
import Image from 'next/image'


// import styles from "./../styles/Homepage.module.css"

const funnyBanners = [
  ["one of the world's card games", "-Pope Pious XII (maybe)"],
  ["fun for all ages", "so long as they're drunk"],
  ["choking hazard", "- but only for your sore loser nephew"],
  ["WARNING", "this product is not known to the state of california to cause birth defects (unlike you)"],
  ["Please keep sealed at all times", "-your lips during the voting round"],
  ["assembly not included", "-your mental health"],
]

export default function HomePage() {

  const bannerIndex = Math.floor(Math.random() * 5)


  return (
    <div>
      <div className="bg-fg text-center p-40">
        <p className="text-light text-7xl ">COMING 22-JUN-24</p>
        <p className="text-light text-2xl pt-6">sign up for our mailing list <a href='https://mailchi.mp/ac66b4d50eb2/mailinglistsignup' className="text-dark"> here</a></p>
      </div>

      <div className="flex w-full h-lvh justify-end items-center bg-light">
        <div className='flex w-6/12 justify-end items-end'>
          <Image src="/logo.png" alt="chitters logo" width={4132} height={2128} priority={true}></Image>
        </div >
      </div >

      <div className="bg-fg text-center p-40">
        <p className="text-light text-7xl ">{funnyBanners[bannerIndex][0]}</p>
        <p className="text-light text-2xl pt-6">{funnyBanners[bannerIndex][1]}</p>
      </div>

      <div className="bg-dark text-center">
        <p className="text-light">Contact us at congeniality@chitters.net </p>
      </div>

    </div >

  );
}


// width={679} height={230}

// <div className={`${styles.notacontainer}`}>
// <div className={styles.imageCont}>
//   <Image src="/logo.png" alt="chitters logo" className={`${styles.logoImage}`}
//     width={1366} height={768} priority={true}></Image>
// </div>

// <div className={styles.description}>
//   <p className={styles.quote}>"one of the world's online card games"</p>
//   <p className={styles.author}>George III (maybe)</p>
// </div>

// <div className={styles.contact}>
//   <p className={styles.email}>congeniality@chitters.net </p>
// </div>

// </div>