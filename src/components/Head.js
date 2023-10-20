import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowsuggestions] = useState(false);
  // console.log(searchQuery)

  const searchCache = useSelector((store) => store.search);

  useEffect(() => {
    //Make an api call every key stroke
    // but if the difference between api calls is less than 200ms decline the api call

    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else getSearchSuggestions();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    console.log("api call", searchQuery);
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);

    //update cache
    dispatch(cacheResults({ [searchQuery]: json[1] }));
  };

  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  return (
    <div className="grid grid-flow-col py-3 my-2 shadow-lg">
      <div className="flex mx-6 col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 p-1 cursor-pointer"
          alt="menu"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqFOuFn4GcVY995ptcRxbvZoZEVFFdGtENUg&usqp=CAU"
        />
        <a href="/">
          <img
            className="h-8 mx-2"
            alt="youtube"
            src="https://vectorseek.com/wp-content/uploads/2021/01/YouTube-Logo-Vector.png"
          />
        </a>
      </div>
      <div className="col-span-10 ">
        <div>
          <input
            type="text"
            className="border border-gray-400 w-1/2 p-2 rounded-l-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              setShowsuggestions(true);
            }}
            onBlur={() => {
              setShowsuggestions(false);
            }}
          />
          <button className="border border-gray-400 p-2 rounded-r-full">
            Search
          </button>
          {showSuggestions && (
            <div className="fixed bg-white px-5 py-2 w-[32rem] shadow-lg  rounded-lg border border-gray-100">
              <ul>
                {suggestions.map((s) => (
                  <li key={s} className="py-2 px-2 shadow-sm hover:bg-gray-100">
                    🔍 {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-1">
        <img
          className="h-10"
          alt="usericon"
          src="https://static.vecteezy.com/system/resources/thumbnails/022/014/159/small/avatar-icon-profile-icon-member-login-isolated-vector.jpg"
        />
      </div>
    </div>
  );
};

export default Head;
