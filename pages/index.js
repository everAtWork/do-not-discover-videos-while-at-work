import Head from "next/head";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import Card from "../components/card/card";
import SectionCards from "../components/card/section-cards";
import { magic } from "../lib/magic-client";
import {
	getPopularVideos,
	getVideos,
	getWatchItAgainVideos,
} from "../lib/videos";
export async function getServerSideProps(context) {
	const userId = "did:ethr:0x83161D9c4F1fb983A064077eC5F2898Dc7C87880";
	const token = context.req ? context.req.cookies.token : null;
	const watchItAgainVideos = await getWatchItAgainVideos(userId, token);
	const disneyVideos = await getVideos("disney trailer");
	const productivityVideos = await getVideos("Productivity");
	const travelVideos = await getVideos("indie music");
	const popularVideos = await getPopularVideos();
	return {
		props: {
			disneyVideos,
			travelVideos,
			productivityVideos,
			popularVideos,
			watchItAgainVideos,
		},
	};
}
export default function Home({
	disneyVideos,
	travelVideos,
	productivityVideos,
	popularVideos,
	watchItAgainVideos,
}) {
	console.log({ watchItAgainVideos });

	return (
		<div className={styles.container}>
			<Head>
				<title>wladyslawko's video discoverer</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className={styles.main}>
				<NavBar />
				<Banner
					videoId="4zH5iYM4wJo"
					title="Clifford the red dog"
					subTitle="a very cute dog"
					imgUrl="/static/clifford.webp"
				/>
				<div className={styles.sectionWrapper}>
					<SectionCards title="Disney" videos={disneyVideos} size="large" />
					<SectionCards
						title="Watch it again"
						videos={watchItAgainVideos}
						size="small"
					/>
					<SectionCards title="Travel" videos={travelVideos} size="small" />
					<SectionCards
						title="Productivity"
						videos={productivityVideos}
						size="medium"
					/>
					<SectionCards title="Popular" videos={popularVideos} size="small" />
				</div>
			</div>
		</div>
	);
}
