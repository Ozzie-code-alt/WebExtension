(() => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = "";

  let currentBookmarks = [];
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;
    if (type === "NEW") {
      currentVideo = videoId;
      newVideoLoaded();
    }
  });

  const newVideoLoaded = () => {
    const bookmarkBtnExists =
      document.getElementsByClassName("bookmark-btn")[0];
    console.log("bookmark extists ?", bookmarkBtnExists);

    if (!bookmarkBtnExists) {
      const bookmarkBtn = document.createElement("img");
      bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
      bookmarkBtn.className = "ytp-button " + "bookmark-btn";
      bookmarkBtn.title = "Bookmark this video";

      // grab elements from youtuber DOM
      youtubeLeftControls =
        document.getElementsByClassName("ytp-left-controls")[0];
      youtubePlayer = document.getElementsByClassName("video-stream")[0];

      //append my class
      youtubeLeftControls.appendChild(bookmarkBtn);
      bookmarkBtn.addEventListener("click", addNewBookmarkEventhandler);
    }
  };

  const addNewBookmarkEventhandler = () => {
    const currentTime = youtubePlayer.currentTime;
    const newBookmark = {
      time: currentTime,
      description: "Bookmark at " + getTime(currentTime),
    };
    console.log("new bookmark", newBookmark);
    // chrome storage api
    chrome.storage.sync.set({
      [currentVideo]: JSON.stringify(
        [...currentBookmarks, newBookmark].sort((a, b) => a.time - b.time)
      ),
    });
  };
  
})();

const getTime = (time) => {
  var date = new Date(0);
  date.setSeconds(time);

  return date.toISOString().substr(11, 8);
};
