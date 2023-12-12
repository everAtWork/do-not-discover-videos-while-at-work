import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import Card from "../components/card/card";
import SectionCards from "../components/card/section-cards";
import { getPopularVideos, getVideos } from "../lib/videos";
export async function getServerSideProps(context) {
	const disneyVideos = await getVideos();
	return {
		props: { disneyVideos }, // will be passed to the page component as props
	};
}
export default function Home({ disneyVideos }) {
	console.log({ disneyVideos });
	return (
		<div className={styles.container}>
			<Head>
				<title>wladyslawko's video-discoverer</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<NavBar username="ever.at.work@gmail.com" />
			<Banner
				title="Clifford the red dog"
				subTitle="a very cute dog"
				imgUrl="/static/clifford.webp"
			/>
			<div className={styles.sectionWrapper}>
				<SectionCards title="Disney" videos={disneyVideos} size="large" />
				<SectionCards title="Disney" videos={disneyVideos} size="medium" />
			</div>
		</div>
	);
}
