import React, { useEffect, useState } from 'react';
import { ApiKey } from '../../Api';
import useWatchedChannels from '../Watch/useWatchedChannels';
import { LoadingCato } from '../LoadingPage/LoadingComponents';
import CatograyDiv from '../ReuseComps/HomeComp/CatograyDiv';
import Home from '../Home/Home';

const ListOfFav = () => {
    const channelIds = useWatchedChannels();
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [most, setMost] = useState({ name: null, count: 0 });

    useEffect(() => {
        const fetchChannelCategory = async (channelId) => {
            const channelApiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${channelId}&key=${ApiKey}`;
            try {
                const channelResponse = await fetch(channelApiUrl);
                if (!channelResponse.ok) {
                    throw new Error('Failed to fetch channel data');
                }
                const channelData = await channelResponse.json();
                const categoryId = channelData.items[0]?.snippet?.categoryId;

                if (!categoryId) {
                    throw new Error('Category ID not found for the channel');
                }

                const categoryApiUrl = `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&id=${categoryId}&key=${ApiKey}`;
                const categoryResponse = await fetch(categoryApiUrl);
                if (!categoryResponse.ok) {
                    throw new Error('Failed to fetch category data');
                }
                const categoryData = await categoryResponse.json();
                const categoryName = categoryData.items[0]?.snippet?.title;

                if (!categoryName) {
                    throw new Error('Category name not found for the category ID');
                }

                return { categoryId, categoryName };
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
                return null;
            }
        };

        const fetchAllCategoryData = async () => {
            const promises = channelIds.map((channelId) => fetchChannelCategory(channelId));
            const results = await Promise.all(promises);
            return results.filter(result => result !== null);
        };

        const processCategoryData = (categoryData) => {
            const categoryMap = new Map();

            categoryData.forEach(({ categoryId, categoryName }) => {
                if (categoryMap.has(categoryId)) {
                    const entry = categoryMap.get(categoryId);
                    entry.count += 1;
                } else {
                    categoryMap.set(categoryId, { name: categoryName, count: 1 });
                }
            });

            return categoryMap;
        };

        const handleFetchedData = async () => {
            const fetchedData = await fetchAllCategoryData();
            const categoryMap = processCategoryData(fetchedData);
            setCategoryData([...categoryMap.entries()]);

            // Find the category with the maximum count
            let maxCategory = { name: null, count: 0 };
            categoryMap.forEach((value, key) => {
                if (value.count > maxCategory.count) {
                    maxCategory = { name: value.name, count: value.count };
                }
            });
            setMost(maxCategory);
            setLoading(false);
        };

        handleFetchedData();
    }, [channelIds]);

    const clickHandler = (categoryId) => {
        // Handle the click event for a category
        console.log(`Clicked on category: ${categoryId}`);
    };

    return (
        <div className='flex flex-col'>
            {loading ? (
                <LoadingCato />
            ) : (
                <div className='mt-[12vh]'>
                    <div className={`overflow-hidden scrollbar-hide w-[90vw] absolute mt-[6vh]`}>
                        <ul id="cato" className='flex flex-row m-4 overflow-x-auto scroll-smooth cursor-pointer scrollbar-hide whitespace-nowrap'>
                            {categoryData.map(([categoryId, { name, count }]) => (
                                <CatograyDiv
                                    key={categoryId}
                                    id={categoryId}
                                    functions={() => clickHandler(categoryId)}
                                    title={name}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            {most.name && (
                <div className='flex flex-col'>
                    <p className='border-t-2 border-t-green-500 border-b-2 border-b-red-500 border-l-2 border-l-blue-500 border-r-2 border-r-orange-500 rounded-lg text-center bg-red-800 font-mono font-bold text-white'>
                        Your Favourite Category: {most.name}
                    </p>
                    <Home categorys={most.name} />
                </div>
            )}
        </div>
    );
};

export default ListOfFav;
