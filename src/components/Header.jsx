// {/* <Debouncing>

// Debouncing:

// agar given time s phle api cal ho to jaye to phle wali ko decline krdo
// i ka search krre h to uske results dega 
// fir ip ka kre h to uske resuts dega
// apr agar m 200 ms k andar iphone likh du to sirf iphone k hi results dega 
// alag alag characters k results ni dega 
// yh api call ko har characer k liey hone s rokna hi deboucing h 
// agar deboucing ni kri to bar abr api call hoig

// typing slow = 200ms typing fast = 30ms

// Perfomance: - iphone pro max = 14 letter * 1000 = 140000 - with debouncing= 3 API calls * 1000 = 3000

// Debouncing with 200ms - if difference between 2 key strokes is <200ms - DECLINE API call - >200ms make an API call

// Cache: time complexity tro search in array = O(n) time complexity tro search in Object = O(1)

// [i, ip, iph, iphone]

// { i: ip: iph: iphone: }

// </Debouncing> */}

// if not debouncing
// (4) ['ip', Array(10), Array(0), {…}]
// bundle.js:414 (4) ['iph', Array(10), Array(0), {…}]
// bundle.js:414 (4) ['ipho', Array(10), Array(0), {…}]
// bundle.js:414 (4) ['iphon', Array(10), Array(0), {…}]
// bundle.js:414 (4) ['iphone', Array(10), Array(0), {…}]

// ig press in less than 200ms
// bundle.js:414 (4) ['iphone', Array(10), Array(0), {…}]
//sidha iphone p hi call hogi naki har chracter p kuki cancel kr dega usko 2000 ms km h na

// har keypress jo 2 sec s phle h vo re erender or phle wale timer ko cancel kr dega jisse api call hi ni hogi

// make an apicall after 200 ms 
// but if the difference betwen two api call is 200 ms 
// then it will cancel the api call

/**
 * 
 * key1 -i
  render the components
  useEffect();
  start timer => make api call after 200 ms 

  key 2 --ip (before 200 ms)
  destroy the component(useeffect return method)
  re render the conponent
  useEffect()
  start new timer =>make api call after 200 ms
  phle wale ko run ni hone dega usko cancel kr dega component ko render krek
  component render hoga clenaup bho hoga isly phle wala ni chlta h

 */

// ek bar kuch likh dia agar usko delete krege to vps call hoga islye caching krni h ki ek bar save ho jaye to bad m jb use kro tb vo cache s lele


import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../redux/appSlice'
import { chacheResults } from '../redux/SearchSlice'
import { YOUTUBE_SEARCH_API } from '../utils/constants';

const Header = () => {
    const [searchQuery, setSeatchQuery] = useState("");
    const [suggestion, setSuggestion] = useState([])
    const [showSuggestion, setShowSuggestion] = useState([])

    const searchCache = useSelector(store => store.search)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchCache[searchQuery]) {
                setSuggestion(searchCache[searchQuery])
            }
            else {
                getSearchResults();
            }
        }, 200);

        return () => {
            clearTimeout(timer)
        }
    }, [searchQuery]);


    const getSearchResults = async () => {
        const res = await fetch(YOUTUBE_SEARCH_API + searchQuery);
        const json = await res.json();
        console.log(json);
        setSuggestion(json[1])
        dispatch(chacheResults({
            [searchQuery]: json[1]
        }))
    }

    const dispatch = useDispatch()
    const toggleMenuhandler = () => {
        dispatch(toggleMenu())
    }
    return (
        <div className="grid grid-flow-col p-2 m-1 shadow-lg">
            <div className="flex col-span-1">
                <img
                    onClick={() => toggleMenuhandler()}
                    className="h-6 cursor-pointer"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0OBQgMAAWlpKQpJSaenZ309PUAAAAIAAD8/Pz5+fna2tqop6dvbW1oZmevrq4tKivFxMQYExRiYGC+vr7Dc4WrAAABB0lEQVR4nO3cS3LCMBAFQGIIIBPbhN/9jxqSyiIsTUnlydB9g1eSNV5MvdUKAAAAAAAAAAAAAAAAXtEwvscwDk3yHabSb2Loy/TRIOHUv8XRH+sHHMrSqR6U+hd1jHSE90P8lHC2/Lc0/0vzMy3WMdynxaFBwu+Jv4uh0cQHAAAAAAAAAIB59jG0ijdcT9sYTtcmK0PncumiuJRz/YD7bbf0ut4f3br+GvQt2PblrXrC3WbpUA/6sXrC/GeY/zvM/5aGmofHZiu0S//M/GoVDwAAAAAAAAAAZsjeuRerN1HL7hPy95fm76DNnzD/Lc3/0rxAJ3v+Xn0AAAAAAAAAAAAAAAD4T74AYhs1O+vt3ioAAAAASUVORK5CYII=" alt="hamburger" />

                <a href="/">
                    <img
                        className="h-6 mx-2"
                        alt="youtube-logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
                    />
                </a>
            </div>

            <div className="col-span-10 px-10">
                <input
                    className="px-5 w-1/2 border border-gray-400 p-1 rounded-l-full"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => { setSeatchQuery(e.target.value) }}
                    onFocus={() => setShowSuggestion(true)}
                    onBlur={() => setShowSuggestion(false)}
                />
                <button
                    className="border border-gray-400 px-5 py-1 rounded-r-full bg-gray-100">
                    Search</button>
            </div>
            {showSuggestion && (
                <div className="fixed bg-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border border-gray-100">
                    <ul>
                        {suggestion.map((s) => (
                            <li key={s} className="py-2 px-3 shadow-sm hover:bg-gray-100">
                                🔍 {s}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="col-span-1">
                <img
                    className="h-6"
                    alt="user"
                    src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                />
            </div>
        </div>
    )
}
export default Header