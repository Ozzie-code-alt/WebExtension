// Listen to updates in our tab system

chrome.tabs.onUpdated.addListener((tabId, tab)=>{
    //grab tab name and url

    console.log("this is current tab", tab.url)
    console.log("this is current tab title", tab.title)

    
if(tab.url && tab.url.includes('youtube.com/watch')){
    const queryParameters= tab.url.split('?')[1];
    const urlParameters = new URLSearchParams(queryParameters);
    console.log("this is the video id", urlParameters)
    //send a mesage to the content script that there is a new video loaded
    chrome.tabs.sendMessage(tabId, {
        type:"NEW",
        videoId: urlParameters.get('v')
    })
}
})