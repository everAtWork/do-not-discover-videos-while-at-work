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
	const token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweDgzMTYxRDljNEYxZmI5ODNBMDY0MDc3ZUM1RjI4OThEYzdDODc4ODAiLCJwdWJsaWNBZGRyZXNzIjoiMHg4MzE2MUQ5YzRGMWZiOTgzQTA2NDA3N2VDNUYyODk4RGM3Qzg3ODgwIiwiZW1haWwiOiJldmVyLmF0LndvcmtAZ21haWwuY29tIiwib2F1dGhQcm92aWRlciI6bnVsbCwicGhvbmVOdW1iZXIiOm51bGwsIndhbGxldHMiOltdLCJpYXQiOjE3MDgwODY3OTksImV4cCI6MTcwODY5MTU5OSwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiLCJhZG1pbiJdLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtdXNlci1JZCI6ImRpZDpldGhyOjB4ODMxNjFEOWM0RjFmYjk4M0EwNjQwNzdlQzVGMjg5OERjN0M4Nzg4MCJ9fQ.HwObkcs62BXwBJ17MPj8qboMURI0POmjqjww7ZG7xpo";

	const watchItAgainVideos = await getWatchItAgainVideos(userId, token);

	console.log({ watchItAgainVideos });
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
