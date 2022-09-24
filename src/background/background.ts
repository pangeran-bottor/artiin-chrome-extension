// TODO: background script
chrome.runtime.onInstalled.addListener(() => {
  // TODO: on installed function
  console.log('background on installed.')

  chrome.contextMenus.create({
    contexts: ['selection'],
    title: 'Artiin',
    id: 'artiinExtension',
  })

  // chrome.contextMenus.onClicked.addListener((event) => {
  //   console.log(event.selectionText)
  //   chrome.tabs.sendMessage
  // })

})

chrome.contextMenus.onClicked.addListener((info: chrome.contextMenus.OnClickData, tab: chrome.tabs.Tab) => {
  console.log("got message from: ")
  console.log(info.pageUrl)
  chrome.tabs.sendMessage(tab.id, info.selectionText, null)
})

chrome.runtime.onMessage.addListener((msg: any, sender: chrome.runtime.MessageSender, sendResponse) => {
  console.log(msg)
  console.log(sender)
  console.log(sendResponse)
})