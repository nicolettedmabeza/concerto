import "./index.css";
import { useState, useRef, useEffect } from "react";
import SideBar from "./Layout/SidebarNav";
import SearchComponent from "./SearchComponent";
import ConcertList from "./ConcertComponents/ConcertList";
import Header from "./Layout/Header";
import { useAuthContext } from "./auth";

export default function Landing() {
	const { token } = useAuthContext();
	const [concerts, setConcerts] = useState([]);
	const [success, setSuccess] = useState(true);
	const myRef = useRef(null);
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [page, setPage] = useState(0);
	const [submitted, setSubmitted] = useState(false);

	const executeScroll = () => myRef.current.scrollIntoView();

	useEffect(() => {
		if (page > 0) {
			getConcerts(page);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, submitted]);

	const getConcerts = (page) => {
		const concertsUrl = `${process.env.REACT_APP_CONCERTS_API_HOST}/concerts/${city},${state}/${page}`;
		const fetchConfig = {
			method: "get",
			headers: {
				"Content-Type": "application/json",
			},
		};
		fetch(concertsUrl, fetchConfig)
			.then((response) => response.json())
			.then((data) => {
				setConcerts(concerts.concat(data.concerts));
				setSuccess(true);
				setSubmitted(false);
			})
			.catch((error) => {
				setSuccess(false);
				console.log("SOS");
				setPage(0);
				setSubmitted(false);
			});
	};
	const loadMoreConcerts = () => {
		setPage((prevPage) => prevPage + 1);
	};

	return (
		<>
			<div className="overflow-y-scroll bg-hero bg-cover bg-blend-overlay from-indigo-500 h-screen">
				{token ? <SideBar /> : <Header />}
				{/* background */}
				<div>
					{/* header and h2 */}
					<div
						ref={myRef}
						className="mx-auto max-w-2xl py-16 px-4 text-center sm:py-20 sm:px-6 lg:px-8">
						<h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
							<span className="block">Concerto</span>
						</h1>
						<h2 className="mt-4 text-lg  text-indigo-200">
							A place for music lovers.
						</h2>
					</div>
					{/* search box */}
					<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 bg-white sm:rounded-lg p-8">
						<div className="text-center">
							<h3 className="text-base text-center tracking-tight text-black sm:text-4xl">
								Search concerts here:
							</h3>
						</div>
						<SearchComponent
							getConcerts={getConcerts}
							setConcerts={setConcerts}
							setPage={setPage}
							setCity={setCity}
							setState={setState}
							setSubmitted={setSubmitted}
						/>
						<div>
							{concerts.length > 0 && (
								<ConcertList
									concerts={concerts}
									setConcerts={setConcerts}
									success={success}
								/>
							)}
						</div>
						{concerts.length > 0 && (
							<div className="flex justify-center">
								<button
									className="my-4 bg-indigo-700 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
									onClick={loadMoreConcerts}>
									Load More Concerts
								</button>
							</div>
						)}
						{!success && (
							<div
								className="mt-4 flex items-center bg-red-100 border border-red-400 text-red-700 text-sm font-bold px-4 py-3"
								role="alert">
								<svg
									className="fill-current w-4 h-4 mr-2"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20">
									<path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
								</svg>
								<p>
									No concerts for this location. Please select another location.
								</p>
							</div>
						)}
					</div>
					<button
						type="button"
						data-mdb-ripple="true"
						data-mdb-ripple-color="light"
						className="fixed inline-block p-3 bg-indigo-700 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-indigo-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out bottom-5 right-5"
						id="btn-back-to-top"
						onClick={executeScroll}>
						<svg
							aria-hidden="true"
							focusable="false"
							data-prefix="fas"
							className="w-4 h-4"
							role="img"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 448 512">
							<path
								fill="currentColor"
								d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path>
						</svg>
					</button>

					{/*  */}
				</div>
			</div>
		</>
	);
}
