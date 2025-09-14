import "./App.css";
import { FaSearch } from "react-icons/fa";
import movies from "./Movies.json";
import { useState } from "react";

function App() {
  let [movieArr, setmovieArr] = useState([]);
  let [searchBox, setsearchBox] = useState("");
  let [message, setmessage] = useState("");
  let [selectYear, setselectYear] = useState("All");
  let [selectRating, setselectrating] = useState("All");
  let [filteredYear, setfilteredYear] = useState([]);
  let [filteredRatings, setfilteredRatings] = useState([]);
  let displayResults =
    searchBox === "" &&
    filteredYear.length === 0 &&
    filteredRatings.length === 0
      ? movies
      : searchBox !== ""
      ? movieArr
      : filteredYear.length > 0
      ? filteredYear
      : filteredRatings.length > 0
      ? filteredRatings
      : movies;

  // useEffect(()=>{
  //   setmovieArr(movies)
  // },[])
  function searchMovie() {
    let filteredMovies = movies.filter((movie) => {
      return searchBox.toLowerCase() == movie.title.toLowerCase();
      //inception===inception
    });
    setmovieArr([]);
    if (searchBox === "") {
      alert("Enter movie name");
      return;
      //use return to exit if block taaky nxt staements of code na run hn
    }
    setmovieArr(filteredMovies);
    if (filteredMovies.length === 0) {
      setmessage("No match found");
      // setTimeout(() => {
      //   setmessage("");
      // }, 1000);
    } else {
      setmessage("");
    }
    //filteredMovies.length === 0 ? setmessage("No match found") : setmessage("");
  }
  function selectyear(e) {
    setselectYear(e.target.value);
    let filteredY = movies.filter((movieyear) => {
      //return Number(selectYear)===Number(movieyear.Year)
      return Number(e.target.value) === Number(movieyear.Year);
      //setselectYear is async so its  taking time to update results so we will compare it directly with e.target.value
    });
    console.log(filteredY);
    setfilteredYear(filteredY);
  }
  function selectRatings(e) {
    setselectrating(e.target.value);
    let filteredR = movies.filter((rating) => {
      return parseFloat(e.target.value) === parseFloat(rating.Rating);
    });
    console.log(filteredRatings);
    //console.log(e.target.value)
    setfilteredRatings(filteredR);
  }

  return (
    <>
      <div className="container bg-[#181818] text-white h-min-[40rem] w-[70rem] flex flex-col gap-6 p-[20px]">
        <h1 className="text-5xl">Movie Search</h1>
        <div className="relative">
          <input
            type="search"
            placeholder="Search movies"
            className=" mySearchInput w-[50rem] bg-[#303030] p-3 rounded"
            value={searchBox}
            onInput={(e) => {
              setsearchBox(e.target.value);
              //to target the cross btn
              if (e.target.value === "") {
                setmessage("");
              }
            }}
          />

          <div className="absolute right-80 top-1/2 -translate-y-1/2">
            <FaSearch onClick={searchMovie} />
          </div>
        </div>

        <div className="flex gap-10">
          <div className="flex flex-col">
            <label>Filter year</label>
            <select
              className="year-select bg-[#303030]  p-3  w-[350px] rounded"
              value={selectYear}
              onChange={selectyear}
            >
              <option>All</option>
              <option>1997</option>
              <option>2010</option>
              <option>2014</option>
              <option>2019</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label>Filter Rating</label>
            <select
              className="rating-select bg-[#303030] p-3  w-[280px] rounded"
              value={selectRating}
              onChange={selectRatings}
            >
              <option>All</option>
              <option>8.8</option>
              <option>8.6</option>
              <option>8.5</option>
              <option>8.4</option>
              <option>7.8</option>
            </select>
          </div>
        </div>
        <div className="text-[#750000] text-2xl font-bold">
          <p>{message}</p>
        </div>

        <div className="text-white flex flex-wrap gap-5">
          {displayResults.map((movie) => {
            return (
              <div
                key={movie.id}
                className="bg-[#303030] rounded-xl flex gap-5 w-[400px] p-[20px]"
              >
                <div className="p-4 rounded-2xl">
                  <img
                    className="h-[150px]"
                    src={movie.img}
                    alt={movie.title}
                  />
                </div>
                <div className="p-4 flex flex-col gap-3">
                  <h1 className="font-bold text-2xl">{movie.title}</h1>
                  <p className="text-xl">{movie.Year}</p>
                  <p className="bg-[#750000] p-2 w-[60px] rounded">
                    {movie.Rating}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;

//what i observe
// If the data is small and only used inside one component, keep it as an array in `App.jsx`.
// If the data is larger, reused in multiple places, or you want to simulate a real API, use a dummy JSON file.
// import img1 from './images/img1.avif';
// agr hum array use krhy hn to imag ko import kr k array main img : img1 src = movies.img use kr lo
//q...cant we place images folder in src foldr
// No, not directly from JSON. If images stay in `src`, you must import each one in JS; JSON paths like `"./images/img1.avif"` won’t work in the browser.
//agr do variables pr ternaryoperatr lga kr un ko map krna h to zruri h k dono variables array hn otherwise it will give error
//  console.log(setmovieArr(movieArr)); will give undefine bcz setmovieArr's only job is to tell react js to update the state(means update the value of movieArr)not to give you back the new array, so you can’t use its return value.(its done by map)
//onChange={(e)=>setselectYear(e.target.value)}
// we can use e.target.value inside a manuall function and then onchange can call that function
//Because when you add onChange={handleChange}, React automatically passes the event object into your function.
//The event object is an automatic argument that React (or JavaScript) passes to your event handler. It contains details about the event, like which element triggered it and its current value.
//filter method main aik property ko ccompare kia jaata h lkn wo puri object return krta

//chain multiple ternaries
//condition1 ? expressionIfTrue1 : (condition2 ? expressionIfTrue2 : expressionIfFalse2);
//chaining two conditions
//(searchBox === "" ? (filteredYear==="All" ? movies : filteredYear) :movieArr)
// searchBox === "" or  filteredYear==="All" or filteredRatings === "All ? movies : movieArr or filteredYear or  filteredRating
//when we are usinge ternarry operators we can switch between arrays only  or strings only not between arrays and strings
//   ternary 1: searchBox==="" ? movies : movieArr
//  ternary 2 : filteredYear==="All" ? movies :filteredYear
//  ternary 3 :filteredRatings==="All"  ? movies : filteredRatings
// ( searchBox==="" && filteredYear==="All" && filteredRatings === "All" ? movies : searchBox!=="" ? movieArr : filteredYear!=="All"? filteredYear  :  filteredRatings!=="All"  ? filteredRatings : movies)
//console.log(movieArr); //movieArr ko without setmovieArr ui pr show nai krwa skty
//movieArr ko with setmovieArr console krwa k desire result nai ly skty
//useEffect hook tab use kia jaata h jab koi sideEffect automatically dikhana ho na k tab jab koi kuch useraction k baad show krwana ho jesy k user ka search icon pr click krny k baad searched movies ka show krna agr aap chahty k movie tab show hn jesy he user movie ka name search box main likhy wo movies search icon ko click kiy bagair show ho jaaain
//useEffect sirf tab chahiye jab chaho ke koi action automatic ho state change ya component load par.
// searchBox==='' ? alert("Enter movie name") : setmovieArr(filteredMovies);
// filteredMovies.length === 0 ?   "No matches found" : setmessage("");
