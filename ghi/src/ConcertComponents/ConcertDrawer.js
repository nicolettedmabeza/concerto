import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import MusicPlayer from "./MusicPlayer";

export default function ConcertModal({
	open,
	setOpen,
	selectedConcert,
	addFavorite,
	button,
}) {
	const [, setHidden] = useState(false);
	const hideButton = () => {
		addFavorite(selectedConcert, button);
		setHidden(true);
	};
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={setOpen}>
				<div className="fixed inset-0" />

				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full">
								<Dialog.Panel className="pointer-events-auto w-screen max-w-md">
									<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
										<div className="px-4 py-6 sm:px-6">
											<div className="flex items-start justify-between">
												<h2
													id="slide-over-heading"
													className="text-lg font-medium text-gray-900">
													Concert Details
												</h2>
												<div className="ml-3 flex h-7 items-center">
													<button
														type="button"
														className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
														onClick={() => setOpen(false)}>
														<span className="sr-only">Close panel</span>
														<XMarkIcon className="h-6 w-6" aria-hidden="true" />
													</button>
												</div>
											</div>
										</div>
										{/* Main */}
										<div>
											<div className="pb-1 sm:pb-6">
												<div>
													<div className="relative h-40 sm:h-56">
														<img
															className="absolute h-full w-full object-cover"
															src={selectedConcert.image_url}
															alt=""
														/>
													</div>
													<div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
														<div className="sm:flex-1">
															<div>
																<div className="flex items-center">
																	<h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
																		{selectedConcert.artist_name}
																	</h3>
																</div>
															</div>
															<div className="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
																{selectedConcert.favorite ? (
																	<button
																		type="button"
																		className="inline-flex w-full flex-1 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
																		Concert Saved to Favorites!
																	</button>
																) : (
																	<button
																		id={`button${button}`}
																		type="button"
																		className="inline-flex w-full flex-shrink-0 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:flex-1"
																		onClick={() => hideButton()}>
																		Favorite
																	</button>
																)}
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
												<dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
													<div>
														<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
															Spotify
														</dt>
														<dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
															<MusicPlayer
																spotifyUrl={selectedConcert.spotify_url}
															/>
														</dd>
													</div>
													<div>
														<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
															Location
														</dt>
														<dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
															{selectedConcert.venue}
														</dd>
													</div>
													<div>
														<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
															Ticket Prices
														</dt>
														<dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
															${selectedConcert.min_price} - $
															{selectedConcert.max_price}
														</dd>
													</div>
													<div>
														<dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
															Date
														</dt>
														<dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
															<time dateTime="1988-06-23">
																{selectedConcert.start_date}
															</time>
														</dd>
													</div>
												</dl>
											</div>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
