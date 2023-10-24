import React from "react";

// take out memes data so its not still triyng to pull from local file as well 
// import memesData from "./memesData";

export default function Meme() {
  /**
     * Challenge: 
     * Try to figure out why our code is broken! 😞
     * 
     * Hint: it has to do with the difference between
     * what we were importing before from memesData.js
     * and what we're setting our state as with `allMemes`
     */

  // I had already fixed it to my liking, changed data. memes to just data?
  // but they want us to pull the array of data not the actual memes, scrimba had us remove the const meme array becuase it called to An OBJECT ARRaY WE ARE NO LONGER USIng, all memes was an object-array with a data property but now is just an array  // see below on line 89
 
 
//  they left the statement data.data.memes that i had changed and was casueing the error, after chanegs on line 89 error was no longer running 
 
 
    /**
   * Challenge:
   * 1. Set up the text inputs to save to
   *    the `topText` and `bottomText` state variables.
   * 2. Replace the hard-coded text on the image with
   *    the text being saved to state.
   */



  // new challenge for spi pulling
  /**
     * Challenge: 
     * As soon as the Meme component loads the first time,
     * make an API call to "https://api.imgflip.com/get_memes".
     * 
     * When the data comes in, save just the memes array part
     * of that data to the `allMemes` state
     * 
     * Think about if there are any dependencies that, if they
     * changed, you'd want to cause to re-run this function.
     * 
     * Hint: for now, don't try to use an async/await function.
     * Instead, use `.then()` blocks to resolve the promises
     * from using `fetch`. We'll learn why after this challenge.
     */
    

  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });

  // took out memes data call and leave array empty sicne we are no longer call memes data form local file 
//   const [allMemes, setAllMemes] = React.useState(memesData);

const [allMemes, setAllMemes] = React.useState([]);



// we are gonna add  an api call here instead of pulling directly from our local js file


React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
// console log data first to make sure ap request is working 
// .then(data => console.log(data))


 // change above stement to set all memes instead of conole log now that api is wokring 

// looking t the challenge above, we only want the array property so we cant just use data, we end up using data.data.memes since thats what our object is called-- see memesDats.js. scrimba told me to do this but was throwing an error, worked when changed back to data 
.then(data => setAllMemes(data.data.memes ))



    //dependics array goes  here but we leave it empty becuase nothing is changing in state or making a new api request so array remains empty 
}, [])

// checking to see if data is working 
console.log(allMemes)


  function getMemeImage() {
    // took out below loine and changed the rest to aCCESS allMemes
    // const memesArray = allMemes.data.memes;
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }
  function handleChange(event) {
    const {name, value} = event.target
    // call set meme and access the previous meme, use curly braces surrounded wiht paranthes as an implict object return 
    setMeme(prevMeme =>({
       // this copies all the properties of the previous meme
       ...prevMeme,
// this changes the top and bottom text depending on what name gets pulled in from the target
[name] : value

    }))
}
  return (
    <main>
      <div className="inputs">
        <input
          // added a name property to each input so we can watch for changes

          name="topText"
          type="text"
          placeholder="Top text"
          className="Shutup"
          /// added values so they can be controlled coomponents
          value={meme.topText}
          // added a handle change ND  hNDLE CHANGE FUNCTION ABOVE 
          onChange={handleChange}
        />
        <input
        /// added values so they can be controlled compoentents
          name="bottomText"
          type="text"
          placeholder="Bottom text"
          className="take-my"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="get-new" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme-generated" alt="" />

        {/* changed the hard coded h2s to pull in our object values in state wiht meme.topTextand meme.bottom */}
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}


// still pulling from local js file when we need to pull form API