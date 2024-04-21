(() => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = "";
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;
    if (type === "NEW") {
      currentVideo = videoId;
      newVideoLoaded();
    }
  });

  const newVideoLoaded = () => {
    const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];
      console.log("bookmark extists ?",bookmarkBtnExists);


      if(!bookmarkBtnExists){
        const bookmarkBtn = document.createElement("img");
        bookmarkBtn.src = chrome.runtime.getURL("images/bookmark.png"); 
        bookmarkBtn.className = "ytp-button " + "bookmark-btn";
        bookmarkBtn.title = "Bookmark this video";
      }
  };

})();


