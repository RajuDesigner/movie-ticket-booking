import { Card, Col, Row, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import Axios from "../axios";
const { Meta } = Card;
export default function MoviesTheatersList() {
	const [tab, setSelectedTab] = useState("movies");
	const [fetching, setFetching] = useState(false);
	const [data, setData] = useState([]);
	const handleTabChange = (tab) => {
		setSelectedTab(tab);
	};
	useEffect(() => {
		setFetching(true);
		Axios.post("/MovieTicketChecker?action=getAllDetails", {
			user_mail_id: "rajucse@hotmail.com",
		})
			.then((response) => {
				!fetching && setData(response?.data);
				setFetching(false);
			})
			.catch((err) => {
				console.log(err);
				setFetching(false);
			});
	}, []);

	return fetching ? (
		<div>loading</div>
	) : (
		<>
			<Tabs
				items={[
					{
						label: `Movies`,
						key: "movies",
					},
					{
						label: `Theatres`,
						key: "theatres",
					},
				]}
				onChange={handleTabChange}
			/>
			<Row gutter={[16, 16]}>
				{tab === "movies" &&
					data?.movies?.map((m) => (
						<Col span={4} key={m.movie_name}>
							<Card
								hoverable
								bordered={false}
								cover={
									<img
										width={300}
										height={300}
										alt={m.movie_name}
										src={m.thumbnail_url}
									/>
								}
							>
								<Meta title={m.movie_name} description={<div>A.Drama</div>} />
							</Card>
						</Col>
					))}
				{tab === "theatres" &&
					data?.theatre?.map((t) => (
						<Col span={4} key={t.theatre_name}>
							<Card
								hoverable
								bordered={false}
								cover={
									<img
										width={300}
										height={300}
										alt={t.theatre_name}
										src={t.thumbnail_url}
									/>
								}
							>
								<Meta title={t.theatre_name} description={<div>A.Drama</div>} />
							</Card>
						</Col>
					))}
			</Row>
		</>
	);
}
